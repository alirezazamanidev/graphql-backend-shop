import { Field, Int, ObjectType } from "@nestjs/graphql";
import { PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
export class BaseEntity {
    @Field((type)=>Int)
    @PrimaryGeneratedColumn('increment')
    id:number
}