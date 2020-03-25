const connection = require('../database/conection')

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('incidents').count

        const incidents = await connection('incidents')
        .joint('ongs', 'ongs_id', '=', 'incidents.ong_id')
            .limit(5)//limita apenas 5 por pagina
            .offset((page - 1) * 5)
            .select(['incidents.*', 'ongs.name', 'ongs.email','ongs.watsapp', 'ongs.city', 'ongs.uf']);

response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents)
    },
    async create(request, response) {
        const { title, description, value } = request.body
        const ong_id = request.headers.authorization;
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });
        return response.json({ id })
    },

    async delete(request, response) {
        const { id } = request.param
        const ong_id = request.headers.authorization;
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (incident.ong.id !== ong_id) {
            return response.status(401).jason({ error: 'Operation not permitted.' })
        }
        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
}