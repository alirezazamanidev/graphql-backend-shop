import { Field, Int } from "@nestjs/graphql";
import { PrimaryGeneratedColumn } from "typeorm";

export class BaseEntity {
    @Field((type)=>Int)
    @PrimaryGeneratedColumn('increment')
    id:number
}