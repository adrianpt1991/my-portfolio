import { CommonModule, NgOptimizedImage } from '@angular/common';
import { afterEveryRender, Component, DestroyRef, inject, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  menuOpen = signal(false);
  activeSection = signal<'home'|'about'|'services'|'experience'|'projects'>('home');

  private destroyRef = inject(DestroyRef);
  private obs?: IntersectionObserver;
  private observed = new Set<Element>(); // avoid double-observing

  constructor() {
    // Runs after *every* render; perfect for picking up @defer’ed content as it appears.
    afterEveryRender(() => {
      // Lazily create the observer once
      if (!this.obs) {
        this.obs = new IntersectionObserver(
          (entries) => {
            let top: IntersectionObserverEntry | undefined;
            for (const e of entries) {
              if (!e.isIntersecting) continue;
              if (!top || e.intersectionRatio > top.intersectionRatio) top = e;
            }
            if (top) this.activeSection.set(top.target.id as any);
          },
          {
            threshold: [0.45],                 // 45% of the section visible
            rootMargin: '-64px 0px 0px 0px',  
          }
        );

        this.destroyRef.onDestroy(() => this.obs?.disconnect());
      }

      // Find any *new* sections that just got rendered by @defer
      const sections = document.querySelectorAll<HTMLElement>('section[id]');
      sections.forEach((s) => {
        if (!this.observed.has(s)) {
          this.obs!.observe(s);
          this.observed.add(s);
        }
      });

      // Honor current hash once, when sections exist
      if (location.hash) {
        const id = location.hash.slice(1);
        const el = document.getElementById(id);
        if (el) this.activeSection.set(id as any);
      }
    });
  }

  isActive(id: string) {
    return this.activeSection() === id;
  }
}
