import './style/page.css';

import { Rows } from '../_commons/Rows';
import { Header } from '../app/Header';
import { Main } from '../app/Main';
import { Footer } from '../app/Footer';

function Page( { className, ...props } ) {
    return (
        <Rows className={ `Page ${className}` }>
            <Header />
            <Main>
                { props.children }
            </Main>
            <Footer />
        </Rows>
    );
}

export { Page };