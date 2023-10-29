const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const imageDownloader= require('image-downloader');
const cookieParser = require('cookie-parser');
require('dotenv').config();


const User = require('./models/users.js');
const app = express();

const jwtSecret = 'fjvdmcvksshdbsjhc'

app.use(express.json());
app.use(cookieParser())
app.use('/uploads' , express.static(__dirname + '/uploads'))
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));
mongoose.connect('mongodb://localhost:27017/Booking');

app.get('/test', (req, res) => {
    res.json('test ok');
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    bcrypt.genSalt(12, (err, salt) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        bcrypt.hash(password, salt, async (err, hash) => {
            if (err) {
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            const userDoc = await User.create({
                name,
                email,
                password: hash
            });

            res.json(userDoc);
        });
    });
});

app.post('/login', async (req, res) => {

    const{email,password}= req.body;
    const userDoc = await User.findOne({email});
    if(userDoc){
        const passOk = bcrypt.compareSync(password, userDoc.password)
        if (passOk){
            jwt.sign({email:userDoc.email ,
                 id :userDoc._id
                  } ,
                   jwtSecret, {}, (err, token)=>{
                if(err) throw err;
                res.cookie('token' , token).json(userDoc)

            })
        }
        else {
            res.status(422).json('pass not ok ')
        }
    }else{
        res.json('not found');
    }
})

app.get('/profile' , (req,res) =>{
    const{token} = req.cookies;
    if(token){
        jwt.verify(token , jwtSecret , {},async (err, userData)=>{
            if(err) throw err;
            const {name , email , _id} = await User.findById(userData.id)
            res.json({name, email, _id});
        })
    }
    else{
    res.json(null)}
})

app.post('/logout', (req,res)=>{
    res.cookie('token', '').json(true);
})

app.post('/upload-by-link' , async(req,res)=>{
   const{link} = req.body; 
   const newName = 'photo' +Date.now() + '.jpg'
    await imageDownloader.image({
        url:link,
        dest:__dirname+'/uploads/' + newName  
    })
    res.json(newName)
})

app.listen(4000);