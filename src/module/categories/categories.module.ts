import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DataSource } from 'typeorm';
import { JwtService } from 'src/global/globalJwt';
import { Categories, CategoriesSchema } from 'src/schema/categories.schema';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Categories.name, schema: CategoriesSchema }],
      'information-categories',
    ),
  ],
  controllers: [CategoriesController],
  providers: [JwtService, CategoriesService],
})
export class CategoriesModule {
  private dataSource: DataSource;
}
