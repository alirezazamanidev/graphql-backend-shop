import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CheckOtpInput, SendOtpInput } from './dto/auth.dto';
import { AuthResponse } from 'src/common/models/response.model';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  sendOtp(@Args('sendOtpInput') sendOtpInput: SendOtpInput) {
    return this.authService.sendOtp(sendOtpInput);
  }
  @Mutation(()=>AuthResponse)
  checkOtp(@Args('checkOtpInput') checkOtpInput:CheckOtpInput){
    return this.authService.checkOtp(checkOtpInput);
  }

 
}
