"use strict";

const path = require("path");
const test = require("japa");
const { ioc, registrar, resolver } = require("@adonisjs/fold");
const { Helpers, Config } = require("@adonisjs/sink");

test.group("Providers", group => {
  test("ScaffoldProvider", async assert => {
    expect({ number: 2 }).toEqual({
      number: 2
    });
  });
});
