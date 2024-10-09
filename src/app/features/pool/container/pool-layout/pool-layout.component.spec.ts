import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolLayoutComponent } from './pool-layout.component';

describe('PoolLayoutComponent', () => {
  let component: PoolLayoutComponent;
  let fixture: ComponentFixture<PoolLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoolLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
