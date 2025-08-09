import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Hero } from './features/hero/hero';
import { Header } from './layout/header/header';
import { About } from './features/about/about';
import { Footer } from './layout/footer/footer';
import { Services } from './features/services/services';
import { Experience } from './features/experience/experience';
import { Projects } from './features/projects/projects';
import { Contact } from './features/contact/contact';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Hero, About, Footer, Services, Experience, Projects, Contact],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-portfolio');
}
