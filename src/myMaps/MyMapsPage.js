import { Page } from '../app/Page';
import { SingleColumn } from '../app/Main';
import { MyMapsList } from './MyMapsList';

function MyMapsPage() {
    return (
        <Page className="MyMapsPage">
            <SingleColumn>
                <MyMapsList />
            </SingleColumn>
        </Page>
    );
}

export { MyMapsPage };