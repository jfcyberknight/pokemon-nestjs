import { PokemonDto } from './pokemon.dto';
import { Injectable } from '@nestjs/common';
import { PokemonModel } from 'src/pokemons/services/pokemon.model';

@Injectable()
export class PokemonDtoFactory {
  static create(pokemonModel: PokemonModel): PokemonDto {
    const pokemonDto = new PokemonDto();
    pokemonDto.Id = pokemonModel.Id;
    pokemonDto.Name = pokemonModel.Name;
    pokemonDto.Type1 = pokemonModel.Type1;
    pokemonDto.Type2 = pokemonModel.Type2;
    pokemonDto.Total = pokemonModel.Total;
    pokemonDto.Hp = pokemonModel.Hp;
    pokemonDto.Attack = pokemonModel.Attack;
    pokemonDto.Defense = pokemonModel.Defense;
    pokemonDto.SpAtk = pokemonModel.SpAtk;
    pokemonDto.SpDef = pokemonModel.SpDef;
    pokemonDto.Speed = pokemonModel.Speed;
    pokemonDto.Generation = pokemonModel.Generation;
    pokemonDto.Legendary = pokemonModel.Legendary;
    return pokemonDto;
  }
}
