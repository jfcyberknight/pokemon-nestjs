// import { BadRequestException } from '@nestjs/common';
// import { pokemonSchema } from '../../pokemons/repository/validation-schema/pokemon.schema';
// import { GuardServices } from './guard-services';
// describe('GuardServices', () => {
//   describe('AgainstBadSchema', () => {
//     it('should throws an error', () => {
//       try {
//         GuardServices.AgainstBadSchema({}, 'TestDto', pokemonSchema);
//       } catch (error) {
//         expect(error).toBeInstanceOf(BadRequestException);
//         expect(error.message).toEqual('Dto [TestDto] must be valid');
//       }
//     });

//     it('should be ok', () => {
//       try {
//         GuardServices.AgainstBadSchema(
//           {
//             Id: 1,
//             Name: 'Bulbasaur',
//             Type1: 'Grass',
//             Type2: 'Poison',
//             Total: 318,
//             Hp: 45,
//             Attack: 49,
//             Defense: 49,
//             SpAtk: 65,
//             SpDef: 65,
//             Speed: 45,
//             Generation: 1,
//             Legendary: true,
//           },
//           'TestDto',
//           pokemonSchema,
//         );
//       } catch (error) {
//         expect(error).toBeUndefined();
//       }
//     });
//   });

//   describe('AgainstFirstValueGreaterThanSecondValue', () => {
//     it('should throws an error', () => {
//       try {
//         GuardServices.AgainstFirstValueGreaterThanSecondValue(
//           1,
//           'value1',
//           2,
//           'value2',
//         );
//       } catch (error) {
//         expect(error).toBeInstanceOf(BadRequestException);
//         expect(error.message).toEqual(
//           'First value [value1] must be greater than second value [value2]',
//         );
//       }
//     });

//     it('should be ok', () => {
//       try {
//         GuardServices.AgainstFirstValueGreaterThanSecondValue(
//           1,
//           'value1',
//           0,
//           'value2',
//         );
//       } catch (error) {
//         expect(error).toBeUndefined();
//       }
//     });
//   });

//   describe('AgainstNegativeValue', () => {
//     it('should throws an error', () => {
//       try {
//         GuardServices.AgainstNegativeValue(-1, 'value1');
//       } catch (error) {
//         expect(error).toBeInstanceOf(BadRequestException);
//         expect(error.message).toEqual('Value [value1] must be greater than -1');
//       }
//     });

//     it('should be ok', () => {
//       try {
//         GuardServices.AgainstNegativeValue(0, 'value1');
//       } catch (error) {
//         expect(error).toBeUndefined();
//       }
//     });
//   });
// });
