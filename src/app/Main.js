import './style/main.css';
import { Columns } from '../commons/Columns';
import { Rows } from '../commons/Rows';

function Main( props ) {
    return (
        <Columns className="Main">
            { props.children }
        </Columns>
    )
}

function SingleColumn( props ) {
    return (
        <Rows className="SingleColumn">
            { props.children }
        </Rows>
    )
}

function LeftColumn( props ) {
    return (
        <Rows className="LeftColumn">
            { props.children }
        </Rows>
    )
}

function RightColumn( props ) {
    return (
        <Rows className="RightColumn">
            { props.children }
        </Rows>
    )
}

export { Main, SingleColumn, LeftColumn, RightColumn };