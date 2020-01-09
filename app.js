var express=   require("express")
var app=       express()
var bodyParser=require("body-parser")
var mongoose= require("mongoose")
var methodOverride= require("method-override")
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost/pet_store")

app.use(bodyParser.urlencoded({extended:true}))
app.use(methodOverride("_method"))

app.set("view engine","ejs")

var productSchema=new mongoose.Schema({
    name:String,
    image:String,
    p_type:String,
    price:Number,
    stock:Number
})

var Product=mongoose.model("Product",productSchema)

// Product.create({
//     name:"WoofBix",
//     image:"https://images-na.ssl-images-amazon.com/images/I/51XK8Q7XvOL._SY355_.jpg",
//     p_type:"toy",
//     price:199,
//     stock:5},
//     function(err,prod){
//         if(err)
//         {
//             console.log(err)
//         }
//         else{
//             console.log(prod)
//         }
//     }
// )

// var toys=[
//     {name:"Rubber Ball",image:"https://images-na.ssl-images-amazon.com/images/I/51XK8Q7XvOL._SY355_.jpg"},
//     {name:"Frisbee",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQIkyEAhTrA9XjI_I9DaElEEa0A8qA_Jdwd49UL30VTMbVbvKI5"},
//     {name:"Tug-rope",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQQxc_3qM9E7uB8whYKOY7vaECEvqhiXYG_1t4DquyAAnYPFUIJ"}
// ]

// var foods=[
//     {name:"Pedigree",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRCV8R4SPsaNclvoeQoz6_2kb2XhOPHvLlEO2CBz4yPYblCnVS7"},
//     {name:"Royal Canin",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRNMbVi5CHm71XGyh9iGlauOKzUUqfVnysa3FTM4MSPOOJglpXO"},
//     {name:"WoofBix",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcShO3N6crDXBTa965BE5ILcl3COWxxceb1kr0ybiHMNU0HHmmF4"}
// ]

app.get("/",function(req,res){
    res.render("home")
})

app.get("/foods",function(req,res){
    Product.find({p_type:"food"},function(err,food){
        if(err){
            console.log(err)
        }
        else{
            res.render("food",{foods:food})
        }
    })
    
    
})
app.get("/toys",function(req,res){
    Product.find({p_type:"toy"},function(err,toy){
        if(err){
            console.log(err)
        }
        else{
            res.render("toy",{toys:toy})

        }
    })
    
    
})

app.post("/foods",function(req,res){
    var name=req.body.itemname
    var image=req.body.imgurl
    var p_type="food"
    var price=req.body.price
    var stock=req.body.stock
    var newFood={name:name,image:image,p_type:p_type,price:price,stock:stock}
    Product.create(newFood,function(err,food){
        if(err){
            console.log(err)
        }
        else{
            console.log(food)
        }
    })
    res.redirect("/foods")
})

app.post("/toys",function(req,res){
    var name=req.body.itemname
    var image=req.body.imgurl
    var p_type="toy"
    var price=req.body.price
    var stock=req.body.stock
    var newToy={name:name,image:image,p_type:p_type,price:price,stock:stock}
    Product.create(newToy,function(err,toy){
        if(err){
            console.log(err)
        }
        else{
            console.log(toy)
        }
    }
    )
    res.redirect("/toys")
})

app.get("/product/:id",function(req,res){
    Product.findById(req.params.id,function(err,foundProduct){
        if(err){
            console.log(err)
        }
        else{
            res.render("show",{prod:foundProduct})
        }
    })
    
})

app.get("/:id/edit",function(req,res){
    Product.findById(req.params.id,function(err,foundProduct){
        if(err){
            console.log(err)
        }
        else{
            res.render("edit",{prod:foundProduct})
        }
    })
    
})

app.put("/:id/edit",function(req,res){
    Product.findByIdAndUpdate(req.params.id,req.body.product,function(err,prod){
            if(err){
                console.log(err)
            }
            else{
                console.log(prod)
                res.redirect("/product/"+req.params.id)
            }
    })
    
})

    
app.get("/addnew",function(req,res){
    Product.find({},function(err,foundProducts){
        if(err){
            console.log(err)
        }
        else{
            res.render("addnewitem",{allProducts:foundProducts})
        }
    })
})

app.delete("/:id",function(req,res){
    Product.findByIdAndRemove(req.params.id,function(err,ele){
        if(err){
            console.log(err)
        }
        else{
            res.redirect("/addnew")
        }
    })
})

app.listen(3000,function(){
    console.log("App started!!!")
})