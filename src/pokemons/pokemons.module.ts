import { Module } from '@nestjs/common';
import { PaginatedModel } from '../core/services/paginated.model';
import { PokemonEntityFactory } from './repository/pokemon.entity.factory';
import { PokemonModel } from './services/pokemon.model';
import { PokemonModelFactory } from './services/pokemon.model.factory';
import { PokemonRepository } from './repository/pokemon.repository';
import { PokemonsController } from './controller/pokemons.controller';
import { PokemonsGuardService } from './services/pokemons.guard.service';
import { PokemonsService } from './services/pokemons.service';

@Module({
  controllers: [PokemonsController],
  providers: [
    PokemonsService,
    PokemonRepository,
    PokemonsGuardService,
    PokemonModel,
    PokemonModelFactory,
    PaginatedModel,
    PokemonEntityFactory,
  ],
})
export class PokemonsModule {}
