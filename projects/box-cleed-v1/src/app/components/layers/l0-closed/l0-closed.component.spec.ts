import { ComponentFixture, TestBed } from '@angular/core/testing';

import { L0ClosedComponent } from './l0-closed.component';

describe('L0ClosedComponent', () => {
  let component: L0ClosedComponent;
  let fixture: ComponentFixture<L0ClosedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ L0ClosedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(L0ClosedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
