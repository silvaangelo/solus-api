import { IMutant } from '../interfaces/IMutant';

export default class RainfallMutant implements IMutant {
  private static max = 1024;

  public modifier(value: number): number {
    if (value >= RainfallMutant.max) {
      return 0;
    }

    return ((RainfallMutant.max - value) / RainfallMutant.max) * 100;
  }
}
