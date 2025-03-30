import { Hono } from "hono"
import { handle } from "hono/vercel"
import users from "~/features/users/api/route"

const app = new Hono().basePath("/api")

const routes = app.route("/users", users)

export const GET = handle(app)

export type AppType = typeof routes
