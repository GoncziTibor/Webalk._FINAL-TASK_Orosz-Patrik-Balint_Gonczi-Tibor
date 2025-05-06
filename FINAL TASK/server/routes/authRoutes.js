import express from 'express'
import {connectToDatabase} from '../lib/db.js'
import bcrypt from 'bcrypt'

const router = express.Router()
router.post('/register',async(req,res)=> {
    const { username, email, password } = req.body;
    try {
        const db= await connectToDatabase()
        const [rows]= await db.query('SELECT * FROM USERS WHERE email = ?', [email])
        if (rows.length >0)
        {
           return res.status(409).json({message:"user already existed"}) 
        }
        const hashPassword =  await bcrypt.hash(password, 10)
        await db.query("INSERT INTO users (username,email,password) VALUES (?,?,?)",[username,email, hashPassword])
    
        res.status(201).json({message:"User created succesfully"})
    
    } 
    catch(err){
        res.status(500).json(err)
    }

})
export default router;