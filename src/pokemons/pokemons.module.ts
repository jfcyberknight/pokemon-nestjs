import { Module } from '@nestjs/common';
import { PaginatedModel } from '../core/services/paginated.model';
import { PokemonEntityFactory } from './repository/pokemon.entity.factory';
import { PokemonModel } from './services/models/pokemon.model';
import { PokemonModelFactory } from './services/models/pokemon.model.factory';
import { PokemonRepository } from './repository/pokemon.repository';
import { PokemonsController } from './controller/pokemons.controller';
import { PokemonsService } from './services/pokemons.service';
import { PokemonsEntityGuardService } from './repository/pokemons.entity.guard.service';

@Module({
  controllers: [PokemonsController],
  providers: [
    PokemonsService,
    PokemonRepository,
    PokemonModel,
    PokemonModelFactory,
    PaginatedModel,
    PokemonEntityFactory,
    PokemonsEntityGuardService,
  ],
})
export class PokemonsModule {}
