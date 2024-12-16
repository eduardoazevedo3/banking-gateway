export abstract class BaseEntity<E = unknown> {
  constructor(partial?: Partial<E>) {
    if (partial) Object.assign(this, partial);
  }
}
