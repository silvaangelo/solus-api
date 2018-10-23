import { get as getStatistics, getMin, getMax } from '../repositories/statisticRepository'
import { get as getArduino } from '../repositories/arduinoRepository';

export const get = async (req, res, next) => {
  try {
    const arduino = await getArduino(req.params.arduinoId);

    const data = await Promise.all([
      getStatistics(
        arduino._id,
        req.query.interval || "30s",
        new Date(req.query.from),
        new Date(req.query.to)
      ),
      getMin(
        arduino._id,
        new Date(req.query.from),
        new Date(req.query.to)
      ),
      getMax(
        arduino._id,
        new Date(req.query.from),
        new Date(req.query.to)
      )
    ]);

    return res.json({
      success: true,
      data: {
        statistic: data[0],
        min: data[1],
        max: data[2]
      }
    })
  } catch(err) {
    next(err)
  }
}