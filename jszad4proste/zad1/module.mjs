// eslint-disable-next-line import/prefer-default-export
export class Operation {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  sum() {
    return this.x + this.y;
  }
}
