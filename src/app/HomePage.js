import './style/homePage.css';

import { Page } from './Page';
import { SingleColumn } from '../_templates/Main';

function Logo() {

    return <div className="Logo"><img src="mapping-logo.svg" alt="Mapping application" /></div>
}

function HomePage() {

    return (
        <Page className="HomePage">
            <SingleColumn>
                <Logo /> 
            </SingleColumn>
        </Page>
    );
}

export { HomePage };