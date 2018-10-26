import { IMutant } from '../interfaces/IMutant';

export default class NaturalMutant implements IMutant {
  public modifier(value: number): number {
    return value;
  }
}
