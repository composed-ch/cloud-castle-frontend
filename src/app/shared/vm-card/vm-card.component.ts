import { Component, Input } from '@angular/core';
import { Subscription, interval, take, takeWhile, switchMap } from 'rxjs';

import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

import { VmService } from '../../core/services/vm.service';
import { Vm } from '../../core/models/vm.model';
import { State } from '../../core/models/state.enum';

@Component({
  selector: 'app-vm-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule
  ],
  templateUrl: './vm-card.component.html',
  styleUrls: ['./vm-card.component.css']
})
export class VmCardComponent {
  @Input() vm!: Vm;

  constructor(private vmService: VmService) { }

  start() {
    this.vmService.start(this.vm.id).subscribe(() => {
      this.pollVmState();
    });
  }

  stop() {
    this.vmService.stop(this.vm.id).subscribe(() => {
      this.pollVmState();
    });
  }

  sync() {
    this.vmService.sync(this.vm.id).subscribe((response) => {
      this.vm.state = response.state;
    });
  }

  private pollVmState() {
    const pollSubscription: Subscription = interval(1000).pipe(
      take(10),
      switchMap(() => this.vmService.sync(this.vm.id)),
      takeWhile((response: { state: State; }) => !this.isFinalState(response.state), true)
    ).subscribe({
      next: (response: { state: State; }) => {
        this.vm.state = response.state;

        if (this.isFinalState(response.state)) {
          pollSubscription.unsubscribe();
        }
      },
      error: (err) => {
        pollSubscription.unsubscribe();
      }
    });
  }

  private isFinalState(state: State): boolean {
    return state === State.Running || state === State.Stopped || state === State.Error || state === State.Destroyed;
  }

  getLabelsTooltip(vm: Vm): string {
    const context = vm.labels.context.replace(/-/g, '‑'); // non-breaking hyphen (U+2011)
    const group = vm.labels.group.replace(/-/g, '‑');
    const owner = vm.labels.owner.replace(/-/g, '‑');
    return `Context: ${context}\nGroup: ${group}\nOwner: ${owner}`;
  }
}