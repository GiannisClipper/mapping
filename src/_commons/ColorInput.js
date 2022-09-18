import "./style/colorInput.css";

import { useState } from "react";
import { ColorButton } from "./Button";

const COLORS = [
    'fuchsia', 'red', 'purple', 
    'lime', 'green', 'teal', 
    'aqua', 'blue', 'navy',
    'yellow', 'orange', 'brown',
    'white', 'grey', 'black'
];

function Selected( { onClick, ...props } ) {

    return (
        <div className="Selected" onClick={ onClick } >
            { props.children }
        </div>
    )
}

function Selections( { onChange } ) {

    return (
        <div className="Selections">
            { COLORS.map( color => 
                <label 
                    key={ color }
                    className={ color }
                >
                    <input 
                        type="radio" 
                        name="color"
                        value={ color }
                        onChange={ onChange }
                        readOnly={ onChange ? false : true }
                    />
                    { color }
                </label>
            ) }
        </div>
    )
}

function ColorInput( { className, value, onChange, ...props } ) {

    const [ isOpen, setIsOpen ] = useState( true );

    const _onChange = e => {
        onChange( e );
        // setIsOpen( false );
    }

    return (
        <div className={ `Input ColorInput ${className}` }>
            <Selected onClick={ () => setIsOpen( ! isOpen ) } >
                <ColorButton color={ value } />
            </Selected>

            { isOpen 
            ? <Selections onChange={ _onChange } />
            : null 
            }
        </div>
    )
}

export { ColorInput };