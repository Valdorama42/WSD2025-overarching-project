import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";
import * as communityController from "./controllers/communityController.js";
import * as postController from "./controllers/postController.js";
import * as commentController from "./controllers/commentController.js";
import * as authController from "./controllers/authController.js";

const app = new Hono();

app.use("/*", cors());
app.use("/*", logger());

app.post("/api/auth/register", authController.register);
app.post("/api/auth/login", authController.login);

app.post("/api/communities", communityController.create);
app.get("/api/communities", communityController.readAll);
app.get("/api/communities/:communityId", communityController.readOne);
app.delete("/api/communities/:communityId", communityController.deleteOne);

app.post("/api/communities/:communityId/posts", postController.create);
app.get("/api/communities/:communityId/posts", postController.readAll);
app.get("/api/communities/:communityId/posts/:postId", postController.readOne);
app.delete("/api/communities/:communityId/posts/:postId", postController.deleteOne);

app.get("/api/communities/:communityId/posts/:postId/comments", commentController.readAll);
app.post("/api/communities/:communityId/posts/:postId/comments", commentController.create);
app.delete("/api/communities/:communityId/posts/:postId/comments/:commentId", commentController.deleteOne);


export default app;