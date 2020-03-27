const connection = require('../db/connection')

exports.selectArticleById = (article_id) => {
    return connection('articles')
    .select('articles.*')
    .count('comment_id as comment_count')
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .where('articles.article_id', article_id)
    .groupBy('articles.article_id')
    .then(article => {
        if(!article.length) return Promise.reject({ status: 404, msg: 'article doesn\'t exist' })
        else return article;
    })
}

exports.updateArticleVoteCount = (article_id, inc_votes =0) => {
    return connection('articles')
        .where('article_id', article_id)
        .increment('votes', inc_votes)
        .returning('*')
}

exports.selectAllArticles = ({ sort_by, order = 'desc', author, topic }) => {
    return connection('articles')
        .select([
            'articles.article_id',
            'articles.title',
            'articles.votes',
            'articles.topic',
            'articles.author',
            'articles.created_at'
        ])
        .count('comment_id as comment_count')
        .leftJoin('comments', 'articles.article_id', 'comments.article_id')
        .groupBy('articles.article_id')
        .modify(query => {
            if (sort_by) query.orderBy(sort_by, order); else query.orderBy('created_at', order);
            if (author) query.where('articles.author', author);
            if (topic) query.where('articles.topic', topic);
        });
}

exports.checkArticleExists = (article_id) => {
    return connection('articles')
    .select('*')
    .where({article_id})
    .then((articles) => {
        if (!articles.length) return Promise.reject({status:404, msg:'Article doesn\'t exist'})
        else return articles
    })

}