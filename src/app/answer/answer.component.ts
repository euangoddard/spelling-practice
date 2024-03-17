import { NgIf } from '@angular/common';
import { Component, inject, input, output, signal } from '@angular/core';
import { SpeechService } from '../speech.service';

enum AnswerState {
  Pending,
  Incorrect,
  Correct,
}

@Component({
  selector: 'sp-answer',
  standalone: true,
  imports: [NgIf],
  templateUrl: './answer.component.html',
})
export class AnswerComponent {
  readonly speechService = inject(SpeechService);

  readonly word = input.required<string>();
  readonly number = input.required<number>();
  readonly correct = output<boolean>();

  readonly answer = signal('');
  readonly state = signal<AnswerState>(AnswerState.Pending);

  readonly AnswerState = AnswerState;

  handleCheck(event: SubmitEvent) {
    event.preventDefault();
    if (this.answer() === this.word()) {
      this.state.set(AnswerState.Correct);
      this.correct.emit(true);
    } else {
      this.state.set(AnswerState.Incorrect);
      this.speechService.speakWord('Not quite right. Try again');
    }
  }

  handleInput(event: any) {
    this.answer.set(event.currentTarget.value.trim().toLocaleLowerCase());
    this.state.set(AnswerState.Pending);
  }

  speakWord(): void {
    this.speechService.speakWord(this.word());
  }
}
