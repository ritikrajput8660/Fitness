const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require("../models/User")

const auth = async (req, res, next) => {
  const { authorization } = req.headers
  
  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'})
  }
  
  try {
    const token = authorization.split(' ')[1]
    const payload = jwt.verify(token, process.env.SECRET)
    req.user = payload
    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }
}

module.exports = auth