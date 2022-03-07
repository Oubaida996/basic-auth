"use strict";

const supertest = require('supertest');
const server = require('../src/server');
const request = supertest(server.app);
const {db} =require('../src/auth/models/database');


beforeAll(async ()=>{
    await db.sync();
});

afterAll(async ()=>{
    await db.drop();
});



describe('test server', () => {

    it('get data' , async () =>{
        const response = await request.get('/users');
        expect(response.status).toEqual(200);
    });

    it('POST to /signup to create a new user', async () => {
        const response = await request.post('/signUp').send(
            {

                "userName": "osama",
                "pwd": "123456"

            }
        );
        // console.log("response" ,response);
        // console.log("response" ,request);
        expect(response.status).toEqual(201);
    });

    it('POST to /signIn to create a new user', async () => {
        const response = await request.post('/signIn').auth("osama","123456");
        // console.log("response" ,response);
        // console.log("response" ,request);
        expect(response.status).toEqual(200);
    });


});



