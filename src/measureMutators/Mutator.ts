import { IMutant } from "../interfaces/IMutant";
import { IMutator } from '../interfaces/IMutator';

export default class Mutator implements IMutator {
  public mutate(mutant: IMutant, value: number): number {
    return mutant.modifier(value);
  }
}
