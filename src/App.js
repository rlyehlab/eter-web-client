import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

// Bootstrap styles
import 'bootstrap/dist/css/bootstrap.min.css';
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
import '@coreui/react';
// Default CoreUI styles
import '@coreui/coreui/dist/css/coreui.min.css';

// Core
import { layouts, scenes as CoreScenes } from './modules/core';
// Apollo
import { client } from './modules/apollo';
// routes and navigation
import navigation from './_nav';
import routes from './routes';

class App extends Component {
  render() {
    console.log("App");
    console.log(this.props);
    return (
      <ApolloProvider client={client} >
        <HashRouter>
          <Switch>
            <Route exact path="/login" name="Login Page" component={CoreScenes.Page404} />
            <Route exact path="/register" name="Register Page" component={CoreScenes.Page404} />
            <Route exact path="/404" name="Page 404" component={CoreScenes.Page404} />
            <Route exact path="/500" name="Page 500" component={CoreScenes.Page500} />
            <Route path="/" name="Home" render={props=> <layouts.DefaultLayout {...props} {...{routes, navigation}}/>} />
          </Switch>
        </HashRouter>
      </ApolloProvider>
    );
  }
}

export default App;