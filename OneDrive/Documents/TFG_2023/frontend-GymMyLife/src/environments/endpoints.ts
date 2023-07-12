import { environment } from './environment';

export const endpoints = {
  // sentiment: `${environment.apiFlask}/sentiment`,

  auth: `${environment.apiNode}/auth`,
  profile: `${environment.apiNode}/profile`,
  municipality: `${environment.apiNode}/municipality`,
  community: `${environment.apiNode}/community`,

  admin: `${environment.apiNode}/admin`,
};
