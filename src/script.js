import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'

import gsap from 'gsap'
import * as dat from 'dat.gui'
// Textures 

const texturLoader = new THREE.TextureLoader()
const sun=texturLoader.load('/textures/door/sun.jpg')
const earth=texturLoader.load('/textures/door/earth.png')
const planet3=texturLoader.load('/textures/door/planet2.jpg')
const planet1=texturLoader.load('/textures/door/planet1.jpg')
const backgroung=texturLoader.load('/textures/door/backgroung.jpg')
// // 
//  * Base
//  */
// // Canvas

// const gui = new dat.GUI({closed:true,width:400})
// const debugParam={
//     color:0xfffbfb,
//     spin:()=>{
//         gsap.to(mesh.rotation,{duration:1,delay:0.2, y:mesh.rotation.y+50*(Math.PI+1)})
//     }
// }

const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
const geometry = new THREE.SphereGeometry(20,32,32);
const material = new THREE.MeshBasicMaterial( {map:planet1} );
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

const geometry2 = new THREE.SphereGeometry(15,32,32);
const material2 = new THREE.MeshBasicMaterial( {map:earth} );
const mesh2 = new THREE.Mesh(geometry2,material2);
scene.add(mesh2);

const geometry3 = new THREE.SphereGeometry(200,32,32);
const material3 = new THREE.MeshBasicMaterial( {map:sun} );
const sunn = new THREE.Mesh(geometry3,material3);
scene.add(sunn);

const geometry4 = new THREE.SphereGeometry(50,32,32);
const material4 = new THREE.MeshBasicMaterial( {map:planet3} );
const planet2 = new THREE.Mesh(geometry4,material4);
scene.add(planet2);

// const geometry_sun = new THREE.SphereGeometry(20,32,32);
// const material_sun = new THREE.MeshBasicMaterial( {map:sun} );
// const sun = new THREE.Mesh(geometry_sun,material_sun);
// scene.add(sun);
scene.background= backgroung


mesh2.position.set(30,0,0)
mesh.position.set(0,0,0)
sunn.position.set(-150,0,0)
planet2.position.set(100,0,0)
// sun.position.set(-30,0,0)




/**
 * Object
 */
// const geometry = new THREE.BoxBufferGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({map:texture})
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)


// debug

// gui.add(mesh.position,'y',-1,1,0.01)
// gui
//     .addColor(debugParam,"color")
//     .onChange(()=>{
//         material.color.set(debugParam.color)
//     })
// gui.add(debugParam,"spin")

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 50000)
camera.position.z = 1250

scene.add(camera)

// Controls
const controls = new TrackballControls(camera, canvas)
controls.enableDamping = true
controls.rotateSpeed = 1.0;
controls.zoomSpeed = 1;
// controls.panSpeed = 0.8;
// controls.keys = [65, 83, 68]
// controls.noPan = true //default false
// controls.noRotate = true //default false
// controls.noZoom = true //default false
// controls.staticMoving = true //default false
 controls.maxDistance = 10000;
// controls.minDistance = 2;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    gsap.to(mesh.rotation,{y:elapsedTime})
    gsap.to(mesh2.rotation,{y:elapsedTime})
    gsap.to(sunn.rotation,{y:elapsedTime/20})
    gsap.to(planet2.rotation,{y:elapsedTime/3})

    mesh2.position.z=Math.sin(elapsedTime/3)*540
    mesh2.position.x=Math.cos(elapsedTime/3)*550

    mesh.position.z=Math.sin(elapsedTime/5)*700
    mesh.position.x=Math.cos(elapsedTime/5)*750

    planet2.position.z=Math.sin(elapsedTime/10)*1000
    planet2.position.x=Math.cos(elapsedTime/10)*950

    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()