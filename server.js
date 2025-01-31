import express from 'express'

import { PrismaClient } from '@prisma/client'

import cors from 'cors'

const prisma = new PrismaClient()

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors(/* https://declub.com.br*/ ))


app.get('/usuarios', async (req, res) =>{

    const users = await prisma.user.findMany()
    res.status(200).json(users)
})

app.post('/usuarios', async(req, res) =>{
    try{
    const user = await prisma.user.create({
        data:{
            email: req.body.email,
            age: req.body.age,
            name: req.body.name

        }

    })
    if (req.body.age < 18) throw new Error("apenas usuarios maiores de 18 anos podem se cadastrar")
    res.status(201).json(user)
    } catch(err){
        res.status(400).json({error: err.message})
    }
    //users.push(req.body)
    //console.log(user);
    //res.status(201).json({message:"usuario cadastrado!"})
    
})

app.put('/usuarios/:id', async(req, res) =>{

    const user = await prisma.user.update({
        //manda procura um id no banco de dados
        //apos isso ele mavi atualizar os dado sdo cadastro do usuario 
        where:{
            id: req.params.id
        },

        data:{
            email: req.body.email,
            age: req.body.age,
            name: req.body.name

        }
    })
    
    console.log(user);
    //res.status(201).json({message:"usuario cadastrado!"})
    res.status(201).json(user)
})

app.delete('/usuarios/:id', async (req, res) =>{
    await prisma.user.delete({
        where:{
            id: req.params.id,
        },
    })

    res.status(200).json({message: 'usuario deletado com sucesso!'})
})


app.listen(3000)


/*{
    "name":"Maria",
    "age": 22,
    "email": "maria@gmail.com"
*/

/* 
    Carlos
    m3llxVXvjy53XBUD
*/