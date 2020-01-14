


function A() {
  this.name = 'a'
}

function B() {
  this.name = 'b'
}

B.prototype = {
  getName() {
    return this.name
  }
}

A.prototype = B.prototype
A.prototype.constructor = A
B.prototype.constructor = B

const a = new A()

console.log(a)
console.log(a instanceof A)
console.log(a instanceof B)
