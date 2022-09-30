function useProfileResponse( { setStatus } ) {

    const onPutResponse = ( { request, values, setValues, resetValues } ) => {

        setStatus( { afterResponse: true } );
    }

    const onGetResponse = ( { request, values, setValues, resetValues } ) => {

        setValues( {
            initial: request.current.success, 
            changeable: request.current.success,
        } );
        setStatus( { afterResponse: true } );
    }

    return { onPutResponse, onGetResponse };
}

export { useProfileResponse };