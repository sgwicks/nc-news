exports.unhandledMethod = (req, res, next) => {
    res.status(405).send({ msg: `${req.method} method not allowed` })
}

exports.handleCustomErrors = (err, req, res, next) => {
    if (err.status) res.status(err.status).send({ msg: err.msg })
    else next(err)
}

exports.handle400Errors = (err, req, res, next) => {
    switch (err.code) {
        case '22P02': res.status(400).send({ msg: 'Bad request: invalid data type' }); break;
        case '23502': res.status(400).send({ msg: 'Bad request: missing vital data' }); break;
        case '22001': res.status(400).send({ msg: 'Bad request: body too long' }); break;
        case '23503': res.status(422).send({ msg: 'Unprocessable entity: data provided does not match the database' }); break;
        default: next(err)
    }
    // if (err.code === '22P02') 
    // else if (err.code === '23502') 
    // else if (err.code === '22001') 
    // else if (err.code === '23503') 
    // else next(err)
}

exports.handle500Errors = (err, req, res, next) => {
    console.log(err);
    res.status(500).send({ msg: 'Something went wrong' })
}