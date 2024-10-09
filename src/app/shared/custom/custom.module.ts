import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import * as fromMaterial from './../material/material.module';
import * as fromVendor from './../vendor/vendor.module';
import * as fromUtilities from './utilities/utilities.module';
import * as fromSockets from './sockets/sockets.module';

import * as fromCustomComponents from './../../components';
import * as fromPipes from '../../pipes';


const CUSTOM_COMPONENTS = [
    fromCustomComponents.StructuredLayoutComponent,
    fromCustomComponents.AppSpinnerComponent,
    fromCustomComponents.AppIFrameComponent,
    fromCustomComponents.AppUploaderComponent,
    fromCustomComponents.AppIFrameComponent,
    fromCustomComponents.AppTableauReportComponent,
    fromCustomComponents.AppSSRSReportComponent,
    fromCustomComponents.AppConfirmationComponent,
    fromCustomComponents.AppNotFoundComponent,
    fromCustomComponents.AppUnauthorizedComponent,
    fromCustomComponents.AppErrorReportPanelComponent,
    fromCustomComponents.AppErrorReportPayloadInfoComponent,
];

const CUSTOM_PIPES = [
    fromPipes.SafePipe,
    fromPipes.UtcDatePipe,
];

@NgModule({
    declarations: [
        ...CUSTOM_COMPONENTS,
        ...CUSTOM_PIPES
    ],
    imports: [
        CommonModule,
        FormsModule,
        fromMaterial.MaterialModule,
        fromVendor.VendorModule,
        fromUtilities.UtilitiesModule,
        fromSockets.SocketsModule
    ],
    exports: [
        ...CUSTOM_COMPONENTS,
        ...CUSTOM_PIPES,
        FormsModule,
    ],
    providers: []
})
export class CustomModule { }
