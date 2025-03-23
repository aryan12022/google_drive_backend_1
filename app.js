const express=require('express')
const userRouter = require('./routes/user.routes.js')
const dotenv=require('dotenv')
const connectToDb=require('./config/db.js')

const app=express();

dotenv.config();
connectToDb();
app.set('view engine','ejs')
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.render('index')
})
app.use('/user',userRouter);
app.listen(3000,()=>{
console.log('server is running on port 3000')
})