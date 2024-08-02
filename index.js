import express,{json} from 'express'
import bcrypt from "bcrypt";
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

export const app=express()

app.use(cors())
app.use(json())

const bancoUsuarios=[]

app.post('/cadastro',async (req,res)=>{
    console.log('cheguei')
    const {nome,email,senha,icone}=req.body
    const senhaCript = bcrypt.hashSync(senha, 10);
    console.log(nome,email,senha,icone)
    if( nome && email && senha && icone ){
        const novo = {
            nome,
            email,
            senhaCript,
            icone,
            nivel:1,
            pontos:0,
            saborSalgado:'',
            saborDoce:'',
            preferido:'',
            moedas:0
        }
        try{
            console.log('cheguei')
            bancoUsuarios.push(novo)
            res.sendStatus(200)
        } catch (e) {
            console.log('erro cadastro')
            res.sendStatus(500)
        }
        
    }else{
        console.log('erro cadastro: nome ou email ou senha ou icone nao foram enviados')
        res.sendStatus(500)
    }
})
app.post('/login',async (req,res)=>{
    console.log(bancoUsuarios)
    const {nome,senha}=req.body
    try {
        const user = acharUsuarioPorNome(nome)
        if(user && bcrypt.compareSync(senha, user.senhaCript)){
            
            res.status(200).send(user)
        }else{
            console.log('erro login: usuario nao existe ou senha está incorreta')
            res.sendStatus(500)
        }
    } catch (e) {
        console.log('erro login')
        res.sendStatus(500)
    }
})
app.get('/usuarios',async (req,res)=>{
    console.log(bancoUsuarios)
    res.status(200).send(bancoUsuarios)
})

function acharUsuarioPorNome(nome){
    for(let user of bancoUsuarios){
        if(user.nome==nome)return user
    }
    return null
}

const infos={
    chosen:1,
    name:'AlquimistaTG',
    title:'Viajante desconhecido',
    level:1,
    points:270,
    saltedFlavor:'Quatro Queijos',
    sweetFlavor:'Nutella com Morango',
    preferredFlavor:'Bacon com Ovos',
    coins:420
}

const port=process.env.PORT || 5000
app.listen(port,()=>{console.log(`server up on port ${port}`)})
