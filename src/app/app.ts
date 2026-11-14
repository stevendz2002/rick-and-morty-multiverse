import { Component } from '@angular/core';
import { Explorer } from './presentation/explorer/explorer';

@Component({
  selector: 'app-root',
  imports: [Explorer],
  templateUrl: './app.html',
})
export class App {}
