import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
@Injectable()
export class GuardServices {
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
}
