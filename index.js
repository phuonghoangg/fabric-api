const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require("body-parser");

const userRouter = require('./routes/userRouter')
const typeProductRouter = require('./routes/typeProductRouter')
const productRouter = require('./routes/productRouter')
const blogRouter = require('./routes/blogRouter')
const typeBlogRouter = require('./routes/typeBlogRouter')

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGODB_URL,()=>{
   console.log("connected mongoose");
})

// app.use(cookiesParser());
app.use(bodyParser.json({limit:"50mb"}))

app.use(cors());
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// app.use(express.json());
app.use('/v1/user',userRouter)
app.use('/v2/type-product',typeProductRouter)
app.use('/v3/product',productRouter)
app.use('/v4/type-blog',typeBlogRouter)
app.use('/v5/blog',blogRouter)

app.listen(8000, () => {
    console.log("server is running 8k");
})
