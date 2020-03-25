const connection= require('../database/connection');
const crypto = require('crypto');

module.exports={
    async index (request, response){
        const ongs = await connection('ongs').select('*');
        
        return response.json(ongs);
        },
    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;
    
        const id = crypto.randomBytes(4).toString('HEX');//gera um id de 4 bytes aleatorios e convrte para uma strig hexadecimal
        await
            connection('ongs').insert({
                id,
                name,
                email,
                whatsapp,
                city,
                uf,
            })
    
        return response.json({ id });
    }
}