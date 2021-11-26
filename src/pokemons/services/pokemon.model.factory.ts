import { Injectable } from '@nestjs/common';
import { PokemonEntity } from '../repository/pokemon.entity';
import { PokemonModel } from './pokemon.model';

@Injectable()
export class PokemonModelFactory {
  static create(pokemonEntity: PokemonEntity): PokemonModel {
    const pokemonModel = new PokemonModel();
    pokemonModel.Id = pokemonEntity['#'];
    pokemonModel.Name = pokemonEntity['Name'];
    pokemonModel.Type1 = pokemonEntity['Type 1'];
    pokemonModel.Type2 = pokemonEntity['Type 2'];
    pokemonModel.Total = pokemonEntity['Total'];
    pokemonModel.Hp = pokemonEntity['HP'];
    pokemonModel.Attack = pokemonEntity['Attack'];
    pokemonModel.Defense = pokemonEntity['Defense'];
    pokemonModel.SpAtk = pokemonEntity['Sp. Atk'];
    pokemonModel.SpDef = pokemonEntity['Sp. Def'];
    pokemonModel.Speed = pokemonEntity['Speed'];
    pokemonModel.Generation = pokemonEntity['Generation'];
    pokemonModel.Legendary = pokemonEntity['Legendary'];
    return pokemonModel;
  }
}
