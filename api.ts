import { Router } from "https://deno.land/x/oak@v5.0.0/mod.ts";

import * as planets from "./models/planets.ts";

const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = "Mission Control API";
});

router.get("/planets", (ctx) => {
  //Can also change the error code to smth like 501 to specify the error message
  //ctx.throw(401, "Sorry, Planets aren't available!");
  ctx.response.body = planets.getAllPlanets();
});

export default router;
