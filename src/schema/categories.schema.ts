import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'information-categories', versionKey: false })
export class Categories {
  @Prop({ required: true })
  name: string;

  @Prop()
  slug: string;

  @Prop()
  name_vi: string;

  @Prop()
  description: boolean;

  @Prop()
  description_vi: string;

  @Prop()
  image_path: string;

  @Prop()
  active: boolean;

  @Prop()
  order_by: string;
}

export type CategoriesDocument = Categories & Document;
export const CategoriesSchema = SchemaFactory.createForClass(Categories);
