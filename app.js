var express      = require('express');
var mongoose     = require('mongoose');
var editorModel  = require('./models/editor');
var bodyParser   = require('body-parser');
var FroalaEditor = require('./node_modules/wysiwyg-editor-node-sdk/lib/froalaEditor.js');

mongoose.connect('mongodb://localhost:27017/demooEditor',{useNewUrlParser:true})
.then(()=>console.log('connected to db'))
.catch((err)=>console.log(err));

var app = express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:false}));

app.use("/public",express.static(__dirname+'/public'));

app.use('/froalacss',express.static(__dirname+'/node_modules/froala-editor/css/froala_editor.pkgd.min.css'));
app.use('/froalajs',express.static(__dirname+'/node_modules/froala-editor/js/froala_editor.pkgd.min.js'));

app.get('/',(req,res)=>{
   editorModel.find((err,data)=>{
        if(err){
            console.log(err);
        }else{
            if(!data){
                res.render('editor');
            }else{
                res.render('editor',{edata:data});
            }
        }
   });
});

// Path to upload image.
app.post('/upload_image', function (req, res) {

    // Store image.
    FroalaEditor.Image.upload(req, '/public/uploads/', function(err, data) {
      // Return data.
      if (err) {
        return res.send(JSON.stringify(err));
      }
  
      res.send(data);
    });
  });

  app.post('/',(req,res)=>{
      var editorData = new editorModel({
          data:req.body.editdata
      });
      editorData.save((err,data)=>{
          if(err){
              console.log(err);
          }else{
              res.redirect('/');
          }
      });
  });


var port = process.env.PORT || 3000;
app.listen(port,()=>console.log('server run at port '+port));