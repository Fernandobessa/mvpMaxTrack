import React from "react";
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { Container } from 'react-bootstrap';
import history from './history'
import axios from 'axios';
import Moovie from '../Components/Moovie/Moovie'

//Configuração do interceptor
axios.interceptors.request.use(function (config) {
  /*if (JSON.parse(window.sessionStorage.getItem('dataUsers')) && !config.url.includes('5000'))
    config.headers.Authorization = "Bearer " + JSON.parse(window.sessionStorage.getItem('dataUsers')).token*/
  return config;
}, function (err) {
  return Promise.reject(err);
});


// interceptors
axios.interceptors.response.use((response) => response, (error) => {
  let value = error.response;
  if (value.status === 401 && value.data.message === 'Expired JWT Token'
    && (!value.config || !value.config.renewToken)) {
    console.log('Token expirado');
    // renewToken performs authentication using username/password saved in sessionStorage/window.sessionStorage
    return this.renewToken().then(() => {
      error.config.baseURL = undefined; // baseURL is already present in url
      return this.axios.request(error.config);
    }).then((response) => {
      console.log('Reconecatado !');
      return response;
    });

  } else if (value.status === 401 && value.config && value.config.renewToken) {
    console.log('Conexão encerrada');

    if (error.message) {
      error.message = 'Conexão encerrada ! ' + error.message + '.';
    } else {
      error.message = 'Conexão encerrada !';
    }

  } else if (value.status === 401) {
    console.log('Acesso negado');
    window.sessionStorage.clear()
    history.push("/")
  }

  return Promise.reject(error);
});


const Routes = () => (
  <div >
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" component={Moovie} />
        </Switch>
      </ConnectedRouter>
  </div>
);

export default Routes
