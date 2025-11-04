import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";
import * as communityController from "./controllers/communityController.js";

const app = new Hono();

app.use("/*", cors());
app.use("/*", logger());

app.post("/api/communities", communityController.create);
app.get("/api/communities", communityController.readAll);
app.get("/api/communities/:communityId", communityController.readOne);
app.delete("/api/communities/:communityId", communityController.deleteOne);


export default app;