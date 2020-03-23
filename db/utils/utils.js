exports.formatDates = list => {
    const formattedDates = []
    list.forEach(item => {
        const newItem = { ...item };
        const { created_at } = item;
        const timestamp = new Date(created_at);
        newItem.created_at = timestamp;
        formattedDates.push(newItem)
    })

    return formattedDates
};

exports.makeRefObj = list => {
    const reference = {}
    list.forEach(item => reference[item.title] = item.article_id)
    return reference
};

exports.formatComments = (comments, articleRef) => {
    const formattedComments = []
    comments.forEach(comment => {
        const { body, belongs_to, votes, created_at } = comment;
        const article_id = articleRef[comment.belongs_to]
        const newComment = {
            body,
            article_id,
            votes,
            created_at,
            author: comment.created_by
        }
        formattedComments.push(newComment)
    })
    return formattedComments
};


// belongs_to: title >>> article_id
// created_at >>> JS date