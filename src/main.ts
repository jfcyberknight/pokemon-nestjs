import { NestFactory } from '@nestjs/core';
import { PokemonsModule } from './pokemons/pokemons.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(PokemonsModule);

  const config = new DocumentBuilder()
    .setTitle('Pokemons API')
    .setDescription('Listing all your pokemons')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
