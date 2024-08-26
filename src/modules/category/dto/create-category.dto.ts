import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

@InputType()
export class CreateCategoryInput {

    @Field()
    @IsNotEmpty()
    @IsString()
    name: string;
    @Field({nullable:true})
    @IsString()
    slug: string;
    @Field(()=>Int,{nullable:true})
    @IsNumber()
    parentId: number;
    @Field({nullable:true})
    imageUrl?:string
}