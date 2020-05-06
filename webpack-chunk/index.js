
require.ensure([], function () {
  require("./foo");
});

require.ensure([], function () {
  require("./bar");
});
