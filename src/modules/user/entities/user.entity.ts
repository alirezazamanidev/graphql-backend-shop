import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User  {

    @Field((type)=>Int)
    id:number
    @Field({nullable:true})
    fullname?:string
    @Field()
    email:string
}