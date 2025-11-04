import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { LayoutService } from './services';

export function provideCoreModule(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {provide: LayoutService, useClass: LayoutService}
  ]);
}
