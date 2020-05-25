import React from 'react';
import ReactDom from 'react-dom'
import {Provider} from 'react-redux'
import Moovie from './Components/Moovie/Moovie'
import Routes from './Routes/Routers'
import store from './Store//index'


ReactDom.render((
<Provider store={store}>
    <div>
    <Routes/>
    </div>
</Provider>
), document.getElementById('root'));   