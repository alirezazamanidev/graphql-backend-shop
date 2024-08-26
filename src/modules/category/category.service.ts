import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.dto';
import { DeepPartial, IsNull, Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import slugify from 'slugify';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryInput: CreateCategoryInput) {
    let { name, slug, imageUrl, parentId } = createCategoryInput;
    const createObject: DeepPartial<Category> = { name };

    createObject['slug'] = slug
      ? slug
      : slugify(name, { lower: true, trim: true, replacement: '_' });
    createObject['slug'] = await this.chcekExitBySlug(createObject['slug']);
    if (imageUrl) {
      createObject['image'] = imageUrl;
    }
    if (parentId) {
      await this.findOneById(parentId);
      createObject['parentId'] = parentId;
    }

 try {
    const newCategory=this.categoryRepository.create(createObject);
    await this.categoryRepository.save(newCategory);
    return {
        messsge:'Created!'
    }
    
 } catch (error) {
    throw new InternalServerErrorException(error.message)
 }
  }
  async listOfCategories(){
    return await this.categoryRepository.find({
        relations:{children:true},
        where:{parentId:IsNull()},
        select:{
            id:true,
            name:true,
            slug:true,
            image:true,
            children:{
                id:true,
                name:true,
                slug:true,
                image:true,
            },
            created_at:true,
            updated_at:true
        }
    })
  }
  async findOneById(id: number) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) throw new NotFoundException('The category id not founded!');
    return category;
  }

  async chcekExitBySlug(slug: string) {
    const cate = await this.categoryRepository.findOneBy({ slug });

    if (cate) throw new ConflictException('The category slug alredy exit!');
    return slug;
  }
}
