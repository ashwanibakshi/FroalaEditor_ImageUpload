var mongoose = require('mongoose');

var editorSchema = new mongoose.Schema({
    data:String
});

module.exports = mongoose.model('editor',editorSchema);