import { Injectable, Inject } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schema/user.schema';
import { InformationUser } from 'src/schema/information-user.schema';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name, 'information-user')
    private readonly userModel: Model<User>,
    @InjectConnection('information-user') private userConnection: Connection,
  ) {}

  async findAllUser(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOneUserById(id: string): Promise<User | null> {
    return this.userModel.findById(id);
  }

  async findOneUserByName(name: string): Promise<User | null> {
    return this.userModel.findOne({ name: name }).exec();
  }

  async findOneUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email: email }).exec();
  }

  async create(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async updateUser(id: string, user: User): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, user, { new: true });
  }
}
