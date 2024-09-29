module.exports = {
    JWT_SECRET : process.env.JWT_SECRET || "testtest",
    JWT_EXPIRATION : process.env.JWT_EXPIRATION || "3h"
}