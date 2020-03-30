const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/connection');
const crypto = require('crypto')

describe('Incident', () => {
	beforeEach(async () => {
		await connection.migrate.latest();
		await connection.truncate('ongs');
		await connection.truncate('incidents');
	});

	afterAll(async () => {
		await connection.destroy();
	});

	it('shold be able to crete a new incident', async () => {
		let id = crypto.randomBytes(4).toString('HEX');
		let responseCreateIncident = await request(app).post('/incidents').send({
			title: "Caso",
			description: "volume teste som teste som",
			value: 120
		}).set('authorization', id);

		expect(responseCreateIncident.body).toHaveProperty('id');
		expect(responseCreateIncident.body.id).toBe(1);
	});

	it('should be able to list the existents incidents', async () => {
		let responseCreateOngToListIncidents = await request(app).post('/ongs').send({
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
			}).set('authorization', responseCreateOngToListIncidents.body.id);
			await new Promise((resolve) => setTimeout(resolve, 1500));
		}
		let responseListIncident = await request(app).get('/incidents');
		expect(responseListIncident.body).toHaveLength(5);
	}, 10000);

	it('shold be able to delete a created incident', async () => {
		let responseCreateOngToDeleteIncident = await request(app).post('/ongs').send({
			nome: "RJAPAES",
			email: "contato@mail.com",
			number: "+5512991042455",
			city: "Rio do Sul",
			uf: "SC"
		});
		await request(app).post('/incidents').send({
			title: "Caso",
			description: "volume teste som teste som",
			value: 120
		}).set('authorization', responseCreateOngToDeleteIncident.body.id);

		let responseDeleteIncident = await request(app).delete('/incidents/1').set('authorization', responseCreateOngToDeleteIncident.body.id);

		let responseListIncident = await request(app).get('/incidents');

		expect(responseDeleteIncident.status).toBe(204);
		expect(responseListIncident.body).toHaveLength(0)
	});
});