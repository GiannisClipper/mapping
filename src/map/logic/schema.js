const schema = {
    user_id: "",
    id: "",
    title: "",
    description: "",
    published: false,
    lines: [],
    points: [],
};

const newSchema = values => ( { ...schema, ...( values || {} ) } );

export { schema, newSchema };