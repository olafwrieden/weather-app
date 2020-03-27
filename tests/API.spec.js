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
    let weather = JSON.parse(await getWeather("Auckland"));
    expect(weather).to.be.an("object");
    expect(weather).to.not.be.undefined;
    expect(weather)
      .to.have.property("main")
      .to.be.an("object");
    expect(weather)
      .to.have.property("weather")
      .to.be.an("array")
      .of.length(1);
  });
});
