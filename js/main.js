let viewer = new PANOLENS.Viewer({
    container: document.querySelector('#container'),
    controlButtons: ['fullscreen', 'setting', 'video','toggier'],
    autoRotate: true, //自动播放
    autoRotateActivationDuration: 2000, //时长
    autoRotateSpeed: 0.2, //速度
    output:'console',
});
var panorama_hall = null;
var panorama_court = null;
var panorama_roomB = null;
var panorama_roomA = null;

function loadDay() {
        
    panorama_hall = new PANOLENS.ImagePanorama('./images/day/hall.jpg');
    panorama_courtyard = new PANOLENS.ImagePanorama('./images/day/courtyard.jpg');
    panorama_roomB = new PANOLENS.ImagePanorama('./images/day/roomB.jpg');
    panorama_roomA = new PANOLENS.ImagePanorama('./images/day/roomA.jpg');
    
    panorama_courtyard.link(panorama_hall, new THREE.Vector3(5000.00, -1594.97, 47.48));
    panorama_courtyard.link(panorama_roomA, new THREE.Vector3(-402.12, -2050.45, -5000.00));
    panorama_courtyard.link(panorama_roomB, new THREE.Vector3(5000.00, -106.88, -1394.50));
    
    panorama_hall.link(panorama_courtyard, new THREE.Vector3(5000.00, -2171.89, 209.66));
    panorama_hall.link(panorama_roomB, new THREE.Vector3(2353.49, -630.82, 5000.00));
    
    panorama_roomA.link(panorama_courtyard, new THREE.Vector3(346.63, -512.45, -5000.00));
    panorama_roomB.link(panorama_hall, new THREE.Vector3(-3577.89, -1600.52, 5000.00));
    
}
function loadNight() {
        
    panorama_hall = new PANOLENS.ImagePanorama('./images/night/hall.jpg');
    panorama_courtyard = new PANOLENS.ImagePanorama('./images/night/courtyard.jpg');
    panorama_roomB = new PANOLENS.ImagePanorama('./images/night/roomB.jpg');
    panorama_roomA = new PANOLENS.ImagePanorama('./images/night/roomA.jpg');
    
    panorama_courtyard.link(panorama_hall, new THREE.Vector3(-89.52, -1580.08, 5000.00));
    panorama_courtyard.link(panorama_roomA, new THREE.Vector3(5000.00, -2268.38, 30.47));
    panorama_courtyard.link(panorama_roomB, new THREE.Vector3(1054.29, -43.45, 5000.00));
    
    panorama_hall.link(panorama_courtyard, new THREE.Vector3(-5000.00, -2227.51, -906.21));
    panorama_hall.link(panorama_roomB, new THREE.Vector3(-5000.00, -1253.48, -4271.43));
    
    panorama_roomA.link(panorama_courtyard, new THREE.Vector3(346.63, -512.45, -5000.00));
    panorama_roomB.link(panorama_hall, new THREE.Vector3(5000.00, -2396.31, -328.22));
    
}
// --------------------------------------------

const toggle = document.querySelector('#toggle');
toggle.addEventListener('change', () => {
    if (toggle.value == 'day') {
        viewer.dispose();
        loadDay();
        viewer.add(panorama_courtyard, panorama_hall, panorama_roomB, panorama_roomA);
    } else if (toggle.value == 'night') {
        viewer.dispose();
        loadNight();
        viewer.add(panorama_courtyard, panorama_hall, panorama_roomB, panorama_roomA);
    } else {}
});


(function init() {
    loadDay();
    viewer.add(panorama_courtyard, panorama_hall, panorama_roomB, panorama_roomA);
})();