import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: ['http://localhost:5000', 'https://roblox-image-generator.vercel.app'],
    methods: ['GET', 'POST', 'DELETE', 'PUT', '*'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // Set up Swagger
  const config = new DocumentBuilder()
    .setTitle('Images API')
    .setDescription('The images API description')
    .setVersion('1.0')
    .addTag('images')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  await app.listen(3007);
}
void bootstrap();