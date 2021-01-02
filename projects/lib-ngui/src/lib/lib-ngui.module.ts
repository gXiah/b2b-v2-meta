import { NgModule } from '@angular/core';
import { LibNguiComponent } from './lib-ngui.component';
import { ButtonComponent } from './ui-units/button/button.component';



@NgModule({
  declarations: [
  	LibNguiComponent,
  	ButtonComponent
  ],
  imports: [],
  exports: [LibNguiComponent]
})
export class LibNguiModule { }
