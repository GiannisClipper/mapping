import { useContext } from "react";
import { SigninContext } from "../../signin/SigninContext";
import { AppContext } from "../AppContext";
import { SearchContext } from "../../search/SearchContext";
import { MyMapsContext } from "../../myMaps/MyMapsContext";
import { 
    HomeButton, SigninButton, SearchButton, MapButton, ProfileButton, UsersButton, SignoutButton,
    SaveButton, ViewButton
} from '../../_commons/Button';

function useOption() {

    const { setNextPage } = useContext( AppContext );
    const searchContext = useContext( SearchContext );
    const myMapsContext = useContext( MyMapsContext );
    const signinContext = useContext( SigninContext );
    const appContext = useContext( AppContext );

    const onClickHome = () => setNextPage( { endpoint: "/" } );
    const onClickSearch = () => setNextPage( { endpoint: "/search" } );
    const onClickSignin = () => setNextPage( { endpoint: "/signin" } );
    const onClickMyMaps = () => setNextPage( { endpoint: "/mymaps" } );
    const onClickProfile = () => setNextPage( { endpoint: "/profile" } );
    const onClickUsers = () => setNextPage( { endpoint: "/users" } );
    const onClickSignout = () => { 
        searchContext.setMaps( [] );
        myMapsContext.setMaps( [] );
        signinContext.setResponseSignin( {} );
        appContext.setMyMapsAutoRetrieve( true );
        setNextPage( { endpoint: "/" } );
    };

    const HomeOption = ( props ) => (
        <HomeButton title="Home" onClick={ onClickHome }>
            { props.children }
        </HomeButton>
    );
    const SearchOption = () => <SearchButton title="Search maps" onClick={ onClickSearch } />;
    const SigninOption = () => <SigninButton title="Signin" onClick={ onClickSignin } />;
    
    const MyMapsOption = () => <MapButton title="My maps" onClick={ onClickMyMaps } />;
    const ProfileOption = () => <ProfileButton title="My profile" onClick={ onClickProfile } />;
    const UsersOption = () => <UsersButton title="Users" onClick={ onClickUsers } />;
    const SignoutOption = () => <SignoutButton title="Signout" onClick={ onClickSignout } />;

    const SaveMapOption = ( { onClick, isWaiting } ) => <SaveButton title="Save map" onClick={ onClick } isWaiting={ isWaiting } />;
    const ViewMapOption = ( { onClick } ) => <ViewButton title="View map" onClick={ onClick } />;

    return { 
        HomeOption, SearchOption, SigninOption, 
        MyMapsOption, ProfileOption, UsersOption, SignoutOption, 
        SaveMapOption, ViewMapOption 
    };
}

export { useOption };