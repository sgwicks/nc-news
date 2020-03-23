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

exports.formatComments = (comments, articleRef) => { };
