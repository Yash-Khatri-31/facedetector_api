const Clarifai = require('clarifai');
const { response } = require('express');

const app = new Clarifai.App({
    apiKey: "ce4a2241b1cd4d118af594fef70ed378"});  

const handleApiCall = (req,res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
    .then(data => res.json(data))
    .catch(err => res.status(400).json('unable to work with api'))
}

const url = (req,res,knex)=>{
    const {id} = req.body 
    knex('users').where('id', '=' , id).increment('enteries',1).returning('enteries').then(enteries =>{
        res.json(enteries[0])
    }).catch(err => res.status(400).json('Unable to get account'))
}

module.exports = {
    url:url,
    handleApiCall:handleApiCall
}