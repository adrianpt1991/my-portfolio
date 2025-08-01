import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Hero } from './features/hero/hero';
import { Header } from './layout/header/header';
import { About } from './features/about/about';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Hero, About],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-portfolio');
}
