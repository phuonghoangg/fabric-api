const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        default: '',
        unique: true,
    },
    username: {
        type: String,
        required: true,
        default: '',
    },
    phone: {
        type: String,
        default: '',
    },
    password: {
        type: String,
        required: true,
        default: '',
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },

});

const productSchema = mongoose.Schema({
    nameProduct: { 
        type: String,
        required: true,
        default: '',
    },
    price: { 
        type: String,
        required: true,
        default: '',
    },
    color: { 
        type: String,
        required: true,
        default: '',
    },
    weight: { 
        type: String,
        default: 'Medium' // Light || Heavy
    },
    type : { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TypeProduct',
        required:true,
    },
    images: [
        {
            type:String,
        }
    ]
})
const typeProductSchema = mongoose.Schema({
    typeName: { 
        type: String,
        required: true,
        default: '',
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
})


const blogSchema = mongoose.Schema({
    title: { 
        type: String,
        required: true,
        default: '',
    },
    description: { 
        type: String,
        required: true,
        default: '',
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'TypeBlog'
    }
} ,{ timestamps: true },)
const typeBlogSchema = mongoose.Schema({
    typeTitle: {
        type: String,
        required: true,
        default: '',
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Blog'
        }
    ]
})


let User = mongoose.model('User',userSchema)
let Product = mongoose.model('Product',productSchema)
let TypeProduct = mongoose.model('TypeProduct',typeProductSchema)
let Blog = mongoose.model('Blog',blogSchema)
let TypeBlog = mongoose.model('TypeBlog',typeBlogSchema)
module.exports = {User,Product,TypeProduct,Blog,TypeBlog}
