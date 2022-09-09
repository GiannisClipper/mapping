import { useContext } from "react";
import { useValidation } from "../../_commons/logic/useValidation";
import { MyMapsContext } from "../../myMaps/MyMapsContext";

function useMapValidation( { setStatus, values } ) {

    const inherited = useValidation( { setStatus } );
    const { onValidate: _onValidate } = inherited;
    const { maps } = useContext( MyMapsContext );

    const isTitleBlank = () => {
        return ! values.current.title
            ? "Title could not be blank."
            : null;
    }

    const isTitleExists = () => {
        return values.current.title && 
            values.initial.title !== values.current.title && 
            maps.filter( map => map.title === values.current.title ).length > 0
            ? `Title '${values.current.title}' already exists.`
            : null;
    }

    const onValidate = () => _onValidate( [ isTitleBlank, isTitleExists ] );

    return { ...inherited, onValidate, isTitleBlank, isTitleExists };
}

export { useMapValidation };