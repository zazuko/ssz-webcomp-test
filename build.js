require('shelljs/global')

// build elements js
cp('node_modules/d3/d3.min.js', 'elements/js')

exec('browserify src/*.js --standalone SszFetch --debug | exorcist elements/js/ssz-fetch.js.map > elements/js/ssz-fetch.js')

// vulcanize elements
let elements = [
  'ssz-line',
  'ssz-sparql-line'
]
elements.map(function (name) {
  exec(`polymer-bundler --inline-scripts --inline-css elements/${name}.html --out-html elements/${name}.min.html`)
})

// copy polyfill
mkdir('-p','webcomponentsjs')
cp('-r', 'node_modules/@webcomponents/webcomponentsjs/*.js', './webcomponentsjs/')
