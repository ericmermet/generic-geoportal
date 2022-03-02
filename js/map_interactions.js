var popup = L.popup();

// function onMapClick(e) {
//     //window.layerControl.addOverlay(toponimes, "Nouvelle couche");
// }

// map.on('click', onMapClick);

map.on('click',function(e){
    lat = e.latlng.lat;
    lon = e.latlng.lng;
    xy = [lat,lon];

    // console.log("You clicked the map at LAT: "+ lat+" and LONG: "+lon );
    //SelectionPoints(xy, 10000, overlays);
});