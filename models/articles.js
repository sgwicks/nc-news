const connection = require('../db/connection')

exports.selectArticleById = (article_id) => {
    return connection('articles').select('*').where('article_id', article_id)
}