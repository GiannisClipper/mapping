import 'remixicon/fonts/remixicon.css';
import '../_commons/style/index.css';

import { AppContextProvider } from './AppContext';
import { SearchContextProvider } from '../search/SearchContext';
import { SigninContextProvider } from '../signin/SigninContext';
import { MyMapsContextProvider } from '../myMaps/MyMapsContext';
import { UsersContextProvider } from '../users/UsersContext';
import { Router } from "./Router";

function App( props ) {

    return (
        <AppContextProvider>
        <SearchContextProvider>
        <SigninContextProvider>
        <MyMapsContextProvider>
        <UsersContextProvider>
            <Router />
        </UsersContextProvider>
        </MyMapsContextProvider>
        </SigninContextProvider>
        </SearchContextProvider>
        </AppContextProvider>
    );
}

export default App;
export { App };
