import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TransformationDashboardComponent } from './transformation-dashboard/transformation-dashboard.component';
import { 
  MatGridListModule,
  MatCardModule, 
  MatMenuModule, 
  MatIconModule, 
  MatButtonModule, 
  MatToolbarModule, 
  MatTabsModule, 
  MatInputModule, 
  MatSelectModule, 
  MatListModule,
  MatCheckboxModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';

import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [
    AppComponent,
    TransformationDashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatTabsModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    FormsModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
