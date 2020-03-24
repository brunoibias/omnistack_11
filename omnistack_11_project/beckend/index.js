const express = require('express')

const app = express();

app.get('/', (request, response)=>{   //rota raiz
    return response.json({
        evento:"666",
        aluno:'bruno ibias'
    });
}) 

app.listen(3333);
