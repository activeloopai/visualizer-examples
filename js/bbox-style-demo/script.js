
function constructVis() {
  let container = document.getElementById('container')
  path = "hub://activeloop/fashionpedia-train"

  let p = window.vis.visualize(path, null, null, container, { controlPanel: false, backlink: false, token: null })

  let activeStyle = undefined
  p.then(e => {
    setInterval(() => {
      if (activeStyle) {
        activeStyle.strokeStyle = "solid"
        activeStyle.strokeWidth = 0.005
      }
      const i = e.hoverIndex
      if (i >= 0) {
        activeStyle = e.bboxStyle("boxes", i, 0)
        activeStyle.strokeStyle = "dashed"
        activeStyle.strokeWidth = 0.02
      }
    }, 100);
  })
}
