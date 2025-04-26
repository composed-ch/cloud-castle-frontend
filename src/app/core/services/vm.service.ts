import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Vm } from '../../core/models/vm.model';
import { mapVm, mapVms } from '../mappers/vm.mapper';
import { environment } from '../../../environments/environment';

import { vmTestData } from '../../core/testdata/vms';

@Injectable({ providedIn: 'root' })
export class VmService {

  constructor(private http: HttpClient) { }

  getVms(simulate: boolean = false): Observable<Vm[]> {
    const data$ = simulate ? of(vmTestData) : this.http.get<any[]>(`${environment.backendUrl}/instances`);
    return data$.pipe(
      map(mapVms)
    );
  }

  sync(id: string): Observable<Vm> {
    return this.http.get<any>(`${environment.backendUrl}/instance/${id}/state`).pipe(
      map(mapVm)
    );
  }

  start(id: string): Observable<any> {
    return this.http.get(`${environment.backendUrl}/instance/${id}/start`);
  }

  stop(id: string): Observable<any> {
    return this.http.get(`${environment.backendUrl}/instance/${id}/stop`);
  }
}
