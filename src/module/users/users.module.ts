import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DataSource } from 'typeorm';
import { UsersController } from './users.controller';
import { User, UserSchema } from 'src/schema/user.schema';
import {
  InformationUser,
  InformationUserSchema,
} from 'src/schema/information-user.schema';
import { JwtService } from 'src/global/globalJwt';
import { UsersService } from './users.service';
import { InformationUserService } from './information-user.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema }],
      'information-user',
    ),
    MongooseModule.forFeature(
      [{ name: InformationUser.name, schema: InformationUserSchema }],
      'information-login',
    ),
  ],
  controllers: [UsersController],
  providers: [JwtService, UsersService, InformationUserService],
})
export class UsersModule {
  private dataSource: DataSource;
}
