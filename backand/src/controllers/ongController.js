const connection = require('../connection');

const generateUniqueId = require('../utils/generateUniqueId')

module.exports = {
	async index(request, response) {
		// const query = request.query; para o query
		// const params = request.params; para o router
		const ongs = await connection('ongs').select('*');
		
		// return response.send('Hello, world!');
		return response.json(ongs);
	},
	async create(request, response) {
		const {nome, email, number, city, uf} = request.body; // par o body
		const id = generateUniqueId();

		await connection('ongs').insert({
			id,
			nome,
			email,
			number,
			city,
			uf
		});
		/*return response.json({
			"evento": "OminiStack",
		    "aluno": "Tiago Cavalcante Trindade"
		});*/
		return response.json({id});
	}
};