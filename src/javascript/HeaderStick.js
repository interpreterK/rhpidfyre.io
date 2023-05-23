const sticky_header = document.getElementsByTagName("header")

// Topbar becomes sticky when scrolling
new IntersectionObserver(([e]) => e.target.classList.toggle("stuck", e.intersectionRatio < 1), {threshold: [1]}).observe(sticky_header[0])