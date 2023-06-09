import { MeshNormalMaterial } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { NewScene } from './CreateRender'

const glbottom = document.getElementById("gl-bottom-section")

const WebGL_make = new NewScene(glbottom, true)
const [GLScene, Camera, GL_Renderer_container] = WebGL_make.makeRender()

//hi startglitcher webgl
const GLTF_Loader = new GLTFLoader()
const GLTF = async (GLTF_FILE) => new Promise((resolve, _) => GLTF_Loader.load(GLTF_FILE, (gltf_obj) => resolve(gltf_obj))).catch((reason) => console.error(reason))

let _3D_text_obj

const load_3D_text = async () => {
    const _3Dtext = await GLTF("/3D/3D_Text.gltf")

    _3Dtext.scene.traverse((g_data) => {
        if (g_data.isMesh) {
            g_data.material = new MeshNormalMaterial()
            g_data.position.set(-3,1,-4)
            g_data.rotation.set(1.2,0,-.8)
            _3D_text_obj = g_data
            GLScene.add(g_data)
        }
    })
}

load_3D_text()

export {
	_3D_text_obj
}