import { Page } from './Page';
import { SingleColumn } from '../_templates/Main';

function Error404Page() {

    return (
        <Page className="Error404Page">
            <SingleColumn>
                <div>Error 404, page not found.</div>
            </SingleColumn>
        </Page>
    );
}

export { Error404Page };