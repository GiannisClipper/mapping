import { useContext } from "react";
import { useValidation } from "../../_commons/logic/useValidation";
import { MyMapsContext } from "../../myMaps/MyMapsContext";

const isTitleBlank = ( { values } ) => {
    return ! values.changeable.title
        ? "Title could not be blank."
        : null;
}

const isMapTitleExists = ( { values, maps } ) => {
    return values.changeable.title && 
        values.initial.title !== values.changeable.title && 
        maps.filter( map => map.title === values.changeable.title ).length > 0
        ? `Map title '${values.changeable.title}' already exists.`
        : null;
}

function useMapValidation( { setStatus, values } ) {

    const inherited = useValidation( { setStatus } );
    const { onValidate } = inherited;
    const { maps } = useContext( MyMapsContext );

    const onCreateValidate = () => onValidate( [ 
        () => isTitleBlank( { values } ), 
        () => isMapTitleExists( { values, maps } ),
    ] );

    const onUpdateValidate = onCreateValidate;

    return { ...inherited, onCreateValidate, onUpdateValidate };
}

export { useMapValidation, isTitleBlank, isMapTitleExists };