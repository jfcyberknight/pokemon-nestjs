/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
import { Injectable } from '@nestjs/common';
import { PaginatedDto } from 'src/dto/PaginatedDto';
import { PokemonDto } from './pokemon.dto';
import { PokemonSchema } from './PokemonSchema';
import CsvService from '../services/CsvService';
import Guard from 'src/guard/Guard';

const dataPath = './src/pokemons/pokemons.csv';
const csvService = new CsvService(dataPath);
if (csvService.allLines.length === 0) {
  csvService.read();
}
@Injectable()
export class PokemonsService {
  create(pokemonDto: PokemonDto) {
    Guard.AgainstAlreadyExistsInList(
      pokemonDto,
      'pokemonDto',
      csvService.allLines,
    );
    Guard.AgainstBadSchema(pokemonDto, 'pokemonDto', PokemonSchema);
    return csvService.allLines.push(pokemonDto);
  }

  findAll(limit: number, offset: number) {
    const paginatedDto = new PaginatedDto<PokemonDto>();
    paginatedDto.limit = Guard.AgainstNegativeValueOrZero(limit, 'limit');
    paginatedDto.offset = Guard.AgainstNegativeValueOrZero(offset, 'offset');

    Guard.AgainstFirstValueGreaterThanSecondValue(
      paginatedDto.limit,
      'limit',
      paginatedDto.offset,
      'offset',
    );

    paginatedDto.results = csvService.allLines.slice(
      paginatedDto.offset,
      paginatedDto.limit,
    );

    paginatedDto.total = csvService.allLines.length;

    return paginatedDto;
  }

  findOne(id: number) {
    const val = Guard.AgainstNegativeValueOrZero(id, 'id');
    return csvService.allLines.filter((pokemon) => {
      return pokemon['#'] === val;
    });
  }

  update(id: number, newPokemonDto: PokemonDto) {
    Guard.AgainstBadSchema(newPokemonDto, 'newPokemonDto', PokemonSchema);
    const pokemonFound = this.findOne(id);
    const index = _.findIndex(csvService.allLines, pokemonFound[0]);

    // Replace item at index using native splice
    const oldPokemonDto = csvService.allLines.splice(index, 1, newPokemonDto);
    return {
      old: oldPokemonDto,
      new: newPokemonDto,
    };
  }

  remove(id: number) {
    const pokemonToRemove = this.findOne(id);

    if (pokemonToRemove[0]) {
      _.remove(csvService.allLines, (pokemon) => {
        return pokemon['#'] === pokemonToRemove[0]['#'];
      });
      return 'Ressource deleted succesfully';
    }
  }
}
