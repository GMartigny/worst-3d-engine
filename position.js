// Utility class for 3D vector
export default class Position {
    constructor (x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    distance (position) {
        return Math.hypot(position.x - this.x, position.y - this.y, position.z - this.z);
    }

    add (position) {
        this.x += position.x;
        this.y += position.y;
        this.z += position.z;
        return this;
    }

    subtract (position) {
        this.x -= position.x;
        this.y -= position.y;
        this.z -= position.z;
        return this;
    }

    multiply (number) {
        this.x *= number;
        this.y *= number;
        this.z *= number;
        return this;
    }

    clamp (min, max) {
        this.x = Math.max(Math.min(this.x, max.x), min.x);
        this.y = Math.max(Math.min(this.y, max.y), min.y);
        this.z = Math.max(Math.min(this.z, max.z), min.z);
        return this;
    }

    angle (position) {
        return Math.acos(((this.x * position.x) + (this.y * position.y) + (this.z * position.z)) / (this.length * position.length));
    }

    get length () {
        return Math.hypot(this.x, this.y, this.z);
    }

    set length (length) {
        const ratio = length / this.length;
        this.x *= ratio;
        this.y *= ratio;
        this.z *= ratio;
    }

    clone () {
        return new Position(this.x, this.y, this.z);
    }

    static from (definition) {
        const [x, y, z] = definition;
        return new Position(x, y, z);
    }
}
