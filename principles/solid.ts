/**
 * * Single responsibility
 * single responsibility, a class/function/modules should be responsible for only one activity and
 * only have one cuase to change.
 */


/* bad */
class Student {
  createAccount() { }

  calculateGrade() { }
}

/* good */
/* divided classes, each has only duty, one responsibility */
class StudentAccount {
  createAccount() { }
}

class StudentGrade {
  calculateGrade() { }
}


/**
 * * Open closed
 * open-closded principle, software should be open for extensions but closed for modification.
 * The essential concept behind this approach is that we should be able to add new functionality without requiring changes to the existing code.
 */

/* bad */
class Triangle {
  base: number;
  height: number;
}

class Rectangle {
  with: number;
  height: number;
}

class Shape {
  computeArea(shapes: Array<Triangle | Rectangle>) {
    return shapes.reduce((area, shape) => {
      if (shape instanceof Rectangle) {
        return area + shape.with * shape.height;
      }

      if (shape instanceof Triangle) {
        return area + shape.base * shape.height * 0.5;
      }

      return 0;
    }, 0);
  }
}

/* when we add new class, we need to add new condition in computeArea function. */
class Circle {
  radiues: number;
}

/* solve this issue with an interface */
interface ShapeArea {
  compute(): number;
}

class _Triangle implements ShapeArea {
  base: number;
  height: number;

  compute(): number {
    return this.base * this.height * 0.5;
  }
}

class _Rectangle implements ShapeArea {
  with: number;
  height: number;

  compute(): number {
    return this.with * this.height;
  }
}


/* now we can change the computeArea function. We do not need any changes in computeArea function, just add new shape that is all. */
class _Shape {
  computeArea(shapes: Array<_Triangle | _Rectangle>) {
    return shapes.reduce((area, shape) => {
      return area + shape.compute();
    }, 0);
  }
}


/**
 * * Liskov Substitution
 * helps to ensure that modifying one aspect of our system does not affect other elements negatively.
 * subclasses should be interchangeable with their base classes.
 * This indicates that, assuming that class B is a subclass of class A, we should be able to present an object of class B to any method that expects an object of type A without worrying that the method may produce strange results.
 */

/* bad */
class Bird {
  fly(): void {
    console.log('Bird fly.');
  }
}

class Duck extends Bird {
  fly(): void {
    console.log('Duck fly.');
  }
}

class Penguin extends Bird {
  fly(): void {
    throw new Error('Penguin cannot fly');
  }
}

/* good */
class _Penguin extends Bird {
  /* Penguin cannot fly, so this method is ommitted */
}

const duck = new Duck();
// duck.fly => Output: "Duck is flying

const penguin = new _Penguin();
// penguin.fly => Output: Bird is flying
/* In the above example, the _Penguin class does not override the ‘fly’ method, implicitly inheriting the default behavior of the ‘fly’ method.  */


/**
 * * Interface segragation principle
 * The interface segregation principle encourages smaller, more targeted interfaces. According to this concept, multiple client-specific interfaces are preferable to a single general-purpose interface.
 */

/* bad */

interface IShape {
  calculateArea(): void;
  calculateVolume(): void;
}

class Square implements IShape {
  calculateArea(): void { }
  calculateVolume(): void { }
}

class Cylinder implements IShape {
  calculateArea(): void { }
  calculateVolume(): void { }
}

/* 
From the example above, you’ll see that you cannot determine the volume of a square or rectangle. You must declare every method, even the ones you won’t use or need because the class implements the interface.
*/
/* solution */

interface IArea {
  calculateArea(): void;
}

interface IVolume {
  calculateVolume(): void;
}

class _Square implements IArea {
  calculateArea(): void { }
}

class _Cylinder implements IArea, IVolume {
  calculateArea(): void { }
  calculateVolume(): void { }
}

/**
 * * Dependency inversion principle
 * High-level classes should not depend on low-level classes. Instead, they should depend on abstractions.
 * Abstraction should not depend on concretes; concretes should depend on abstractions.
 */

/* bad */
// low level class
class Database {
  save(data: any): void { }
}

// high level class
class Order {
  // depends on low level class
  private database: Database;
  constructor() {
    this.database = new Database();
  }

  save(data: any) {
    this.database.save(data);
  }
}

const order = new Order();
order.save({ name: 'Serhat' });

/* 
In the above example, the high-level class Order becomes dependent on the low-level class ‘Database,’ violating the DIP (Dependency Inversion Principle).
*/
/* solution */
interface IDatabaseServer {
  save(data: any): void;
}

// low level class implements the interface
class _Database implements IDatabaseServer {
  save(data: any): void {}
}

// high level class depends on interface, not concrete implementations
class _Order {
  private databaseServer: IDatabaseServer;
  constructor(databaseServer: IDatabaseServer) {
    this.databaseServer = databaseServer;
  }

  save(data: any) {
    this.databaseServer.save(data);
  }
}
/* In the above example, the high-level class depends on the abstraction rather than directly depending on the low-level class. */

const _order = new _Order(new _Database());
_order.save({ name: 'Serhat' });