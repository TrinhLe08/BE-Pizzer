import { Injectable, Inject } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schema/user.schema';
import { InformationUser } from 'src/schema/information-user.schema';
@Injectable()
export class InformationUserService {
  constructor(
    @InjectModel(InformationUser.name, 'information-login')
    private readonly informationUserModel: Model<InformationUser>,
    @InjectConnection('information-login')
    private informationUserConnection: Connection,
  ) {}

  async findAllInformation(): Promise<InformationUser[]> {
    return this.informationUserModel.find().exec();
  }

  async findOneUserByName(name: string): Promise<InformationUser | null> {
    return this.informationUserModel.findOne({ name: name }).exec();
  }

  async findInformationByUserId(
    userId: string,
  ): Promise<InformationUser | any | null> {
    return this.informationUserModel.findOne({ userId: userId }).exec();
  }

  async updateInformation(
    id: string,
    newPassword: string,
  ): Promise<InformationUser[]> {
    return this.informationUserModel.findByIdAndUpdate(
      id,
      { password: newPassword },
      { new: true },
    );
  }

  async createInformationNewUser(
    user: InformationUser,
  ): Promise<InformationUser> {
    const newUser = new this.informationUserModel(user);
    return newUser.save();
  }
}
