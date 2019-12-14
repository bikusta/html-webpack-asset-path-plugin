const helper = require("./helpers/vue-cli");

describe("HtmlWebpackAssetPathPlugin", function() {
  describe("in combination with Vue CLI", function() {
    beforeAll(helper.beforeAll, 60000);
    afterAll(helper.afterAll);
    beforeEach(helper.beforeEach);

    it("should do nothing by default", function(done) {
      helper.test(done, "nothing");
    }, 30000);

    it("should allow for custom asset paths", function(done) {
      helper.test(done, "everything");
    }, 30000);

    it("should allow for a blank CSS prefix", function(done) {
      helper.test(done, "blank-css-prefix");
    }, 30000);

    it("should allow for a blank CSS suffix", function(done) {
      helper.test(done, "blank-css-suffix");
    }, 30000);

    it("should allow for a custom CSS prefix", function(done) {
      helper.test(done, "custom-css-prefix");
    }, 30000);

    it("should allow for a custom CSS suffix", function(done) {
      helper.test(done, "custom-css-suffix");
    }, 30000);

    it("should allow for a blank JS prefix", function(done) {
      helper.test(done, "blank-js-prefix");
    }, 30000);

    it("should allow for a blank JS suffix", function(done) {
      helper.test(done, "blank-js-suffix");
    }, 30000);

    it("should allow for a custom JS prefix", function(done) {
      helper.test(done, "custom-js-prefix");
    }, 30000);

    it("should allow for a custom JS suffix", function(done) {
      helper.test(done, "custom-js-suffix");
    }, 30000);
  });
});
