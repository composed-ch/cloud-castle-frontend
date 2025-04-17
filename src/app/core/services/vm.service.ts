import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Vm {
  id: string;
  name: string;
  ip: string;
  status: 'running' | 'stopped';
}

@Injectable({ providedIn: 'root' })
export class VmService {
    // TODO: fetch actual data
  getVms(): Observable<Vm[]> {
    return of([
      { id: '1', name: 'vm-dev-001', ip: '192.168.1.10', status: 'running' },
      { id: '2', name: 'vm-test-007', ip: '192.168.1.44', status: 'stopped' },
      { id: '3', name: 'vm-prod-999', ip: '10.0.0.99', status: 'running' },
    ]);
  }
}