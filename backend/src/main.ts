import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3001', // Allow only your frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  const config = new DocumentBuilder()
    .setTitle('API Docs')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  console.log("1");
  SwaggerModule.setup('api-docs', app, document);
  console.log("ok");

  // Call listen only once
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  console.log(`Application is running on http://localhost:${PORT}`);
}
bootstrap();

