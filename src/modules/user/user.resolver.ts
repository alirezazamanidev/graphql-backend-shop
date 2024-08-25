import { Resolver,Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';

import { User } from './entities/user.entity';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((returns) => User)
  getUser(@Args('id',{type:()=>Int!}) id:number) {
    console.log(id);
    
    return {
      id: 1,
      fullname: 'alireza',
      email: 'zamani',
    };
  }

  
}
