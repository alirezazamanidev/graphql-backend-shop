import { BaseEntity } from "src/common/entity/base.entity";
import { EntityNames } from "src/common/enums/entityName.enum";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity(EntityNames.UserOtp)
export class Otp extends BaseEntity {
    @Column()
    code:string
    @Column()
    expiresIn:Date
    @Column()
    userId:number
    @CreateDateColumn()
    created_at:Date
    @UpdateDateColumn()
    updated_at:Date
    @OneToOne(()=>User,user=>user.otp)
    @JoinColumn()
    user:User
}