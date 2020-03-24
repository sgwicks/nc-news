exports.unhandledMethod = (req, res, next) => {
    res.status(405).send({ msg: `${req.method} method not allowed` })
}

exports.handleCustomErrors = (err, req, res, next) => {
    if (err.status) res.status(err.status).send({ msg: err.msg })
    else next(err)
}

exports.handle500Errors = (err, req, res, next) => {
    console.log(err);
    res.status(500).send({ msg: 'Something went wrong' })
}