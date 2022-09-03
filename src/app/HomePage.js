import { Page } from './Page';
import { SingleColumn } from './Main';
import { Welcome, Logo } from "./App";

function HomePage( { welcome } ) {

    return (
        <Page className="HomePage">
            <SingleColumn>{ welcome 
                ? <Welcome /> 
                : <Logo /> }
            </SingleColumn>
        </Page>
    );
}

export { HomePage };