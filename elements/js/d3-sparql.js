const xmlSchema = "http://www.w3.org/2001/XMLSchema#";

d3.sparql = function (url, query, callback) {
  var url = url + '?query=' + encodeURIComponent(query)

  var response  = function (xhr) {
        try {
          var body = JSON.parse(xhr.responseText)
        } catch (e) {
          throw new Error("unable to parse response, either the Endpoint URL is wrong or the Endpoint does not answer with sparql-results+json: " + xhr.responseText)
        }
        return body.results.bindings.map(function(row) {
          var rowObject = {}
          Object.keys(row).forEach(function (column) {
            rowObject[column] = d3.sparql.dataTypeCasting(row[column])
          })
          return rowObject
        })
      }

  var sparql = d3.xhr(url,'application/sparql-results+json').response(response)

  if (callback != null) {
    if (typeof callback !== "function") throw new Error("invalid callback: " + callback);

    return sparql.get(callback)
  }

  return sparql

};

d3.sparql.dataTypeCasting = function (value) {
  var v = value.value;
  if (typeof value.datatype !== "undefined") {
    var dt = value.datatype.replace(xmlSchema,'')
    switch(dt) {
      case 'string':
        v = new String(v); break;
      case 'boolean':
        v = new Boolean(v == "false" ? false : v); break;
      case 'float':
      case 'integer':
      case 'long':
      case 'double':
      case 'decimal':
      case 'nonPositiveInteger':
      case 'nonNegativeInteger':
      case 'negativeInteger':
      case 'int':
      case 'unsignedLong':
      case 'positiveInteger':
      case 'short':
      case 'unsignedInt':
      case 'byte':
      case 'unsignedShort':
      case 'unsignedByte':
        v = new Number(v); break;
      case 'date':
      case 'time':
      case 'dateTime':
        v = new Date(v); break;
    }
  }
  return v;
}


