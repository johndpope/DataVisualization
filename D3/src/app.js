// npm i -D browser-sync
// package.json: 
// "scripts": {
//    "start": "browser-sync start -s -f index.html src --no-ui --no-notify"
//  },
// $ npm start

const body = d3.select('body');

body.append('p');

body.selectAll('p')
    .text(`<h1>${d3.version}</h1>`)
    .style('color', 'red')
    .style('font-size', '72px');