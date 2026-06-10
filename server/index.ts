import { Hono } from "hono"

import { serve } from "@hono/node-server"
import { serveStatic } from "@hono/node-server/serve-static"

import dotenv from "dotenv"

import QuestionRouter from "./router/router.question";
import ResultRouter from "./router/router.result";
import { readFile } from "fs/promises";
import path from "path";

dotenv.config({ quiet: true });
   
const App = new Hono();
const ApiRouter = new Hono();

ApiRouter.route("/", QuestionRouter);
ApiRouter.route("/", ResultRouter);

App.route("/api", ApiRouter);
  
App.get("/health", async c => c.text(`${process.env.NODE_ENV} health check success!!`));
 
const port = Number(process.env.PORT ?? 9462);

if(process.env.NODE_ENV === "production") {
  App.use('*', serveStatic({ root: './dist' }));

  App.get('*', async c => {

    const html = await readFile(path.resolve("dist/index.html"), "utf-8");

    return c.html(html);
  })
}
 
serve({
    port,
    fetch: App.fetch,
}, () => {
    console.log(`'${process.env.NODE_ENV}' connect ${port}`)
});
  