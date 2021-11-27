import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonsModule } from './pokemons/pokemons.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [PokemonsModule, CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
