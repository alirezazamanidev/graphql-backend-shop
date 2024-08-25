import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CheckOtpInput, SendOtpInput } from './dto/auth.dto';
import { AuthResponse } from 'src/common/models/response.model';
import { Req, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { User } from '../user/entities/user.entity';
import { Request } from 'express';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  sendOtp(@Args('sendOtpInput') sendOtpInput: SendOtpInput) {
    return this.authService.sendOtp(sendOtpInput);
  }
  @Mutation(() => AuthResponse)
  checkOtp(@Args('checkOtpInput') checkOtpInput: CheckOtpInput) {
    return this.authService.checkOtp(checkOtpInput);
  }
  @UseGuards(GqlAuthGuard)
  @Query((returns) => User)
  users(@Context('req') req: Request) {
    return req.user;
  }
}
