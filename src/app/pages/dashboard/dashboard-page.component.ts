import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VmService } from '../../core/services/vm.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { VmCardComponent } from '../../shared/vm-card/vm-card.component';
import { Vm } from '../../core/models/vm.model';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    CommonModule,
    VmCardComponent
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {
  vms: Vm[] = [];

  constructor(private vmService: VmService) {}

  ngOnInit() {
    this.vmService.getVms().subscribe(data => this.vms = data);
  }

  start(vm: Vm) {
    console.log(`Start ${vm.name}`);
  }

  stop(vm: Vm) {
    console.log(`Stop ${vm.name}`);
  }

  sync(vm: Vm) {
    console.log(`Sync ${vm.name}`);
  }
}