import {
    SphereGeometry, 
    MeshBasicMaterial, 
    Mesh,
} from 'three'
import { NewScene } from './CreateRender'
import { _3D_text_obj } from './BottomLevel_3D'

const WebGL_Canvas       = document.getElementById("top-level-gl-scene")
const reduced_Motion     = window.matchMedia("(prefers-reduced-motion: reduce)")
const color_scheme_light = window.matchMedia("(prefers-color-scheme: light)")

const WebGL_make = new NewScene(WebGL_Canvas)
const [GLScene, Camera, _] = WebGL_make.makeRender()

let NoMotion = reduced_Motion.matches
let LightTheme = color_scheme_light.matches

const Sphere_obj = new SphereGeometry(40, 30, 18)
const SphereMaterial = new MeshBasicMaterial({
    wireframe: true, 
    color: LightTheme && 0x000000 || 0x808080
})
const Sphere = new Mesh(Sphere_obj, SphereMaterial)
Sphere.rotation.z = 3
Sphere.position.set(50,-10,-20)

const Animations = () => {
    if (!NoMotion) {
        const dateTick = new Date()
        const t = dateTick.getTime()/1e4 //Stay the same refreshing and across browsers and devices

        Sphere.rotation.y = Math.sin(t)

        if (_3D_text_obj) {
            // _3D_text_obj.rotation.z = Math.cos(t/3)
            // _3D_text_obj.position.y = Math.cos(t/3)
        }
    } else {
        // Sphere.rotation.y = lerp(Sphere.rotation.y,0,.1)
        Sphere.rotation.y = 0
        if (_3D_text_obj) {
            _3D_text_obj.rotation.z = 0
        }
    }
    requestAnimationFrame(Animations)
}

reduced_Motion.addEventListener("change", () => NoMotion = true, false)

GLScene.add(Sphere)

Camera.rotation.x = -.5
Camera.position.y = 3

Animations()