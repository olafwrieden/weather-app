const chai = require("chai");
const expect = chai.expect;
const getWeather = require("../server").getWeather;

// Stop API Server
after(() => {
  process.exit(0);
});

// Testing
describe("Get Weather Data", () => {
  it("should return Auckland data", async function() {
    let aucklandWeather = JSON.parse(await getWeather("Auckland"));
    expect(aucklandWeather).to.be.an("object");
    expect(aucklandWeather).to.not.be.undefined;
    expect(aucklandWeather)
      .to.have.property("weather")
      .to.be.an("array")
      .of.length(1);
    expect(aucklandWeather)
    expect(aucklandWeather)
      .to.have.property("main")
      .to.be.an("object")
      .to.have.property("temp")
      .to.be.a("number");
    expect(aucklandWeather)
      .to.have.property("timezone")
      .to.be.a("number");
  });
  it("should reject fake city", async function() {
    let fakeWeather = JSON.parse(await getWeather("AEIOU"));
    expect(fakeWeather)
    .to.be.a("string")
    .to.not.be.undefined;
    expect(fakeWeather)
      .to.equal("Data error, please try again.");
  });
});
