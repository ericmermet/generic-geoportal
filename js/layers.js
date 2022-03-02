var layerControl = false;
var toponimes = L.layerGroup();

var selectionCircle;
var point_selectionCircle;

var jsonGroup = new L.FeatureGroup();

var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox/light-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr}),
    streets  = L.tileLayer(mbUrl, {id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mbAttr});

var OpenStreetMap_HOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
});

var OpenStreetMap_BLK = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
});

var OpenTopoMap = L.tileLayer('http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://opentopomap.org/" target="_blank">Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
});

var IGN_Plan_actuel = L.tileLayer.wms('https://wxs.ign.fr/cartes/geoportail/r/wms?', {
    layers: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2',
    maxZoom: 21,
    attribution : 'IGN'
});

// add other layers ?

var map = L.map('mapid', {
    center: [46.709736, 3.076172],
    zoom: 6,
    layers: [grayscale, toponimes],
});

var baseLayers = {
    "Grayscale": grayscale,
    "Streets": streets,
    "Humanitarian" : OpenStreetMap_HOT,
    "Black" : OpenStreetMap_BLK,
    "OpenTopoMap" : OpenTopoMap,
    "Plan IGN" : IGN_Plan_actuel,
};

var overlays = {
    //add overlays here
};

var overlays_dict = [];

L.Control.Layers.include({
getOverlays: function() {
    // create hash to hold all layers
    var control, layers;
    layers = {};
    control = this;

    // loop thru all layers in control
    control._layers.forEach(function(obj) {
    var layerName;

    // check if layer is an overlay
    if (obj.overlay) {
        // get name of overlay
        layerName = obj.name;
        // store whether it's present on the map or not
        return layers[layerName] = control._map.hasLayer(obj.layer);
    }
});

    return layers;
    }
});

var layerControl = L.control.layers(baseLayers, overlays, {collapsed:true}).addTo(map);