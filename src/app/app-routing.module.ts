import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { QuoteComponent } from './components/quote/quote.component';
import { PurchaseComponent } from './components/purchase/purchase.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'quote', component: QuoteComponent},
  { path: 'purchase', component: PurchaseComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
