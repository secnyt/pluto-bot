class Suggest{
  constructor(private c: string, private g: string, private u: any, private i: number) { };

  get content() { return this.c };
  get guild() { return this.g };
  get user() { return this.u };
  get index() { return this.i };
}

module.exports = Suggest;