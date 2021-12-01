import { Injectable } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Joi = require('joi');

@Injectable()
export class PokemonSchema {
  schema = Joi.object({
    Id: Joi.number().required(),
    Name: Joi.string().required(),
    Type1: Joi.string().required(),
    Type2: Joi.string().required(),
    Total: Joi.number().required(),
    Hp: Joi.number().required(),
    Attack: Joi.number().required(),
    Defense: Joi.number().required(),
    SpAtk: Joi.number().required(),
    SpDef: Joi.number().required(),
    Speed: Joi.number().required(),
    Generation: Joi.number().required(),
    Legendary: Joi.bool().required(),
  }).options({ stripUnknown: true });
}
