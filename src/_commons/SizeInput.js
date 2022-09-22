import "./style/input.css";
import "./style/sizeInput.css";

import { setClassName } from "./logic/helpers";
import { useState } from "react";
import { Button } from "./Button";

function Sizes( { values, onChange } ) {

    return (
        <div className="Sizes">
            { values.map( ( size, index ) => 
                <label 
                    key={ index }
                    className={ size }
                >
                    <input 
                        type="radio" 
                        name="size"
                        value={ size }
                        onChange={ onChange }
                        readOnly={ onChange ? false : true }
                    />
                    { size }
                </label>
            ) }
        </div>
    )
}

function SizeInput( { className, values, value, onChange, ...props } ) {

    value = value || values[ parseInt( values.length / 2 ) ];
    const [ isOpen, setIsOpen ] = useState( false );

    return (
        <div className={ setClassName( 'Input SizeInput', className ) }>
            <Button onClick={ () => setIsOpen( ! isOpen ) }>
                { value }
            </Button>

            { isOpen 
            ? 
            <Sizes 
                values={ values }
                onChange={ e => { onChange( e ); setIsOpen( false ); } } 
            />
            : 
            null 
            }
        </div>
    )
}

export { SizeInput };