import { IMutant } from '../interfaces/IMutant';

export default class LightIntensityMutant implements IMutant {
  private static max = 1024;

  public modifier(value: number): number {
    if (value >= LightIntensityMutant.max) {
      return 0;
    }
    
    return LightIntensityMutant.max - value;
  }
}
