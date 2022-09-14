import "./style/geoTools.css";

function GeoTools( { title } ) {

    return (
        <div className="GeoTools">
            <div>{ title }</div>
            <div>[ tools... ]</div>
        </div>
    );
}

export { GeoTools };