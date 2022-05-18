const mongoose =  require('mongoose');
const mongoose_fuzzy_searching =  require('mongoose_fuzzy_searching');

const searchSchema = mongoose.Schema(
    {
    name: {type:String, required:true},
    img: String,
    series: {type:String, required:true},
    description: {type:String, required:true},
    condition: {type:String, required:true},
    price: {type:String, required:true},
    purchasedFrom: {type:String, required:true},
    compatibleGames: Array,
    gameFunction: Array,
    
})
postSchema.plugin(mongoose_fuzzy_searching, { fields: ['name', 'series', 'description', 'condition', 'price', 'purchasedFrom', 'compatibleGames'] });

const SearchAmiibo = mongoose.model('amiibo', searchSchema)

export default SearchAmiibo;
