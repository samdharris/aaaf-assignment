#!/usr/bin/env node
const argsv = require("yargs")
    .usage("Seeds the database.")
    .demand("total-entities").alias("total-entities", "te")
    .number('total-entities')
    .describe("total-entities", "Total number of entities to generate in this run.")
    .argv;
const seeder = require("../src/database/seeding");
const assert = require("assert");

assert(argsv.te % 4 === 0, "total-entities MUST be divisable by 4!");
seeder.run(argsv.te);