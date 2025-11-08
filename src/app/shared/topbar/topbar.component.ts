import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Main } from '../../core/services/main';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, TooltipModule],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {
  constructor(protected service: Main){}

}
