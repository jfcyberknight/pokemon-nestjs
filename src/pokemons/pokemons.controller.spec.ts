import { PaginatedDto } from '../dto/paginated.dto';
import { PokemonDto } from './pokemon.dto';
import { PokemonsController } from './pokemons.controller';
import { PokemonsService } from './pokemons.service';

describe('PokemonsController', () => {
  let pokemonsController: PokemonsController;
  let pokemonsService: PokemonsService;
  let paginatedDto = new PaginatedDto<PokemonDto>();

  beforeEach(() => {
    pokemonsService = new PokemonsService();
    pokemonsController = new PokemonsController(pokemonsService);
    paginatedDto = new PaginatedDto<PokemonDto>();
  });

  describe('findAll', () => {
    it('should return an array of pokemons', async () => {
      paginatedDto.limit = 2;
      paginatedDto.offset = 0;
      paginatedDto.results = [
        {
          Id: 1,
          Name: 'Bulbasaur',
          Type1: 'Grass',
          Type2: 'Poison',
          Total: 318,
          Hp: 45,
          Attack: 49,
          Defense: 49,
          SpAtk: 65,
          SpDef: 65,
          Speed: 45,
          Generation: 1,
          Legendary: false,
        },
        {
          Id: 2,
          Name: 'Ivysaur',
          Type1: 'Grass',
          Type2: 'Poison',
          Total: 405,
          Hp: 60,
          Attack: 62,
          Defense: 63,
          SpAtk: 80,
          SpDef: 80,
          Speed: 60,
          Generation: 1,
          Legendary: false,
        },
      ];

      jest
        .spyOn(pokemonsService, 'findAll')
        .mockImplementation(() => paginatedDto);

      expect(await pokemonsController.findAll(0, 0)).toBe(paginatedDto);
    });
  });
});
