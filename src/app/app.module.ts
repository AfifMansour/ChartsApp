import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {StoreModule, ActionReducer} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {ChartComponent} from './chart/chart.component';
import {ChartService} from './services/chart.service';
import {GraphsActions} from './reducers/chart.actions';
import {graphsReducer} from './reducers/chart.reducer';
import {ChartEffects} from './reducers/chart.effects';
import {storeLogger} from 'ngrx-store-logger';
import {AuthService} from './core/services/auth.service';
import {JwtModule} from '@auth0/angular-jwt';

export function logger(reducer: ActionReducer<any>): any {
  return storeLogger()(reducer);
}

export const metaReducers = [logger];

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('graphs', graphsReducer, {metaReducers}),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([ChartEffects]),
    JwtModule.forRoot({
      config: {
        whitelistedDomains: ['localhost:4200'],
        blacklistedRoutes: []
      }
    })
  ],
  providers: [ChartService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
