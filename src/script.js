import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
/**
 * Base
 */
// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
const clock = new THREE.Clock()
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('textures/matcaps/metalic.png')


const fontloader = new THREE.FontLoader()

fontloader.load(
    './fonts/helvetiker_regular.typeface.json',
    (font)=>{
        const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
        const textGeometry = new THREE.TextBufferGeometry(
            'XENOX',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 7
            }
        )
        textGeometry.center()
        const text = new THREE.Mesh(textGeometry,material)
        scene.add(text)


        const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 32, 64)
        const boxGeometry = new THREE.BoxBufferGeometry(0.3, 0.3, 0.3)
        const geometry = new THREE.SphereGeometry( 0.5, 0, 32 );

        for(let i = 0; i < 500; i++){
            const donut = new THREE.Mesh(donutGeometry, material)
            donut.position.x = (Math.random() - 0.5) * 70
            donut.position.y = (Math.random() - 0.5) * 70
            donut.position.z = (Math.random() - 0.5) * 70
            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI
            const scale = Math.random()
            donut.scale.set(scale, scale, scale)
            scene.add(donut)
        }
        for(let i = 0; i < 500; i++){
            const boxes = new THREE.Mesh(boxGeometry, material)
            boxes.position.x = (Math.random() - 0.5) * 70
            boxes.position.y = (Math.random() - 0.5) * 70
            boxes.position.z = (Math.random() - 0.5) * 70
            boxes.rotation.x = Math.random() * Math.PI
            boxes.rotation.y = Math.random() * Math.PI
            const scale = Math.random()
            boxes.scale.set(scale, scale, scale)
            scene.add(boxes)
        }
        for(let i = 0; i < 200; i++){
            const unknown = new THREE.Mesh(geometry, material)
            unknown.position.x = (Math.random() - 0.5) * 70
            unknown.position.y = (Math.random() - 0.5) * 70
            unknown.position.z = (Math.random() - 0.5) * 70
            unknown.rotation.x = Math.random() * Math.PI
            unknown.rotation.y = Math.random() * Math.PI
            const scale = Math.random()
            unknown.scale.set(scale, scale, scale)
            scene.add(unknown)
            
        }
    }

)


/**
 * Object
 */
const cube = new THREE.Mesh(
    new THREE.BoxBufferGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial()
)


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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

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


const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
