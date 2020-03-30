const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/connection');

describe('Session', () => {
	beforeEach(async () => {
		await connection.migrate.latest();
		await connection.truncate('ongs');
		await connection.truncate('incidents');
	});

	afterAll(async () => {
		await connection.destroy();
	});

	it('shold be able to create a new session', async () => {
		let responseCreateOngToCreateSession = await request(app).post('/ongs').send({
			nome: "RJAPAES",
			email: "contato@mail.com",
			number: "+5512991042455",
			city: "Rio do Sul",
			uf: "SC"
		});
		
		let responseCreateSession = await request(app).post('/sessions').send({
			id: responseCreateOngToCreateSession.body.id
		});

		expect(responseCreateSession.body).toHaveProperty('nome');
		expect(responseCreateSession.status).toBe(200);
	});
});