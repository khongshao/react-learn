import React from "react"

import * as d3 from 'd3'
export default class Line extends React.Component {

    componentDidMount() {
        console.log(d3.select('svg').append('g')
        .classed('main'))
    }

    render() {
        return (
            <svg width="100%" height="100%"></svg>
        )
    }
}