import {
	WebGLRenderer, 
	Scene, 
	PerspectiveCamera
} from 'three'

const NewScene = (Node) => {
	const GL_Renderer_container = new WebGLRenderer({antialias: true})
	const GLScene = new Scene()
	const Camera = new PerspectiveCamera(70, window.innerWidth/window.innerHeight, .1, 1000)

	GL_Renderer_container.setAnimationLoop((_) => GL_Renderer_container.render(GLScene, Camera))

	window.addEventListener("resize", () => {
		Camera.aspect = window.innerWidth/window.innerHeight
		Camera.updateProjectionMatrix()
		GL_Renderer_container.setSize(window.innerWidth, window.innerHeight)
	}, false)

	GL_Renderer_container.setPixelRatio(window.devicePixelRatio)
	GL_Renderer_container.setSize(window.innerWidth, window.innerHeight)
	Node.appendChild(GL_Renderer_container.domElement)

	return [GLScene, Camera]
}

export {
	NewScene
}