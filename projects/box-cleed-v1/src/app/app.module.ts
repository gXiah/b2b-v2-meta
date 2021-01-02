import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// --- Containers ---
import { AppContainerComponent } from './components/containers/app-container/app-container.component';
// ------------------

// --- Layers --------
import { L0ClosedComponent } from './components/layers/l0-closed/l0-closed.component';
import { L1MinifiedComponent } from './components/layers/l1-minified/l1-minified.component';
import { L2HomeComponent } from './components/layers/l2-home/l2-home.component';
import { L3ShowcaseOneComponent } from './components/layers/l3-showcase-one/l3-showcase-one.component';
// -------------------

// --- Libraries Imports ---
import { ButtonComponent } from '@cleed/lib-ngui/src/lib/ui-units/button/button.component';


@NgModule({
  declarations: [
    L0ClosedComponent,
    L1MinifiedComponent,
    L2HomeComponent,
    L3ShowcaseOneComponent,
    AppContainerComponent,

    ButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppContainerComponent]
})
export class AppModule { }
