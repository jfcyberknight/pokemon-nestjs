import { PokemonEntity } from './pokemon.entity';
import { PokemonModel } from '../services/models/pokemon.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PokemonEntityFactory {
  static createFromCsv(row: any): PokemonEntity {
    const pokemonEntity = new PokemonEntity();
    pokemonEntity['#'] = row['#'];
    pokemonEntity['Name'] = row['Name'];
    pokemonEntity['Type 1'] = row['Type 1'];
    pokemonEntity['Type 2'] = row['Type 2'];
    pokemonEntity['Total'] = row['Total'];
    pokemonEntity['HP'] = row['HP'];
    pokemonEntity['Attack'] = row['Attack'];
    pokemonEntity['Defense'] = row['Defense'];
    pokemonEntity['Sp. Atk'] = row['Sp. Atk'];
    pokemonEntity['Sp. Def'] = row['Sp. Def'];
    pokemonEntity['Speed'] = row['Speed'];
    pokemonEntity['Generation'] = row['Generation'];
    pokemonEntity['Legendary'] = row['Legendary'];
    return pokemonEntity;
  }
  static create(pokemonModel: PokemonModel): PokemonEntity {
    const pokemonEntity = new PokemonEntity();
    pokemonEntity['#'] = pokemonModel.Id;
    pokemonEntity['Name'] = pokemonModel.Name;
    pokemonEntity['Type 1'] = pokemonModel.Type1;
    pokemonEntity['Type 2'] = pokemonModel.Type2;
    pokemonEntity['Total'] = pokemonModel.Total;
    pokemonEntity['HP'] = pokemonModel.Hp;
    pokemonEntity['Attack'] = pokemonModel.Attack;
    pokemonEntity['Defense'] = pokemonModel.Defense;
    pokemonEntity['Sp. Atk'] = pokemonModel.SpAtk;
    pokemonEntity['Sp. Def'] = pokemonModel.SpDef;
    pokemonEntity['Speed'] = pokemonModel.Speed;
    pokemonEntity['Generation'] = pokemonModel.Generation;
    pokemonEntity['Legendary'] = pokemonModel.Legendary;
    return pokemonEntity;
  }
}
