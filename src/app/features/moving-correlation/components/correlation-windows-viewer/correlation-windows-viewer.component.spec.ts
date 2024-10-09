import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrelationWindowsViewerComponent } from './correlation-windows-viewer.component';

describe('CorrelationWindowsViewerComponent', () => {
  let component: CorrelationWindowsViewerComponent;
  let fixture: ComponentFixture<CorrelationWindowsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorrelationWindowsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrelationWindowsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
