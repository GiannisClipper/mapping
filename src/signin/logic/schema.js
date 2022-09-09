const requestSchema = {
    username: "",
    password: "",
};

const responseSchema = {
    token: "",
    user_id: "",
    user_type: "",
    username: "",
};

const newRequestSchema = values => ( { ...requestSchema, ...( values || {} ) } );
const newResponseSchema = values => ( { ...responseSchema, ...( values || {} ) } );

export { 
    requestSchema, newRequestSchema,
    responseSchema, newResponseSchema,
};