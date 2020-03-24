const connection = require('../db/connection')

exports.selectAllTopics = () => {
    return connection('topics').select()
}