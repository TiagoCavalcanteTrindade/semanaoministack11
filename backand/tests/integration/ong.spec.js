const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/connection');

describe('ONG', () => {
	beforeEach(async () => {
		await connection.migrate.latest();
		await connection.truncate('ongs');
		await connection.truncate('incidents');
	});

	afterAll(async () => {
		await connection.destroy();
	});

	it('shold be able to create a new ONG', async () => {
		let responseCreateOng = await request(app).post('/ongs').send({
			nome: "RJAPAES",
			email: "contato@mail.com",
			number: "+5512991042455",
			city: "Rio do Sul",
			uf: "SC"
		});
		expect(responseCreateOng.body).toHaveProperty('id');
		expect(responseCreateOng.body.id).toHaveLength(8);
	});

	it('shold be able to list the existents ONGs', async () => {
		for (let i = 0; i <= 5; i++) {
			await request(app).post('/ongs').send({
				nome: `${i}`,
				email: `${i}@mail.com`,
				number: "+5512991042455",
				city: "Rio do Sul",
				uf: "SC"
			});
			await new Promise((resolve) => setTimeout(resolve, 1500));
		}
		let responseListOng = await request(app).get('/ongs');
		expect(responseListOng.body).toHaveLength(6);
	}, 10000);
});