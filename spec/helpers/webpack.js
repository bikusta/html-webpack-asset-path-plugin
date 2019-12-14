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
  const src = `${FIXTURES_DIR}/webpack/project`;
  const dst = `${WORKSPACE_DIR}/webpack-project`;
  const cmd = [
    `cp -r "${src}" "${dst}"`,
    `cd ${WORKSPACE_DIR}/webpack-project`,
    "npm install"
  ];
  execSync(cmd.join(" && "));
}

function deleteDist() {
  execSync(`rm -rf "${WORKSPACE_DIR}/webpack-project/dist"`);
}

function copyConfig(spec) {
  const src = `${FIXTURES_DIR}/webpack/${spec}/webpack.config.js`;
  const dst = `${WORKSPACE_DIR}/webpack-project/webpack.config.js`;
  execSync(`cp "${src}" "${dst}"`);
}

function runBuild() {
  const cmd = [`cd "${WORKSPACE_DIR}/webpack-project"`, "npm run build"];
  execSync(cmd.join(" && "));
}

function getActual() {
  return fs.readFileSync(
    `${WORKSPACE_DIR}/webpack-project/dist/index.html`,
    "utf-8"
  );
}

function getExpected(spec) {
  return fs.readFileSync(`${FIXTURES_DIR}/webpack/${spec}/index.html`, "utf-8");
}
