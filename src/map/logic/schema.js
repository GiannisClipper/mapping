const mapSchema = {
    user_id: "",
    id: "",
    title: "",
    description: "",
    published: false,
    lat: 25,
    lng: 0,
    zoom: 2,
    lines: [],
    points: [],
};

const pointSchema = {
    title: "",
    description: "",
    lat: null,
    lng: null,
};

const newMapSchema = values => ( { ...mapSchema, ...( values || {} ) } );

const newPointSchema = values => ( { ...pointSchema, ...( values || {} ) } );

export { mapSchema, newMapSchema, pointSchema, newPointSchema };