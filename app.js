var express=require("express"),
    app=express();


app.use(function(err, req, res, next){
    console.error(err.stack);
    res.send(500, 'Something broke!');
});
app.use(express.compress());
app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));


app.listen(2500);

