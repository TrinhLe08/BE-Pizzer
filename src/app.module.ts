import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './module/users/users.module';
import { CategoriesModule } from './module/categories/categories.module';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASSWORD}@pizzer.spiuylc.mongodb.net/${process.env.DB_NAME_USER}?retryWrites=true&w=majority`,
      { connectionName: 'information-user' },
    ),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASSWORD}@pizzer.spiuylc.mongodb.net/${process.env.DB_NAME_LOGIN}?retryWrites=true&w=majority`,
      { connectionName: 'information-login' },
    ),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASSWORD}@pizzer.spiuylc.mongodb.net/${process.env.DB_NAME_CATEGORIES}?retryWrites=true&w=majority`,
      { connectionName: 'information-categories' },
    ),
    CategoriesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
