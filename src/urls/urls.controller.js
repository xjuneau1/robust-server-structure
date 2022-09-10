const path = require("path");
const urls = require(path.resolve("src/data/urls-data"));
const uses = require(path.resolve("src/data/uses-data"));


function list (req, res, next){
    res.json({ data: urls })
}

function read(req, res, next){
    res.json({ data: res.locals.url })
}

function create(req, res, next){
    const href = res.locals.href

    const newUrl = {
        id: urls.length+1,
        href
    }
    urls.push(newUrl)
    res.status(201).json({ data: newUrl })
}

function update(req, res, next){
    const oldData = res.locals.url
    const newData = res.locals.href
    const index = urls.indexOf(oldData)
    urls[index].href = newData
    res.status(200).json({data: urls[index]})
}

function hasHref(req, res, next) {
    const {data : { href = null }} = req.body;
    if(!href){
        next({
            status: 400,
            message: "Input data must contain href key."
        })
    }
    res.locals.href = href
    next()
}

function urlExists (req, res, next){
    const { urlId = null} = req.params
    const foundUrl = urls.find((url)=> url.id === Number(urlId))

    if(foundUrl){
        res.locals.url= foundUrl
        return next()
    }
    next({
        status: 404,
        message: `The id ${urlId} does not exist`
    })
}

function recordUse(req, res, next){
    uses.push({
        id: uses.length+1,
        urlId: res.locals.url.id,
        time: Date.now()
    })
    next()
}

module.exports = {
    list,
    create : [
        hasHref,
        create
    ],
    read : [
        urlExists,
        recordUse,
        read
    ],
    update: [
        hasHref,
        urlExists,
        update
    ],
    urlExists
}