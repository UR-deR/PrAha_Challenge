class Rectangle {
  constructor(public width: number, public height: number) {}
  area() {
    return this.width * this.height;
  }
}

class Circle {
  constructor(public radius: number) {}
  area() {
    return Math.PI * this.radius ** 2;
  }
}

var rectangle: Rectangle = new Circle(5); // compile error occurs
rectangle.area();

// 面積を表示する共通関数を作りたい場合、型判定をしないといけない
const showArea = (shape: Object) => {
  if (shape instanceof Circle) {
    console.log(shape.area());
  }
  if (shape instanceof Rectangle) {
    console.log(shape.area());
  }
};

var rectangle: Rectangle = new Rectangle(5, 10);
showArea(rectangle);
export {};
