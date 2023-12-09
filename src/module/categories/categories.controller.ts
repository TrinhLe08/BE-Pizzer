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
import { JwtService } from 'src/global/globalJwt';
import { CategoriesService } from './categories.service';
import { Categories } from 'src/schema/categories.schema';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly categoriesService: CategoriesService,
  ) {}
}
