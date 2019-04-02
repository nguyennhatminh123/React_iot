import React from 'react'
import { Button, ButtonToolbar } from 'react-bootstrap';
import CanvasJSReact from "../canvas/canvasjs.react"
import request from "../ulties/request";
import Switch from "react-switch";



var xVal = 0;
var yVal = 100;

export default class Devices extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            devices: [
                {
                    name: "a",
                    value: 1
                },
                {
                    name: "b",
                    value: 0
                }
            ],
            dps: [],

            xVal: 0,
            yVal: 100,
            checked: false,
        }
    }

    updateChart = function (count) {

        count = count || 1;
        var today = new Date();
        var { xVal, yVal, dps } = this.state

        for (var j = 0; j < count; j++) {
            yVal = yVal + Math.round(5 + Math.random() * (-5 - 5));
            var dps = this.state.dps
            dps.push({ x: xVal, y: yVal })
            this.setState({ dps })
            // xVal++;
            this.setState({ xVal: new Date(), yVal })
        }

        if (this.state.dps.length > 20) {
            this.state.dps.shift();
        }

        this.chart.render();
    };

    componentDidMount() {
        this.interval = setInterval(() => {
            this.updateChart()
        }, 1000);
    }

    fetchData() {
        const response = request("http://localhost:3000/login", { method: 'GET', username: 'abcx' }).then((resp) => {
            return resp
        })
    }

    handleChange(checked) {
        this.setState({ checked: checked });
    }

    render() {
        var CanvasJS = CanvasJSReact.CanvasJS;
        var CanvasJSChart = CanvasJSReact.CanvasJSChart;
        var dps = []
        var options = {
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
        }

        return (
            <div className="" style={{ minHeight: '100vh' }}>
                <ButtonToolbar>
                    <Button variant="secondary" size="lg" active onClick={this.fetchData}>
                        Thêm thiết bị
                    </Button>
                    <Button variant="secondary" size="lg" active>
                        Xóa
                    </Button>
                </ButtonToolbar>
                <div style={{ width: "100px", height: "100px", padding: "10px", borderWidth: "1px", borderColor: "black", borderStyle: 'solid' }}>
                    {this.state.devices.map(function (device) {
                        return (
                            <div style={{ overflow: 'hidden' }}>
                                <h6 style={{ float: 'left' }}>{device.name} : {device.value}</h6>
                                <ButtonToolbar style={{ float: 'right' }}>

                                    <Button variant="secondary" size="lg" active>
                                        Button
                                    </Button>
                                </ButtonToolbar>
                            </div>
                        )
                    })}
                </div>
                <label>
                    <span>Switch with default style</span>
                    <Switch onChange={this.handleChange} checked={this.state.checked} />
                </label>
                <CanvasJSChart options={options} onRef={ref => this.chart = ref} />
            </div>
        )
    }
    componentWillUnmount() {
        clearInterval(this.interval)
    }
}