var express = require('express')
const { json } = require('body-parser')
var app = express()
app.use(express.json())
//app.get('/demo', function (req, res) {
app.get('/product',async (req, res)=> {
//res.send('wanlop')
try{
const result = await db.Products.findAll({
    order:[
        ["id", "DESC"]
    ]
})
res.status(200).json(result)
catch (error){
    res.status(500).json({message:error.message})
}
res.status(200).json(result)
//res.status(200).json({result:"[GET]"})
})
app.get('/product/:id', (req, res)=> {
res.status(200).json({result:`[GET] id: ${req.params.id}`})
})
app.post('/product', (req, res)=> {
res.status(200).json({result:`[POST] ${ JSON.stringify(req.body)}`})
})
app.put('/product/:id', (req, res)=> {
res.status(200).json({result:`[PUT] id: ${req.params.id},${ JSON.stringify(req.body)}`})
})
app.delete('/product/:id', (req, res)=> {
res.status(200).json({result:`[DELETE] id: ${req.params.id}`})
})
const PORT =process.env.PORT || 3000
const ENV =process.env.NODE_ENV || 'development'
app.listen(PORT, ()=>{
console.log("on PORT "+ PORT)
//console.log(`on PORT: ${PORT}`)
console.log(`on ENV: ${ENV}`)
console.log("server in running")
})
const db = require('./models')