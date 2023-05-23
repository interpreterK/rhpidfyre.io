const Loading_window = document.getElementById("loading-window")
const Loading_text = document.getElementById("loading-text")

Loading_window?.addEventListener("transitionend", () => Loading_window.style.display = "none", false)

let load_finish = false

const loaded = () => {
	if (!load_finish) {
		load_finish = true
		Loading_window!.style.opacity = '0';
		document.body.classList.toggle("load-trigger-finish");
	}
}

window.addEventListener("load", () => {
	loaded()
}, false)

setTimeout(() => {
	//Force to load after 10 seconds of waiting
	loaded()
}, 1e4)