const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/connection');
const crypto = require('crypto')

describe('Profile', () => {
	beforeEach(async () => {
		await connection.migrate.latest();
		await connection.truncate('ongs');
		await connection.truncate('incidents');
	});

	afterAll(async () => {
		await connection.destroy();
	});

	it('should be able to list the incidents of a ONG', async () => {
		let responseCreateOngToListHerIncidents = await request(app).post('/ongs').send({
			nome: "RJAPAES",
			email: "contato@mail.com",
			number: "+5512991042455",
			city: "Rio do Sul",
			uf: "SC"
		});
		for (var i = 0; i <= 5; i++) {
			await request(app).post('/incidents').send({
				title: "Caso",
				description: "volume teste som teste som",
				value: 120
			}).set('authorization', responseCreateOngToListHerIncidents.body.id);
			await new Promise((resolve) => setTimeout(resolve, 1500));
		}
		let responseListIncidentOfAOng = await request(app).get('/profile').set('authorization', responseCreateOngToListHerIncidents.body.id);
		expect(responseListIncidentOfAOng.body).toHaveLength(5);
	}, 10000);
});