/**
    * Elements that make up the popup.
    */
var container = document.getElementById('popup');
var closer = document.getElementById('popup-closer');
/**
* Create an overlay to anchor the popup to the map.
*/
var overlay = new ol.Overlay(/** @type {olx.OverlayOptions} */({
    element: container,
    autoPan: true,
    autoPanAnimation: {
    duration: 250
}
}));

var shouldUpdate = true;
var center = [564348.28125, 2317798.5017235153]; //cần thay
var zoom = 17.716884608150796; //cần thay
var rotation = 0;


// Add a click handler to hide the popup.
// @return {boolean} Don't follow the href
closer.onclick = function () {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
};

var format = 'image/png';
var bounds = [564182.125, 2317466.0, 564514.4375, 2318014.0]; //cần thay

var vung = new ol.layer.Image({
    source: new ol.source.ImageWMS({
        ratio: 1,
        url: 'http://localhost:8888/geoserver/cam_hoang/wms', //cần thay
        params: {
            'FORMAT': format,
            'VERSION': '1.1.0',
            STYLES: '',
            LAYERS: 'cam_hoang:camhoangdc_1', //cần thay
        }
    })
});

var duong = new ol.layer.Image({
    source: new ol.source.ImageWMS({
        ratio: 1,
        url: 'http://localhost:8888/geoserver/cam_hoang/wms', //cần thay
        params: {
            'FORMAT': format,
            'VERSION': '1.1.0',
            STYLES: '',
            LAYERS: 'cam_hoang:camhoanggt_1', //cần thay
        }
    })
});

var diem = new ol.layer.Image({
    source: new ol.source.ImageWMS({
        ratio: 1,
        url: 'http://localhost:8888/geoserver/cam_hoang/wms', //cần thay
        params: {
        'FORMAT': format,
        'VERSION': '1.1.0',
        STYLES: '',
        LAYERS: 'cam_hoang:camhoangtt_1', //cần thay
        }
    })
});

var projection = new ol.proj.Projection({
    code: 'EPSG:3405', //cần thay
    units: 'm',
    axisOrientation: 'neu'
});

var view = new ol.View({
    projection: projection,
    center: center,
    zoom: zoom,
    rotation: rotation
});

var map = new ol.Map({
    target: 'map',
    layers: [vung, duong, diem], //cần thay
    view: view,
    overlays: [overlay]
});

if(window.location.hash != '') {
    var hash = window.location.hash.replace('#map', '');
    var parts = hash.split('/');
    if(parts.length === 4) {
        zoom = parseInt(parts[0], 10);
        center = [
            parseFloat(parts[1]),
            parseFloat(parts[2])
        ];
        rotation = parseFloat(parts[3]);
    }
}

var styles = {
    'MultiPolygon': new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'red',
            width: 3
        })
    })
};

var styleFunction = function (feature) {
    return styles[feature.getGeometry().getType()];
};

var vectorLayer = new ol.layer.Vector({
    //source: vectorSource,
    style: styleFunction
});

map.addLayer(vectorLayer);

// map.getView().fitExtent(bounds, map.getSize());
map.getView().fit(bounds, map.getSize());

//Bài 5
$('#checkVung').change(function () {                //cần thay
    if($('#checkVung').is(':checked')) {
        vung.setVisible(true);
        $('#polygon')[0].classList.replace('hide', 'show');
    } else {
        vung.setVisible(false);
        $('#polygon')[0].classList.add('hide');
    }
});

$('#checkDuong').change(function () {           //cần thay
    if($('#checkDuong').is(':checked')) {
        duong.setVisible(true);
        $('#line')[0].classList.replace('hide', 'show');
    } else {
        duong.setVisible(false);
        $('#line')[0].classList.add('hide');
    }
});

$('#checkDiem').change(function () {            //cần thay
    if($("#checkDiem").is(':checked')) {
        diem.setVisible(true);
        $('#point')[0].classList.replace('hide', 'show');
    } else {
        diem.setVisible(false);
        $('#point')[0].classList.add('hide');
    }
});

var updatePermalink = ()=> {
    if(!shouldUpdate) {
        shouldUpdate = true;
        return;
    }
    var center = view.getCenter();
    var hash = '#map' +
                view.getZoom() + '/' +
                Math.round(center[0] * 100) / 100 + '/' + 
                Math.round(center[1] * 100) / 100 + '/' + 
                view.getRotation();
 
    var state = {
        zoom: view.getZoom(),
        center: view.getCenter(),
        rotation: view.getRotation()
    }

    window.history.pushState(state, 'map', hash);
}

map.on('moveend', updatePermalink);

window.addEventListener('popstate', (e)=> {
    if(e.state === null) {
        return;
    }
    map.getView().setCenter(e.state.center);
    map.getView().setZoom(e.state.zoom);
    map.getView().setRotation(e.state.rotation);
    shouldUpdate = false;
});

function viewLocation(x, y) {
    var vi_tri = ol.proj.fromLonLat([x, y], projection);
    view.animate({
        center: vi_tri,
        duration: 2000,
        zoom: 20
    });
}

//Bai 6
map.on('click', function (e) {
    var view = map.getView();
    var viewResolution = view.getResolution();
    var source = vung.getSource(); //cần thay
    var url = source.getFeatureInfoUrl(
        e.coordinate, 
        viewResolution, 
        view.getProjection(),
        {'INFO_FORMAT': 'application/json', 'FEATURE_COUNT': 50 }
    );
    if (url) {
        $.ajax({
            type: 'POST',
            url: url,
            contentType: 'application/json, charset = utf-8',
            dataType: 'json',
            success: function(n) {
                var content = '<div>';
                for (var i = 0; i < n.features.length; i++) {
                    var feature = n.features[i];
                    var featureAttr = feature.properties;
                    content += '<p>So thua: ' + featureAttr['sothututhu'] //cần thay
                    + '</p><p>So to ban do: ' + featureAttr['sohieutoba'] //cần thay
                    + '</p><p>Dien tich: ' + featureAttr['dientich']  //cần thay
                    + '</p><p>Loai dat: ' + featureAttr['loaiDat'] //cần thay
                    + '<p>------------------</p>'
                }
                content += '</div>';
                $("#popup-content").html(content);
                overlay.setPosition(e.coordinate);
                var vectorSource = new ol.source.Vector({
                    features: (new ol.format.GeoJSON()).readFeatures(n)
                });

                vectorLayer.setSource(vectorSource);
            }
        })
    }
});