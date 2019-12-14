const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const BASE_DIR = path.join(__dirname, "../..");
const FIXTURES_DIR = path.join(BASE_DIR, "spec/fixtures");
const WORKSPACE_DIR = path.join(BASE_DIR, "spec-workspace");

module.exports = {
  beforeAll: function(done) {
    try {
      createWorkspace();
      createProject();
      done();
    } catch (err) {
      done.fail(err);
    }
  },
  afterAll: function(done) {
    try {
      deleteWorkspace();
      done();
    } catch (err) {
      done.fail(err);
    }
  },
  beforeEach: function(done) {
    try {
      deleteDist();
      done();
    } catch (err) {
      done.fail(err);
    }
  },
  test: function(done, spec) {
    try {
      copyConfig(spec);
      runBuild();
      const actual = getActual();
      const expected = getExpected(spec);
      expect(actual).toBe(expected);
      done();
    } catch (err) {
      done.fail(err);
    }
  }
};

function createWorkspace() {
  execSync(`mkdir --parents "${WORKSPACE_DIR}"`);
}

function deleteWorkspace() {
  execSync(`rm -rf "${WORKSPACE_DIR}"`);
}

function createProject() {
  const dir = `cd "${WORKSPACE_DIR}"`;
  const cmd = "vue create --default --force vue-cli-project";
  execSync(`${dir} && ${cmd}`);
}

function deleteDist() {
  execSync(`rm -rf "${WORKSPACE_DIR}/vue-cli-project/dist"`);
}

function copyConfig(spec) {
  const src = `${FIXTURES_DIR}/vue-cli/${spec}/vue.config.js`;
  const dst = `${WORKSPACE_DIR}/vue-cli-project/vue.config.js`;
  execSync(`cp "${src}" "${dst}"`);
}

function runBuild() {
  const dir = `cd "${WORKSPACE_DIR}/vue-cli-project"`;
  const cmd = "npm run build";
  execSync(`${dir} && ${cmd}`);
}

function getActual() {
  return fs.readFileSync(
    `${WORKSPACE_DIR}/vue-cli-project/dist/index.html`,
    "utf-8"
  );
}

function getExpected(spec) {
  return fs.readFileSync(`${FIXTURES_DIR}/vue-cli/${spec}/index.html`, "utf-8");
}
