import { combineReducers } from 'redux'; // por si tenemos que combinar varios reducers
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import jobReducer from './reducers/jobReducer'; // importo uno de los reducers
import { loaderReducer } from './reducers/loaderReducer';
import userReducer from './reducers/userReducer';

const rootReducers = combineReducers({   // creo objeto combinando  los distintos reducers 
    jobReducer: jobReducer,
    loaderReducer: loaderReducer,
    userReducer: userReducer,
});


const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)));  // creo el stor, junto a los reducers y demas

export default store; // exporto el store para envolver la pagina   