const RouteNotFoundMiddleware = (req, res, next) => {    
    res.status(404)
    
    return res.json({
        success: false,
        message: "Requested route not found."
    })
}

export default RouteNotFoundMiddleware