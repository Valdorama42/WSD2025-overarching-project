// This version of the application does not do 
// data validation or thorough error handling. 
// Also this version uses hardcoded jwt secrets
// which are not viable for production

import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";
import * as communityController from "./controllers/communityController.js";
import * as postController from "./controllers/postController.js";
import * as commentController from "./controllers/commentController.js";
import * as authController from "./controllers/authController.js";
import * as middlewares from "./middlewares.js";

const app = new Hono();

app.use("/*", cors());
app.use("/*", logger());

//Authentication
app.post("/api/auth/register", authController.register);
app.post("/api/auth/login", authController.login);

//Community Routes
app.post("/api/communities", middlewares.authenticate, communityController.create);
app.delete("/api/communities/:communityId", middlewares.authenticate, communityController.deleteOne);
app.get("/api/communities", communityController.readAll);
app.get("/api/communities/:communityId", communityController.readOne);

//Post Routes
app.post("/api/communities/:communityId/posts", middlewares.authenticate, postController.create);
app.delete("/api/communities/:communityId/posts/:postId", middlewares.authenticate, postController.deleteOne);
app.get("/api/communities/:communityId/posts", postController.readAll);
app.get("/api/communities/:communityId/posts/:postId", postController.readOne);

//Voting Routes
app.post("/api/communities/:communityId/posts/:postId/upvote", middlewares.authenticate, postController.upVote);
app.post("/api/communities/:communityId/posts/:postId/downvote", middlewares.authenticate, postController.downVote);
app.post("/api/communities/:communityId/posts/:postId/comments/:commentId/upvote", middlewares.authenticate, commentController.upVote);
app.post("/api/communities/:communityId/posts/:postId/comments/:commentId/downvote", middlewares.authenticate, commentController.downVote);

//Comment Routes
app.get("/api/communities/:communityId/posts/:postId/comments", commentController.readAll);
app.post("/api/communities/:communityId/posts/:postId/comments", middlewares.authenticate, commentController.create);
app.delete("/api/communities/:communityId/posts/:postId/comments/:commentId", middlewares.authenticate, commentController.deleteOne);


export default app;