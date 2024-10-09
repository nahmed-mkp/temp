import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrelationTimeseriesViewerComponent } from './correlation-timeseries-viewer.component';

describe('CorrelationTimeseriesViewerComponent', () => {
  let component: CorrelationTimeseriesViewerComponent;
  let fixture: ComponentFixture<CorrelationTimeseriesViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorrelationTimeseriesViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrelationTimeseriesViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
