import 'remixicon/fonts/remixicon.css';
import './style/app.css';

import { AppContextProvider } from './AppContext';
import { SearchContextProvider } from '../search/SearchContext';
import { MyMapsContextProvider } from '../myMaps/MyMapsContext';
import { MapContextProvider } from '../map/MapContext';
import { Router } from "./Router";

function App( props ) {

    return (
        <AppContextProvider>
        <SearchContextProvider>
        <MyMapsContextProvider>
        <MapContextProvider>
            <Router />
        </MapContextProvider>
        </MyMapsContextProvider>
        </SearchContextProvider>
        </AppContextProvider>
    );
}

function Welcome() {

    return ( 
        <div className="Welcome">Welcome to Mapping app!</div>
    );
}

function Logo() {

    return <div className="Logo"><img src="mapping-logo.svg" alt="Mapping application" /></div>
}

export default App;
export { App, Welcome, Logo };
