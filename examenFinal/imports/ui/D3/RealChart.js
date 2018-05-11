import React, {Component} from "react";
import * as d3 from "d3";

import "./RealChart.css";

export default class BarChart extends Component {

    constructor(props) {
        super(props);
        this.margin = {top: 20, right: 20, bottom: 30, left: 40};
        this.state = {};
        this.draw = this.update.draw(this);
    }

    componentDidMount() {
        const svg = d3.select(this.svg);

        this.width = +svg.attr("width") - this.margin.left - this.margin.right;
        this.height = +svg.attr("height") - this.margin.top - this.margin.bottom;

       /*
       code here
        */

        this.draw();
    }
    componentWillUpdate(){
        const svg = d3.select(this.svg);
        this.width = +svg.attr("width") - this.margin.left - this.margin.right;
        this.height = +svg.attr("height") - this.margin.top - this.margin.bottom;

        /*
        update code here
         */

        this.draw()

    }
    draw() {
        let data = this.props.data;
        if (!data) return;
        /*
        drawing code here
         */

    }

    render() {
        return (
            <div>

                <svg width={800}
                     height={400}
                     ref={(svg) => this.svg = svg}
                ></svg>
            </div>
        );
    }
}