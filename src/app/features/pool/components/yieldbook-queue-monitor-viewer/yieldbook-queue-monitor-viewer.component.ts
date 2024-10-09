import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-yieldbook-queue-monitor-viewer',
  templateUrl: './yieldbook-queue-monitor-viewer.component.html',
  styleUrls: ['./yieldbook-queue-monitor-viewer.component.scss']
})
export class YieldbookQueueMonitorViewerComponent implements OnInit {

  public customGridOption: GridOptions = {
    columnDefs: [
      { headerName: 'Requester', field: 'requester' },
      { headerName: 'Status', field: 'status' },
      { headerName: 'Priority', field: 'priority',
        cellStyle: params => {
          if (params.value === 'PENDING') { return {color: 'grey', fontStyle: 'italic', fontWeight: 'bolder', opacity: 0.6}; }
          if (params.value === 'ERROR') { return {color: 'red', fontStyle: 'italic', fontWeight: 'bolder', opacity: 0.6}; }
          if (params.value === 'SUCCESS') { return {color: 'green', fontStyle: 'italic', fontWeight: 'bolder', opacity: 0.6}; }
          if (params.value === 'PROCESSING') { return {color: '#004dffeb', fontStyle: 'italic', fontWeight: 'bolder', opacity: 0.6}; }
        }
      },
      { headerName: 'Process Time (sec)', field: 'processTime' },
      { headerName: 'Request Time', field: 'requestTimestamp', width: 220 },
      { headerName: 'Execution Time', field: 'executionTimestamp', width: 220 },
      { headerName: 'Completion Time', field: 'completionTimestamp', width: 220},
      { headerName: 'Error Details', field: 'exceptionDetails', width: 200 },
      { headerName: 'Request', field: 'requestXML' },
      { headerName: 'Response', field: 'responseXML' },
    ]
  };

  public extraOption = {
    sizeColumnsToFit: true,
    // theme: 'ag-theme-balham-dark'
  };

  public dummyData = [
    // {processName: 'ScenGen_2', status: 'Completed Scenario Generation: 31418DBW1 Base', processorType: 'ScenarioGeneration', eventType: 'Sleeping', executingMachine: 'MKPCALCFARM01', interxVersion: '5.46.34c.64bit', time: '10.59 AM'},
    // {processName: 'ScenGen_3', status: 'Completed Scenario Generation: 31418DBW1 Base', processorType: 'ScenarioGeneration', eventType: 'Sleeping', executingMachine: 'MKPCALCFARM01', interxVersion: '5.46.34c.64bit', time: '10.59 AM'},
    // {processName: 'ScenGen_4', status: 'Completed Scenario Generation: 31418DBW1 Base', processorType: 'ScenarioGeneration', eventType: 'Sleeping', executingMachine: 'MKPCALCFARM01', interxVersion: '5.46.34c.64bit', time: '10.59 AM'},
    // {processName: 'ScenGen_5', status: 'Completed Scenario Generation: 31418DBW1 Base', processorType: 'ScenarioGeneration', eventType: 'Cancel', executingMachine: 'MKPCALCFARM01', interxVersion: '5.46.34c.64bit', time: '10.59 AM'},
    // {processName: 'ScenGen_6', status: 'Completed Scenario Generation: 31418DBW1 Base', processorType: 'ScenarioGeneration', eventType: 'Processed', executingMachine: 'MKPCALCFARM01', interxVersion: '5.46.34c.64bit', time: '10.59 AM'},
    // {processName: 'ScenGen_7', status: 'Completed Scenario Generation: 31418DBW1 Base', processorType: 'ScenarioGeneration', eventType: 'Processed', executingMachine: 'MKPCALCFARM01', interxVersion: '5.46.34c.64bit', time: '10.59 AM'},
    // {processName: 'ScenGen_8', status: 'Completed Scenario Generation: 31418DBW1 Base', processorType: 'ScenarioGeneration', eventType: 'Processing', executingMachine: 'MKPCALCFARM01', interxVersion: '5.46.34c.64bit', time: '10.59 AM'},
    // {processName: 'ScenGen_9', status: 'Completed Scenario Generation: 31418DBW1 Base', processorType: 'ScenarioGeneration', eventType: 'Processing', executingMachine: 'MKPCALCFARM01', interxVersion: '5.46.34c.64bit', time: '10.59 AM'},
  ];

  constructor(private bottomSheetRef: MatBottomSheetRef<YieldbookQueueMonitorViewerComponent>) { }

  ngOnInit() {
  }

  onClose() {
    this.bottomSheetRef.dismiss();
  }

}
