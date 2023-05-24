const sticky_header = document.getElementById("intersection-obs")
const bottom_section = document.getElementById("bottom-section")

const newToggler = (element, type) => {
	//lol
	new IntersectionObserver(([e]) => e.target.classList.toggle(type, e.intersectionRatio < 1), {threshold: [1]}).observe(element)
}

// Topbar becomes sticky when scrolling
newToggler(sticky_header, "stuck")
newToggler(bottom_section, "undim")

export {
	newToggler
}