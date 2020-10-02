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
//catch (error){
    //res.status(500).json({message:error.message})
}
//res.status(200).json(result)
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
const express = require('express')
const cors = require('cors')
const app = express()
const db = require('./models')
app.use(express.json())
app.use('/images', express.static("./images"))
app.use(cors())
app.get('/product', async (req, res) => {
try {
const result = await db.Products.findAll({
order: [
["id", "DESC"]
]
})
res.status(200).json(result)
} catch (error) {
res.status(500).json({ message: error.message })
}
})
app.get('/product/:id', async (req, res) => {
try {
const result = await db.Products.findOne({
where: { "id": req.params.id }
})
if (result) {
res.status(200).json(result)
} else {
res.status(404).json({ message: 'product not found!!' })
}
} catch (error) {
res.status(500).json({ message: error.message })
}
})
app.post('/product', async (req, res) => {
try {
const product = await db.Products.create(req.body)
res.status(201).json(product)
} catch (error) {
res.status(500).json({ message: error.message })
}
})
app.put('/product/:id', async (req, res) => {
try {
const result = await db.Products.findOne({
where: { "id": req.params.id }
})
if (!result) {
return res.status(404).json({ message: 'product not found!!' })
}
const product = await db.Products.update(req.body, {
where: { "id": result.id }
})
if ([product]) {
const updateProduct = await db.Products.findByPk(result.id)
res.status(200).json(updateProduct)
}else{
throw new Error('update product failure!!')
}
} catch (error) {
res.status(500).json({ message: error.message })
}
})
app.delete('/product/:id', async (req, res) => {
try {
const deleted = await db.Products.destroy({
where: { "id": req.params.id }
})
if (deleted) {
res.status(204).json({ message: 'product deleted' })
} else {
res.status(404).json({ message: 'product not found!!' })
}
} catch (error) {
res.status(500).json({ message: error.message })
}
})
const PORT = process.env.PORT || 1150
const ENV = process.env.NODE_ENV || 'development'
app.listen(PORT, () => {
console.log(`on PORT: ${PORT}`);
console.log(`on ENV: ${ENV}`);
console.log("server in running");
})
//npm install -g sequelize-cli
// sequelize init
//sequelize model:generate --name Products --attributes "name:string, image:string, stock:integer, price:integer" --underscored true
//sequelize db:migrate
// download db browser for sqlite
//sequelize seed:generate --name seed-product
//sequelize db:seed:all