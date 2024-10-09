import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrelationLayoutComponent } from './correlation-layout.component';

describe('CorrelationLayoutComponent', () => {
  let component: CorrelationLayoutComponent;
  let fixture: ComponentFixture<CorrelationLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorrelationLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrelationLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
