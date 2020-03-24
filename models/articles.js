const connection = require('../db/connection')

exports.selectArticleById = (article_id) => {
    const article = connection('articles').select('*').where('article_id', article_id);
    const comments = connection('comments').select('*').where('article_id', article_id);

    return Promise.all([article, comments]).then(result => {
        const comment_count = result[1].length
        const [[article]] = result
        return { ...article, comment_count }
    })
}