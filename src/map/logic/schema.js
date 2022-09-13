const mapSchema = {
    user_id: "",
    id: "",
    title: "",
    description: "",
    published: false,
    lat: null,
    lng: null,
    zoom: null,
    lines: [],
    points: [],
};

const pointSchema = {
    title: "",
    lat: null,
    lng: null,
};

const newMapSchema = values => ( { ...mapSchema, ...( values || {} ) } );

const newPointSchema = values => ( { ...pointSchema, ...( values || {} ) } );

export { mapSchema, newMapSchema, pointSchema, newPointSchema };