const sticky_header = document.getElementById("intersection-obs")

//lol
const newToggler = (element, type) => new IntersectionObserver(([e]) => e.target.classList.toggle(type, e.intersectionRatio < 1), {threshold: [1]}).observe(element)

// Topbar becomes sticky when scrolling
newToggler(sticky_header, "stuck")

export {
	newToggler
}