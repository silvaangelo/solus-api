import { IMutant } from '../interfaces/IMutant';
import RainfallMutant from '../measureMutators/RainfallMutant';
import LightIntensityMutant from '../measureMutators/LightIntensityMutant';
import NaturalMutant from '../measureMutators/NaturalMutant';

export default class MutantFactory {
  public static getMutant(property: string): IMutant {
    if (property == 'rainfall') {
      return new RainfallMutant();
    }

    if (property == 'lightIntensity') {
      return new LightIntensityMutant();
    }

    return new NaturalMutant();
  }
}