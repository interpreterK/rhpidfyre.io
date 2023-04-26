const Loading_window = document.getElementById("loading-window")

Loading_window?.addEventListener("transitionend", () => {
	Loading_window.style.display = "none"
}, false)

window.addEventListener("DOMContentLoaded", () => {
	Loading_window!.style.opacity = "0"
}, false)