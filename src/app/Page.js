import './style/page.css';

import { setClassName } from "../_commons/logic/helpers";
import { Rows } from '../_commons/Rows';
import { Header } from '../app/Header';
import { Main } from '../app/Main';
import { Footer } from '../app/Footer';

function Page( { className, onClickUpdate, updateStatus, children, ...props } ) {

    return (
        <Rows className={ setClassName( 'Page', className ) } { ...props }>

            <Header onClickUpdate={ onClickUpdate } updateStatus={ updateStatus } />

            <Main>{ children }</Main>

            <Footer />

        </Rows>
    );
}

export { Page };