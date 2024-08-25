import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { GraphQLError } from 'graphql';
import { CheckOtpInput, SendOtpInput } from './dto/auth.dto';
import { Otp } from '../user/entities/otp.entity';
import { randomInt } from 'crypto';
import { TokenService } from './token.service';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Otp) private readonly otpRepository: Repository<Otp>,
    private readonly tokenService: TokenService,
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
  async checkOtp(checkOtpInput: CheckOtpInput) {
    let { phone, code } = checkOtpInput;
    const user = await this.userRepository.findOne({
      where: { phone },
      relations: { otp: true },
    });

    if (!user) throw new UnauthorizedException('Login try again');
    let otp = user?.otp;
    if (!otp) throw new UnauthorizedException('otp code is not Founded');
    if (otp.code !== code)
      throw new UnauthorizedException('The Otp Code Incurrent!');
    if (otp.expiresIn < new Date())
      throw new UnauthorizedException('The Otp Code expires');
    await this.userRepository.update({ id: user.id }, { phone_verify: true });

    const token = await this.tokenService.createJwtToken({ userId: user.id });

    return {
      message: 'You SuccessFully loogedIn!',
      token,
    };
  }
}
