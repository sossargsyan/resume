import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import myInfo from '../info.json';

@Injectable({
  providedIn: 'root',
})
export class JsonReaderService {
  // TODO: Get rid of any
  public getInfo(): Observable<any> {
    return of(myInfo);
  }
}
