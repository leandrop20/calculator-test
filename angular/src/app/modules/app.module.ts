import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from '../modules/app-routing.module';
import { AppComponent } from '../components/app.component';

import { CalculatorComponent } from '../components/calculator/calculator.component';

@NgModule({
	declarations: [
		AppComponent,
		CalculatorComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
