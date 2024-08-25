import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/entity/base.entity';
import { EntityNames } from 'src/common/enums/entityName.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Otp } from './otp.entity';

@ObjectType()
@Entity(EntityNames.User)
export class User extends BaseEntity {
  @Column({ unique: true })
  @Field()
  phone: string;

  @Column({ unique: true, nullable: true })
  @Field({ nullable: true })
  username: string;
  @Column({ nullable: true })
  @Field({ nullable: true })
  fullname?: string;
  @Column({ default: false })
  @Field()
  phone_verify: boolean;
  @Column({ nullable: true })
  otpId: number;
  @OneToOne(() => Otp, (otp) => otp.user, { onDelete: 'CASCADE' })
  @JoinColumn()
  otp: Otp;
  @Field()
  @CreateDateColumn()
  created_at: Date;
  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
