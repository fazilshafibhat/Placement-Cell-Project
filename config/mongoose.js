const mongoose = require('mongoose');

const db = 'mongodb+srv://fazilshafi:12345678Abc@cluster0.crvznlx.mongodb.net/PlacementCell_development?retryWrites=true&w=majority'
mongoose.connect(db).then(()=>{
    console.log(`connection successfull!`)
}).catch((err)=> console.log(`no connection: ${err}`))


module.exports = db;