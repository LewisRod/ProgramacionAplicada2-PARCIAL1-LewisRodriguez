export const loggerMiddleware = async (req, res, next) => {
    console.log(`[${new Date().toISOString()}]`)
    next()
}
