import {
    SphereGeometry, 
    MeshBasicMaterial, 
    Mesh,
    Scene,
    MeshNormalMaterial
} from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { NewScene } from './CreateRender'

const WebGL_Canvas       = document.getElementById("gl-scene")
const reduced_Motion     = window.matchMedia("(prefers-reduced-motion: reduce)")
const color_scheme_light = window.matchMedia("(prefers-color-scheme: light)")

const [GLScene, Camera] = NewScene(WebGL_Canvas)

//hi startglitcher webgl
const GLTF_Loader = new GLTFLoader()
const GLTF = async (GLTF_FILE) => new Promise((resolve, _) => GLTF_Loader.load(GLTF_FILE, (gltf_obj) => resolve(gltf_obj))).catch((reason) => console.error(reason))

let _3D_text_obj = null

const load_3D_text = async () => {
    const _3Dtext = await GLTF("/3D/3D_Text.gltf")

    _3Dtext.scene.traverse((g_data) => {
        if (g_data.isMesh) {
            g_data.material = new MeshBasicMaterial({
    wireframe: true, 
    color: LightTheme && 0x000000 || 0x808080
})
            g_data.position.set(-3,0,-4)
            g_data.rotation.set(1.2,0,-.8)
            _3D_text_obj = g_data
            GLScene.add(g_data)
        }
    })
}

load_3D_text()

let NoMotion = reduced_Motion.matches
let LightTheme = color_scheme_light.matches

// const lerp = (start,end,t) => start*(1-t)+end*t 

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

        if (_3D_text_obj != null)
            _3D_text_obj.rotation.z = Math.cos(t/3)
    } else {
        // Sphere.rotation.y = lerp(Sphere.rotation.y,0,.1)
        Sphere.rotation.y = 0
        if (_3D_text_obj != null)
            _3D_text_obj.rotation.z = 0
    }
    requestAnimationFrame(Animations)
}

reduced_Motion.addEventListener("change", () => NoMotion = true, false)

GLScene.add(Sphere)

Camera.rotation.x = -.5
Camera.position.y = 3

Animations()