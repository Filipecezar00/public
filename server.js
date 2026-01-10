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
    try{
        await client.connect() 
        console.log('Conectado Com o Banco de Dados')

        const db = client.db("Projeto"); 
        const colecao = db.collection('usuarios');  

        app.post("/login",async (req,res)=>{
            const {usuario,senha} = req.body; 

            console.log(`Tentativa de Login: ${usuario}`)

            const pesquisa = await colecao.findOne({user:usuario,senha:senha})
            if(pesquisa){
                res.send("Login Realizado Com sucesso")
            }else{
                res.send("Usuario ou senha Incorretos")
            }
           
        }); 
        app.listen(3030,()=>console.log('Servidor rodando em: http://localhost:3030'))
    }catch(erro){
        console.error("Erro ao Iniciar",erro)
   }
}
iniciarServidor() 