import { Field, InputType } from "@nestjs/graphql";
import { IsMobilePhone, IsNotEmpty, IsString, Length } from "class-validator";

@InputType()
export class SendOtpInput {

    @Field()
    @IsNotEmpty()
    @IsString()
    @IsMobilePhone('fa-IR')
    phone:string
}

@InputType()
export class CheckOtpInput {

    @Field()
    @IsNotEmpty()
    @IsString()
    @IsMobilePhone('fa-IR')
    phone:string
    @Field()
    @IsNotEmpty()
    @Length(5,5)
    code:string
}