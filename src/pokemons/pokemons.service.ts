import { ConsoleLogger, Injectable } from '@nestjs/common';
import { CreatePokemonDto } from './create-pokemon.dto';
import { UpdatePokemonDto } from './update-pokemon.dto';
import CsvService from '../services/CsvService';
import { PaginatedDto } from 'src/dto/PaginatedDto';
import { PokemonDto } from './pokemon.dto';
import Guard from 'src/guard/Guard';
import _ from 'underscore';

const dataPath = './src/pokemons/pokemons.csv';
const csvService = new CsvService(dataPath);
if (csvService.allLines.length === 0) {
  console.log('Read called');
  csvService.read();
}

@Injectable()
export class PokemonsService {
  create(createPokemonDto: CreatePokemonDto) {
    return 'This action adds a new pokemon';
  }

  findAll(limit: number, offset: number) {
    const paginatedDto = new PaginatedDto<PokemonDto>();
    paginatedDto.limit = Guard.AgainstNegativeValueOrZero(limit);
    paginatedDto.offset = Guard.AgainstNegativeValueOrZero(offset) - 1;

    Guard.AgainstFirstValueGreaterThanSecondValue(
      paginatedDto.limit,
      paginatedDto.offset,
    );

    paginatedDto.results = csvService.allLines.slice(
      paginatedDto.offset,
      paginatedDto.limit,
    );

    paginatedDto.total = _.uniq(csvService.allLines, true).length;

    return paginatedDto;
  }

  findOne(id: number) {
    const val = Guard.AgainstNegativeValueOrZero(id);
    return csvService.allLines.filter((pokemon) => {
      return pokemon['#'] === val;
    });
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
