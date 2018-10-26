import { IMutant } from './IMutant';

export interface IMutator {
  mutate(mutator: IMutant, value: number): number;
}
