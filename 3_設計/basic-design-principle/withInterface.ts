interface Shape {
  area(): number;
}

class Rectangle implements Shape {
  constructor(public width: number, public height: number) {}
  area() {
    return this.width * this.height;
  }
}

class Circle implements Shape {
  constructor(private radius: number) {}
  area() {
    return Math.PI * this.radius ** 2;
  }
}

const showArea = (shape: Shape) => {
  console.log(shape.area());
};

const square = new Rectangle(5, 10);
const circle = new Circle(5);
showArea(square);
showArea(circle);

export {};
