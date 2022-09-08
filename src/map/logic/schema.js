const schema = {
    user_id: "",
    id: "",
    title: "",
    description: "",
    published: false,
};

const newSchema = values => ( { ...schema, ...( values || {} ) } );

export { schema, newSchema };