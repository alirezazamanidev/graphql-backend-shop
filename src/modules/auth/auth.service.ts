import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { GraphQLError } from 'graphql';
import { SendOtpInput } from './dto/auth.dto';
import { Otp } from '../user/entities/otp.entity';
import { randomInt } from 'crypto';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Otp) private readonly otpRepository: Repository<Otp>,
  ) {}

  async sendOtp(sendOtpInput: SendOtpInput) {
    try {
      let { phone } = sendOtpInput;
      let user = await this.userRepository.findOneBy({ phone });
      if (!user) {
        user = this.userRepository.create({ phone });
        user = await this.userRepository.save(user);
      }

      let otp = await this.createOtpForUser(user.id);

      return {
        message: 'Sent Otp code successFully',
        code: otp.code,
      };
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }
  private async createOtpForUser(userId: number) {
    let otp = await this.otpRepository.findOneBy({ userId });
    let code = randomInt(10000, 99999).toString();
    let expiresIn = new Date(new Date().getTime() + 2 * 1000 * 60);
    let otpExist = false;
    if (otp) {
      if (otp.expiresIn > new Date())
        throw new UnauthorizedException('The otp code not Expired!');
      otpExist = true;
      otp.code = code;
      otp.expiresIn = expiresIn;
    } else {
      otp = this.otpRepository.create({ userId, code, expiresIn });
    }
    otp = await this.otpRepository.save(otp);
    if (!otpExist)
      await this.userRepository.update({ id: userId }, { otpId: otp.id });
    return otp;
  }
}
