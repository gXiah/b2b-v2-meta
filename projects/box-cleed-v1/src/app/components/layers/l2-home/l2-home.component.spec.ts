import { ComponentFixture, TestBed } from '@angular/core/testing';

import { L2HomeComponent } from './l2-home.component';

describe('L2HomeComponent', () => {
  let component: L2HomeComponent;
  let fixture: ComponentFixture<L2HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ L2HomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(L2HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
