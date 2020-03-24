exports.handle500Errors = (err, req, res, next) => {
    console.log(err);
    res.sendStatus(500)
}