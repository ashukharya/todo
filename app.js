const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js"); // self made module
const mongoose = require('mongoose'); // mongoose lib
//mongoose.connect('mongodb://localhost:27017/todoDB'); // connected url & made the database
mongoose.connect('mongodb+srv://admin-ashu:ashu%401311@cluster0.8gy6f7w.mongodb.net/todoDB');
var chk;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

const items=mongoose.model('Item',{name:String});
const works=mongoose.model('Work',{name:String});
const item1=new  items({name:'Welcome To Your Todo List'});
const work1=new  works({name:'Welcome To Your Todo Work List'});


app.get("/", function (req, res) {
    let day=date.getAll();
    
    items.find({},function(err,foundItems){
        if(foundItems.length===0){
            items.insertMany([item1],function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log("Re-entered");
                }
            });
            res.redirect("/");
        }
        else{
            chk=false;
            res.render('index', { toDay: day, items: foundItems });
        //console.log(foundItems);
         
      }
      })
});  

app.post("/", function (req, res) {
    var chor = req.body.chore;
    var clr = req.body.clear;
    chk===false
    //console.log(req.body);
    if(chor==='' && req.body.nxt==="wrk"){
        chk=true;
        res.redirect("/work")
    }
    else if(chor==='' && req.body.nxts==="wrk" ){
        chk=false
        res.redirect("/")
        
    }
    else if(req.body.list==='Work List' && chor!==""){
        const work=new works({name:req.body.chore});
        work.save();
            res.redirect("/work");
    }
    else if (chor!=="" && req.body.nxts!=="wrk" && req.body.nxt!=="wrk" ){
        const item=new items({name:req.body.chore});
        item.save();
        res.redirect("/")
    }
    else{
        res.redirect("/");
    }

    
    // for clearing list
    // if (clr === "saaf" && chk) {
    //     work=[];
    //     chk=false
    // }
    // else if (clr === "saaf" && chk===false) {
    //     items = [];
    // }  
    
        //console.log(chk);
        //console.log(work);
    
});

app.get("/work", function (req, res) {

    works.find({},function(err,foundItems){
        if(foundItems.length===0){
            works.insertMany([work1],function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log("Re-entered");
                }
            });
            res.redirect("/work");
        }
        else{
            chk=true;
            res.render('index', { toDay: "Work List", items: foundItems });
        //console.log(foundItems);
         
      }
      })
});

app.get("/about",function(req,res){
    res.render("about");
});

app.post("/delete",function(req,res){
    //console.log(req.body.checkbox);
    //console.log(chk)
    if(chk===false){
    items.deleteOne({_id:req.body.checkbox},function(err){ true})
    res.redirect("/"); }
    else{
    works.deleteOne({_id:req.body.checkbox},function(err){ true})
    res.redirect("/work"); 
    }
  });

app.listen(3000, function (req, res) {
    console.log("server of todo1");
});  


// const express = require("express");
// const bodyParser = require("body-parser");
// const date = require(__dirname+"/date.js"); // self made module
// const mongoose = require('mongoose'); // mongoose lib
// mongoose.connect('mongodb://localhost:27017/todoDB'); // connected url & made the database
// var items = [];
// var work=[]; 
// var chk;
// const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public"));
// app.set('view engine', 'ejs');

// app.get("/", function (req, res) {
//     let day=date.getAll();
//     chk=false;
//     res.render('index', { toDay: day, items: items });
// });  

// app.post("/", function (req, res) {
//     var chor = req.body.chore;
//     var clr = req.body.clear;
//     chk===false
//     //console.log(req.body);
//     if(chor==='' && req.body.nxt==="wrk"){
//         chk=true;
//         res.redirect("/work")
//     }
//     else if(chor==='' && req.body.nxts==="wrk" ){
//         chk=false
//         res.redirect("/")
        
//     }
//     else if(req.body.list==='Work List' && chor!==""){
//             work.push(chor);
//             res.redirect("/work");
//     }
//     else if (chor!=="" && req.body.nxts!=="wrk" && req.body.nxt!=="wrk" ){
//         items.push(chor);
//         res.redirect("/");
//     }
//     else{
//         res.redirect("/");
//     }

    
//     // for clearing list
//     if (clr === "saaf" && chk) {
//         work=[];
//         chk=false
//     }
//     else if (clr === "saaf" && chk===false) {
//         items = [];
//     }  
    
//         //console.log(chk);
//         //console.log(work);
    
// });

// app.get("/work", function (req, res) {
//     res.render('index', { toDay: "Work List", items: work });
//     chk=true;
// });

// app.get("/about",function(req,res){
//     res.render("about");
// });

// app.listen(3000, function (req, res) {
//     console.log("server of todo1");
// });  
