require('dotenv').config();  
const {MongoClient} = require('mongodb'); 
const express = require('express'); 
const path = require("path"); 

const app = express()
const url = process.env.MONGO_URL 
const client = new MongoClient(url)

app.use(express.static('public'))
app.use(express.urlencoded({extended:true})) 

async function iniciarServidor(){
    
}