import http from 'http'
import fs from "fs";
import path from 'path'
import Express from './lib/express.js'
import { PORT, host } from './config.js'


const server = http.createServer((req,res) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, Access-Control-Allow-Origin');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST, DELETE, PUT');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With','token')
    if(req.method == 'OPTIONS') return res.end()
    const app = new Express(req,res)
    app.static('assets')
    app.get('/', (req,res) => res.render('index'))
    app.get('/login', (req,res) => res.render('login'))
    app.get('/register', (req,res) => res.render('register'))

})
   
 
server.listen(PORT, () => console.log('Server is running', host + ':' + PORT))






