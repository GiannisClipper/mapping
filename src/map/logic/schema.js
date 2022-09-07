const schema = {
    user_id: null,
    id: null,
    title: null,
    description: null,
    published: false,
};

const newSchema = values => ( { ...schema, ...( values || {} ) } );

export { schema, newSchema };