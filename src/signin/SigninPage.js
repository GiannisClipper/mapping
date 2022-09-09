import { useContext } from "react";
import { AppContext } from "../app/AppContext";
import { SearchContext } from "../search/SearchContext";
import { MyMapsContext } from "../myMaps/MyMapsContext";
import { Page, SingleColumn } from "../app/Page";
import { Input } from "../_commons/Input";
import { Button } from "../_commons/Button";

function SigninPage() {
    const { setUsername, setPage } = useContext( AppContext );
    const searchContext = useContext( SearchContext );
    const myMapsContext = useContext( MyMapsContext );

    setUsername( "john" ); 
    searchContext.setMaps( [] ); 
    myMapsContext.setMaps( [] ); 
    setPage( "HOME" );

    return (
        <Page>
            {/* <SingleColumn>
                <Input />
                <Input />
                <Button />
            </SingleColumn> */}
        </Page>
    );
}

export { SigninPage };
