var express = require('express');

var app = express();

app.set('view engine','ejs');

app.use('/froalacss',express.static(__dirname+'/node_modules/froala-editor/css/froala_editor.pkgd.min.css'));
app.use('/froalajs',express.static(__dirname+'/node_modules/froala-editor/js/froala_editor.pkgd.min.js'));

app.get('/',(req,res)=>{
 res.render('editor');
});

var port = process.env.PORT || 3000;
app.listen(port,()=>console.log('server run at port '+port));