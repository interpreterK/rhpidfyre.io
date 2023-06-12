import {
    SphereGeometry, 
    MeshBasicMaterial, 
    Mesh,
} from 'three'
import { NewScene } from './modules/CreateRender'
import { load_3D_text } from './BottomLevel_3D'
import * as AnimMan from './modules/AnimMan'

const WebGL_Canvas       = document.getElementById("top-level-gl-scene")
const color_scheme_light = window.matchMedia("(prefers-color-scheme: light)")

const WebGL_make           = new NewScene(WebGL_Canvas)
const [GLScene, Camera, _] = WebGL_make.makeRender()

let LightTheme = color_scheme_light.matches

const Sphere_obj     = new SphereGeometry(40, 30, 18)
const SphereMaterial = new MeshBasicMaterial({
    wireframe: true,
    color: LightTheme && 0x000000 || 0x808080
})
const Sphere = new Mesh(Sphere_obj, SphereMaterial)
Sphere.rotation.z = 3
Sphere.position.set(50,-10,-20)

Camera.rotation.x = -.5
Camera.position.y = 3

GLScene.add(Sphere)

const load_3D_scene = async () => {
    const GLTF_Text = await load_3D_text()

    AnimMan.StartAnimations({
        Sphere: Sphere,
        _3D_text_obj: GLTF_Text 
    })
}

load_3D_scene()