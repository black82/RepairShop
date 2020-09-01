import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-autocomplet',
  templateUrl: './autocomplet.component.html',
  styleUrls: ['./autocomplet.component.css']
})
export class AutocompletComponent implements OnInit {
  @Input()
  control: AbstractControl;

  filteredItems1: Observable<any[]>;
  showAddButton = false;
  showAddAutocomplete = false;
  prompt = 'Press <enter> to add "';
  items: string[] = [
    'Cats',
    'Birds',
    'Dogs',
    '1',
    'iphone',
    'der'
  ];

  constructor() {
  }

  ngOnInit(): void {
    this.filteredItems1 = this.control.valueChanges.pipe(
      startWith(''),
      map(item => item ? this.filterItems(item) : this.items.slice())
    );
  }

  filterItems(name) {
    let results = this.items.filter(item =>
      item?.toLowerCase().indexOf(name?.toLowerCase()) === 0);

    this.showAddButton = results.length === 0;
    if (this.showAddButton) {
      results = [this.prompt + name + '"'];
    }
    this.showAddAutocomplete = true;

    return results;
  }

  optionSelected(option) {
    if (option?.indexOf(this.prompt) === 0) {
      this.addOptionModel();
    } else {
      this.control.setValue(option);
      this.showAddAutocomplete = false;
    }
  }

  addOptionModel() {
    const option = this.removePromptFromOption(this.control.value);
    if (!this.items.some(entry => entry === option)) {
      const index = this.items.push(option) - 1;
      this.control.setValue(this.items[index]);
    }
  }

  removePromptFromOption(option) {
    if (option.startsWith(this.prompt)) {
      option = option.substring(this.prompt.length, option.length - 1);
    }
    return option;
  }
}
