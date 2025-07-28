import { NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiDataList, TuiDropdown } from '@taiga-ui/core';
import { TuiBadge } from '@taiga-ui/kit';
import { TuiNavigation } from '@taiga-ui/layout';
import { ROUTES } from '../../../constants/routes/routes.constants';

@Component({
  selector: 'app-expandible-sidebar',
  imports: [TuiNavigation,TuiBadge,TuiDropdown,RouterLink,TuiDataList,NgIf,],
  templateUrl: './expandible-sidebar.component.html',
  styleUrl: './expandible-sidebar.component.css'
})
export class ExpandibleSidebarComponent {
  protected expanded = signal(false);
  protected open = false;
  protected switch = false;
  protected readonly routes: any = {};

  homeRoute = ROUTES.home;

  protected handleToggle(): void {
      this.expanded.update((e) => !e);
  }
}
