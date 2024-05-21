//import request from "supertest";
import { connectDB } from "../server";
import db from "../config/db";



jest.mock("../config/db");

describe("conectarDB", () => {
  it("should handle database connection error", async () => {
    jest
      .spyOn(db, "authenticate")
      .mockRejectedValueOnce(new Error("Hubo un error al conectar a la base de datos"));
      const consoleSpy = jest.spyOn(console, "log")

      await connectDB()

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining("Hubo un error al conectar a la base de datos")
      )
  });
});

/*describe("Get /api", () => {
  it("should send back a json response", async () => {
    const res = await request(server).get("/api");

    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body.msg).toBe("Desde Api");

    expect(res.status).not.toBe(404);
    expect(res.body.msg).not.toBe("desde api");
  });
});*/