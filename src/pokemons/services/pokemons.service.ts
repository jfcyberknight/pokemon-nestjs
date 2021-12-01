/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-var-requires */
import { GuardServices } from '../../core/services/guard-services';
import { Injectable } from '@nestjs/common';
import { PokemonModel } from './models/pokemon.model';
import { PokemonRepository } from './../repository/pokemon.repository';

@Injectable()
export class PokemonsService {
  constructor(private pokemonRepository: PokemonRepository) {}

  create(pokemonModel: PokemonModel): PokemonModel {
    const pokemonCreated = this.pokemonRepository.create(pokemonModel);
    return pokemonCreated;
  }

  findAll(limit: number, offset: number) {
    const validLimit = GuardServices.AgainstNegativeValueOrZero(limit, 'limit');
    const validOffset = GuardServices.AgainstNegativeValue(offset, 'offset');
    return this.pokemonRepository.findAll(validLimit, validOffset);
  }

  findOne(id: number) {
    const val = GuardServices.AgainstNegativeValueOrZero(id, 'id');
    return this.pokemonRepository.findOne(val);
  }

  update(id: number, newPokemonModel: PokemonModel) {
    const val = GuardServices.AgainstNegativeValueOrZero(id, 'id');
    const pokemonFound = this.findOne(val)[0];
    const pokemonUpdated = this.pokemonRepository.update(
      newPokemonModel,
      pokemonFound,
    );

    return pokemonUpdated;
  }

  remove(id: number) {
    const val = GuardServices.AgainstNegativeValueOrZero(id, 'id');
    const pokemonFound = this.findOne(val)[0];
    return this.pokemonRepository.remove(pokemonFound);
  }
}
