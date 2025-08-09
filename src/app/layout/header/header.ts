import { CommonModule, NgOptimizedImage } from '@angular/common';
import { afterNextRender, Component, DestroyRef, inject, signal } from '@angular/core';

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

  constructor() {
    // Run once after the app has rendered so all sections exist in the DOM.
    afterNextRender({
      // Mixed is fine here (we're neither forcing sync reads/writes in a loop)
      mixedReadWrite: () => {
        const sections = Array.from(document.querySelectorAll<HTMLElement>('section[id]'));
        if (!sections.length) return;

        const obs = new IntersectionObserver(
          entries => {
            // Pick the most visible section among intersecting ones
            let topCandidate: IntersectionObserverEntry | undefined;
            for (const e of entries) {
              if (!e.isIntersecting) continue;
              if (!topCandidate || e.intersectionRatio > topCandidate.intersectionRatio) {
                topCandidate = e;
              }
            }
            if (topCandidate) {
              this.activeSection.set(topCandidate.target.id as typeof this.activeSection extends infer T ? never : never);
            }
          },
          {
            threshold: [0.6],     // ~60% visible to activate
            rootMargin: '-64px 0px 0px 0px', // account for fixed header height
          }
        );

        sections.forEach(s => obs.observe(s));

        // initial highlight from URL hash (if any)
        if (location.hash) {
          const id = location.hash.replace('#','') as any;
          this.activeSection.set(id);
        }

        // cleanup on destroy
        this.destroyRef.onDestroy(() => obs.disconnect());
      }
    });
  }

  isActive(id: string) {
    return this.activeSection() === id;
  }
}
