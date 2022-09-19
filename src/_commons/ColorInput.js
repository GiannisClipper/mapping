import "./style/input.css";
import "./style/colorInput.css";
import { setClassName } from "./logic/helpers";
import { useState } from "react";
import { ColorButton } from "./Button";

const COLORS = [
    'fuchsia', 'red', 'purple', 
    'lime', 'green', 'teal', 
    'aqua', 'blue', 'navy',
    'yellow', 'orange', 'brown',
    'white', 'grey', 'black'
];

function Palette( { onChange } ) {

    return (
        <div className="Palette">
            <div className="colors">

            { COLORS.map( ( color, index ) => 
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

function ColorInput( { className, value, onChange, ...props } ) {

    value = value || COLORS[ 0 ];
    const [ isOpen, setIsOpen ] = useState( false );

    return (
        <div className={ setClassName( 'Input ColorInput', className ) }>
            <ColorButton
                onClick={ () => setIsOpen( ! isOpen ) }
                color={ value } 
            />

            { isOpen 
            ? <Palette onChange={ e => { onChange( e ); setIsOpen( false ); } } />
            : null 
            }
        </div>
    )
}

export { ColorInput };