export type Maybe<T> = T | null | undefined;

export interface Book<T = number> {
  id?: number;
  title: string;
  author: string;
  notes?: string;
  year?: T;
}
