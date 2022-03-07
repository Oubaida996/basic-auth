"use strict"

const server =require('../src/server');
const supertest=require('supertest');
const request =supertest(server.app);

const {db} =require('../src/auth/models/database');



beforeAll(async ()=>{
    await db.sync();
});

afterAll(async ()=>{
    await db.drop();
});


describe('testing db routers' ,  ()=>{

    it('test test' , async() =>{

        const response = await request.get('/users');
        expect(response.status).toBe(200);
// expect(Array.isArray(response.body)).toBeTruthy();
        // expect(response.body.length).toEqual(1);
    });


});