class SnatchFunction {

  constructor(private main: string, private alias: Array<string>, private func: Function) {}

  get name() { return this.main };
  get aliases() { return this.alias };

  handle(msg: any, parameters: Array<string>, flags: Array<string>) { this.func(msg, parameters, flags); };

}

module.exports = SnatchFunction;