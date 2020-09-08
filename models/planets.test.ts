//Deno Includes
import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std@0.53.0/testing/asserts.ts";

import * as log from "https://deno.land/std/log/mod.ts";

import { filtersHabitablePlanets } from "./planets.ts";

//Test runner in the CLI
//Built in text fixtures with Deno.test().
//Assertion statements

const HABITABLE_PLANET = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1",
  koi_srad: "1",
  koi_smass: "1",
};

const NOT_CONFIRMED = {
  koi_disposition: "FALSE POSITIVE",
};

const TOO_LARGE_PLANETARY_RADIUS = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1.5",
  koi_srad: "1",
  koi_smass: "1",
};

const TOO_LARGE_SOLAR_RADIUS = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1",
  koi_srad: "1.01",
  koi_smass: "1",
};

const TOO_LARGE_SOLAR_MASS = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1",
  koi_srad: "1",
  koi_smass: "1.04",
};
Deno.test("filter only habitable planets", () => {
  const filtered = filtersHabitablePlanets([
    HABITABLE_PLANET,
    NOT_CONFIRMED,
    TOO_LARGE_PLANETARY_RADIUS,
    TOO_LARGE_SOLAR_RADIUS,
    TOO_LARGE_SOLAR_MASS,
  ]);
  assertEquals(filtered, [
    HABITABLE_PLANET,
  ]);
});

//Random testing, showing what Deno can do =>
//Shorter and better
Deno.test("short example test", () => {
  assertEquals("deno", "deno");
  assertNotEquals({
    runtime: "deno",
  }, {
    runtime: "node",
  });
});

//Too verbose
Deno.test({
  name: "example test",
  //Ignore if os is windows
  ignore: Deno.build.os === "windows",
  fn() {
    assertEquals("deno", "deno");
    assertNotEquals({
      runtime: "deno",
    }, {
      runtime: "node",
    });
  },
});

Deno.test({
  //Test case is leaking async ops.
  name: "ops",
  sanitizeOps: false,
  fn() {
    setTimeout(log.info, 10);
  },
});

Deno.test({
  name: "resource leak",
  sanitizeResources: false,

  //Make sure to close all open resource handles returned from Deno APIs before to prevent this -> AssertionError: Test case is leaking resources.
  async fn() {
    await Deno.open("./models/planets.ts");
  },
});
