import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Vm } from '../../core/models/vm.model';
import { mapVms } from '../mappers/vm.mapper';
import { environment } from '../../../environments/environment';

import { State } from '../models/state.enum';

@Injectable({ providedIn: 'root' })
export class VmService {

  constructor(private http: HttpClient) { }

  getVms(simulate: boolean = false): Observable<Vm[]> {
    const data$ = this.http.get<any[]>(`${environment.backendUrl}/instances`);
    return data$.pipe(
      map(mapVms)
    );
  }

  sync(id: string): Observable<{ state: State }> {
    return this.http.get<{ state: string }>(`${environment.backendUrl}/instance/${id}/state`).pipe(
      map(response => ({
        state: response.state as State
      }))
    );
  }

  start(id: string): Observable<void> {
    return this.http.get<void>(`${environment.backendUrl}/instance/${id}/start`);
  }

  stop(id: string): Observable<void> {
    return this.http.get<void>(`${environment.backendUrl}/instance/${id}/stop`);
  }
}
