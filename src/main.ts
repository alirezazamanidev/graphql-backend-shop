import './configs/env.config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const {PORT}=process.env
  await app.listen(PORT,()=>{
    console.log(`server Run => http://localhost:${PORT}`);
    console.log(`GraphQl run => http://localhost:${PORT}/graphql`);
    
  });
}
bootstrap();
