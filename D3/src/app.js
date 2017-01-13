// npm i -D browser-sync
// package.json: 
// 'scripts': {
//    'start': 'browser-sync start -s -f index.html src --no-ui --no-notify'
//  },
// $ npm start

const body = d3.select('body');

body.append('svg')
    .attr('width', 1200)
    .attr('height', 500);

let svg = d3.select("svg"),
    margin = { top: 20, right: 20, bottom: 30, left: 50 },
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

let parseTime = d3.timeParse("%d-%b-%y");

let x = d3.scaleTime()
    .rangeRound([0, width]);

let y = d3.scaleLinear()
    .rangeRound([height, 0]);

let line = d3.line()
    .x(function (d) { return x(d.date); })
    .y(function (d) { return y(d.close); });

d3.tsv("data.tsv", (d) => {
    d.date = parseTime(d.date);
    d.close = +d.close;
    return d;
}, (error, data) => {
    if (error) throw error;

    x.domain(d3.extent(data, (d) => { return d.date; }));
    y.domain(d3.extent(data, (d) => { return d.close; }));

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .style("text-anchor", "end")
        .text("Price ($)");

    g.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line);
});
