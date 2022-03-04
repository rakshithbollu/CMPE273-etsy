const express = require('express');
const router = express.Router();
const session = require('express-session');
var mysql = require('mysql');
const multer = require('multer');
var constraints = require("../../config.json");
var cors = require('cors');
const {check, validationResult} = require('express-validator');
//const app = express();
router.use(cors({origin:constraints.frontEnd, credentials:true}));
const User = require('../../models/User');
const e = require('express');

router.use(express.urlencoded({extended: true}));
router.use(express.json())
//app.use(express.json({extended: false}));

//For route use  GET api/users
//router.get('/',(req,res) => res.send('User Route'));


var connection = mysql.createPool({
    host: constraints.DB.host,
    user:constraints.DB.username,
    password: constraints.DB.password,
    port: constraints.DB.port,
    database: constraints.DB.database
});

connection.getConnection((err) => {
    if(err){
        throw 'Error occured ' + err;
    }
    console.log("pool created");
});

// creating a shop
router.post('/createshop', [
  check('shopname', 'shop name is required').not().isEmpty(),
], async (req,res) => {
    console.log(req.body);
    const errors = validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()){
    //res.send(errors.code);
    return res.status(500).json({errors: errors.array()});
    }
    const {shopname} = req.body;
    try{  
                connection.query(`Insert into shops(shopname) values(?)`,[shopname,
                    ],  function(error,results){
                  if(error){
                        res.writeHead(200, {
                             'Content-Type': 'text-plain'
                          });
                         //res.send(error.code);
                         res.send("failure");
                     }else{
                          res.writeHead(200,{
                             'Content-Type': 'text/plain'
                         });
                         //res.end(JSON.stringify(results));
                         res.send("success");
                     }
                 });
            }      
    catch(err){
        console.error(err.message);
        res.send("database error");
    }
}
);

// checking if shop name is unique
router.post('/uniqueshopname', [
    check('shopname', 'shop name is required').not().isEmpty(),
  ], async (req,res) => {
      console.log(req.body);
      const errors = validationResult(req);
      console.log(errors);
      if(!errors.isEmpty()){
      //res.send(errors.code);
      return res.status(500).json({errors: errors.array()});
      }
      const {shopname} = req.body;
      try{  
          connection.query(`SELECT shopnames FROM shops WHERE shopname=?` ,[shopname
          ],  function(error,results){
              console.log(results);
              if(results.length === 0){
                           res.send("Available");
                       }
                   
              else{
                  res.send("NotAvailable");
                  //console.log("Restaurant already existed!");
              }
          });
          
      }
      catch(err){
          console.error(err.message);
          res.send("server error");
      }
  }
  );


// creating a product
router.post('/createproduct', [
    check('productname', 'product name is required').not().isEmpty(),
    check('price', 'price is required').not().isEmpty(),
    check('category', 'category is required').not().isEmpty(),
    check('stock', 'stock is required').not().isEmpty(),
  ], async (req,res) => {
      console.log(req.body);
      const errors = validationResult(req);
      console.log(errors);
      if(!errors.isEmpty()){
      //res.send(errors.code);
      return res.status(500).json({errors: errors.array()});
      }
      const {productname,description,price,category,stock,image_URL,shopname} = req.body;
      try{  
                  connection.query(`Insert into products(productname,description,price,category,stock,image_URL,shopname) values(?,?,?,?,?,?,?)`,[productname,description,price,category,stock,image_URL,shopname
                      ],  function(error,results){
                    if(error){
                          res.writeHead(200, {
                               'Content-Type': 'text-plain'
                            });
                           //res.send(error.code);
                           res.send("failure");
                       }else{
                            res.writeHead(200,{
                               'Content-Type': 'text/plain'
                           });
                           //res.end(JSON.stringify(results));
                           res.send("success");
                       }
                   });
              }      
      catch(err){
          console.error(err.message);
          res.send("database error");
      }
  }
  );

// owner editing the product details
router.put('/updateproduct'
  , async (req,res) => {

    const {productid,productname,description,price,category,stock,image_URL} = req.body;
    try{  
        connection.query(`UPDATE products set productname=?,description=?,price=?,category=?,stock=?,image_URL=? where productid=?`,[productname,description,price,category,stock,image_URL],  function(error,results){
        if(results.length !== 0){
            console.log(results);
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

// user making products as favourites
router.put('/addfavourite', [
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
                  connection.query(`Insert into favourite(productid,email) values(?,?)`,[productid,email
                      ],  function(error,results){
                    if(error){
                          res.writeHead(200, {
                               'Content-Type': 'text-plain'
                            });
                           //res.send(error.code);
                           res.send("failure");
                       }else{
                            res.writeHead(200,{
                               'Content-Type': 'text/plain'
                           });
                           //res.end(JSON.stringify(results));
                           res.send("success");
                       }
                   });
              }      
      catch(err){
          console.error(err.message);
          res.send("database error");
      }
  }
  );

//display the product details based on the product category
router.post('/getproducts', [
], async (req,res) => {
    console.log(req.body);
    const errors = validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()){
    //res.send(errors.code);
    return res.status(500).json({errors: errors.array()});
    }
    const {category} = req.body;
    try{  
        connection.query(`SELECT * FROM products
        WHERE category=?`,[category
   ],  function(error,results){
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

//display the product details based on the products given in the search query
router.post('/getproductsbysearch', [
], async (req,res) => {
    console.log(req.body);
    const errors = validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()){
    //res.send(errors.code);
    return res.status(500).json({errors: errors.array()});
    }
    const {productname} = req.body;

    try{  
        connection.query(`SELECT * FROM products
        WHERE  productname like '%" + productname +"%' `,  function(error,results){
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

// looging into restaurant
router.post('/login', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password','password is required').exists()
  ], async (req,res) => {

    console.log(req.body);
    const errors = validationResult(req.body);
    if(!errors.isEmpty()){

        return res.status(500).json({errors: errors.array()});
    }
    const {email,password} = req.body;
    try{  
        connection.query(`SELECT * FROM restaurant
         WHERE email=? and password=?`,[email,password
    ],  function(error,results){
        if(results.length !== 0){
            res.send(JSON.stringify(results));
         }else{
            res.send("failure");
         }
        // console.log(results);
        // if(results.length === 0){
        //     console.log("hjkloh");
            
        //     res.json({errors:[{msg: 'Invalid creds'}]});
        // }
        // else{
        //     res.json(results);
        // }
    //   if(error){
    //          res.writeHead(200, {
    //              'Content-Type': 'text-plain'
    //          });
    //          res.send(error.code);
    //      }else{
    //          res.writeHead(200,{
    //              'Content-Type': 'text/plain'
    //          });
    //          //res.send("success");
    //          res.end(JSON.stringify(results));
    //      }
     });
    }
    catch(err){
        console.error(err.message);
        res.send("server error");
    }
}
);

// change the user profile
router.put('/changeprofile'
  , async (req,res) => {

    
    
    const {email,uname,password,location,dateofbirth,mobile,nickname} = req.body;
    try{  
        connection.query(`UPDATE users set uname=?,password=?,location=?,dateofbirth=?,
        mobile=?,nickname=? where email=?`,[uname,password,location,dateofbirth,
        mobile,nickname,email],  function(error,results){
        if(results.length !== 0){
            console.log(results);
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

//get the user profile
router.post('/getprofile'
  , async (req,res) => {

    console.log(req.body);
    
    const {email} = req.body;
    try{  
        connection.query(`select * from users where email`,email,  function(error,results){
        if(results.length !== 0){
            console.log(results);
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

// add products to the cart
router.post('/addtocart'
  , async (req,res) => {
    console.log(req.body);
    // get current cart price and add this product price to it and generate cartprice
    const {email,productid,quantity,price,cartprice} = req.body;
    try{   
       
            connection.query(`Insert into cart(email,cartprice) values(?,?)`,[email,
            cartprice]);
            connection.query(`SELECT  max(cartid) as cartid from cart where email = ?`,email,function(error,results){
            results=JSON.parse(JSON.stringify(results));
            console.log(results[0].cartid)
            })
            connection.query(`Insert into cartdetails(cartid,productid,quantity,price) values(?,?,?)`,[results[0].cartid,
            productid,quantity,price]);
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
    const {email,productid} = req.body;
    try{   
       
            connection.query(`SELECT  max(cartid) as cartid from cart where email = ?`,email,function(error,results){
            results=JSON.parse(JSON.stringify(results));
            console.log(results[0].cartid)
            })
            connection.query(`Delete from cartdetails where cartid = ?`,results[0].cartid);
            connection.query(`Delete from cart where email = ?`,email);
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
    console.log(req.body);
    const {email} = req.body.email;
    try{   
       
            connection.query(`Insert into orders(email,orderdate) values(?,?)`,[email,
            new Date().toISOString().slice(0, 10)]);
            connection.query(`SELECT  max(orderid) as orderid from orders where email = ?`,email,function(error,results){
            results=JSON.parse(JSON.stringify(results));
            console.log(results[0].orderid)
            })

            connection.query(`Insert into orderdetails(productid,quantity,orderid,price) values(?,?)`,[email,
            new Date().toISOString().slice(0, 10)]);
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
       
            connection.query(`SELECT  P.productid , P.productname , P.shopname , P.image_URL,OD.quantity,OD.price,
            O.orderid , O.orderdate from etsy.products P , etsy.orders O , etsy.orderdetails OD
            where O.email = ?  AND P.productid IN ( select OD.productid from etsy.orderdetails 
            where OD.orderid IN (select O.orderid from etsy.orders))`,email,  function(error,results){
            console.log(results);
            res.send(JSON.stringify(results));
            });
         }
        
    
    catch(err){
        console.error(err.message);
        res.send("server error");
    }
}
);

// fetching the items added to the cart by the user
router.post('/mycart'
  , async (req,res) => {
    console.log(req.body);
    const {email} = req.body;
    try{   
       
            connection.query(`SELECT  P.productid , P.productname , P.shopname , P.image_URL,CD.quantity,CD.price,
            C.cartid , C.cartprice from etsy.products P , etsy.cart C , etsy.cartdetails CD
            where C.email = "rakshith"  AND P.productid IN ( select CD.productid from etsy.cartdetails 
            where CD.cartid IN (select C.cartid from etsy.cart))`,email,  function(error,results){
            console.log(results);
            res.send(JSON.stringify(results));
            });
         }
        
    
    catch(err){
        console.error(err.message);
        res.send("server error");
    }
}
);

module.exports = router;