const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan  = require('morgan');
const cors = require('cors');

const app = express();


const  UserModel = require('./model');
const { query } = require('express');

const DBConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
};

const MONGODB_URI ='mongodb://localhost:27017/testPagination';
console.log('[*] connecting to MongoDB with mongoose...');
mongoose.connect(MONGODB_URI, DBConfig)
    .then(() => {
        console.log('[+] connected to MongoDB with mongoose');
    })
    .catch(error => {
        console.error('[!] error connecting to MongoDB:', error.message);
    });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));



//routers

app.get('/addData', async (req ,res , next)=> {
    const arr = [];
    for(let i = 0 ; i < 1000; i++){
        arr.push(new UserModel({name : `test data ${i}`}).save());
    }
    await Promise.all(arr);
    res.status(200).send('done adding 1000 user');
})
app.get('/all', async (req ,res , next)=> {
    console.log('hell all');
    console.log(req.query);
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const result = await UserModel.paginate({}, {page, limit,
        lean:true,
          customLabels: {
        totalDocs: 'total',
        docs: 'data',
      }
    });
    res.status(200).send(result);
})


module.exports = app;

