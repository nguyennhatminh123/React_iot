import React from 'react'
import { Button, ButtonToolbar } from 'react-bootstrap';
import CanvasJSReact from "../canvas/canvasjs.react"
import request from "../ulties/request";

export default class Diagram extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
                title: {
                    text: "Dynamic Data"
                },
                axisX: {
                    valueFormatString: "DD-MM-HH-mm-ss",
                    labelAngle: -50
                },
                axisY: {
                    includeZero: false
                },
                data: [{
                    type: "line",
                    dataPoints: this.state.dps
                }]
            },
        }
    }
    render() {
        return (
            <CanvasJSChart options={this.options} onRef={ref => this.chart = ref} />
        );
    }
}