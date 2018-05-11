import React, {Component} from "react";
import * as d3 from "d3";

import "./RealChart.css";

export default class RealChart extends Component {

    constructor(props) {
        super(props);
        this.margin = {top: 20, right: 20, bottom: 30, left: 40};
        this.state = {};
        this.draw = this.draw.bind(this);
    }

    componentDidMount() {
        this.svg = d3.select(this.tag);
        this.width = +this.svg.attr("width") - this.margin.left - this.margin.right;
        this.height = +this.svg.attr("height") - this.margin.top - this.margin.bottom;

        if(!this.props.data || this.props.data.length<1) return;

        const margin = ({top: 20, right: 30, bottom: 30, left: 150});
        const minDate = d3.min(this.props.data[1], d => d.date);
        const maxDate = new Date(minDate.getTime() + 22*60*60*1000); // minDate + 24 hours
        const x = d3.scaleTime()
            .domain([ minDate, maxDate ])
            .range([margin.left, width - margin.right]);
        const y = d3.scaleBand()
            .domain(d3.range(this.props.data[1].length))
            .rangeRound([height - margin.bottom, margin.top]);

        this.xAxis = g => g
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x));
        // .call(g => g.select(".domain").remove());
        this.yAxis = g => g
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y)
                .tickFormat((d) => selectedRoute.header.stop[d].content));


        /*
        code here
         */

        this.draw();
    }
    componentWillUpdate(){
        this.svg = d3.select(this.tag);
        this.width = +this.svg.attr("width") - this.margin.left - this.margin.right;
        this.height = +this.svg.attr("height") - this.margin.top - this.margin.bottom;

        /*
        update code here
         */

        this.draw()

    }
    draw() {

        if (!this.props.data) return;
        /*
        drawing code here
         */
        const line = d3.line()
            .x(d => x(d.date))
            .y((d,i) => y(i) + y.bandwidth()/2);

        this.svg.append("g")
            .call(this.xAxis);

        this.svg.append("g")
            .call(this.yAxis);

        this.svg.selectAll(".routes")
            .data(this.props.data)
            .enter()
            .append("path")
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("d", line);

    }

    render() {
        return (
            <div>

                <svg width={800}
                     height={400}
                     ref={(svg) => this.tag = svg}
                ></svg>
            </div>
        );
    }
}