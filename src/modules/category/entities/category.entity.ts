import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/entity/base.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Category extends BaseEntity {
  @Column({ unique: true })
  @Field()
  name: string;
  @Column({ unique: true })
  @Field()
  slug: string;
  @Column({ nullable: true })
  @Field({ nullable: true })
  image: string;
  @Column({ nullable: true })
  parentId: number;
  @ManyToOne(() => Category, (cate) => cate.children, { onDelete: 'CASCADE' })
  @Field(() => Category, { nullable: true })
  parent: Category;
  @OneToMany(() => Category, (cate) => cate.parent)
  @Field(() => [Category], { nullable: true })
  children: Category[];

  @CreateDateColumn()
  @Field()
  created_at: Date;
  @UpdateDateColumn()
  @Field()
  updated_at: Date;
}
