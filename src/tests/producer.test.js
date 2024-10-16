import request from "supertest";
import { startServer } from "../core/initializeServer.js";

describe("Producers Award Intervals", () => {
  let app;
  let server;

  beforeAll(async () => {
    const result = await startServer(3001);
    app = result.app;
    server = result.server;
  });

  afterAll(async () => {
    await new Promise((resolve, reject) => {
      server.close((err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  });

  it("should return producers with correct max and min award intervals", async () => {
    const res = await request(app).get("/api/producers/awards-intervals");

    const expectedResponse = {
      max: [
        {
          producer: "Matthew Vaughn",
          previousWin: 2002,
          followingWin: 2015,
          interval: 13,
        },
      ],
      min: [
        {
          producer: "Joel Silver",
          previousWin: 1990,
          followingWin: 1991,
          interval: 1,
        },
      ],
    };

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("max");
    expect(res.body).toHaveProperty("min");
    expect(res.body).toMatchObject(expectedResponse);
  }, 50000);
});
