import {NgForOf} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterOutlet} from '@angular/router';
import {tuiAsPortal, TuiPortals} from '@taiga-ui/cdk';
import {
    TuiAppearance,
    TuiButton,
    TuiDataList,
    TuiDropdown,
    TuiDropdownService,
    TuiIcon,
    TuiTextfield,
} from '@taiga-ui/core';
import {
    TuiAvatar,
    TuiBadge,
    TuiBadgeNotification,
    TuiChevron,
    TuiFade,
    TuiSwitch,
    TuiTabs,
} from '@taiga-ui/kit';
import {TuiNavigation} from '@taiga-ui/layout';
import { TASK_NAVIGATION_COMPONENTS } from '../../shared/constants/navigation/tasks-navigation.constants';
import { ExpandibleSidebarComponent } from "../../shared/components/navigation/expandible-sidebar/expandible-sidebar.component";

@Component({
    standalone: true,
    selector: 'app-main-layout',
    exportAs: "Example1",
    imports: [
    FormsModule,
    NgForOf,
    TuiAppearance,
    TuiAvatar,
    TuiBadge,
    TuiBadgeNotification,
    TuiButton,
    TuiDataList,
    TuiDropdown,
    TuiFade,
    TuiIcon,
    TuiNavigation,
    TuiSwitch,
    TuiTabs,
    TuiTextfield,
    RouterOutlet,
    TuiIcon,
    ExpandibleSidebarComponent
],
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TuiDropdownService, tuiAsPortal(TuiDropdownService)],
})
export default class MainLayoutComponent extends TuiPortals {
    
    protected open = false;
    protected switch = false;
    
    tasksNavigationComponents = TASK_NAVIGATION_COMPONENTS;
}
