import { get as getArduino } from './arduinoRepository'
import { Measure } from '../models/Measure';
import { IDateQuery } from '../interfaces/IDateQuery';

export const getDateQuery = (from: Date = null, to: Date = null) => {
  let dateQuery: IDateQuery = {}

  if(from) {
    dateQuery.$gte = from
  }

  if(to) {
    dateQuery.$lt = to
  }

  return dateQuery
}

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

export const get = async (arduinoId: string, interval: string, skip: Number = 0, limit: Number = 25, from?: Date, to?: Date) => {
  const arduino = await getArduino(arduinoId, true)

  return await Measure.aggregate([
    {$match: {arduino: arduino._id, createdAt: getDateQuery(from, to)}},
    {$group: {
      _id: {
        $toDate: {
          $subtract: [
            { $toLong: "$createdAt" },
            { $mod: [ { $toLong: "$createdAt" }, getMillisecondsFrom(interval) ] }
          ]
        }
      },
      uvRay: {$avg:"$uvRay"},
      rainfall: {$avg:"$rainfall"},
      soilMoisture: {$avg:"$soilMoisture"},
      airMoisture: {$avg:"$airMoisture"},
      temperature: {$avg:"$temperature"},
      arduinoTemperature: {$avg:"$arduinoTemperature"},
      sunlight: {$avg:"$sunlight"}
    }},
    {$sort: {createdAt: -1}},
    {$skip: skip},
    {$limit: limit}
  ])
}