import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import WbComponent from './wb/wb.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'wb', component: WbComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
