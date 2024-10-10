import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import myInfo from '../info.json';
import { Resume } from '../types';
import { version } from '../../../package.json';

@Injectable({
  providedIn: 'root',
})
export class JsonReaderService {
  public getInfo(): Observable<Resume> {
    return of(myInfo);
  }

  public getAppVersion(): Observable<string> {
    return of(version);
  }
}
