import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  imports: [MatButtonModule, MatIconModule, MatToolbarModule, MatTableModule, MatProgressSpinnerModule],
  exports: [MatButtonModule, MatIconModule, MatToolbarModule, MatTableModule, MatProgressSpinnerModule]
})
export class MaterialModule { }
