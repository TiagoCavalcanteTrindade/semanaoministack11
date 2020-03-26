const connection = require('../connection');

module.exports = {
	async index(request, response) {
		const ong_id = request.headers.authorization;
		const {page = 1} = request.query;

		const [count] = await connection('incidents').where('ong_id', ong_id).count();
		response.header('X-Total-Count', count['count(*)']);

		const incidents = await connection('incidents').where('ong_id', ong_id).limit(5).offset((page - 1) * 5).select('*');

		return response.json(incidents);
	}
}