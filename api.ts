import { Context, Router } from "https://deno.land/x/oak@v5.0.0/mod.ts";

import * as planets from "./models/planets.ts";
import * as launches from "./models/launches.ts";
import { assertThrowsAsync } from "https://deno.land/std@0.53.0/testing/asserts.ts";

const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = "Mission Control API";
});

router.get("/planets", (ctx) => {
  //Can also change the error code to smth like 501 to specify the error message
  //ctx.throw(401, "Sorry, Planets aren't available!");
  ctx.response.body = planets.getAllPlanets();
});

router.get("/launches", (ctx) => {
  ctx.response.body = launches.getAll();
});

//Passing in the colon syntax ID
router.get("/launches/:id", (ctx) => {
  //using the '?' so we return an undefined if the params field doesn't exist. Instead of returning an error.
  //could have also used (if ctx.params && ctx.params.id)
  if (ctx.params?.id) {
    const launchesList = launches.getOne(Number(ctx.params.id));
    if (launchesList) {
      console.log(launchesList, "launcheslist");
      ctx.response.body = launchesList;
    } else {
      ctx.throw(400, "Launch with that ID doesn't exist");
    }
  }
});

router.delete("/launches/:id", (ctx) => {
  if (ctx.params?.id) {
    const result = launches.removeOne(Number(ctx.params.id));
    ctx.response.body = { success: result };
  }
});

router.post("/launches", async (ctx) => {
  const body = await ctx.request.body();

  launches.addOne(body.value);

  ctx.response.body = { success: true };
  ctx.response.status = 201;
});

export default router;
