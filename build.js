require('shelljs/global')

// build elements js
cp('node_modules/d3/d3.min.js', 'elements/js')
//exec('uglifyjs elements/js/*.js --output elements/ssz.min.js')

// vulcanize elements
exec('vulcanize --inline-scripts --inline-css elements/ssz-line.html > elements/ssz-line.min.html')

// copy polyfill
mkdir('-p','webcomponentsjs')
cp('-r', 'node_modules/@webcomponents/webcomponentsjs/*.js', './webcomponentsjs/')
