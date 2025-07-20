import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero {

}
