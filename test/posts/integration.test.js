const request = require("supertest");
const app = require("../../src/app");

const fakeId = "61893067f2b57664077c13a2";
let id;

describe("POST /posts", () => {
  it(`should create and return a post.`, async () => {
    const body = { title: "Title", body: "testing", tags: ["tag1", "tag2"] };
    const response = await request(app).post(`/posts`).send(body);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(body);

    id = response.body._id;
  });

  it(`should return a 400 status.`, async () => {
    const body = { title: "Title" };
    const response = await request(app).post(`/posts`).send(body);

    expect(response.status).toBe(400);
    expect(response.body.occurrences.length).toBe(1);
    expect(response.body.occurrences?.[0].path).toBe("body");
    expect(response.body.occurrences?.[0].name).toBe("ValidatorError");
  });
});

describe("PUT /posts", () => {
  it(`should update and return a post.`, async () => {
    const body = { title: "newTitle", body: "updated", tags: ["onlythistag"] };
    const response = await request(app).put(`/posts/${id}`).send(body);

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(body);

    id = response.body._id;
  });

  it(`should return a 404 status.`, async () => {
    const body = { title: null };
    const response = await request(app).put(`/posts/${fakeId}`).send(body);

    expect(response.statusCode).toBe(404);
  });

  it(`should return a 400 status.`, async () => {
    const body = { title: null };
    const response = await request(app).post(`/posts`).send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.occurrences.length).toBe(2);
    expect(response.body.occurrences?.[0].path).toBe("body");
    expect(response.body.occurrences?.[1].path).toBe("title");
  });
});

describe("GET /posts", () => {
  it(`should return all posts.`, async () => {
    const response = await request(app).get(`/posts`);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body?.length).toBeGreaterThan(0);
  });
});

describe("DELETE /posts/:id", () => {
  it(`should delete post.`, async () => {
    const response = await request(app).delete(`/posts/${id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ deleted: true });

    id = response.body._id;
  });

  it(`should return a 404 status.`, async () => {
    const response = await request(app).delete(`/posts/${fakeId}`);
    expect(response.statusCode).toBe(404);
  });
});
