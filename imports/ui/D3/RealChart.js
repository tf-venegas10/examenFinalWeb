import React, {Component} from "react";
import * as d3 from "d3";

import "./RealChart.css";

export default class RealChart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            margin : {top: 20, right: 30, bottom: 30, left: 180},
            data:this.props.data
        };
        this.draw = this.draw.bind(this);
    }


    componentWillUpdate(){
        this.svg = d3.select(this.tag);
        this.svg.selectAll("g").remove();
        this.svg.selectAll("path").remove();
    }
    componentDidUpdate(){
        this.svg = d3.select(this.tag);
        this.width = 800;
        this.height = 600;
        this.svg.attr("width",this.width).
        attr("height", this.height);
        if(!this.props.data|| this.props.data.length<1) return;



        const minDate = d3.min(this.props.data[0], d => d.date); //changed 1 by 0 because the first element is the # 0
        const maxDate = new Date((minDate.getTime() + 24*60*60*1000)*this.props.maxVal); // minDate + 24 hours-- changed 22 for 24
        let data=[];
        this.props.data.forEach((arr)=>{
            let arri=arr.filter((d)=>{
                return (d.date.valueOf()<maxDate.valueOf())
            });
            data.push(arri);
        });

        this.x = d3.scaleTime()
            .domain([ minDate, maxDate ])
            .range([this.state.margin.left, this.width - this.state.margin.right]);
        this.y = d3.scaleBand()
            .domain(d3.range(data[0].length)) //changed 1 by 0 because the first element is the # 0
            .rangeRound([this.height - this.state.margin.bottom, this.state.margin.top]);

        this.xAxis = g => g
            .attr("transform", `translate(0,${this.height - this.state.margin.bottom})`)
            .call(d3.axisBottom(this.x));
        // .call(g => g.select(".domain").remove());
        this.yAxis = g => g
            .attr("transform", `translate(${this.state.margin.left},0)`)
            .call(d3.axisLeft(this.y)
                .tickFormat((d) => this.props.selectedRoute.header.stop[d].content));


        this.draw(data)

    }
    draw(data) {


        const line = d3.line()
            .x(d => this.x(d.date))
            .y((d,i) => this.y(i) + this.y.bandwidth()/2);

        this.svg.append("g")
            .call(this.xAxis);

        this.svg.append("g")
            .call(this.yAxis);

        this.svg.selectAll(".routes")
            .data(data)
            .enter()
            .append("path")
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("d", line);

    }

    render() {
        return (
            <div>
                <svg
                     ref={(svg) => this.tag = svg}
                ></svg>
            </div>
        );
    }
}