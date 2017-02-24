var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuoteSchema = new Schema({
    quote_date:{type:String, required: true, minlength:3},
    author:{type:String, required: true, minlength:3},
    content: {type:String, required: true, minlength:3},
    // Here's our association
    _user:{type:Schema.Types.ObjectId, ref: 'User'},
    likes:{type:Number, required: false}
})

mongoose.model('Quote', QuoteSchema);