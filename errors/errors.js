exports.unhandledMethod = (req, res, next) => {
    res.status(405).send({ msg: `${req.method} method not allowed` })
}

exports.handle404Errors = (req, res, next) => {
    res.status(404).send({ msg: `${req.originalUrl} does not exist` })
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
        case '42703': res.status(400).send({ msg: 'Bad request: one or more queried columns does not exist' }); break;
        default: next(err)
    }
}


exports.handle500Errors = (err, req, res, next) => {
    console.log(err);
    res.status(500).send({ msg: 'Something went wrong' })
}