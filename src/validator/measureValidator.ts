import { body } from 'express-validator/check'

const arduinoIdRule = body('arduinoId').exists().isMongoId()

const uvRayRule = body('uvRay').exists().isFloat({
  min: 0,
  max: 20
})

const rainfallRule = body('rainfall').exists().isFloat({
  min: 0,
  max: 10
})

const soilMoistureRule = body('soilMoisture').exists().isFloat({
  min: 0,
  max: 1024
})

const airMoistureRule = body('airMoisture').exists().isFloat({
  min: 0,
  max: 100
})

const temperatureRule = body('temperature').exists().isFloat({
  min: -100,
  max: 100
})

const arduinoTemperatureRule = body('arduinoTemperature').exists().isFloat({
  min: -100,
  max: 100
})

const sunlightRule = body('sunlight').exists().isFloat({
  min: 0,
  max: 1024
})

export const createRules = [
  arduinoIdRule,
  uvRayRule,
  rainfallRule,
  soilMoistureRule,
  airMoistureRule,
  temperatureRule,
  arduinoTemperatureRule,
  sunlightRule
]
