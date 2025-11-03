import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { ApiService, LayoutService } from './services';

export function provideCoreModule(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {provide: ApiService, useClass: ApiService},
    {provide: LayoutService, useClass: LayoutService}
  ]);
}
