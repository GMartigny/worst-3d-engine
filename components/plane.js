import Component from "./component.js";

// Infinite flat plane
export default class Plane extends Component {
    constructor (position, color, normal) {
        super(position, color);
        this.normal = normal;
        this.normal.length = 1;
    }

    distance (position) {
        const {x, y, z, length} = this.normal;
        const d = -(x * this.position.x) - (y * this.position.y) - (z * this.position.z);
        return Math.abs((x * position.x) + (y * position.y) + (z * position.z) + d) / length;
    }

    getNormal () {
        return this.normal;
    }
}
