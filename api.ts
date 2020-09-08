import { Router } from "https://deno.land/x/oak@v5.0.0/mod.ts";

import * as planets from "./models/planets.ts";

const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = "Mission Control API";
});

router.get("/planets", (ctx) => {
  throw new Error("Sample Error");
  ctx.response.body = planets.getAllPlanets();
});

export default router;
