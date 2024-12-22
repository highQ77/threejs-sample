// https://hackmd.io/@WangShuan/S1Mto87R3#使用-cannon-es-套件

import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const map = new THREE.TextureLoader().load('textures/gt.png');

const scene = new THREE.Scene();
// scene.fog = new THREE.Fog(0x333333 + 0xCCCCCC * Math.random(), 20, 30);
const amb = new THREE.AmbientLight(0x330000)
amb.intensity = 10
scene.add(amb)

const stats = new Stats();
document.body.appendChild(stats.dom)

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({
    powerPreference: "high-performance",
    antialias: true,
    stencil: true,
    depth: true
});
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.setClearColor(0, 0.0) // 預設背景顏色
// 啟用渲染器的陰影映射功能
renderer.shadowMap.enabled = true
// 設置陰影映射的類型
renderer.shadowMap.type = THREE.PCFSoftShadowMap
// renderer.shadowMap.type = THREE.VSMShadowMap
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// 建立控制器
new OrbitControls(camera, renderer.domElement)

const uilayer = document.createElement('div');
uilayer.id = 'view2d'
uilayer.style.position = 'fixed'
uilayer.style.left = '0px'
uilayer.style.right = '0px'
uilayer.style.top = '0px'
uilayer.style.bottom = '0px'
uilayer.style.pointerEvents = 'none'
uilayer.style.color = 'white'
uilayer.style.fontFamily = 'system-ui'
uilayer.innerHTML = `
    <div style="padding:10px">
    <h1>ThreeJS Demo</h1>
    </div>
`

let colorRandom = [
    `linear-gradient(rgb(${11}, ${11}, ${11}),rgb(129, 121, 91))`,
    `linear-gradient(rgb(${82}, ${50}, ${17}),rgb(129, 121, 91))`,
    `linear-gradient(rgb(${49}, ${62}, ${42}),rgb(129, 121, 91))`,
    `linear-gradient(rgb(${64}, ${57}, ${7}),rgb(129, 121, 91))`,
    `linear-gradient(rgb(${58}, ${1}, ${5}),rgb(129, 121, 91))`,
    `linear-gradient(rgb(${13}, ${45}, ${67}),rgb(129, 121, 91))`,
].sort(() => Math.random() - 0.5)[0];

document.body.style.background = colorRandom
document.body.appendChild(uilayer);


// GUI

const gui = new GUI() // 新增 GUI
const cubeFolder = gui.addFolder('Cube') // 往 GUI 添加資料夾名為 Cube
cubeFolder.open() // 預設開啟資料夾

const cameraFolder = gui.addFolder('Camera') // 往 GUI 添加資料夾名為 Camera
cameraFolder.add(camera.position, 'z', 0, 10) // 往 Camera 資料夾中添加 camera.position 名為 z 最小值 0 最大值 10
cameraFolder.open() // 預設開啟資料夾


// AxesHelper
scene.add(new THREE.AxesHelper(5))



// 創建三種不同物件，分別是 球狀、二十面體、平面
const sphereGeometry = new THREE.SphereGeometry()
const icosahedronGeometry = new THREE.IcosahedronGeometry(1, 0)
const planeGeometry = new THREE.PlaneGeometry()

// 建立普通材質，會讓每一面產生不同顏色外觀
// const mtn = new THREE.MeshNormalMaterial()
const mtn = new THREE.MeshPhongMaterial({ color: 0xFFCC00 })
mtn.side = THREE.DoubleSide

// 建立 MeshMatcapMaterial
// const mtn = new THREE.MeshMatcapMaterial()
// mtn.matcap = map

// 建立基礎材質，會給每一面添加純白外觀，該材質僅用於測試 alphaTest 屬性
// const material = new THREE.MeshBasicMaterial()

// 設置球的位置在靠右
const sphere = new THREE.Mesh(sphereGeometry, mtn)
sphere.position.x = 2.5
sphere.receiveShadow = true
sphere.castShadow = true
scene.add(sphere)

// 設置二十面體在正中央
const icosahedron = new THREE.Mesh(icosahedronGeometry, mtn)
icosahedron.position.x = 0
icosahedron.receiveShadow = true
icosahedron.castShadow = true
scene.add(icosahedron)

// 設置平面在靠左
const plane = new THREE.Mesh(planeGeometry, mtn)
plane.position.x = -2.5
plane.receiveShadow = true
plane.castShadow = true
scene.add(plane)

// 建立一個平面用來接收陰影
const planeGeometry2 = new THREE.PlaneGeometry(100, 20)
const plane2 = new THREE.Mesh(planeGeometry2, mtn)
plane2.rotateX(-Math.PI / 2)
plane2.position.y = -1.75
plane2.receiveShadow = true // 設置 plane 接收陰影
scene.add(plane2)

const cubeRotationFolder = cubeFolder.addFolder('Rotation') // 往 Cube 資料夾中添加新資料夾名為 Rotation
cubeRotationFolder.add(icosahedron.rotation, 'x', 0, Math.PI * 2) // 往 Rotation 資料夾中添加 icosahedron.rotation 名為 x 最小值 0 最大值 2PI
cubeRotationFolder.add(icosahedron.rotation, 'y', 0, Math.PI * 2) // 往 Rotation 資料夾中添加 icosahedron.rotation 名為 y 最小值 0 最大值 2PI
cubeRotationFolder.add(icosahedron.rotation, 'z', 0, Math.PI * 2) // 往 Rotation 資料夾中添加 icosahedron.rotation 名為 z 最小值 0 最大值 2PI
cubeRotationFolder.open() // 預設開啟資料夾

const cubePositionFolder = cubeFolder.addFolder('Position') // 往 Cube 資料夾中添加新資料夾名為 Position
cubePositionFolder.add(icosahedron.position, 'x', -10, 10) // 往 Position 資料夾中添加 icosahedron.position 名為 x 最小值 -10 最大值 10
cubePositionFolder.add(icosahedron.position, 'y', -10, 10) // 往 Position 資料夾中添加 icosahedron.position 名為 y 最小值 -10 最大值 10
cubePositionFolder.add(icosahedron.position, 'z', -10, 10) // 往 Position 資料夾中添加 icosahedron.position 名為 z 最小值 -10 最大值 10
cubePositionFolder.open() // 預設開啟資料夾

const cubeScaleFolder = cubeFolder.addFolder('Scale') // 往 Cube 資料夾中添加新資料夾名為 Scale
cubeScaleFolder.add(icosahedron.scale, 'x', 0, 5) // 往 Scale 資料夾中添加 icosahedron.scale 名為 x 最小值 0 最大值 5
cubeScaleFolder.add(icosahedron.scale, 'y', 0, 5) // 往 Scale 資料夾中添加 icosahedron.scale 名為 y 最小值 0 最大值 5
cubeScaleFolder.add(icosahedron.scale, 'z', 0, 5) // 往 Scale 資料夾中添加 icosahedron.scale 名為 z 最小值 0 最大值 5
cubeScaleFolder.open() // 預設開啟資料夾


const materialFolder = gui.addFolder('THREE.Material')
// 添加各種屬性的設定到 GUI 中
materialFolder.add(mtn, 'transparent').onChange(() => updateMaterial()) // 開關透明度，打開後 opacity 才會生效
materialFolder.add(mtn, 'opacity', 0, 1, 0.01) // 設置透明度數值
materialFolder.add(mtn, 'depthTest') // 開關深度測試，如果打開則會有深度敢，關閉時物件會像幅空一下沒有立體位置的感覺
materialFolder.add(mtn, 'depthWrite') // 開關深度寫入，如果打開物件之間就會互相覆蓋，關閉時物件之間則可穿透，假設最外層物件有透明度，關閉該選項即可看到後面的物件
materialFolder.add(mtn, 'alphaTest', 0, 1, 0.01).onChange(() => updateMaterial()) // 當材質為 MeshBasicMaterial 時，如果 alphaTest > opacity 就會看不到物件
materialFolder.add(mtn, 'visible') // 開關可見度，打開就會看不到物件
materialFolder.open()






const lightFolder = gui.addFolder('THREE.Light')
const light = new THREE.PointLight(0xffffff, 30)
// light.castShadow = true
light.intensity = 12.7
light.position.set(1.6, 2.5, 2.5)
scene.add(light)
lightFolder.add(light, 'intensity', 0, 100)
lightFolder.add(light.position, 'x', -100, 100)
lightFolder.add(light.position, 'y', -100, 100)
lightFolder.add(light.position, 'z', -100, 100)
lightFolder.open()


const helperP = new THREE.PointLightHelper(light)
scene.add(helperP)





const lightD = new THREE.DirectionalLight(0xffffff, Math.PI)
lightD.castShadow = true
lightD.shadow.radius = 0
lightD.position.set(-1, 5, -5)
lightD.shadow.mapSize.width = 512
lightD.shadow.mapSize.height = 512
lightD.shadow.camera.near = 0.5
lightD.shadow.camera.far = 100
lightD.castShadow = true
scene.add(lightD)

// 添加光的輔助線，可查看光從哪個角度照射過來
const helperD = new THREE.DirectionalLightHelper(lightD)
scene.add(helperD)
// 添加相機輔助線
const chelper = new THREE.CameraHelper(lightD.shadow.camera);
scene.add(chelper)

const lightA = new THREE.AmbientLight(0xCCCCCC, Math.PI)
scene.add(lightA)


// 建立函數用來更新材質
function updateMaterial() {
    mtn.side = Number(mtn.side) // 設置 side 為選中項目
    mtn.needsUpdate = true // 指定要重新編譯材料
}

const options = {
    side: {
        "FrontSide": THREE.FrontSide,
        "BackSide": THREE.BackSide,
        "DoubleSide": THREE.DoubleSide,
    }
}
materialFolder.add(mtn, 'side', options.side).onChange(() => updateMaterial()) // 設定視角，預設是正面，另外可選背面及雙向，正面時，從背面看平面物件會消失；背面時，從正面看平面物件會消失，正面時，立體物件只能看到外觀；背面時，立體物件只能看到內部；雙向時，立體物件放大後視角會變成內部




// resize event registration
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    uilayer.width = window.innerWidth
    uilayer.height = window.innerHeight
}
onWindowResize()

function animate() {
    icosahedron.rotation.x += .01
    icosahedron.rotation.y += .01
    stats.update()
    renderer.render(scene, camera);
    // composer.render();
}