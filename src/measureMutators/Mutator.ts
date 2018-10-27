import { IMutant } from "../interfaces/IMutant";
import { IMutator } from '../interfaces/IMutator';

export default class Mutator implements IMutator {
  private mutant;
  
  public setMutant(mutant: IMutant) {
    this.mutant = mutant;
  }
  
  public mutate(value: number): number {
    return this.mutant.modifier(value);
  }
}
