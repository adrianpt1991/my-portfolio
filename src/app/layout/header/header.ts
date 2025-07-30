import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  menuOpen = signal(false);
}
