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

// takes a list of objects with property created_at
// returns a list of similar objects, with created_at formatted


exports.makeRefObj = list => { };

exports.formatComments = (comments, articleRef) => { };
