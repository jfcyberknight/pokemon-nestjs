import { PokemonEntity } from './pokemon.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import _ from 'lodash';
import { PokemonSchema } from './pokemon.schema';

@Injectable()
export class PokemonsEntityGuardService {
  static AgainstBadSchema(pokemonEntity: PokemonEntity) {
    const pokemonSchema = new PokemonSchema();
    const schemaValidation = pokemonSchema.schema.validate(pokemonEntity);
    if (schemaValidation.error) {
      throw new BadRequestException(`[pokemonEntity] must be valid`);
    }
  }
  static AgainstAlreadyExistsInList(
    pokemonEntity: PokemonEntity,
    list: PokemonEntity[],
  ) {
    if (_.findIndex(list, pokemonEntity) !== -1) {
      throw new BadRequestException(`[pokemonEntity] already exists`);
    }
  }
}
