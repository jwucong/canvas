

class Test {
  constructor(name) {
    this.name = name
    this.time = Date.now()
  }

  getName() {
    return this.name
  }

  newClass(name) {
    return new this.constructor(name)
  }
}

const a = new Test('a')

console.log(a)
