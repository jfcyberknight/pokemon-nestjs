import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PokemonDto } from './pokemon.dto';
import { PokemonsService } from './pokemons.service';

@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Post()
  create(@Body() pokemonDto: PokemonDto) {
    return this.pokemonsService.create(pokemonDto);
  }

  @Get(':limit/:offset')
  findAll(@Param('limit') limit: number, @Param('offset') offset: number) {
    return this.pokemonsService.findAll(limit, offset);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.pokemonsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() pokemonDto: PokemonDto) {
    return this.pokemonsService.update(id, pokemonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.pokemonsService.remove(id);
  }
}
