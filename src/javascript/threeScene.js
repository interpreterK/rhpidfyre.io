import * as THREE from 'three'
import { OrbitControls } from "three/addons/controls/OrbitControls"

const WebGL_Canvas = document.getElementById("gl-scene")

const WebGL_Renderer = new THREE.WebGLRenderer({antialias: true})

const Scene  = new THREE.Scene()
const Camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, .1, 1000)

let Delta = 0
const rad = (x) => x*Math.PI/180
const g = () => {
    Delta+=1
    Camera.position.y = Math.cos(Delta/800)*3
    Camera.rotation.z = Math.sin(Delta/1500)
    Camera.rotation.x = -.5
    requestAnimationFrame(g)
}
g()

// const CreateCube = (Geometry) => {
// 	const Geometry = new THREE.BoxGeometry()
// 	const Material = new THREE.MeshPhongMaterial()
// 	const Limb_Mesh = new THREE.Mesh(Geometry, Material)

// 	return Limb_Mesh
// }

const GridHelper = new THREE.GridHelper(100,30,0xf5d2ff,0xf5d2ff)

Scene.add(GridHelper)

WebGL_Renderer.setAnimationLoop((delta) => {
	WebGL_Renderer.render(Scene, Camera)
})

window.addEventListener("resize", () => {
    Camera.aspect = window.innerWidth/window.innerHeight
    Camera.updateProjectionMatrix()
    WebGL_Renderer.setSize(window.innerWidth, window.innerHeight)
}, false)

WebGL_Renderer.setPixelRatio(window.devicePixelRatio)
WebGL_Renderer.setSize(window.innerWidth, window.innerHeight)
WebGL_Canvas.appendChild(WebGL_Renderer.domElement)