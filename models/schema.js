const mongoose =  require('mongoose');

// schema for amiibos
const amiiboSchema = new mongoose.Schema(
    {
    name: {type:String, required:true},
    img: String,
    series: {type:String, required:true},
    description: {type:String, required:true},
    condition: {type:String, required:true},
    price: {type:Number, required:true},
    purchasedFrom: {type:String, required:true},
    }
)

// creates collection
const Amiibo = mongoose.model('amiibo', amiiboSchema);
module.exports = Amiibo