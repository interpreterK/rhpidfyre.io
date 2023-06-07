import {
	WebGLRenderer, 
	Scene, 
	PerspectiveCamera
} from 'three'

//Multiple render support is here!
const Loaded_Renderers = []

const NewScene = (Node) => {
	const GL_Renderer_container = new WebGLRenderer({antialias: true, alpha: true})
	const GLScene = new Scene()
	const Camera = new PerspectiveCamera(70, window.innerWidth/window.innerHeight, .1, 1000)

	GL_Renderer_container.setAnimationLoop((_) => GL_Renderer_container.render(GLScene, Camera))

	GL_Renderer_container.setPixelRatio(window.devicePixelRatio)
	GL_Renderer_container.setSize(window.innerWidth, window.innerHeight)
	Node.appendChild(GL_Renderer_container.domElement)

	Loaded_Renderers.push({
		GL_Renderer_container,
		Camera: Camera,
	})

	return [GLScene, Camera]
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