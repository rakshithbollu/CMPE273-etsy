const express = require('express');
const router = express.Router();
const session = require('express-session');
var mysql = require('mysql');
//var constraints = require("../../config.json");
var cors = require('cors');
const {check, validationResult} = require('express-validator');
//const app = express();
router.use(cors());
const User = require('../../models/User');
const e = require('express');
//const ApiFeatures = require("../utils/apifeatures");
router.use(express.urlencoded({extended: true}));
router.use(express.json())
const {checkAuth} = require("../../utils/passport");

//app.use(express.json({extended: false}));

//For route use  GET api/users
//router.get('/',(req,res) => res.send('User Route'));


var connection = mysql.createConnection({
    host: 'etsy.cewwaa2uc0yy.us-east-2.rds.amazonaws.com',
    database: 'etsy',
    port: '3306',
    user: 'admin',
    password: 'password'
});


connection.connect((err) => {
    if(err){
        throw 'Error occured ' + err;
    }
    console.log("pool created");
});


//For route use  GET api/profile

router.post('/me',(req,res) => {
    console.log("hi");
console.log(req.body);
const {email} = req.body;
 console.log(email);
try{  
    connection.query(`SELECT * FROM users WHERE email=?`,email,  
    function(error,results){
    console.log(results);
    if(results.length !== 0){
        res.send(JSON.stringify(results));
     }else{
        res.send("failure");
     }
 });
}
catch(err){
    console.error(err.message);
    res.send("server error");
}
}
);

router.post('/changeprofile'
  , async (req,res) => {
    console.log(req.body);
    const {email,name,city,gender,dateofbirth,mobile,address,country,picture} = req.body;
    try{  
        connection.query(`UPDATE users set name=?,city=?,gender=?,dateofbirth=?,
        mobile=?,address=?,country=?,picture=? where email=?`,[name,city,gender,dateofbirth,
        mobile,address,country,picture,email],  function(error,results){
        console.log(results);
        if(results.length !== 0){
            console.log(results);
            res.status(200).json({
                success: true,
              });
         }else{
            res.send("failure");
         }
        
     });
    }
    catch(err){
        console.error(err.message);
        res.send("server error");
    }
}
);

//display the product details based on the products given in the search query
router.post('/getSearchDetails/:keyword', [
], async (req,res) => {
    console.log("in backend");
    console.log(req.body);
    const resultPerPage = 5;
    var productsCount = 0;
    const {min_price,max_price,sortType,outOfStock} = req.body
    console.log(min_price,max_price);
    connection.query(`SELECT count(*) as count FROM products`,  function(error,results){
    var productsCount = results[0].count;
    var {keyword} = req.params;
    console.log('checking the keyword'+keyword);
    if (keyword === "undefined") {
        var keyword= ""
    }
    try{ 
        let temp = `'%${keyword}%'`;
        connection.query(`SELECT * FROM products
        WHERE  productname like ${temp} AND price BETWEEN ? AND ? AND stock >= ? order by ${sortType}`,[min_price,max_price,outOfStock,sortType]  , function(error,results){
            console.log(results);
        if(results.length !== 0){
           //res.send(JSON.stringify(results));
           res.status(200).json({
            success: true,
            results,
            //filteredProductsCount,
          });
        }else{
           res.send("failure");
        }
    });
   }
   catch(err){
       console.error(err.message);
       res.send("server error");
   }
});
}
);

// getting the particular product details
router.get('/getProductDetails/:productid', [
], async (req,res) => {
    
    console.log("into backend single product");
    const errors = validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()){
    //res.send(errors.code);
    return res.status(500).json({errors: errors.array()});
    }
    const {productid} = req.params;
    try{  
        connection.query(`SELECT * FROM products WHERE productid=?`,[productid
        ],  function(error,results){
       if(results.length !== 0){
           res.status(200).json({success: true,results,});
        }else{
           res.send("failure");
        }
    });
   }
   catch(err){
       console.error(err.message);
       res.send("server error");
   }
}
)

//adding the cart details
router.post('/addtocart'
  , async (req,res) => {
    //if (!req.session.user) {
      //  res.redirect('/login');
    //}
    console.log(req.body);
    // get current cart price and add this product price to it and generate cartprice
    const {email,productid,quantity,price,shopname} = req.body;
        try{   
            connection.query(`SELECT email from cart where email = ? and productid =?`,[email,productid],function(error,results){
            if (results.length === 0){
            connection.query(`Insert into cart(email,productid,quantity,price,shopname) values(?,?,?,?,?)`,[email,
            productid,quantity,price,shopname],  function(error,results){
                  if(error){
                         res.send(error.code);
                         res.send("failure");
                     }else{
                         res.end("success");
                     }
                 });
         }
         else{
            connection.query(`UPDATE cart set quantity=? where email =? and productid =?`,[quantity,email,
                productid],function(error,results){
        if(results.length !== 0){
            res.end("success");
         }else{
            res.send("failure");
         }
        
     });
    }
}); 
         }
    catch(err){
        console.error(err.message);
        res.send("server error");
    }
}
);

// delete products from the cart
router.post('/deletefromcart'
  , async (req,res) => {
    console.log(req.body);
    // get current cart price and add this product price to it and generate cartprice
    const {productid,email} = req.body;
    try{         
            connection.query(`Delete from cart where email = ? and productid = ?`,[email,productid],function(error,results){
                if(error){
                    res.writeHead(200, {
                         'Content-Type': 'text-plain'
                      });
                     res.send(error.code);
                     res.send("failure");
                 }else{
                      res.writeHead(200,{
                         'Content-Type': 'text/plain'
                     });
                     res.end("success");
                 }

        })}
    catch(err){
        console.error(err.message);
        res.send("server error");
    }
});

//my cart details
router.post('/getCartDetails'
  , async (req,res) => {
    console.log("email details",req.body);
    const {email} = req.body;
    try{   
       
            connection.query(`SELECT  P.productid , P.productname , P.shopname , P.image_URL,C.quantity,P.price,P.currency,
            C.cartid,P.stock from products P , cart C 
            where C.email = ?  AND P.productid IN ( select C.productid from cart)`,[email],  function(error,results){
                if(error){
                    res.writeHead(200, {
                         'Content-Type': 'text-plain'
                      });
                     res.send(error.code);
                     res.send("failure");
                 }else{
            console.log(results);
            res.send(JSON.stringify(results));
                 }
            });
         }
        
    
    catch(err){
        console.error(err.message);
        res.send("server error");
    }
}
);

// creating a order id in orders table after paying for products in the cart.
router.post('/orders'
  , async (req,res) => {
    console.log("emails is",req.body);
    const {email} = req.body;
    try{   
           // inserting into orders 
            connection.query(`Insert into orders(email,orderdate) values(?,?)`,[email,
            new Date().toISOString().slice(0, 10)],function(error,results){
                console.log(results)});
                // getting the products from cart table based on user name
            connection.query(`SELECT  productid,quantity,price,shopname from cart where email = ?`,email,function(error,results){
                //results=JSON.parse(JSON.stringify(results));
                // get the latest order id from the orders table
            connection.query(`SELECT  max(orderid) as orderid from orders where email = ?`,email,function(error1,results1){
            const orderid = results1[0].orderid
            for ( let i =0;i<results.length;i++) {
                //var productid = results[i].productid
                // inserting into the orderdetails table by looping over the products in the cart
                  connection.query(`Insert into orderdetails(productid,quantity,orderid,price,shopname) values(?,?,?,?,?)`,[results[i].productid,results[i].quantity,orderid,results[i].price,results[i].shopname],function(error2,results2){
                    //var i;
                    console.log("printing i",i);
                    // to get the sales count variable and update the stock/quantity in the products table
                    connection.query(`SELECT sum(quantity) as salescount from etsy.orderdetails where productid=?`,[results[i].productid],function(error3,results3){
                        //const salescount = results3[0].salescount 
                        console.log("salescount",results3[0].salescount)             
                    connection.query(`UPDATE products set stock=(stock-?),salescount=? where productid =?`,[results[i].quantity,results3[0].salescount,results[i].productid])
                    //connection.query(`UPDATE products set stock=(stock-?) where productid =?`,[results[i].quantity,results[i].productid])

                    if(error)
                    {
                        res.status(400).json({success: false}); 
                        
                    }
                    console.log('values added')
                   
                    
            })})}})})
            // deleting data from cart table.
            connection.query(`Delete from cart where email = ?`, email,function(error,results){
                if (error)
                {
                    res.status(400).json({success: false}); 
                    
                }
                else 
                {
                    res.status(200).json({success:true});
                }  
         })
        }
             catch(err){
        console.error(err.message);
        res.send("server error");
    }
}
);

// fetching the orders made by a particular end user.
router.post('/mypurchases'
  , async (req,res) => {
    console.log(req.body);
    const {email} = req.body;
    try{   
       
            connection.query(`SELECT  P.productid , P.productname ,P.currency, P.shopname , P.image_URL,OD.quantity,OD.price,
            O.orderid , O.orderdate from etsy.products P , etsy.orders O , etsy.orderdetails OD
            where O.email = ?  AND P.productid IN ( select OD.productid from etsy.orderdetails 
            where OD.orderid IN (select O.orderid from etsy.orders))`,email,  function(error,results){
            console.log(results);
            if (results.length !== 0)
            {
                res.status(200).json(results);
            }
            else 
            {
                res.status(400).json("false"); 
            }
         });
    }
    
    catch(err){
        console.error(err.message);
        res.send("server error");
    }
}
);

router.post('/addfavourite', [
], async (req,res) => {
    console.log(req.body);
    const errors = validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()){
    //res.send(errors.code);
    return res.status(500).json({errors: errors.array()});
    }
    const {productid,email} = req.body;
    try{  
                connection.query(`Insert into favorites(productid,email) values(?,?)`,[productid,email
                    ],  function(error,results){
                  if(error){
                         //res.send(error.code);
                         res.status(400).json("failure");
                     }else{
                        res.status(200).json("success");
                     }
                 });
            }      
    catch(err){
        console.error(err.message);
        res.send("database error");
    }
}
);


router.post('/getfavourite', [
], async (req,res) => {
    console.log(req.body);
    const errors = validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()){
    //res.send(errors.code);
    return res.status(500).json({errors: errors.array()});
    }
    var {favkeyword,email} = req.body;
    if (favkeyword === "undefined") {
        var favkeyword= ""
    }
    try{  
        let temp = `'%${favkeyword}%'`;

                connection.query(`SELECT P.* FROM products P WHERE  P.productname like ${temp} AND P.productid in (select productid from favorites where email=?)`,[email
                    ],  function(error,results){
                   console.log(results)
                  if(error){
                    res.status(400).json("failure");
                     }else{
                        res.status(200).json({success:true, results});
                     }
                 });
            }      
    catch(err){
        console.error(err.message);
        res.send("database error");
    }
}
);

router.post('/deletefavourite', [
], async (req,res) => {
    console.log(req.body);
    const errors = validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()){
    //res.send(errors.code);
    return res.status(500).json({errors: errors.array()});
    }
    const {productid,email} = req.body;
    try{  
                connection.query(`delete from  favorites Where productid = ? and email = ? `,[productid,email
                    ],  function(error,results){
                  if(error){
                    res.status(400).json("failure");
                     }else{
                        res.status(200).json({success:true});
                     }
                 });
            }      
    catch(err){
        console.error(err.message);
        res.send("database error");
    }
}
);

// changing the currency
router.post('/changecurrency'
  , async (req,res) => {
    console.log(req.body);
    const {currency} = req.body;
    try{  
        connection.query(`UPDATE products set currency=?`,[currency], function(error,results){
        //console.log(results);
        if(error){
            res.send("failure");
           
         }else{
            res.status(200).json({
                success: true,
              });
         }
        
     });
    }
    catch(err){
        console.error(err.message);
        res.send("server error");
    }
}
);
module.exports = router;