import { Field, InputType } from "@nestjs/graphql";
import { IsMobilePhone, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class SendOtpInput {

    @Field()
    @IsNotEmpty()
    @IsString()
    @IsMobilePhone('fa-IR')
    phone:string
}