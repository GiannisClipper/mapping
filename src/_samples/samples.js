const users = [
    { id: "1010", username: "john", password: "pass", type: "ADMIN" },
    { id: "1011", username: "mary", password: "pass", type: "USER" },
    { id: "1012", username: "mike", password: "pass", type: "USER" },
    { id: "1013", username: "roza", password: "pass", type: "USER" },
];

const maps = [
    { id: "3401", user_id: "1010", title: "Athens metro network" },
    { id: "3402", user_id: "1011", title: "Trolley 21 route" },
    { id: "3403", user_id: "1010", title: "Running routes in Drapetswna" },
    { id: "3404", user_id: "1012", title: "Athens - Thessaloniki train route" },
    { id: "3405", user_id: "1012", title: "Archaeological tour in central Athens" },
    { id: "3406", user_id: "1011", title: "Trolley 16 route" },
    { id: "3407", user_id: "1011", title: "Trolley 17 route" },
    { id: "3408", user_id: "1010", title: "Tram route in Piraeus" },
    { id: "3409", user_id: "1010", title: "OLP bus routes inside Piraeus port" },
    { id: "3411", user_id: "1012", title: "Thessaloniki metro network" },
    { id: "3411", user_id: "1012", title: "Egnatia highway in North Greece" },
    { id: "3412", user_id: "1010", title: "Ship routes in Cyclades islands" },
];

const samples = { users, maps };
export default samples;
export { users, maps };
