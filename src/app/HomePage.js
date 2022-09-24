import { Page } from './Page';
import { SingleColumn } from './Main';
import { Welcome, Logo } from "./App";

function HomePage( { payload } ) {

    return (
        <Page className="HomePage">
            <SingleColumn>
                { payload && payload.isWelcome 
                ? <Welcome /> 
                : <Logo /> 
                }
            </SingleColumn>
        </Page>
    );
}

export { HomePage };