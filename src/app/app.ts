import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Hero } from './features/hero/hero';
import { Header } from './layout/header/header';
import { About } from './features/about/about';
import { Footer } from './layout/footer/footer';
import { Services } from './features/services/services';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Hero, About, Footer, Services],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-portfolio');
}
