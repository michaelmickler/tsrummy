import './Site.css';

import * as React from 'react';
import { Route, Switch } from 'react-router';
import Layout from './components/shared/Layout';

export const LoadingModule = () => <>Loading ....</>;

const Home = React.lazy(() => import("./components/routes/Home/Index"));
const Rummy = React.lazy(() => import("./components/routes/Rummy/Index"));

export const App: React.FC<{}> = ({}) => {

    return <Layout>
        <Switch>            
            <Route exact path="/game/:id">
                <React.Suspense fallback={<LoadingModule />}><Rummy /></React.Suspense>
            </Route>
            <Route exact path='/'>
                <React.Suspense fallback={<LoadingModule />}><Home /></React.Suspense>
            </Route>
        </Switch>
    </Layout>;

};

export default App;