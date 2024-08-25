import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmDbConfig } from './configs/typeOrm.config';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmDbConfig,
      inject: [TypeOrmDbConfig],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: 'src/schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
