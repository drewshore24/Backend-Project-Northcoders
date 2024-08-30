const data = require("../db/data/test-data");
const request = require("supertest");
const seed = require("../db/seeds/seed");
const app = require("../app/app");
const db = require("../db/connection");
const endpoint = require("../endpoints.json");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("Endpoint Tests", () => {
  describe("GET /api/topics", () => {
    test("200: returns all data from topics when requesting all data", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          body.data.forEach((topics) => {
            expect(typeof topics.slug).toBe("string");
            expect(typeof topics.description).toBe("string");
          });
        });
    });
    test("404: get 404 response", () => {
      return request(app)
        .get("/api/topiks")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe(undefined);
        });
    });
  });
  describe("GET /api", () => {
    test("200: get 200 response", () => {
      return request(app).get("/api").expect(200);
    });
    test("200: returns all data from endpoints.json when requesting all data", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(body.data).toEqual(endpoint);
        });
    });
    test("404: get 404 response", () => {
      return request(app)
        .get("/apl")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe(undefined);
        });
    });
  });
  describe("GET /api/articles/:article_id", () => {
    test("200: responds with ride object that matches paramentic ID given", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          expect(body.data).toMatchObject({
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: 100,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
          });
        });
    });
    test("GET:400 sends an appropriate status and error message when given an invalid id", () => {
      return request(app)
        .get("/api/articles/not-an-id")
        .expect(400)
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe("Bad Request");
        });
    });
    test("GET:404 responds with an appropriate status and error message when given a non-existent id", () => {
      return request(app)
        .get("/api/articles/9999")
        .expect(404)
        .then((response) => {
          expect(response.body.msg).toBe("article ID does not exist");
        });
    });
  });
  describe("GET /api/articles/", () => {
    test("200: response with an articles array f article object, which should contain all collumns except body, and be in data descending order", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          expect(body.data).toHaveLength(13);
          expect(Array.isArray(body.data));
          expect(body.data).toBeSortedBy("created_at", { descending: true });
          body.data.forEach((article) => {
            expect(article).toHaveProperty("author", expect.any(String));
            expect(article).toHaveProperty("title", expect.any(String));
            expect(article).toHaveProperty("article_id", expect.any(Number));
            expect(article).toHaveProperty("topic", expect.any(String));
            expect(article).toHaveProperty("created_at", expect.any(String));
            expect(article).toHaveProperty("votes", expect.any(Number));
            expect(article).toHaveProperty(
              "article_img_url",
              expect.any(String)
            );
            expect(article).toHaveProperty("comment_count", expect.any(String));
            expect(article).not.toHaveProperty("body");
          });
        });
    });
    describe("GET /api/articles/:article_id/comments", () => {
      test("200: an array of comments for the given article_id of which each comment should have comment_id, votes, created_at, author, body, article_id", () => {
        return request(app)
          .get("/api/articles/9/comments")
          .expect(200)
          .then(({ body }) => {
            expect(Array.isArray(body.data));
            expect(body.data).toBeSortedBy("created_at", { descending: true });
            body.data.forEach((comment) => {
              expect(comment).toHaveProperty("author", expect.any(String));
              expect(comment).toHaveProperty("article_id", expect.any(Number));
              expect(comment).toHaveProperty("comment_id", expect.any(Number));
              expect(comment).toHaveProperty("created_at", expect.any(String));
              expect(comment).toHaveProperty("votes", expect.any(Number));
              expect(comment).toHaveProperty("body", expect.any(String));
            });
          });
      });
      test("GET:200", () => {
        return request(app)
          .get("/api/articles/2/comments")
          .expect(200)
          .then(({ body }) => {
            expect(body.data).toEqual([]);
          });
      });
      test("GET:400 sends an appropriate status and error message when given an invalid path", () => {
        return request(app)
          .get("/api/articles/not-a-number/comments")
          .expect(400)
          .then((response) => {
            expect(response.body.msg).toBe("Bad Request");
          });
      });
      test("GET:404 responds with an appropriate status and error message when given a non-existent id", () => {
        return request(app)
          .get("/api/articles/999999/comments")
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe("article ID does not exist");
          });
      });
    });
  });
  describe("POST /api/articles/:article_id/comments", () => {
    test("POST:201 takes an article id and inserts a new comment to the db and responds with the posted comment", () => {
      const newComment = {
        username: "butter_bridge",
        body: "This is a test",
      };
      return request(app)
        .post("/api/articles/4/comments")
        .send(newComment)
        .expect(201)
        .then((response) => {
          expect(response.body.comment.article_id).toBe(4);
          expect(response.body.comment.author).toBe("butter_bridge");
          expect(response.body.comment.body).toBe("This is a test");
        });
    });
    test("POST:400 responds with an appropriate status and error message when not provided adeqaute data", () => {
      return request(app)
        .post("/api/articles/4/comments")
        .send({
          body: "This is a test",
        })
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe("Bad Request");
        });
    });
    test("POST:404 responds with an appropriate status and error message when given a non-existent id", () => {
      const newComment = {
        username: "butter_bridge",
        body: "This is a test",
      };
      return request(app)
        .post("/api/articles/999999/comments")
        .send(newComment)
        .expect(404)
        .then((response) => {
          expect(response.body.msg).toBe("article ID does not exist");
        });
    });
  });
  describe("PATCH /api/articles/:article_id", () => {
    test("200: updates article.votes by reciveing object and article id, then responds to client with updated article", () => {
      const update = { inc_votes: 50 };
      return request(app)
        .patch("/api/articles/1")
        .send(update)
        .expect(200)
        .then(({ body }) => {
          expect(body.updatedArticle).toBeInstanceOf(Object);
          expect(body.updatedArticle.votes).toBe(150);
        });
    });
    test("200: if article does not have votes, updates and returns article", () => {
      const update = { inc_votes: 50 };
      return request(app)
        .patch("/api/articles/2")
        .send(update)
        .expect(200)
        .then(({ body }) => {
          expect(body.updatedArticle).toBeInstanceOf(Object);
          expect(body.updatedArticle.votes).toBe(50);
        });
    });
    test("PATCH:400 responds with an appropriate status and error message when not provided adeqaute data", () => {
      const update = { inc_votes: "string" };
      return request(app)
        .patch("/api/articles/4")
        .send(update)
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe("Bad Request");
        });
    });
    test("PATCH:404 responds with an appropriate status and error message when given a non-existent id", () => {
      const update = { inc_votes: 50 };
      return request(app)
        .patch("/api/articles/999999")
        .send(update)
        .expect(404)
        .then((response) => {
          expect(response.body.msg).toBe("article ID does not exist");
        });
    });
  });
  describe("DELETE /api/comments/:comment_id", () => {
    test("204: delete given comment by comment_id and response with status 204 and no content", () => {
      return request(app).delete("/api/comments/1").expect(204);
    });
    test("DELETE:400 responds with an appropriate status and error message when not provided adeqaute data", () => {
      return request(app).delete("/api/comments/not-a-number").expect(400);
    });
    test("DELETE:404 responds with an appropriate status and error message when given a non-existent id", () => {
      const update = { inc_votes: 50 };
      return request(app).delete("/api/comments/999999").expect(404);
    });
  });
  describe("GET /api/users", () => {
    test("200: returns all data from users when requesting all data", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          body.data.forEach((users) => {
            expect(typeof users.username).toBe("string");
            expect(typeof users.name).toBe("string");
            expect(typeof users.avatar_url).toBe("string");
          });
        });
    });
    test("404: get 404 response", () => {
      return request(app)
        .get("/api/userz")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe(undefined);
        });
    });
  });
  describe("GET /api/articles (sorting queries)", () => {
    test("200: accept a sort_by query, and order response by the given column name and given order (ASC/DESC)", () => {
      return request(app)
        .get("/api/articles?sort_by=title&order=asc")
        .expect(200)
        .then(({ body }) => {
          expect(body.data).toBeSortedBy("title", { descending: false });
        });
    });
    test("400: reject if sort_by value is not valid", () => {
      return request(app)
        .get("/api/articles?sort_by=thisisnotvalid&order=asc")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad Request");
        });
      // note for review - I was going to test regarding defaults that i have added if not arugment is given for sort_by or desc, however the default is passing as the previous describe block "GET /api/articles/" would fail otherwise.
    });
  });
  describe("GET /api/articles (topic queries)", () => {
    test("200: should filter by given topic value and return matching topic values", () => {
      return request(app)
        .get("/api/articles?sort_by=topic&topicvalue=cats")
        .expect(200)
        .then(({ body }) => {
          expect(body.data).toBeSortedBy("topic", { descending: true });
        });
    });
    test("400: reject if topic value is not valid", () => {
      return request(app)
        .get("/api/articles?sort_by=topic&topicvalue=imnotreal")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad Request");
        });
    });
  });
});
