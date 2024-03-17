import { Component, OnInit, inject, output, signal } from '@angular/core';
import { StorageService } from '../storage.service';

const storageKey = 'spellings';

@Component({
  selector: 'sp-edit',
  standalone: true,
  imports: [],
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {
  readonly storage = inject(StorageService);

  readonly change = output<readonly string[]>();

  readonly spellingsText = signal<string>('');

  ngOnInit(): void {
    const storedSpellings = this.storage.get<readonly string[]>(storageKey);
    if (storedSpellings) {
      this.spellingsText.set(storedSpellings.join('\n'));
    }
  }

  updateSpellingsText(event: Event): void {
    this.spellingsText.set((event.target as HTMLTextAreaElement).value);
  }

  storeSpellings(event: SubmitEvent): void {
    event.preventDefault();
    const spellings = this.spellingsText()
      .split('\n')
      .map((spelling) =>
        spelling
          .trim()
          .toLocaleLowerCase()
          .replace(/[^a-z-]/g, '')
      )
      .filter((spelling) => !!spelling);
    this.storage.set(storageKey, spellings);
    this.change.emit(spellings);
  }
}
