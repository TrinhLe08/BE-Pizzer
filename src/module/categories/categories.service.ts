import { Injectable, Inject } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categories } from 'src/schema/categories.schema';
@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Categories.name, 'information-categories')
    private readonly categoriesModel: Model<Categories>,
    @InjectConnection('information-categories')
    private categoriesConnection: Connection,
  ) {}

  async findAllCategoriesr(): Promise<Categories[]> {
    return this.categoriesModel.find().exec();
  }

  async findOneCategoriesrById(id: string): Promise<Categories | null> {
    return this.categoriesModel.findById(id);
  }

  async findOneCategoriesByName(name: string): Promise<Categories | null> {
    return this.categoriesModel.findOne({ name: name }).exec();
  }

  async create(categories: Categories): Promise<Categories> {
    const newcategories = new this.categoriesModel(categories);
    return newcategories.save();
  }

  //   async updateCategories(
  //     id: string,
  //     categories: Categories,
  //   ): Promise<Categories | null> {
  //     return this.categoriesModel.findByIdAndUpdate(id, user, { new: true });
  //   }
}
