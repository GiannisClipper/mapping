const mapSchema = {
    user_id: "",
    id: "",
    title: "",
    description: "",
    published: false,
    position: [], // [ lat, lng ]
    zoom: null,
    lines: [],
    points: [],
};

const lineSchema = {
    title: "",
    description: "",
    positions: [], // [ [ lat, lng ], [ lat, lng ], ... ]
    color: "",
    size: 0,
};

const pointSchema = {
    title: "",
    description: "",
    position: [], // [ lat, lng ]
    color: "",
    size: 0,
};

const newMapSchema = values => ( { ...mapSchema, ...( values || {} ) } );
const newLineSchema = values => ( { ...lineSchema, ...( values || {} ) } );
const newPointSchema = values => ( { ...pointSchema, ...( values || {} ) } );

export { 
    mapSchema, newMapSchema, 
    lineSchema, newLineSchema,
    pointSchema, newPointSchema, 
};