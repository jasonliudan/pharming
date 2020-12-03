import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import store, { history } from './store';

import { createGlobalStyle } from 'styled-components';
import Header from 'components/header';
import Farm from 'screens/farm';
import GeoFont from 'assets/fonts/Geo-Regular.ttf';

class App extends Component {


  render() {
    return (
      <Provider store={store}>
        <Router history={history} basename={'/pharming'}>
          <GlobalStyle />
          <div className="bgdiv">
            <Header />

            <div className="mainArea">
              <Switch>
                <Route exact path="/pharming" component={Farm} />
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

  .header{
    width: 40%;
    @media only screen and (min-width: 900px) and (max-width: 1024px){
      width: 30%;
    }
    @media only screen and (max-width: 900px){
      width: 100%;
    }
  }
  .bgdiv {
    display: flex;
    justifyContent: flex-between;
    background-color: #4a9eff;
    height: 100%;
    background-position: center;
    background-size: cover;
    position: relative;
    color: white;
    font-size: 25px;
    overflow: auto;
    @media only screen and (max-width: 900px){
      flex-direction: column;
    }
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

  .mainArea {
    width: 60%;    
    margin-left: 20px;
    text-align: center;
    @media only screen and ( min-width: 900px) and (max-width: 1024px){
      width: 70%;
    }
    @media only screen and (max-width: 900px){
      width: 100%;
      margin: 0px;
    }
  }

  .cardWrapper{
    width: 50%;
    textAlign: center;
    @media screen and (max-width: 900px) {
      width: 100%;
      margin-bottom: 40px;
    }
  }
`;

export default App;
