import { Injectable } from '@nestjs/common';

@Injectable()
export class PokemonModel {
  Id: number;

  Name: string;

  Type1: string;

  Type2: string;

  Total: number;

  Hp: number;

  Attack: number;

  Defense: number;

  SpAtk: number;

  SpDef: number;

  Speed: number;

  Generation: number;

  Legendary: boolean;
}
