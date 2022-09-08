const schemaOnRequest = {
    username: "",
    password: "",
};

const schemaOnResponse = {
    token: "",
    user_id: "",
    user_type: "",
    username: "",
};

const newSchemaOnRequest = values => ( { ...schemaOnRequest, ...( values || {} ) } );
const newSchemaOnResponse = values => ( { ...schemaOnResponse, ...( values || {} ) } );

export { 
    schemaOnRequest, newSchemaOnRequest,
    schemaOnResponse, newSchemaOnResponse,
};