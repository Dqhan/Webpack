import(/* webpackChunkName: "foo" */ "./foo")
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });

setTimeout(function () {
  import(/* webpackChunkName: "bar" */ "./bar")
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log(e);
    });
}, 3000);
