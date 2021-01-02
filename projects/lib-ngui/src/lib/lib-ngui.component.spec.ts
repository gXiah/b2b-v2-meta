import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibNguiComponent } from './lib-ngui.component';

describe('LibNguiComponent', () => {
  let component: LibNguiComponent;
  let fixture: ComponentFixture<LibNguiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibNguiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibNguiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
