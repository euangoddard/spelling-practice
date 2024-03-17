import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { AnswerComponent } from './answer/answer.component';
import { ConfettiService } from './confetti.service';
import { EditComponent } from './edit/edit.component';

@Component({
  selector: 'sp-root',
  standalone: true,
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, NgFor, AnswerComponent, EditComponent],
})
export class AppComponent {
  readonly confetti = inject(ConfettiService);

  readonly spellings = signal<readonly string[]>([]);
  readonly answers = signal<Map<number, boolean>>(new Map());

  startAnswering(spellings: readonly string[]): void {
    this.spellings.set(spellings);
    this.answers.set(new Map());
  }

  startEditing(): void {
    this.spellings.set([]);
  }

  markAnswerAsCorrect(index: number): void {
    this.answers.update((answers) => {
      answers.set(index, true);
      return answers;
    });
    const spellingsCount = this.spellings().length;
    if (
      spellingsCount ===
      Array.from(this.answers().values()).filter((v) => v).length
    ) {
      this.confetti.explode();
    }
  }
}
