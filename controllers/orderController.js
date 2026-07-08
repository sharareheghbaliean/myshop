const express  = require("express");
const router = express.Router();
app.use(express.json());

const orderRoutes = require('./routes/orderRoutes');
app.use('/category' , orderRoutes);

app.listen(3000, ()=>{
    console.log('server runing on http://localhost:3000');
});