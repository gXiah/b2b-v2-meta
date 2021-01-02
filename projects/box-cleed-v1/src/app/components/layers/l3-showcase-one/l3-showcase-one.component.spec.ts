import { ComponentFixture, TestBed } from '@angular/core/testing';

import { L3ShowcaseOneComponent } from './l3-showcase-one.component';

describe('L3ShowcaseOneComponent', () => {
  let component: L3ShowcaseOneComponent;
  let fixture: ComponentFixture<L3ShowcaseOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ L3ShowcaseOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(L3ShowcaseOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
