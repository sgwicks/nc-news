const { selectAllTopics } = require('../models/topics')

exports.getAllTopics = (req, res, next) => {
    selectAllTopics().then(topics => {
        res.status(200).send({ topics })
    })
}

exports.unhandledMethod = (req, res, next) => {
    res.status(405).send({ msg: 'Method not allowed' })
}