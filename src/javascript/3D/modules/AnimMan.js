//Just manage the animations in a separate file

const reduced_Motion = window.matchMedia("(prefers-reduced-motion: reduce)")

let NoMotion		 = reduced_Motion.matches
let AnimMan_Running  = false

//Good as a class? ..nah
const StartAnimations = (Objs) => {
	if (!AnimMan_Running) {
		AnimMan_Running = true

		const Animations = () => {
			if (!NoMotion) {
		        const unix = new Date()
		        const tps = unix.getTime()/1e4 //Stay the same refreshing and across browsers and devices

		        Objs.Sphere.rotation.y = Math.sin(tps)

		        if (Objs._3D_text_obj)
		            Objs._3D_text_obj.rotation.z = Math.cos(tps*2)
			} else {
		        Objs.Sphere.rotation.y = 0

		        if (Objs._3D_text_obj)
		            Objs._3D_text_obj.rotation.z = 0
			}
			requestAnimationFrame(Animations)			
		}
		//A bug on chromium? but it prevents starting this function with "requestAnimationFrame"
		//Firefox starts it just fine, common firefox W as always
		//requestAnimationFrame(Animations)
		Animations()
	} else {
		console.warn("[Animation Manager]: Animations are already running.")
	}
}

reduced_Motion.addEventListener("change", () => NoMotion = true, false)

export {
	StartAnimations,
	AnimMan_Running
}