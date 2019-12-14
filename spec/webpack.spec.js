const helper = require("./helpers/webpack");

describe("HtmlWebpackAssetPathPlugin", function() {
  describe("in combination with webpack", function() {
    beforeAll(helper.beforeAll, 60000);
    afterAll(helper.afterAll);
    beforeEach(helper.beforeEach);

    it("should do nothing by default", function(done) {
      helper.test(done, "nothing");
    }, 30000);

    it("should allow for custom asset paths", function(done) {
      helper.test(done, "everything");
    }, 30000);
  });
});
