import { useContext } from "react";
import { useValidation } from "../../commons/logic/useValidation";
import { MyMapsContext } from "../../myMaps/MyMapsContext";

function useMapValidation( { setStatus, values } ) {

    const inherited = useValidation();
    const { setValidation } = inherited;
    const { maps } = useContext( MyMapsContext );

    const onValidate = () => {

        if ( ! values.current.title ) {
            setValidation( { error: "Title should not be blank." } );
            setStatus( { afterValidation: true } );
            return;
        }

        if ( values.initial.title !== values.current.title && maps.filter( map => map.title === values.current.title ).length > 0 ) {
            setValidation( { error: `Title '${values.current.title}' already exists.` } );
            setStatus( { afterValidation: true } );
            return;
        }

        setValidation( {} );
        setStatus( { afterValidation: true } );
        return;
    }

    return { ...inherited, onValidate };
}

export { useMapValidation };