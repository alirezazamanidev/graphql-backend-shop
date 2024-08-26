import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { SuccessResponse } from 'src/common/models/response.model';
import { GraphQLUpload,FileUpload } from 'graphql-upload-ts';
import { CreateCategoryInput } from './dto/create-category.dto';

@Resolver(of=>Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(()=>SuccessResponse)
  createCatgory(@Args('createCategoryInput') createCategoryInput:CreateCategoryInput){
    return this.categoryService.create(createCategoryInput)
  }
}
