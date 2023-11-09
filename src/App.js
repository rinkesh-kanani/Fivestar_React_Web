import React, { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Spinner } from 'reactstrap';
import { Route, Router, Switch } from 'react-router-dom';
import './components/@vuexy/rippleButton/RippleButton';

import 'react-perfect-scrollbar/dist/css/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import UserPreferenceSingleton from './helpers/UserPreferenceSingleton';
import { setCurrentUser } from './redux/actions/auth/authActions';
import { ContextLayout } from './utility/context/Layout';
import routes from './routes';
import { history } from './history';

const RouteConfig = ({ component: Component, fullLayout, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return (
        <ContextLayout.Consumer>
          {(context) => {
            const LayoutTag = fullLayout === true ? context.fullLayout : context.VerticalLayout;
            return (
              <LayoutTag {...props} permission={props.user}>
                <Suspense fallback={<Spinner />}>
                  <Component {...props} />
                </Suspense>
              </LayoutTag>
            );
          }}
        </ContextLayout.Consumer>
      );
    }}
  />
);

const App = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const user = UserPreferenceSingleton.getInstance().getCurrentUser();
    if (user) {
      dispatch(setCurrentUser(user));
    }
  }, [dispatch]);

  const routeComponents = routes.map((r, i) => {
    return <RouteConfig key={i} {...r} />;
  });

  return (
    <Router history={history}>
      <Switch>{routeComponents}</Switch>
    </Router>
  );
};

export default App;
