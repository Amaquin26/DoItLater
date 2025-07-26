import { TuiRoot } from "@taiga-ui/core";
import { Component } from '@angular/core';
import MainLayoutComponent from "./layouts/main-layout/main-layout.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-root',
  imports: [TuiRoot, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'todo-app';
}
