const requestSchema = {
    username: "",
    password: "",
    profile: "",
    type: "",
};

const responseSchema = {
    id: "",
    username: "",
    password: "",
    profile: "",
    type: "",
};

const newRequestSchema = values => ( { ...requestSchema, ...( values || {} ) } );
const newResponseSchema = values => ( { ...responseSchema, ...( values || {} ) } );

export { 
    requestSchema, newRequestSchema,
    responseSchema, newResponseSchema,
};