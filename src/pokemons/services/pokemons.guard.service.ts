import { PokemonEntity } from '../repository/pokemon.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PokemonSchema } from '../repository/pokemon.schema';

@Injectable()
export class PokemonsGuardService {
  static AgainstBadSchema(pokemonEntity: PokemonEntity) {
    const pokemonSchema = new PokemonSchema();
    const schemaValidation = pokemonSchema.schema.validate(pokemonEntity);
    if (schemaValidation.error) {
      throw new BadRequestException(`[pokemonEntity] must be valid`);
    }
  }
}
