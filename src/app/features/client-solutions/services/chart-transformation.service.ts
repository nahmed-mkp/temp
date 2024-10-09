import { Injectable } from '@angular/core';
import { HighchartsDataService } from '../../../factories';

@Injectable()
export class ChartTransformationService {

    constructor(private highchartsService: HighchartsDataService) { }

}
