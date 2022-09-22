class Focus {

    static instance = null;
    static onFocus = null;

    static setInstance( instance ) {
        if ( instance ) {
            const { instance: prevInstance } = Focus;
            prevInstance && prevInstance.removeFocus();
        }
        Focus.instance = instance;
        this.onFocus && this.onFocus();
        console.log( "Triggered:", "Focus.setInstance", Focus.instance );
    }
}

export { Focus };