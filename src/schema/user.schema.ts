import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'information-user', versionKey: false })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop()
  email: string;

  @Prop()
  mobile: string;

  @Prop()
  active: boolean;

  @Prop()
  city: string;

  @Prop()
  district: string;

  @Prop()
  ward: string;

  @Prop()
  address: string;

  @Prop()
  birthday: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
