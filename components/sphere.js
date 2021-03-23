import Component from "./component.js";

// Sphere
export default class Sphere extends Component {
    constructor (position, color, radius) {
        super(position, color);
        this.radius = radius;
    }

    distance (position) {
        return this.position.distance(position) - this.radius;
    }

    getNormal (position) {
        const normal = this.position.clone().subtract(position);
        normal.length = 1;
        return normal;
    }
}
