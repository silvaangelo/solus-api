import { get as getStatistics } from '../repositories/statisticRepository'

export const get = async (req, res, next) => {
  try {
    return res.json({
      success: true,
      data: {
        statistic: await getStatistics(
          req.params.arduinoId,
          req.query.interval || "30s",
          req.query.from && new Date(req.query.from) || null,
          req.query.to && new Date(req.query.to) || null
        )
      }
    })
  } catch(err) {
    next(err)
  }
}