const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const { response } = require('express');
const register = require('./controllers/register');
const signin  = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const knex = require('knex')({
    client: 'postgres',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'postgres',
      database : 'smart-brain'
    }
  });

app.use(express.json()); //while trying to signin first time, came across an error where couldnt read properties. So we need body parser. express already has it so we just need to put it into use.
app.use(cors());

app.get('/' , (req,res)=> {res.send(database.users)})
app.post('/signin' , (req,res) => {signin.sign(req,res,knex,bcrypt)});
app.post('/register' , (req,res)=>{register.registerHandler(req,res,knex,bcrypt)});
app.get('/profile/:id' , (req,res)=>{profile.profileid(req,res,knex)});
//error wasnt shown before because, its an array, empty array is technically true, so we check with length of array.
app.put('/image',(req,res)=>{image.url(req,res,knex)});
app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)});
app.listen(3000);

//image was post but now we do put cause we will be updating the users enteries.
//in image we are taking the id from body because we dont have it in the params.

/*

/ - this is working
/signin - POST success/fail  (why post if we arent creating a new user during signin , everytime we enter the pw , we dont wanna send it as a query)
/register - POST new user object
/profile/:userid - GET user
/image - PUT - user object (its put here cause we are manipulating the data as user already exists)

*/