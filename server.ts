import { Application, Context, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const router = new Router();

router.get("/", (ctx: Context) => {
  ctx.response.body = "Hello world!";
});

const reverse = (phrase: string) => {
  return phrase.split(" ").reverse().join(" ");
};

router.get("/tufrase", (ctx: Context) => {
  const queryParams = ctx.request.url.searchParams;
  const phrase = queryParams.get("phrase");
  const newPrhase = reverse(phrase);
  ctx.response.status = 200;
  ctx.response.body = `
    <!DOCTYPE html>
    <html>
      <head><title>Frase al reves</title><head>
      <body>
        <h1 style="color: blue; text-align: center;">${newPrhase}</h1>
      </body>
    </html>
    `;
});

app.use(router.routes());

app.listen({ port: 3000 });

console.log("Server listening port 3000");
