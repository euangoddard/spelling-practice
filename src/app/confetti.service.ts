import { Injectable, NgZone } from '@angular/core';
import { create as createConfetti, Options } from 'canvas-confetti';

type Confetti = (options?: Options) => Promise<null> | null;

@Injectable({
  providedIn: 'root',
})
export class ConfettiService {
  private readonly confetti: Confetti;

  constructor(private readonly zone: NgZone) {
    // @ts-ignore
    this.confetti = createConfetti(null, {
      resize: true,
      useWorker: true,
    } as any);
  }

  explode(): void {
    this.zone.runOutsideAngular(() => {
      this.confetti({
        particleCount: 250,
        origin: {
          x: 0.5,
          y: 0.8,
        },
      });
    });
  }
}
