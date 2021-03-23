import Position from "../position.js";

// Common super class
export default class Component {
    constructor (position, color) {
        this.position = Position.from(position);
        this.color = color;
    }
}
