const profileSchema = {
    id: "",
    username: "",
    password: "",
    profile: "",
};

const newProfileSchema = values => ( { ...profileSchema, ...( values || {} ) } );

export { profileSchema, newProfileSchema };