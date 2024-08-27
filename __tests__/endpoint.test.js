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
    describe('/api/articles/:article_id', () => {
        test('200: responds with ride object that matches paramentic ID given', () => {
            return request(app).get('/api/articles/1').expect(200)
            .then(({body}) => {
                expect(body.data).toMatchObject({
                    title: "Living in the shadow of a great man",
                    topic: "mitch",
                    author: "butter_bridge",
                    body: "I find this existence challenging",
                    created_at: '2020-07-09T20:11:00.000Z',
                    votes: 100,
                    article_img_url:
                      "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
                })
            })
        })
        test('GET:400 sends an appropriate status and error message when given an invalid id', () => {
            return request(app).get('/api/articles/not-an-id').expect(400)
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe('Bad Request')
            });
        });
        test('GET:404 responds with an appropriate status and error message when given a non-existent id', () => {
            return request(app)
              .get('/api/articles/9999')
              .expect(404)
              .then((response) => {
                expect(response.body.msg).toBe('article does not exist');
              });
          });
    })
    describe('/api/articles/', () => {
        test.only('200: response with an articles array of article object, which should contain all collumns except body, and be in data descending order', () => {
            return request(app).get('/api/articles').expect(200)
            .then(({body}) => {
                console.log(body.data, 'in test')
                expect(body.data).toHaveLength(13)
                expect(Array.isArray(body.data))
                body.data.forEach((article) => {
                    expect(article).toHaveProperty('author', expect.any(String))
                    expect(article).toHaveProperty('title', expect.any(String))
                    expect(article).toHaveProperty('article_id', expect.any(Number))
                    expect(article).toHaveProperty('topic', expect.any(String))
                    expect(article).toHaveProperty('created_at', expect.any(String))
                    expect(article).toHaveProperty('votes', expect.any(Number))
                    expect(article).toHaveProperty('article_img_url', expect.any(String))
                    expect(article).toHaveProperty('comment_count', expect.any(String))
                    expect(article).not.toHaveProperty('body')
                })
            })
        })
        test('GET:400 sends an appropriate status and error message when given an invalid path', () => {
            return request(app).get('/api/articlez').expect(400)
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe('Bad Request')
            });
        });
    })
})