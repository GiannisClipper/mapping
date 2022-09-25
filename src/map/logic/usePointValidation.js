import { useContext } from "react";
import { MapContext } from "../../map/MapContext";
import { useValidation } from "../../_commons/logic/useValidation";
import { isTitleBlank } from "./useMapValidation";

const isPointTitleExists = ( { values, points } ) => {
    return values.changeable.title && 
        values.initial.title !== values.changeable.title && 
        points.filter( point => point.title === values.changeable.title ).length > 0
        ? `Point title '${values.changeable.title}' already exists.`
        : null;
}

function usePointValidation( { setStatus } ) {

    const inherited = useValidation( { setStatus } );
    const { onValidate } = inherited;
    const { map: { points } } = useContext( MapContext );

    const onCreateValidate = ( { values } ) => onValidate( [ 
        () => isTitleBlank( { values } ), 
        () => isPointTitleExists( { values, points } ),
    ] );

    const onUpdateValidate = onCreateValidate;

    return { ...inherited, onCreateValidate, onUpdateValidate };
}

export { usePointValidation, isPointTitleExists };