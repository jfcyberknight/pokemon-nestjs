import { Injectable } from '@nestjs/common';
import { PokemonEntity } from '../../repository/pokemon.entity';
import { PokemonModel } from './pokemon.model';

@Injectable()
export class PokemonModelFactory {
  static create(pokemonEntity: PokemonEntity): PokemonModel {
    const pokemonModel = new PokemonModel();
    pokemonModel.Id = pokemonEntity.Id;
    pokemonModel.Name = pokemonEntity.Name;
    pokemonModel.Type1 = pokemonEntity.Type1;
    pokemonModel.Type2 = pokemonEntity.Type2;
    pokemonModel.Total = pokemonEntity.Total;
    pokemonModel.Hp = pokemonEntity.Hp;
    pokemonModel.Attack = pokemonEntity.Attack;
    pokemonModel.Defense = pokemonEntity.Defense;
    pokemonModel.SpAtk = pokemonEntity.SpAtk;
    pokemonModel.SpDef = pokemonEntity.SpDef;
    pokemonModel.Speed = pokemonEntity.Speed;
    pokemonModel.Generation = pokemonEntity.Generation;
    pokemonModel.Legendary = pokemonEntity.Legendary;
    return pokemonModel;
  }
}
