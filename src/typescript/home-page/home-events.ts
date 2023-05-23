import GitHubCalendar from 'github-calendar'

const GitHub_Graph = () => {
	new Promise(resolve => {
		GitHubCalendar(".github-calendar", "interpreterK")
		resolve(1)
	}).then(() => {
		const graph_links = document.getElementsByClassName("js-org-filter-link")
		
		for (let a of graph_links) {
			a.setAttribute("href", `https://github.com${a.getAttribute("href")}`)
		}
	}).catch((reason) => console.warn("GitHub Graph Fail: "+reason))
}
GitHub_Graph()

// Set my self up for later when i need this again
export default GitHub_Graph