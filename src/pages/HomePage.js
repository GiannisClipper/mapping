import "./style/pages.css";
import { Page } from '../app/Page';
import { SingleColumn } from '../app/Main';
import { Welcome, Logo } from "../app/App";

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