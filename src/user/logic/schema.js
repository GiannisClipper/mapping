const userSchema = {
    id: "",
    username: "",
    password: "",
    profile: "",
    type: "",
};

const newUserSchema = values => ( { ...userSchema, ...( values || {} ) } );

export { userSchema, newUserSchema };