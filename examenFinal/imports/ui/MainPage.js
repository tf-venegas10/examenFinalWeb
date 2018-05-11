import React, {Component} from 'react';
import BarChart from "./D3/BarChart";


// App component - represents the whole app

export default class MainPage extends Component {
    constructor(props){
        super(props);
    }


    render() {

        {
            this.state = {
                data: [
                    {
                        letter: "A",
                        frequency: .08167
                    },
                    {
                        letter: "B",
                        frequency: .06167
                    },
                    {
                        letter: "C",
                        frequency: .01167
                    },
                    {
                        letter: "D",
                        frequency: .03167
                    },
                    {
                        letter: "E",
                        frequency: .09167
                    },
                ],
            }
        }

        return (
            < div className="container">
                <BarChart data={this.state.data}/>
            </div>

        );

    }

}