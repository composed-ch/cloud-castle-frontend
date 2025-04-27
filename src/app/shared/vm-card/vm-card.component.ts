import { Component, Input } from '@angular/core';
import { Subscription, interval, take, takeWhile, switchMap } from 'rxjs';

import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { VmService } from '../../core/services/vm.service';
import { Vm } from '../../core/models/vm.model';
import { State } from '../../core/models/state.enum';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-vm-card',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './vm-card.component.html',
  styleUrls: ['./vm-card.component.css']
})
export class VmCardComponent {
  @Input() vm!: Vm;
  pollingAction: 'start' | 'stop' | null = null;
  constructor(private vmService: VmService) { }

  start() {
    this.pollingAction = 'start';
    this.vmService.start(this.vm.id).subscribe({
      next: () => {
        this.pollVmState();
      },
      error: (_err) => {
        this.pollingAction = null;
      }
    });
  }

  stop() {
    this.pollingAction = 'stop';
    this.vmService.stop(this.vm.id).subscribe({
      next: () => {
        this.pollVmState();
      },
      error: (_err) => {
        this.pollingAction = null;
      }
    });
  }

  sync() {
    this.vmService.sync(this.vm.id).subscribe((response) => {
      this.vm.state = response.state;
      if (this.isFinalState(this.vm.state)) this.pollingAction = null;
    });
  }

  private pollVmState() {
    const pollSubscription = interval(2000).pipe(
      take(120),
      switchMap(() => this.vmService.sync(this.vm.id))
    ).subscribe({
      next: (response) => {
        this.vm.state = response.state;
        if (this.isFinalState(response.state)) {
          pollSubscription.unsubscribe();
          this.pollingAction = null;
        }
      },
      error: (err) => {
        console.error(`Polling error ${this.vm.name}`, err);
        this.pollingAction = null;
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