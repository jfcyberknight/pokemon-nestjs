import { PokemonDto } from './pokemon.dto';

export class PokemonFactory {
  static create(pokemon: any): PokemonDto {
    const pokemonDto = new PokemonDto();
    //console.log("pokemon['#']:", pokemon['#']);
    pokemonDto.Id = pokemon['#'] || pokemon.Id;
    //console.log("pokemon['Name']:", pokemon['Name']);
    pokemonDto.Name = pokemon['Name'] || pokemon.Name;
    //console.log("pokemon['Type 1']:", pokemon['Type 1']);
    pokemonDto.Type1 = pokemon['Type 1'] || pokemon.Type1;
    //console.log("pokemon['Type 2']:", pokemon['Type 2']);
    pokemonDto.Type2 = pokemon['Type 2'] || pokemon.Type2;
    //console.log("pokemon['Total']:", pokemon['Total']);
    pokemonDto.Total = pokemon['Total'] || pokemon.Total;
    //console.log("pokemon['HP']:", pokemon['HP']);
    pokemonDto.Hp = pokemon['HP'] || pokemon.Hp;
    //console.log("pokemon['Attack']:", pokemon['Attack']);
    pokemonDto.Attack = pokemon['Attack'] || pokemon.Attack;
    //console.log("pokemon['Defense']:", pokemon['Defense']);
    pokemonDto.Defense = pokemon['Defense'] || pokemon.Defense;
    //console.log("pokemon['Sp. Atk']:", pokemon['Sp. Atk']);
    pokemonDto.SpAtk = pokemon['Sp. Atk'] || pokemon.SpAtk;
    //console.log("pokemon['Sp. Def']:", pokemon['Sp. Def']);
    pokemonDto.SpDef = pokemon['Sp. Def'] || pokemon.SpDef;
    //console.log("pokemon['Speed']:", pokemon['Speed']);
    pokemonDto.Speed = pokemon['Speed'] || pokemon.Speed;
    //console.log("pokemon['Generation']:", pokemon['Generation']);
    pokemonDto.Generation = pokemon['Generation'] || pokemon.Generation;
    //console.log("pokemon['Legendary']:", pokemon['Legendary']);
    pokemonDto.Legendary = Boolean(pokemon['Legendary']) || pokemon.Legendary;
    //console.log('===============================================');
    return pokemonDto;
  }
}
