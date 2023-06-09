import {
	WebGLRenderer, 
	Scene, 
	PerspectiveCamera
} from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls'

//Multiple render support is here!
const Loaded_Renderers = []

const NewScene = class {
	constructor(Node, UsingCamera) {
		this.Node = Node
		this.UsingCamera = UsingCamera
	}

	makeRender(aa = true, alp = true) {
		const GL_Renderer_container = new WebGLRenderer({antialias: aa, alpha: alp})
		this.Node.appendChild(GL_Renderer_container.domElement)

		const GLScene = new Scene()
		const Camera = new PerspectiveCamera(70, window.innerWidth/window.innerHeight, .1, 1000)

		let Controls
		if (this.UsingCamera) {
			Controls = new OrbitControls(Camera, GL_Renderer_container.domElement)
			Controls.enablePan = true
		}

		GL_Renderer_container.setAnimationLoop((_) => {
			if (this.UsingCamera) {
				Controls.update()	
			}
			GL_Renderer_container.render(GLScene, Camera)
		})
		GL_Renderer_container.setPixelRatio(window.devicePixelRatio)
		GL_Renderer_container.setSize(window.innerWidth, window.innerHeight)
		
		Loaded_Renderers.push({
			GL_Renderer_container: GL_Renderer_container,
			Camera: Camera,
		})

		return [
			GLScene,
		 	Camera,
		 	GL_Renderer_container
		]
	}
}

window.addEventListener("resize", () => {
	for (const v of Loaded_Renderers) {
		v.Camera.aspect = window.innerWidth/window.innerHeight
		v.Camera.updateProjectionMatrix()
		v.GL_Renderer_container.setSize(window.innerWidth, window.innerHeight)
	}
}, false)


export {
	NewScene,
	Loaded_Renderers
}
