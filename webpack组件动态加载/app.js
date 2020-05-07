import Home from "./home";

const Router = () => {
  return (
    <Switch>
      {/* <Route path="/" component={moduleHtml(Blog)} />
          <Route path="/article" component={moduleHtml(Article)} />
          <Route path="/write" component={moduleHtml(Write)} /> */}
      <Route exact path="/" component={Home} />
      <Route exact path="/foo" component={Article} />
      <Route exact path="/bar" component={Write} />
    </Switch>
  );
};

export default Router;
