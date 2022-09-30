import './style/page.css';

import { setClassName } from "../_commons/logic/helpers";
import { Rows } from '../_commons/Rows';
import { Header } from './Header';
import { Main } from '../_templates/Main';
import { Footer } from './Footer';

function Page( { className, onClickSave, onClickView, status, children, ...props } ) {

    return (
        <Rows className={ setClassName( 'Page', className ) } { ...props }>

            <Header onClickSave={ onClickSave } onClickView={ onClickView } status={ status } />

            <Main>{ children }</Main>

            <Footer />

        </Rows>
    );
}

function BlankPage( { className, children, ...props } ) {

    return (
        <Rows className={ setClassName( 'Page', className ) } { ...props }>

            <Main>{ children }</Main>

        </Rows>
    );
}

export { Page, BlankPage };