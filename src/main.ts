import './configs/env.config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { graphqlUploadExpress } from 'graphql-upload-ts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    graphqlUploadExpress({
      maxFileSize: 1000000,
      maxFiles: 5,
      overrideSendResponse: false, // This is necessary for nest.js/koa.js
    }),
  );
  const {PORT}=process.env
  await app.listen(PORT,()=>{
    console.log(`server Run => http://localhost:${PORT}`);
    console.log(`GraphQl run => http://localhost:${PORT}/graphql`);
    
  });
}
bootstrap();
