import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawdownAnalysisLayoutComponent } from './drawdown-analysis-layout.component';

describe('DrawdownAnalysisLayoutComponent', () => {
  let component: DrawdownAnalysisLayoutComponent;
  let fixture: ComponentFixture<DrawdownAnalysisLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawdownAnalysisLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawdownAnalysisLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
