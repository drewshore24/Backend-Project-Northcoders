const data = require('../db/data/test-data')
const request = require('supertest')
const seed = require('../db/seeds/seed')
const app = require('../app/app')
const db = require('../db/connection')
const endpoint = require('../endpoints.json')

beforeEach(() => seed(data));
afterAll(() => db.end());

describe('Endpoint Tests', () => {
    describe('/api/topics', () => {
        test('200: get 200 response', () => {
            return request(app).get('/api/topics').expect(200)
        })
        test('200: returns all data from topics when requesting all data', () => {
            return request(app).get('/api/topics').expect(200).then(({body}) => {
                body.data.forEach(topics =>{
                    expect(typeof topics.slug).toBe('string')
                    expect(typeof topics.description).toBe('string')
                })
            })
        })
        test('404: get 404 response', () => {
            return request(app).get('/api/topiks').expect(404).then(({body}) => {
                expect(body.msg).toBe(undefined)
            })
        })
    })
    describe('/api', () => {
        test('200: get 200 response', () => {
            return request(app).get('/api').expect(200)
        })
        test('200: returns all data from endpoints.json when requesting all data', () => {
            return request(app).get('/api').expect(200).then(({body}) => {
                expect(body.data).toEqual(endpoint)
            })
        })
        test('404: get 404 response', () => {
            return request(app).get('/apl').expect(404).then(({body}) => {
                expect(body.msg).toBe(undefined)
            })
        })
    })
})