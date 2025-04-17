import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VmService, Vm } from '../../core/services/vm.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
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