import { provideRouter, RouterConfig } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { LoginRoutes } from './+login/index';
import { AboutRoutes } from './+about/index';
import { HomeRoutes } from './+home/index';

const routes: RouterConfig = [
  ...LoginRoutes,
  ...HomeRoutes,
  ...AboutRoutes
];

export const APP_ROUTER_PROVIDERS = [
  
  provideRouter(routes),
];
