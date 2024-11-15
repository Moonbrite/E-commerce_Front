export class Category {
  constructor(
    id?: number,
    name?: string,
    parent?: Category | null // Peut être null s'il n'y a pas de parent

  ) {
    this.id = id;
    this.name = name;
    this.parent = parent;
  }

  id?: number;
  name?: string;
  parent?: Category | null;
}
