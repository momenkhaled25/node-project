const express = require('express');
const cors=require('cors');

const productRoute = require('./routes/productRoutes');
const  userRoute= require('./routes/userRoutes');
const  orderRoute= require('./routes/orderRoutes');

const app = express();
app.use(cors())


//Middlewares
app.use(express.json());

app.use('/app/user', userRoute);
app.use('/app/product', productRoute);
app.use('/app/order', orderRoute);


app.use('*',(req,res,next)=>{
    res.json({message:"not found"})
})
module.exports = app;
