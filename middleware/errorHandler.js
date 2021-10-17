
module.exports =  () => {
    return (err, req, res, next) => {
        if (err) {
            res.status(500).json({
                error: err.message
            })
        }
    }
}