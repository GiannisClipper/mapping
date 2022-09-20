import "./style/input.css";
import "./style/colorInput.css";
import { setClassName } from "./logic/helpers";
import { useState } from "react";
import { ColorButton } from "./Button";

function Colors( { values, onChange } ) {

    return (
        <div className="Colors">
            <div className="content">

            { values.map( ( color, index ) => 
                <label 
                    key={ index }
                    className={ color }
                    style={ { backgroundColor: color } }
                    title={ color }
                >
                    <input 
                        type="radio" 
                        // name="color"
                        value={ color }
                        onChange={ onChange }
                        readOnly={ onChange ? false : true }
                    />
                </label>
            ) }

            </div>
        </div>
    )
}

function ColorInput( { className, values, value, onChange, ...props } ) {

    value = value || values[ 0 ];
    const [ isOpen, setIsOpen ] = useState( false );

    return (
        <div className={ setClassName( 'Input ColorInput', className ) }>
            <ColorButton
                color={ value } 
                onClick={ () => setIsOpen( ! isOpen ) }
            />

            { isOpen 
            ? 
            <Colors 
                values={ values } 
                onChange={ e => { onChange( e ); setIsOpen( false ); } } 
            />
            : 
            null 
            }
        </div>
    )
}

export { ColorInput };