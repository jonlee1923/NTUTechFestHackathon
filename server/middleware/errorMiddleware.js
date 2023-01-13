// middleware are functions that execute when a request is made
//next is to call the next middleware
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500

    res.status(statusCode)

    res.json({
        message: err.message,
        stack: process.env.NDOE_ENV === 'production' ? nul : err.stack
    })
}

module.exports = {
    errorHandler
}