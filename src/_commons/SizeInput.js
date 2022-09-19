import "./style/input.css";
import "./style/sizeInput.css";
import { setClassName } from "./logic/helpers";
import { useState } from "react";
import { Button } from "./Button";

const SIZES = [ '1', '2', '3', '4', '5', '6', '7', '8', '9' ];

function Choices( { onChange } ) {

    return (
        <div className="Choices">
            { SIZES.map( ( size, index ) => 
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

function SizeInput( { className, value, onChange, ...props } ) {

    value = value || SIZES[ parseInt( SIZES.length / 2 ) ];
    const [ isOpen, setIsOpen ] = useState( false );

    return (
        <div className={ setClassName( 'Input SizeInput', className ) }>
            <Button onClick={ () => setIsOpen( ! isOpen ) }>
                { value }
            </Button>

            { isOpen 
            ? <Choices onChange={ e => { onChange( e ); setIsOpen( false ); } } />
            : null 
            }
        </div>
    )
}

export { SizeInput };