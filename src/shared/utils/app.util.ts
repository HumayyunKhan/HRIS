import * as _ from 'lodash';

export class AppUtil {
  public static isNumber(field): boolean {
    if (field === null || field === undefined || field.toString() === 'NaN') {
      return false;
    }

    return _.isNumber(field);
  }
}
