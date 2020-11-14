import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import store, { history } from './store';

import { createGlobalStyle } from 'styled-components';
import Header from 'components/header';
import Farms from 'screens/farms';
import Farm from 'screens/farm';
import GeoFont from 'assets/fonts/Geo-Regular.ttf';

class App extends Component {


  render() {
    return (
      <Provider store={store}>
        <Router history={history} basename={'/pharming'}>
          <GlobalStyle />
          <div className="bgimg">
            <Header />

            <div className="middle">
              <Switch>
                <Route exact path="/" component={Farms} />
                <Route exact path="/farm/:pid" component={Farm} />
              </Switch>
            </div>

          </div>
        </Router>
      </Provider>
    );
  }
}


export const GlobalStyle = createGlobalStyle`  
  @font-face {
    font-family: 'Geo';
    src: url(${GeoFont});
  }
  #root {
    height: 100vh;
  }
  p{
    margin: 10px 0px;
  }

  .bgimg {
    background-image: url('https://www.w3schools.com/w3images/forestbridge.jpg');
    height: 100%;
    background-position: center;
    background-size: cover;
    position: relative;
    color: white;
    font-size: 25px;
  }

  .topleft {
    position: absolute;
    top: 0;
    left: 16px;
  }
  .topright {
    position: absolute;
    top: 0;
    right: 16px;
  }

  .bottomleft {
    position: absolute;
    bottom: 0;
    left: 16px;
  }

  .middle {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 1000px;
    transform: translate(-50%, -50%);
    text-align: center;
  }
`;

export default App;
