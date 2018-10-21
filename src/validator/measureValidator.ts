import { body } from 'express-validator/check'

const arduinoIdRule = body('arduinoId').exists().isMongoId()

const humidityRule = body('humidity').exists().isFloat({
  min: 0,
  max: 100
});

const temperatureHumidityRule = body('temperatureHumidity').exists().isFloat({
  min: -100,
  max: 100
});

const ambienceTemperatureRule = body('ambienceTemperature').exists().isFloat({
  min: -100,
  max: 100
});

const lightIntensityRule = body('lightIntensity').exists().isFloat({
  min: 0,
  max: 2000
});

const uvRayRule = body('uvRay').exists().isFloat({
  min: 0,
  max: 2000
})

const rainfallRule = body('rainfall').exists().isFloat({
  min: 0,
  max: 2000
})

const sunCapabilityRule = body('sunCapability').exists().isFloat({
  min: 0,
  max: 2000
})

export const createRules = [
  arduinoIdRule,
  uvRayRule,
  rainfallRule,
  sunCapabilityRule,
  humidityRule,
  ambienceTemperatureRule,
  temperatureHumidityRule,
  lightIntensityRule
]
