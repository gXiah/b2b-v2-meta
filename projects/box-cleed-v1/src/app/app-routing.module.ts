import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// --- Layers --------
import { L0ClosedComponent } from './components/layers/l0-closed/l0-closed.component';
import { L1MinifiedComponent } from './components/layers/l1-minified/l1-minified.component';
import { L2HomeComponent } from './components/layers/l2-home/l2-home.component';
import { L3ShowcaseOneComponent } from './components/layers/l3-showcase-one/l3-showcase-one.component';
// -------------------

const routes: Routes = [
	{path: 'l1-minified', component: L1MinifiedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
