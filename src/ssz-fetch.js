var rdf = require("rdf-ext")
rdfFetch = require("rdf-fetch")


function SszFetch (api, property) {
  this.properties = []
  rdfFetch(api, {method: 'post', headers: { accept: 'text/turtle'}}).then((response) => {
      return response.dataset()
    }).then((dataset) => {
      dataset.match(rdf.namedNode(property),rdf.namedNode("http://www.w3.org/ns/hydra/core#mapping")).forEach((quad) => {
          dataset.match(quad.object, rdf.namedNode("http://www.w3.org/ns/hydra/core#property")).forEach((quad) => {
            console.log(quad)
        })
      })
    })

  console.log(api, property)
  var self = this
}


SszFetch.prototype.getProperty = function (propertyIri) {
  
}


module.exports = SszFetch
