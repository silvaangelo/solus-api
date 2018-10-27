import { IMutant } from './IMutant';

export interface IMutator {
  setMutant(mutant: IMutant);
  mutate(value: number): number;
}
