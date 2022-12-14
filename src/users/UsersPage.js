import { Page } from '../app/Page';
import { SingleColumn } from '../_templates/Main';
import { UsersList } from './UsersList';

function UsersPage() {
    return (
        <Page className="UsersPage">
            <SingleColumn>
                <UsersList />
            </SingleColumn>
        </Page>
    );
}

export { UsersPage };