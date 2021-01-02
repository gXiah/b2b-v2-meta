import { ComponentFixture, TestBed } from '@angular/core/testing';

import { L1MinifiedComponent } from './l1-minified.component';

describe('L1MinifiedComponent', () => {
  let component: L1MinifiedComponent;
  let fixture: ComponentFixture<L1MinifiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ L1MinifiedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(L1MinifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
