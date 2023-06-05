import {
    SphereGeometry, 
    MeshBasicMaterial, 
    Mesh
} from 'three'
import { NewScene } from './CreateRender'

const WebGL_Canvas       = document.getElementById("gl-scene")
const reduced_Motion     = window.matchMedia("(prefers-reduced-motion: reduce)")
const color_scheme_light = window.matchMedia("(prefers-color-scheme: light)")

const [GLScene, Camera] = NewScene(WebGL_Canvas)

let NoMotion = reduced_Motion.matches
let LightTheme = color_scheme_light.matches

let RandomSide = Math.round(Math.random()*1)==1
// const lerp = (start,end,t) => start*(1-t)+end*t 

const Sphere_obj = new SphereGeometry(40, 30, 18)
const SphereMaterial = new MeshBasicMaterial({
    wireframe: true, 
    color: LightTheme && 0x000000 || 0x808080
})
const Sphere = new Mesh(Sphere_obj, SphereMaterial)
Sphere.rotation.z = 3
Sphere.position.set(50,-10,-20)

const CameraAnim = () => {
    if (!NoMotion) {
        const dateTick = new Date()
        const t = dateTick.getTime()/1e4

        Sphere.rotation.y = RandomSide && -Math.sin(t) || Math.sin(t)
    } else {
        // Sphere.rotation.y = lerp(Sphere.rotation.y,0,.1)
        Sphere.rotation.y = 0
        RandomSide = Math.round(Math.random()*1)==1
    }
    requestAnimationFrame(CameraAnim)
}

reduced_Motion.addEventListener("change", () => NoMotion = true, false)


GLScene.add(Sphere)

Camera.rotation.x = -.5
Camera.position.y = 3

CameraAnim()