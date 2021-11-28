/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
import { Injectable } from '@nestjs/common';
import { PaginatedModel } from '../../core/services/paginated.model';
import { PokemonEntityFactory } from './pokemon.entity.factory';
import { PokemonModel } from '../services/models/pokemon.model';
import { PokemonModelFactory } from '../services/models/pokemon.model.factory';
import { PokemonsEntityGuardService } from './pokemons.entity.guard.service';
import * as pokemons from './pokemons.json';
@Injectable()
export class PokemonRepository {
  pokemonList = [];
  constructor() {
    console.log(pokemons.results[0]);
    this.pokemonList = pokemons.results;
  }
  create(pokemonModel: PokemonModel): PokemonModel {
    const pokemonEntity = PokemonEntityFactory.create(pokemonModel);
    PokemonsEntityGuardService.AgainstBadSchema(pokemonEntity);
    PokemonsEntityGuardService.AgainstAlreadyExistsInList(
      pokemonEntity,
      this.pokemonList,
    );
    this.pokemonList.push(pokemonEntity);
    return PokemonModelFactory.create(pokemonEntity);
  }

  findAll(limit: number, offset: number) {
    const paginatedModel = new PaginatedModel<PokemonModel>();
    paginatedModel.limit = limit;
    paginatedModel.offset = offset;

    paginatedModel.results = this.pokemonList
      .slice(paginatedModel.offset, paginatedModel.limit)
      .map((pokemonEntity) => {
        return PokemonModelFactory.create(pokemonEntity);
      });

    paginatedModel.total = this.pokemonList.length;

    return paginatedModel;
  }

  findOne(id: number) {
    return this.pokemonList
      .filter((pokemonEntity) => {
        return pokemonEntity['#'] === id;
      })
      .map((pokemon) => {
        return PokemonModelFactory.create(pokemon);
      });
  }

  update(newPokemonModel: PokemonModel, pokemonFound: PokemonModel) {
    const index = _.findIndex(
      this.pokemonList,
      PokemonEntityFactory.create(pokemonFound),
    );

    const pokemonEntity = this.pokemonList
      .splice(index, 1, newPokemonModel)
      .map((pokemonEntity) => {
        return PokemonModelFactory.create(pokemonEntity);
      });
    PokemonsEntityGuardService.AgainstBadSchema(pokemonEntity[0]);

    return pokemonEntity;
  }

  remove(pokemonToRemove: PokemonModel) {
    if (pokemonToRemove) {
      _.remove(this.pokemonList, (pokemonEntity) => {
        return pokemonEntity['#'] === pokemonToRemove.Id;
      });
      return 'Ressource deleted succesfully';
    }
  }
}
