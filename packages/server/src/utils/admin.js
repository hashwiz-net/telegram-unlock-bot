const ADMIN_SECRET = process.env.ADMIN_SECRET || 'changeThis'

const requireAdmin = (req, res, next) => {
  if (req.headers.authorization !== ADMIN_SECRET) {
    return res.status(401).send({
      success: false
    })
  }

  next()
}

module.exports = {
  requireAdmin
}
