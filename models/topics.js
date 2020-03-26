const connection = require('../db/connection')

exports.selectAllTopics = () => {
    return connection('topics').select()
}

exports.checkTopicExists = ({topic}) => {
    if (topic) {
        return connection('topics')
        .select('*')
        .where('slug', topic)
        .then(topics => {
            if (!topics.length) return Promise.reject({status: 404, msg: 'That topic does not exist'})
        })
    }
    else return Promise.resolve()
}