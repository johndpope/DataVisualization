const body = d3.select('body');
const svgWidth = window.innerWidth;
const svgHeight = window.innerHeight;

body.append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight);

const svg = d3.select('svg');

const svgMargin = {
    top: window.innerWidth * 0.02,
    right: window.innerWidth * 0.04,
    bottom: window.innerWidth * 0.04,
    left: window.innerWidth * 0.04
}

let chartWidth = svg.attr('width') - svgMargin.left - svgMargin.right;
let chartHeight = svg.attr('height') - svgMargin.top - svgMargin.bottom;
let g = svg.append('g').attr('transform', 'translate(' + svgMargin.left + ',' + svgMargin.top + ')');
let parseTime = d3.timeParse('%d-%b-%y');

d3.tsv('../data/data.tsv', (d) => {
    d.date = parseTime(d.date);
    d.close = +d.close;
    return d;
}, (error, data) => {
    if (error) throw error;

    let x = d3.scaleTime().rangeRound([0, chartWidth]);
    let y = d3.scaleLinear().rangeRound([chartHeight, 0]);
    let line = d3.line()
        .x(d => x(d.date))
        .y(d => y(d.close));
    let area = d3.area()
        .x(d => (x(d.date) + svgMargin.left))
        .y0(svgHeight - svgMargin.bottom)
        .y1(d => (y(d.close) + svgMargin.top));

    x.domain(d3.extent(data, d => d.date));
    y.domain(d3.extent(data, d => d.close));

    g.append('g')
        .attr('transform', 'translate(0,' + chartHeight + ')')
        .call(d3.axisBottom(x));

    g.append('g')
        .call(d3.axisLeft(y))
        .append('text')
        .attr('fill', '#000')
        .attr('transform', 'rotate(00)')
        .attr('dy', '-1.5em')
        .style('text-anchor', 'end')
        .text('Price / $');

    g.append('path')
        .datum(data)
        .attr('class', 'line')
        .attr('d', line);

    svg.append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", area);
});
