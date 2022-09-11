const path = require("path");
const uses = require(path.resolve("src/data/uses-data"));

function list(req, res, next){
    res.status(200).json({data: uses})
}

function read(req, res, next){
    res.json({data: res.locals.use})
}

function destroy(req, res, next){
    const { useId } = req.params
    const index = uses.findIndex((use)=> use.id === useId)
    uses.splice(index, 1)
    res.sendStatus(204)
}

function useExists(req, res, next){
    const {useId} = req.params
    const foundUse = uses.find((use)=> use.id === Number(useId))

    if(foundUse){
        res.locals.useId = useId
        res.locals.use = foundUse
        next()
    }
    next({
        status: 404,
        message: `The useId '${useId}' does not exist.`
    })
}

module.exports = {
    list,
    read: [
        useExists,
        read
    ],
    delete: [
        useExists,
        destroy
    ]
}