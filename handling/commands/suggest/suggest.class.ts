class Suggest{
  constructor(private c: string, private g: string, private u: any) { };

  get content() { return this.c };
  get guild() { return this.g };
  get user() { return this.u };
}

module.exports = Suggest;