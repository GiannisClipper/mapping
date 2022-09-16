const mapSchema = {
    user_id: "",
    id: "",
    title: "",
    description: "",
    published: false,
    center: [ 25, 0 ], // [ lat, lng ]
    zoom: 2,
    lines: [],
    points: [],
};

const lineSchema = {
    title: "",
    description: "",
    positions: [], // [ [ lat, lng ], [ lat, lng ], ... ]
};

const pointSchema = {
    title: "",
    description: "",
    position: [], // [ lat, lng ]
};

const newMapSchema = values => ( { ...mapSchema, ...( values || {} ) } );
const newLineSchema = values => ( { ...lineSchema, ...( values || {} ) } );
const newPointSchema = values => ( { ...pointSchema, ...( values || {} ) } );

export { 
    mapSchema, newMapSchema, 
    lineSchema, newLineSchema,
    pointSchema, newPointSchema, 
};