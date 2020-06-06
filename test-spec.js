const { expect } = require('chai');
const request = require('supertest');
const app = require('./routes.js');
const port = process.env.PORT || 8080;

describe('Test spec for shorten link', () => {
    let server;
    const long_url = 'http://www.google.com';
    const custom_short_id = 'my-custom-link-id';
    beforeEach((done) => {
        server = app.listen(port, done);
    });
  
    afterEach(() => {
        server.close();
    });

    describe('Create shorten link', async () => {
        it('create shorten link with custom link', async () => {
            const res = await request(app)
                .post('/shorten')
                .send({ long_url, custom_short_id})
                .set('Accept', 'application/json');
            expect(res.status).to.be.equal(200);
        });
        it('create shorten link without custom link', async () => {
            const res = await request(app)
                .post('/shorten')
                .send({ long_url})
                .set('Accept', 'application/json');
            expect(res.status).to.be.equal(200);
        });
        it('longUrl will generate same short link', async () => {
            const res1 = await request(app)
                .post('/shorten')
                .send({ long_url})
                .set('Accept', 'application/json');
            const parsedRes1 = JSON.parse(res1.text);
            const res2 = await request(app)
                .post('/shorten')
                .send({ long_url})
                .set('Accept', 'application/json');
            const parsedRes2 = JSON.parse(res2.text);
            expect(parsedRes1.shortUrl).to.be.equal(parsedRes2.shortUrl);
        });
    });
    describe('Access shorten link', () => {
        it('Shorten link redirects to long url', async () => {
            const resShorten = await request(app)
                .post('/shorten')
                .send({ long_url, custom_short_id})
                .set('Accept', 'application/json');
            const resRedirect = await request(app)
                .get(`/${custom_short_id}`)
                .set('Accept', 'application/json');
            expect(resRedirect.status).to.be.equal(302);
        });
        
    });
    xdescribe('Shorten link visits', async () => {
        it('Accessing shorten link increments visit count by 1', async () => {
            const resShorten = await request(app)
                .post('/shorten')
                .send({ long_url, custom_short_id})
                .set('Accept', 'application/json');
            const resRedirect = await request(app)
                .get(`/${custom_short_id}`)
                .set('Accept', 'application/json');
            const resStats = await request(app)
                .get(`/${custom_short_id}/stats`)
                .set('Accept', 'application/json');
            const res = JSON.parse(resStats.text);
            console.log(res)
            expect(res.visitCount).to.be.equal(1);
        });
    })
    describe('Access shorten link stats', async () => {
        it('Stats are given for a short link', async () => {
            const resShorten = await request(app)
                .post('/shorten')
                .send({ long_url, custom_short_id})
                .set('Accept', 'application/json');
            const resStats = await request(app)
                .get(`/${custom_short_id}/stats`)
                .set('Accept', 'application/json');
            expect(resStats.status).to.be.equal(200);
        });
    });
  });