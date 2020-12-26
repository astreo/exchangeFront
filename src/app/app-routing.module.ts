import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { QuoteComponent } from './components/quote/quote.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'quote', component: QuoteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
