import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-experience',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './experience.html',
  styleUrl: './experience.css'
})
export class Experience {
  selectedTab = signal<'education' | 'experience'>('experience');

  selectTab(tab: 'education' | 'experience') {
    this.selectedTab.set(tab);
  }
}
