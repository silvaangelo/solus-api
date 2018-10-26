import { Measure } from '../models/Measure';

export const getMillisecondsFrom = (interval: string) => {
  const cleanedInterval = interval.toLocaleLowerCase()

  const bigMeasuresAsMiliseconds = {
    y: 31536000000,
    m: 2678400000,
    w: 604800000,
    d: 86400000,
    h: 3600000,
    i: 60000,
    s: 1000
  }

  return Number.parseInt(cleanedInterval.slice(0, -1)) * bigMeasuresAsMiliseconds[cleanedInterval.slice(-1)]
}

export const findWhereArduinoAndRangeWithProjectAndSort = (arduinoId: string, from: Date, to: Date, project: object, sort: object) => Measure.findOne({arduino: arduinoId, createdAt: {$gte: from, $lt: to, }}, project).sort(sort);

export const getMin = async (arduinoId: string, from: Date, to: Date) => {  
  const data = await Promise.all([
    findWhereArduinoAndRangeWithProjectAndSort(arduinoId, from, to, {uvRay: 1}, {uvRay: +1}),
    findWhereArduinoAndRangeWithProjectAndSort(arduinoId, from, to, {rainfall: 1}, {rainfall: +1}),
    findWhereArduinoAndRangeWithProjectAndSort(arduinoId, from, to, {sunCapability: 1}, {sunCapability:+ 1}),
    findWhereArduinoAndRangeWithProjectAndSort(arduinoId, from, to, {humidity: 1}, {humidity: +1}),
    findWhereArduinoAndRangeWithProjectAndSort(arduinoId, from, to, {ambienceTemperature: 1}, {ambienceTemperature: +1}),
    findWhereArduinoAndRangeWithProjectAndSort(arduinoId, from, to, {temperatureHumidity: 1}, {temperatureHumidity: +1}),
    findWhereArduinoAndRangeWithProjectAndSort(arduinoId, from, to, {lightIntensity: 1}, {lightIntensity: +1}),
  ]);
  
  if(!data[0]) {
    return null;
  }

  return {
    uvRay: data[0].uvRay,
    rainfall: data[1].rainfall,
    sunCapability: data[2].sunCapability,
    humidity: data[3].humidity,
    ambienceTemperature: data[4].ambienceTemperature,
    temperatureHumidity: data[5].temperatureHumidity,
    lightIntensity: data[6].lightIntensity,
  };
}

export const getMax = async (arduinoId: string, from: Date, to: Date) => {
  const data = await Promise.all([
    findWhereArduinoAndRangeWithProjectAndSort(arduinoId, from, to, {uvRay: 1}, {uvRay: -1}),
    findWhereArduinoAndRangeWithProjectAndSort(arduinoId, from, to, {rainfall: 1}, {rainfall: -1}),
    findWhereArduinoAndRangeWithProjectAndSort(arduinoId, from, to, {sunCapability: 1}, {sunCapability: -1}),
    findWhereArduinoAndRangeWithProjectAndSort(arduinoId, from, to, {humidity: 1}, {humidity: -1}),
    findWhereArduinoAndRangeWithProjectAndSort(arduinoId, from, to, {ambienceTemperature: 1}, {ambienceTemperature: -1}),
    findWhereArduinoAndRangeWithProjectAndSort(arduinoId, from, to, {temperatureHumidity: 1}, {temperatureHumidity: -1}),
    findWhereArduinoAndRangeWithProjectAndSort(arduinoId, from, to, {lightIntensity: 1}, {lightIntensity: -1}),
  ]);

  if(!data[0]) {
    return null;
  }

  return {
    uvRay: data[0].uvRay,
    rainfall: data[1].rainfall,
    sunCapability: data[2].sunCapability,
    humidity: data[3].humidity,
    ambienceTemperature: data[4].ambienceTemperature,
    temperatureHumidity: data[5].temperatureHumidity,
    lightIntensity: data[6].lightIntensity
  };
}

export const get = async (arduinoId: string, interval: string, from: Date, to: Date) => {
  return await Measure.aggregate([
    {$match: {arduino: arduinoId, createdAt: {$gte: from, $lt: to}}},
    {$group: {
      _id: {
        $toDate: {
          $subtract: [
            { $toLong: "$createdAt" },
            { $mod: [ { $toLong: "$createdAt" }, getMillisecondsFrom(interval) ] }
          ]
        }
      },
      uvRay: {$avg: "$uvRay"},
      rainfall: {$avg: "$rainfall"},
      sunCapability: {$avg: "$sunCapability"},
      humidity: {$avg: "$humidity"},
      ambienceTemperature: {$avg: "$ambienceTemperature"},
      temperatureHumidity: {$avg: "$temperatureHumidity"},
      lightIntensity: {$avg: "$lightIntensity"}
    }},
    {$sort: {createdAt: -1}}
  ])
}