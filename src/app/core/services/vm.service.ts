import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Vm } from '../models/vm.model';
import { State } from '../models/state.enum';

@Injectable({ providedIn: 'root' })
export class VmService {
  getVms(): Observable<Vm[]> {
    return of([
      { name: 'VM-01', state: State.Running, ip: '192.168.1.10' },
      { name: 'VM-02', state: State.Stopped, ip: '192.168.1.11' },
      { name: 'VM-03', state: State.Starting, ip: '192.168.1.12' },
      { name: 'VM-04', state: State.Error, ip: '192.168.1.13' }
    ]);
  }
}
