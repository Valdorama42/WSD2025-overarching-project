import * as jwt from "@hono/hono/jwt";

const JWT_SECRET = "jwt_secret" //DO NOT USE IN PRODUCTION

const authenticate = async (c, next) => {
    const authHeader = c.req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return c.json({ error: "Missing or invalid authorization header" }, 401);
    }

    const token = authHeader.substring(7);

    try {
        const payload = await jwt.verify(token, JWT_SECRET);
        c.set("user", payload);
        await next();
    } catch (err) {
        return c.json({ error: "Invalid or expired token" }, 401);
    }
};

export { authenticate };