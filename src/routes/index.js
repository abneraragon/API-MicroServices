const express = require('express')
const router = new express.Router()


//Ponto de acesso de get
//Retornar status de 200 Ok
router.get('/',(req,res,next)=>{
    res.status(200).send(
        {
            "nome" : "abner Aragon"
        }
    )
})

//api Unauthorized
router.get('/privada',(req, res)=>{
    const token = req.headers['authorization'];

    if(!token || token!== 'minhaSenha'){
        return res.status(401).send('Sem autorização!')
    }
    
    res.send('Area acessada com sucesso').status(200)

} )

const tokenExemplos={
    'tokenAdmin' : {role : 'admin'},
    'tokenUser'  : {role: 'user'},
    'tokeConvidado' :  {role:'convidado'}

}

router.get('/admin',(req, res)=>{
    const token = req.headers["authorization"]

    if(!token){
        return res.status(401).send('Sem autorização')

    }

    //validar se é um usuário ok. 
    const user = tokenExemplos[token]
    if(!user){
        return res.status(401).send('roken Inválido')
    }

    console.log(user.role)
    if(user.role != 'admin'){
        return res.status(403).send('Você não tem acesso a essa tela')
    }

    return res.send('Acesso liberado!').status(200)

})


//exemplo de bad request
router.post('/submit',(req,res)=>{
    const {nome, email} = req.body;

    if(!nome || !email){
        res.status(400).send('bad requeste, favor fornecer dados obrigatórios')
    }
    //status 202 created
    res.send('Dados criados com sucesso').status(202);

 



})


module.exports = router;

