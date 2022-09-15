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

const lineSchema = {
    title: "",
    description: "",
    lat: null,
    lng: null,
};

const pointSchema = {
    title: "",
    description: "",
    lat: null,
    lng: null,
};

const newMapSchema = values => ( { ...mapSchema, ...( values || {} ) } );
const newLineSchema = values => ( { ...lineSchema, ...( values || {} ) } );
const newPointSchema = values => ( { ...pointSchema, ...( values || {} ) } );

export { 
    mapSchema, newMapSchema, 
    lineSchema, newLineSchema,
    pointSchema, newPointSchema, 
};