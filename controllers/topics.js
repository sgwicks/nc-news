const { selectAllTopics } = require('../models/topics')

exports.getAllTopics = (req, res, next) => {
    selectAllTopics()
}