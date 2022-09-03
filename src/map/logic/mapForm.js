import { useMessage } from "../../commons/logic/message";
import { useForm, useValues } from "../../commons/logic/form";

function useMapForm( { maps, setMaps } ) {

    const { message, openMessage, closeMessage } = useMessage();
    const { form, openForm, closeForm } = useForm();
    const { values, setValues } = useValues();

    const getTitle = () => values.inStorage.title;

    const setTitle = value => setValues( { 
        inStorage: { ...values.inStorage },
        onForm: { ...values.onForm, title: value } 
    } )

    const validateMap = () => {

        if ( ! values.onForm.title ) {
            openMessage( "Title should not be blank." );
            return false;
        }

        if ( values.inStorage.title !== values.onForm.title && maps.filter( map => map.title === values.onForm.title ).length > 0 ) {
            openMessage( `Title '${values.onForm.title}' already exists.` );
            return false;
        }

        return true;
    }

    const createMap = event => {

        if ( validateMap() ) {
            setMaps( [ ...maps, values.onForm ] );
            setValues( { inStorage: {}, onForm: {} } );
        }
    }

    const updateMap = event => {

        if ( validateMap() ) {

            for ( let i = 0; i < maps.length; i++ ) {
                if ( maps[ i ].title === values.inStorage.title ) {
                    maps[ i ] = { ...values.onForm };
                    break;
                }
            }
            setMaps( [ ...maps ] );
            setValues( { inStorage: {}, onForm: {} } );
        }
    }

    const deleteMap = event => {

            const newMaps = maps.filter( map => map.title !== values.inStorage.title );
            setMaps( newMaps );
            setValues( { inStorage: {}, onForm: {} } );
    }

    return { 
        message, openMessage, closeMessage, 
        form, openForm, closeForm,
        getTitle, setTitle, createMap, updateMap, deleteMap 
    };
}

export { useMapForm };