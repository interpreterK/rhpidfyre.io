import * as THREE from 'three'

const WebGL_Canvas = document.getElementById("gl-scene")
const stop_Motion = document.getElementById("Stop3DMotion")
const reduced_Motion = window.matchMedia("(prefers-reduced-motion: reduce)")

const WebGL_Renderer = new THREE.WebGLRenderer({antialias: true})

const Scene  = new THREE.Scene()
const Camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, .1, 1000)

let NoMotion = reduced_Motion.matches

const randleft_right = () => Math.round(Math.random()*1) == 1
let lr_Side = randleft_right()

const lerp = (start,end,t) => start*(1-t)+end*t
let Delta = 0

const SphereGeometry = new THREE.SphereGeometry(40, 30, 18)
const SphereMaterial = new THREE.MeshBasicMaterial({wireframe: true, color: 0x808080})
const Sphere = new THREE.Mesh(SphereGeometry, SphereMaterial)

const CameraAnim = () => {
    if (!NoMotion) {
        Delta += 1
        Sphere.rotation.y = Math.sin(Delta/1e3)+2
    } else {
        Camera.position.y = lerp(Camera.position.y,3,.1)
        Camera.rotation.z = lerp(Camera.rotation.z,0,.1)
        Delta = 0
    }
    requestAnimationFrame(CameraAnim)
}

Sphere.rotation.z = 3
Sphere.position.set(50,-10,-20)

if (NoMotion) {
    stop_Motion.style.width = "330px"
    stop_Motion.innerHTML = "Toggle 3D Motion"
}

reduced_Motion.addEventListener("change", () => {
    NoMotion = true
    stop_Motion.style.width = "330px"
    stop_Motion.innerHTML = "Toggle 3D Motion"
}, false)

stop_Motion.addEventListener("click", () => {
    NoMotion = !NoMotion
    if (NoMotion) {
        stop_Motion.style.width = "330px"
        stop_Motion.innerHTML = "Toggle 3D Motion"
    } else {
        lr_Side = randleft_right()
        stop_Motion.style.width = "285px"
        stop_Motion.innerHTML = "Stop 3D Motion"
    }
}, false)

Scene.add(Sphere)
WebGL_Renderer.setAnimationLoop((_) => WebGL_Renderer.render(Scene, Camera))

Camera.rotation.x = -.5
Camera.position.y = 3

CameraAnim()

window.addEventListener("resize", () => {
    Camera.aspect = window.innerWidth/window.innerHeight
    Camera.updateProjectionMatrix()
    WebGL_Renderer.setSize(window.innerWidth, window.innerHeight)
}, false)

WebGL_Renderer.setPixelRatio(window.devicePixelRatio)
WebGL_Renderer.setSize(window.innerWidth, window.innerHeight)
WebGL_Canvas.appendChild(WebGL_Renderer.domElement)