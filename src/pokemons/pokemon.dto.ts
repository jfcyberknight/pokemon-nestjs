import { ApiProperty } from '@nestjs/swagger';

export class PokemonDto {
  @ApiProperty()
  Name: string;

  @ApiProperty()
  Type1: number;

  @ApiProperty()
  Type2: string;

  @ApiProperty()
  Total: number;

  @ApiProperty()
  Hp: number;

  @ApiProperty()
  Attack: number;

  @ApiProperty()
  Defense: number;

  @ApiProperty()
  SpAtk: number;

  @ApiProperty()
  SpDef: number;

  @ApiProperty()
  Speed: number;

  @ApiProperty()
  Generation: number;

  @ApiProperty()
  Legendary: boolean;
}
