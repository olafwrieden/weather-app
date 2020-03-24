const chai = require("chai");
const expect = chai.expect;
const server = require("../../server").server;
const getWeather = require("../../server").getWeather;
const { Given, When, Then, After } = require("cucumber");

// TEST
Given("my city is Auckland", function () {
  this.city = "Auckland";
});

When("I ask for the weather", async function () {
    this.actualAnswer = JSON.parse(await getWeather(this.city));
});

Then("I should be told the weather", function () {
    expect(this.actualAnswer).to.be.an("object");
    expect(this.actualAnswer).to.not.be.undefined;
    expect(this.actualAnswer)
      .to.have.property("weather")
      .to.be.an("array")
      .of.length(1);
});

Then('the weather should contain temperature and timezone', function () {
  expect(this.actualAnswer)
  expect(this.actualAnswer)
    .to.have.property("main")
    .to.be.an("object")
    .to.have.property("temp")
    .to.be.a("number")
  expect(this.actualAnswer)
    .to.have.property("timezone")
    .to.be.a("number")
});

Given("my city is AEIOU", function () {
  this.city = "AEIOU";
});

Then('I will be told about the error', function () {
  expect(this.actualAnswer)
    .to.be.a("string")
    .to.equal("Data error, please try again.")
});

// STOP API SERVER
After(function () {
  server.close();
});