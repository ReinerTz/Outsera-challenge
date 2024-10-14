import request from "supertest";
import { startServer } from "../core/initializeServer";

describe("Producers Award Intervals", () => {
  let app;
  let server;

  beforeAll(async () => {
    const result = await startServer(3001); // Obtemos ambas instâncias: `app` e `server`
    app = result.app; // Instância do Express
    server = result.server; // Servidor HTTP
  });

  afterAll(async () => {
    await new Promise((resolve, reject) => {
      server.close((err) => {
        // Fechamos o servidor HTTP aqui
        if (err) return reject(err);
        resolve();
      });
    });
  });

  it("should return producers with max and min award intervals", async () => {
    const res = await request(app).get("/api/producers/awards-intervals");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("max");
    expect(res.body).toHaveProperty("min");
  }, 50000);
});
