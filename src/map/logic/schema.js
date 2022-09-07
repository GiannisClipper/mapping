const schema = {
    user_id: null,
    id: null,
    title: null,
    description: null,
    published: false,
};

const newSchema = () => ( { ...schema } );

export { schema, newSchema };