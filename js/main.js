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
var panorama_foreyard = null;
var panorama_leftAlley = null;
var panorama_rightAlley = null;
var imgSource = './images/imgSource_Ori';

function loadCommon() {
    panorama_foreyard = new PANOLENS.ImagePanorama(`${imgSource}/foreyard.jpg`);
    panorama_leftAlley  = new PANOLENS.ImagePanorama(`${imgSource}/leftAlley.jpg`);    
    panorama_rightAlley = new PANOLENS.ImagePanorama(`${imgSource}/rightAlley.jpg`);
    
    panorama_foreyard.link(panorama_leftAlley, new THREE.Vector3(-5000.00, -802.45, -21.61));
    panorama_foreyard.link(panorama_rightAlley, new THREE.Vector3(5000.00, -846.77, -20.53));
    
    panorama_leftAlley.link(panorama_foreyard, new THREE.Vector3(-1498.51, -1550.07, 5000.00));
    panorama_leftAlley.link(panorama_rightAlley, new THREE.Vector3(-1150.65, 348.09, 5000.00));
    
    panorama_rightAlley.link(panorama_foreyard, new THREE.Vector3(5000.00, -816.07, 211.07));
    panorama_rightAlley.link(panorama_leftAlley, new THREE.Vector3(5000.00, -157.36, -94.67));
}

function loadDay() {
    loadCommon();
    panorama_hall = new PANOLENS.ImagePanorama(`${imgSource}/day/hall.jpg`);
    panorama_courtyard = new PANOLENS.ImagePanorama(`${imgSource}/day/courtyard.jpg`);
    panorama_roomB = new PANOLENS.ImagePanorama(`${imgSource}/day/roomB.jpg`);
    panorama_roomA = new PANOLENS.ImagePanorama(`${imgSource}/day/roomA.jpg`);
    

    panorama_courtyard.link(panorama_hall, new THREE.Vector3(5000.00, -1594.97, 47.48));
    panorama_courtyard.link(panorama_roomA, new THREE.Vector3(-402.12, -2050.45, -5000.00));
    panorama_courtyard.link(panorama_roomB, new THREE.Vector3(5000.00, -106.88, -1394.50));
    panorama_courtyard.link(panorama_foreyard, new THREE.Vector3(-5000.00, -1427.79, 102.78));

    
    
    panorama_hall.link(panorama_courtyard, new THREE.Vector3(5000.00, -2171.89, 209.66));
    panorama_hall.link(panorama_roomB, new THREE.Vector3(2353.49, -630.82, 5000.00));
    
    panorama_roomA.link(panorama_courtyard, new THREE.Vector3(346.63, -512.45, -5000.00));
    panorama_roomB.link(panorama_hall, new THREE.Vector3(-3577.89, -1600.52, 5000.00));

    panorama_foreyard.link(panorama_courtyard, new THREE.Vector3(393.70, -2186.97, -5000.00));

    
}

// function add(imgSource,schema,jpg) {
//     let panorama = new PANOLENS.ImagePanorama(imgSource + schema + jpg + '.jpg`);
//     return panorama;
// }


function loadNight() {
    // loadCommon();
        
    panorama_hall = new PANOLENS.ImagePanorama(`${imgSource}/night/hall.jpg`);
    panorama_courtyard = new PANOLENS.ImagePanorama(`${imgSource}/night/courtyard.jpg`);
    panorama_roomB = new PANOLENS.ImagePanorama(`${imgSource}/night/roomB.jpg`);
    panorama_roomA = new PANOLENS.ImagePanorama(`${imgSource}/night/roomA.jpg`);
    
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
const sourceToggle = document.querySelector('#source_toggle');


// 重新加载
function reLoad(mode) {
    if (mode == 'day') {
        viewer.dispose();
        loadDay();
        viewer.add(panorama_foreyard, panorama_leftAlley, panorama_rightAlley,panorama_courtyard, panorama_hall, panorama_roomB, panorama_roomA);
    } else if (mode == 'night') {
        viewer.dispose();
        loadNight();
        viewer.add(panorama_courtyard, panorama_hall, panorama_roomB, panorama_roomA);
    } else {}
}

// 更改图片质量
sourceToggle.addEventListener('change', () => {
    if(sourceToggle.value == 'origin')
        imgSource = `./images/imgSource_Opt`
    else
        imgSource = `./images/imgSource_Ori`
    reLoad(toggle.value);
});

// 更改模式
toggle.addEventListener('change', reLoad(toggle.value));


(function init() {
    loadDay();
    viewer.add(panorama_foreyard, panorama_leftAlley, panorama_rightAlley, panorama_courtyard, panorama_hall, panorama_roomB, panorama_roomA);
})();
