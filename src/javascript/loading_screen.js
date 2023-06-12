//loading element for the HTML, keeps it standing out
class loadingscreen extends HTMLDivElement {
	constructor() {
		super()
	}
}
customElements.define("loading-screen", loadingscreen, {extends: "div"})

const Loading_window = document.getElementById("loading-window")
const Loading_text = document.getElementById("loading-text")

Loading_window.addEventListener("transitionend", () => Loading_window.style.display = "none", false)

let load_finish = false

const loaded = () => {
	if (!load_finish) {
		load_finish = true
		Loading_window.style.opacity = '0';
		document.body.classList.toggle("load-trigger-finish");
	}
}

window.addEventListener("load", () => loaded(), false)

setTimeout(() => loaded(), 1e4) //Force to load after 10 seconds of waiting