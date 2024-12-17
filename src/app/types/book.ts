import { FormControl } from '@angular/forms'

import { Maybe } from './global'


export interface Book<T = number> {
  id?: number;
  title: string;
  author: string;
  notes?: string;
  year?: T;
}

export interface BookWithoutId extends Omit<Book, 'id' | 'year'> {
  year: Date;
}

export type BookForm = {
  [K in keyof BookWithoutId]: K extends 'year'
    ? FormControl<Maybe<Date>>
    : FormControl<Maybe<string>>;
};
