import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PokemonDto } from 'src/pokemons/controller/dto/pokemon.dto';
import { PokemonDtoFactory } from './dto/pokemon.dto.factory';
import { PokemonsService } from '../services/pokemons.service';

@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Post()
  create(@Body() pokemonDto: PokemonDto) {
    return PokemonDtoFactory.create(this.pokemonsService.create(pokemonDto));
  }

  @Get(':limit/:offset')
  findAll(@Param('limit') limit: number, @Param('offset') offset: number) {
    return this.pokemonsService.findAll(limit, offset);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    const pokemonModel = this.pokemonsService.findOne(id);
    if (pokemonModel) return PokemonDtoFactory.create(pokemonModel[0]);
    return [];
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() pokemonDto: PokemonDto) {
    const pokemonModel = this.pokemonsService.update(id, pokemonDto);
    if (pokemonModel) return PokemonDtoFactory.create(pokemonModel[0]);
    return null;
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.pokemonsService.remove(id);
  }
}
