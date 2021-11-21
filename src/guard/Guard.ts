/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-var */
import { BadRequestException } from '@nestjs/common/exceptions';
var _ = require('lodash');
export default class Guard {
  static AgainstNegativeValueOrZero(value: any, valueNameOf: string): number {
    const val = this.AgainstNegativeValue(value, valueNameOf);
    if (val <= 0) {
      throw new BadRequestException(
        `Value [${valueNameOf}] must be greater than 0`,
      );
    }
    return val;
  }

  static AgainstNegativeValue(value: any, valueNameOf: string): number {
    const val = parseInt(value);
    if (val < 0) {
      throw new BadRequestException(
        `Value [${valueNameOf}] must be greater than -1`,
      );
    }
    return val;
  }

  static AgainstFirstValueGreaterThanSecondValue(
    value: any,
    firstValueNameOf: string,
    secondValue: any,
    secondValueNameOf: string,
  ) {
    const val = parseInt(value);
    const secondVal = parseInt(secondValue);

    if (val <= secondVal) {
      throw new BadRequestException(
        `First value [${firstValueNameOf}] must be greater than second value [${secondValueNameOf}]`,
      );
    }
  }

  static AgainstAlreadyExistsInList(
    value: any,
    valueNameOf: string,
    list: Array<any>,
  ) {
    if (_.findIndex(list, value)) {
      throw new BadRequestException(`Element [${valueNameOf}] already exists`);
    }
  }

  static AgainstBadSchema(dto: any, dtoNameOf: string, schema: any) {
    const schemaValidation = schema.validate(dto);
    if (schemaValidation.error) {
      throw new BadRequestException(`Dto [${dtoNameOf}] must be valid`);
    }
  }
}
