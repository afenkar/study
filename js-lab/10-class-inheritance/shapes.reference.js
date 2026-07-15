/**
 * 参考答案
 */
export class ShapeReference {
  constructor(color) {
    this.color = color;
  }

  describe() {
    return `${this.color} shape`;
  }

  area() {
    return 0;
  }
}

export class CircleReference extends ShapeReference {
  constructor(color, radius) {
    super(color);
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius ** 2;
  }

  describe() {
    return `${super.describe()}, radius=${this.radius}`;
  }
}

export class RectReference extends ShapeReference {
  constructor(color, width, height) {
    super(color);
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }

  describe() {
    return `${super.describe()}, ${this.width}x${this.height}`;
  }
}
