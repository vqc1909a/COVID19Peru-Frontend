import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/layouts/Header';
import HeaderMobile from './components/layouts/HeaderMobile';
import Home from './views/HomeView';
import { DarkModeProvider } from './context/DarkModeContext';
import { PeruProvider } from './context/PeruContext';
import { DepartamentoProvider } from './context/DepartamentoContext';
import SearchView from './views/SearchView';
import DepartamentoView from './views/DepartamentView';
import MapView from './views/MapView';
import PageNotFoundView from './views/PageNotFoundView';
import DeveloperView from './views/DeveloperView';

import PageNotFoundRedirect from  './components/RedirectRoutes/PageNotFoundRedirect';

function App() {
  return (
    <DepartamentoProvider>
      <PeruProvider>
        <DarkModeProvider>
          <Router>
            <Header></Header>
            <main>
              <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/busqueda" component={SearchView}></Route>
                <PageNotFoundRedirect exact path="/departamento/:departamento" component={DepartamentoView}></PageNotFoundRedirect>
                <Route exact path="/mapa" component={MapView}></Route>
                <Route exact path="/pagenotfound" component={PageNotFoundView}></Route>
                <Route exact path="/api" component={DeveloperView}></Route>
                <Route exact path="/*" component={PageNotFoundView}></Route>
              </Switch>
            </main>
            <HeaderMobile></HeaderMobile>
          </Router>
        </DarkModeProvider>
      </PeruProvider>
    </DepartamentoProvider>
  );
}

export default App;
