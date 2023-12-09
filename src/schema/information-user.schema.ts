import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'information-login', versionKey: false })
export class InformationUser {
  @Prop({ required: true })
  name: string;

  @Prop()
  email: string;

  @Prop()
  userId: string;

  @Prop()
  mobile: string;

  @Prop()
  password: string;
}

export type InformationUserDocument = InformationUser & Document;
export const InformationUserSchema =
  SchemaFactory.createForClass(InformationUser);
