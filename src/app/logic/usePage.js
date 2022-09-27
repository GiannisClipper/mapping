import { useContext, useEffect } from "react";
import { SigninContext } from "../../signin/SigninContext";
import { AppContext } from "../AppContext";
import { SearchContext } from "../../search/SearchContext";
import { MyMapsContext } from "../../myMaps/MyMapsContext";
import { useMessage } from "../../_commons/logic/useMessage";

function usePage() {

    const { setNextPage } = useContext( AppContext );
    const searchContext = useContext( SearchContext );
    const myMapsContext = useContext( MyMapsContext );
    const signinContext = useContext( SigninContext );
    const appContext = useContext( AppContext );

    const { responseSignin: { username } } = signinContext;

    const onClickHome = () => setNextPage( { endpoint: "/" } );
    const onClickSearch = () => setNextPage( { endpoint: "/search" } );
    const onClickSignin = () => setNextPage( { endpoint: "/signin" } );
    const onClickMyMaps = () => setNextPage( { endpoint: "/mymaps" } );
    const onClickUsers = () => setNextPage( { endpoint: "/users" } );
    const onClickSignout = () => { 
        searchContext.setMaps( [] );
        myMapsContext.setMaps( [] );
        signinContext.setResponseSignin( {} );
        appContext.setMyMapsAutoRetrieve( true );
        setNextPage( { endpoint: "/" } );
    };

    return { username, onClickHome, onClickSearch, onClickSignin, onClickMyMaps, onClickUsers, onClickSignout };
}

function useSaveOnClose( { values, isChanged, flowAssets, setFlowAssets, onSave } ) {

    const { currentPage, setCurrentPage } = useContext( AppContext );
    const { message, openMessage, closeMessage } = useMessage();

    const onYesAnswer = () => { 
        closeMessage(); 
        const { onFinish } = flowAssets;
        setFlowAssets( { onFinish: () => {
            onFinish && onFinish();
            setCurrentPage( { ...currentPage, onClose: null } ); 
        } } );
        onSave();
    }
    const onNoAnswer = () => {
        closeMessage(); 
        setCurrentPage( { ...currentPage, onClose: null } );
    }

    useEffect( () => () =>
        currentPage.onClose = () => { // direct assignment, avoid repeated rerenders
            if ( isChanged() ) {
                openMessage( "Save changes before close?" );
            } else {
                setCurrentPage( { ...currentPage, onClose: null } );
            }
        }
    );

    return { message, onYesAnswer, onNoAnswer };
}

export { usePage, useSaveOnClose };