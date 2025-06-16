import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';

export const welcomeGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userName = localStorage.getItem('td_username');
  if(userName) {
    return new RedirectCommand(router.parseUrl('/dashboard'));
  }

  return true;
};
