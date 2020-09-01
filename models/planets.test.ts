//Deno Includes
import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std@0.53.0/testing/asserts.ts";

//Test runner in the CLI
//Built in text fixtures with Deno.test().
//Assertion statements

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
    setTimeout(console.log, 10);
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
