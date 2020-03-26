const {fetchApi} = require('../models/api')

exports.getApi = (req, res, next) => {
    fetchApi()
    .then(api => res.status(200).send({api}))
    .catch(next)
}