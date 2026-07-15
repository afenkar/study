/**
 * Day 10 练习：用 class 实现图形继承
 * 完成 3 个 TODO，通过 exercise.js 验证
 */

export class Shape {
  constructor(color) {
    this.color = color;
  }

  // TODO 1: 返回 `${this.color} shape`（基类默认描述）
  describe() {
    // throw new Error('TODO 1: 实现 Shape.describe');
    return `${this.color}shape`
  }

  area() {
    return 0;
  }
}

// TODO 2: class Circle extends Shape
//   constructor(color, radius) → super(color); this.radius = radius
//   area() → Math.PI * r * r
//   describe() → `${super.describe()}, radius=${radius}`

export class Circle extends Shape{
  constructor(color,radius) {
    // throw new Error('TODO 2: 实现 class Circle extends Shape');
    super(color);
    this.radius = radius;
  }
  area(){
    return Math.PI * this.radius *this.radius;
  }
  describe(){
    return `${super.describe()},radius=${this.radius}`;
  }
}

// TODO 3: class Rect extends Shape
//   constructor(color, width, height) → super(color)
//   area() → width * height

export class Rect extends Shape{
  constructor(color,width,height) {
    // throw new Error('TODO 3: 实现 class Rect extends Shape');
    super(color)
    this.width = width;
    this.height = height
  }
  area(){
    return this.width * this.height;
  }
}
