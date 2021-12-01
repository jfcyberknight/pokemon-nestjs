import { PokemonEntity } from './pokemon.entity';
import { PokemonModel } from '../services/models/pokemon.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PokemonEntityFactory {
  static create(pokemonModel: PokemonModel): PokemonEntity {
    const pokemonEntity = new PokemonEntity();
    pokemonEntity.Id = pokemonModel.Id || Math.floor(Math.random() * 100) + 800;
    pokemonEntity.Name = pokemonModel.Name;
    pokemonEntity.Type1 = pokemonModel.Type1;
    pokemonEntity.Type2 = pokemonModel.Type2;
    pokemonEntity.Total = pokemonModel.Total;
    pokemonEntity.Hp = pokemonModel.Hp;
    pokemonEntity.Attack = pokemonModel.Attack;
    pokemonEntity.Defense = pokemonModel.Defense;
    pokemonEntity.SpAtk = pokemonModel.SpAtk;
    pokemonEntity.SpDef = pokemonModel.SpDef;
    pokemonEntity.Speed = pokemonModel.Speed;
    pokemonEntity.Generation = pokemonModel.Generation;
    pokemonEntity.Legendary = pokemonModel.Legendary;
    return pokemonEntity;
  }
}
