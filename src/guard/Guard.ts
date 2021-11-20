import { BadRequestException } from '@nestjs/common/exceptions';

export default class Guard {
  static AgainstNegativeValueOrZero(value: any): number {
    const val = this.AgainstNegativeValue(value);
    if (val <= 0) {
      throw new BadRequestException('Value must be greater than 0');
    }
    return val;
  }

  static AgainstNegativeValue(value: any): number {
    const val = parseInt(value);
    if (val < 0) {
      throw new BadRequestException('Value must be greater than -1');
    }
    return val;
  }

  static AgainstFirstValueGreaterThanSecondValue(value: any, secondValue: any) {
    const val = parseInt(value);
    const secondVal = parseInt(secondValue);

    if (val <= secondVal) {
      throw new BadRequestException(
        'First value must be greater than second value',
      );
    }
  }
}
