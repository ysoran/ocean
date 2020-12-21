import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/home/home';

const routes = [
    {
        path: '/',
        component: () => <Home />,
        private: true,
    }
];

const MainRoutes = () => {
    return (
        <Switch>
            <Route
                exact
                path={routes.map((route) => route.path)}>
                    {routes.map((route, i) => {
                            return (
                                <Route
                                    exact
                                    key={i}
                                    path={route.path}
                                    component={route.component}
                                />
                            );
                        })}
            </Route>
        </Switch>
    );
};

export default MainRoutes;
