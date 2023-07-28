import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const enableSwaggerConfig = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Correios')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
};
