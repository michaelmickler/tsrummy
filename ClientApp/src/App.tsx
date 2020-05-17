import './css/Site.css';

import React from 'react';
import { Route, Switch } from 'react-router';

export const LoadingModule = () => <>Loading ....</>;

const Rummy = React.lazy(() => import("./Rummy/Index"));

export const App: React.FC<any> = ({}) => {

    return <>
        <div className="page">
            <header>
                <div>
                    <h4>TSRummy</h4>
                </div>
            </header>
            <Switch>            
                <Route path={["/game/:id?","/"]}>
                    <React.Suspense fallback={<LoadingModule />}><Rummy /></React.Suspense>
                </Route>
            </Switch>
        </div>
    </>;

};

export default App;