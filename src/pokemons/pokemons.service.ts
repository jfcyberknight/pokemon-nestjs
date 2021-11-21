/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
import { Injectable } from '@nestjs/common';
import { PaginatedDto } from '../dto/paginated.dto';
import { PokemonDto } from './pokemon.dto';
import { PokemonFactory } from './pokemon.factory';
import { pokemonSchema } from './pokemon.schema';
import Guard from '../guard/guard';
const Fs = require('fs');
const CsvReadableStream = require('csv-reader');

@Injectable()
export class PokemonsService {
  pokemonList = [];
  constructor() {
    const inputFile = './src/pokemons/pokemons.csv';
    const inputStream = Fs.createReadStream(inputFile, 'utf8');
    const that = this;
    inputStream
      .pipe(
        new CsvReadableStream({
          parseNumbers: true,
          parseBooleans: true,
          trim: true,
          skipHeader: true,
          asObject: true,
        }),
      )
      .on('data', function (row) {
        const pokemonDto = PokemonFactory.create(row);
        that.pokemonList.push(pokemonDto);
      });
  }

  create(pokemonDto: PokemonDto) {
    const pokemonDto2 = PokemonFactory.create(pokemonDto);
    Guard.AgainstAlreadyExistsInList(
      pokemonDto2,
      'pokemonDto',
      this.pokemonList,
    );
    Guard.AgainstBadSchema(pokemonDto2, 'pokemonDto', pokemonSchema);
    this.pokemonList.push(pokemonDto2);

    return pokemonDto2;
  }

  findAll(limit: number, offset: number) {
    const paginatedDto = new PaginatedDto<PokemonDto>();
    paginatedDto.limit = Guard.AgainstNegativeValueOrZero(limit, 'limit');
    paginatedDto.offset = Guard.AgainstNegativeValue(offset, 'offset');

    Guard.AgainstFirstValueGreaterThanSecondValue(
      paginatedDto.limit,
      'limit',
      paginatedDto.offset,
      'offset',
    );

    paginatedDto.results = this.pokemonList
      .slice(paginatedDto.offset, paginatedDto.limit)
      .map((pokemon) => {
        return PokemonFactory.create(pokemon);
      });

    paginatedDto.total = this.pokemonList.length;

    return paginatedDto;
  }

  findOne(id: number) {
    const val = Guard.AgainstNegativeValueOrZero(id, 'id');
    return this.pokemonList
      .filter((pokemon) => {
        return pokemon['#'] === val || pokemon.Id === val;
      })
      .map((pokemon) => {
        return PokemonFactory.create(pokemon);
      });
  }

  update(id: number, newPokemonDto: PokemonDto) {
    Guard.AgainstBadSchema(newPokemonDto, 'newPokemonDto', pokemonSchema);
    const pokemonFound = this.findOne(id);
    const index = _.findIndex(this.pokemonList, pokemonFound[0]);

    // Replace item at index using native splice
    const oldPokemonDto = this.pokemonList
      .splice(index, 1, newPokemonDto)
      .map((pokemon) => {
        return PokemonFactory.create(pokemon);
      });
    return {
      old: oldPokemonDto,
      new: newPokemonDto,
    };
  }

  remove(id: number) {
    const pokemonToRemove = this.findOne(id);

    if (pokemonToRemove[0]) {
      _.remove(this.pokemonList, (pokemon) => {
        return pokemon.Id === pokemonToRemove[0].Id;
      });
      return 'Ressource deleted succesfully';
    }
  }
}
