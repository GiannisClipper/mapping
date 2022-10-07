const userSchema = {
    id: "",
    username: "",
    password: "",
    profile: "",
    type: "USER",
};

const newUserSchema = values => ( { ...userSchema, ...( values || {} ) } );

export { userSchema, newUserSchema };