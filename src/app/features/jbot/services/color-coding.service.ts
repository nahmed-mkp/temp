import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import * as d3Chromatic  from 'd3-scale-chromatic'

@Injectable()
export class ColorCodingService {

    constructor() {}

    redYellowGreenColorCoder(min: number, max: number) {
        return d3.scaleSequential(d3Chromatic.interpolateRdYlGn).domain([min, max]);
    }

    greenHueColorCoder(min: number, max: number) {
        return d3.scaleSequential(d3Chromatic.interpolateGreens).domain([min, max]);
    }


}