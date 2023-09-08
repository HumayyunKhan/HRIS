import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import * as helmet from 'helmet';
import { CONSTANTS } from './app.constants';
import { AppModule } from './app.module';
import { RequestIdMiddleware } from './core';
// import { setupLogger } from './logger';
import * as bodyParser from 'body-parser';

import { ValidationFailedException, constructErrorResponse } from './shared';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: setupLogger(),
  });

  app.setGlobalPrefix(CONSTANTS.API_VERSION);

  app.use(bodyParser.json({
    limit: '50mb'
  }));

  const configService = app.get(ConfigService);
  const environment = configService.get<string>('NODE_ENV');

  if (environment === CONSTANTS.ENVIRONMENT.PRODUCTION) {
    app.use(helmet());
  }

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });

  app.use(RequestIdMiddleware);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        // return constructErrorResponse(validationErrors)
        console.log("----------------------------------")
        console.log("----------------------------------")
        console.log("----------------------------------")
        console.log("----------------------------------")
        console.log("----------------------------------")
        return new ValidationFailedException(validationErrors);
      },
    })
  );
  /** Swagger configuration */ 
  // setupSwagger(app);

  const port = configService.get<number>('port');
  await app.listen(port);
  console.log('\n\n-------------------------------------------------------------------');
  console.log(`   Environment :  ${environment}`);
  console.log(`   PORT        :  http://localhost:${port} `);
  console.log('-------------------------------------------------------------------');
}
bootstrap();
