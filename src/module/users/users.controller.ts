import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  Headers,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from 'src/global/globalJwt';
import { InformationUserService } from './information-user.service';
import { UserType } from 'src/utils/users.type';
import { ResponseData } from 'src/global/globalClass';
import { User } from 'src/schema/user.schema';

@Controller('users')
export class UsersController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly informationUserService: InformationUserService,
  ) {}

  @Post()
  async registerUsers(@Body() user: UserType): Promise<ResponseData<User>> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,16}$/;
    try {
      if (
        !user.name ||
        !user.email ||
        emailRegex.test(user.email) === false ||
        !user.mobile ||
        !user.password ||
        passwordRegex.test(user.password) === false
      ) {
        return new ResponseData<any>(
          {},
          false,
          'Missing registration information || Invalid email || Password must contain at least one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character and it must be 8-16 characters long.',
        );
      }
      const existingUser = await this.usersService.findOneUserByEmail(
        user.email,
      );
      if (existingUser) {
        return new ResponseData<any>({}, false, 'Email already exists.');
      }
      const informationToRegister: any = {
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        active: true,
        city: 'Ho Chi Minh City',
        district: 'District 1',
        ward: 'Ward 13',
        address: '123 Nguyen Van Linh Street',
        birthday: '01/01/2000',
      };
      const register: any = await this.usersService.create(
        informationToRegister,
      );
      await this.informationUserService.createInformationNewUser({
        ...user,
        userId: register._id,
      });
      return new ResponseData<User>(
        register,
        true,
        'User created successfully.',
      );
    } catch (err) {
      console.log(err);
      return new ResponseData<any>({}, true, 'Internal Server Error .');
    }
  }

  @Post('/login')
  async loginUsers(
    @Body()
    informationUser: {
      userName: string;
      userPassword: string;
      rememberMe: boolean;
    },
  ): Promise<ResponseData<User>> {
    const { userName, userPassword, rememberMe } = informationUser;
    try {
      if (!userName || !userPassword) {
        return new ResponseData<any>({}, false, 'Not enough information');
      }
      const user = await this.informationUserService.findOneUserByName(
        informationUser.userName,
      );
      if (!user) {
        return new ResponseData<any>(
          {},
          false,
          'Incorrect information, please review your login information',
        );
      } else if (user.password != userPassword) {
        return new ResponseData<any>(
          {},
          false,
          'Incorrect information, please review your login information',
        );
      }
      const informationToketifiToken = {
        userId: user.userId,
        userName: user.name,
        userPhone: user.mobile,
        userEmail: user.email,
      };
      const Token = this.jwtService.sign(
        informationToketifiToken,
        rememberMe ? '30d' : '7d',
      );
      return new ResponseData<any>(
        { authorization: Token },
        true,
        'Logged in successfully',
      );
    } catch (err) {
      console.log(err);
      return new ResponseData<any>({}, true, 'Internal Server Error .');
    }
  }

  @Get('/me')
  async getMe(
    @Headers('authorization') authorization: string,
  ): Promise<ResponseData<User>> {
    try {
      const informationUser: any = this.jwtService.verify(authorization);
      const idUser: string = informationUser.userId;
      if (!idUser) {
        return new ResponseData<any>({}, false, 'Authorization denied!');
      }
      const dataUser = await this.usersService.findOneUserById(idUser);
      if (!dataUser) {
        return new ResponseData<any>({}, false, 'User not found!');
      } else {
        return new ResponseData<any>(dataUser, true, '');
      }
    } catch (err) {
      console.log(err);
      return new ResponseData<any>({}, true, 'Internal Server Error .');
    }
  }

  @Put('/me')
  async updateMyInformation(
    @Body() dataToUpdate: User,
    @Headers('authorization') authorization: string,
  ): Promise<ResponseData<User>> {
    try {
      const informationUser: any = this.jwtService.verify(authorization);
      const idUser: string = informationUser.userId;
      if (!idUser) {
        return new ResponseData<any>({}, false, 'Authorization denied!');
      } else if (
        !dataToUpdate.name ||
        !dataToUpdate.mobile ||
        !dataToUpdate.city ||
        !dataToUpdate.district ||
        !dataToUpdate.ward ||
        !dataToUpdate.birthday ||
        !dataToUpdate.address
      ) {
        return new ResponseData<any>({}, false, 'Nothing was updated!');
      }
      const updateUser = await this.usersService.updateUser(
        idUser,
        dataToUpdate,
      );
      if (!updateUser) {
        return new ResponseData<any>({}, false, 'User not found');
      } else {
        return new ResponseData<any>(
          updateUser,
          true,
          'Your information was updated.',
        );
      }
    } catch (err) {
      console.log(err);
      return new ResponseData<any>({}, true, 'Internal Server Error');
    }
  }

  @Patch('/me')
  async updatePassword(
    @Body() paswordToUpdate: { currentPassword: string; newPassword: string },
    @Headers('authorization') authorization: string,
  ) {
    try {
      const informationUser: any = this.jwtService.verify(authorization);
      const idUser: string = informationUser.userId;
      if (!idUser) {
        return new ResponseData<any>({}, false, 'Authorization denied!');
      }
      const userInformation =
        await this.informationUserService.findInformationByUserId(idUser);
      if (!userInformation) {
        return new ResponseData<any>({}, false, 'User not found');
      } else if (userInformation.password != paswordToUpdate.currentPassword) {
        return new ResponseData<any>(
          {},
          false,
          'Nothing was updated || Missing passwords || Password did not match!',
        );
      } else {
        const updatePassword =
          await this.informationUserService.updateInformation(
            userInformation._id.toString(),
            paswordToUpdate.newPassword,
          );
        console.log(updatePassword);
        return new ResponseData<any>(
          {},
          true,
          'Password was changed successfully!',
        );
      }
    } catch (err) {
      console.log(err);
      return new ResponseData<any>({}, true, 'Internal Server Error');
    }
  }

  @Get('/all')
  async getAll() {
    try {
      const u = await this.informationUserService.findAllInformation();
      return new ResponseData<any>(u, true, 'User created successfully.');
    } catch (e) {
      console.log(e);
      return;
    }
  }
}
