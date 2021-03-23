// Utility color class
export default class Color {
    constructor (h, s, l) {
        this.h = h;
        this.s = s;
        this.l = l;
    }

    lightness (value) {
        this.l = value;
        return this;
    }

    clone () {
        return new Color(this.h, this.s, this.l);
    }

    toString () {
        return `hsl(${this.h},${this.s * 100}%,${this.l * 100}%)`;
    }
}
