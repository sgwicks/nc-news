const { selectUserByUsername } = require('../models/users')

exports.getUserByUsername = (req, res, next) => {
    const { username } = req.params
    selectUserByUsername(username).then(([user]) => {
        res.status(200).send({ user })
    }).catch(next)
}
