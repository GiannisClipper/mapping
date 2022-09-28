import { Page } from '../app/Page';
import { SingleColumn } from '../_templates/Main';
import { SearchList } from "./SearchList";

function SearchPage() {
    return (
        <Page>
            <SingleColumn>
                <SearchList />
            </SingleColumn>
        </Page>
    );
}

export { SearchPage };