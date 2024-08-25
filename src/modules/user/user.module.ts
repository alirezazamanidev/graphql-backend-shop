import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otp } from './entities/otp.entity';
import { User } from './entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Otp,User])],
  providers: [UserResolver, UserService],
  exports:[TypeOrmModule]
})
export class UserModule {}
