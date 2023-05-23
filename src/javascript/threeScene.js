import * as THREE from 'three'
import { OrbitControls } from "three/addons/controls/OrbitControls"

const WebGL_Canvas = document.getElementById("gl-scene")

const WebGL_Renderer = new THREE.WebGLRenderer({antialias: false})

const Scene  = new THREE.Scene()
const Camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, .1, 1000)

const Camera_Controls = new OrbitControls(Camera, WebGL_Canvas)

// const CreateCube = (Geometry) => {
// 	const Geometry = new THREE.BoxGeometry()
// 	const Material = new THREE.MeshPhongMaterial()
// 	const Limb_Mesh = new THREE.Mesh(Geometry, Material)

// 	return Limb_Mesh
// }

const AxesHelper = new THREE.AxesHelper(5)
const GridHelper = new THREE.GridHelper(3,3)

Scene.add(AxesHelper, GridHelper)

WebGL_Renderer.setAnimationLoop((delta) => {
	Camera_Controls.update()
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