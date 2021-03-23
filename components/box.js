import Component from "./component.js";
import Position from "../position.js";

// Axis aligned bounding box (AABB)
export default class Box extends Component {
    constructor (position, color, width, height, depth) {
        super(position, color);
        this.width = width;
        this.height = height;
        this.depth = depth;
    }

    distance (position) {
        const max = new Position(this.width, this.height, this.depth).add(this.position);
        return position.distance(position.clone().clamp(this.position, max));
    }

    getNormal (position) {
        const normal = new Position();
        const relative = this.position.clone().add({
            x: this.width / 2,
            y: this.height / 2,
            z: this.depth / 2,
        }).subtract(position);
        const max = Math.max(relative.x, relative.y, relative.z);
        if (max === relative.x) {
            normal.x = 1;
        }
        else if (max === relative.y) {
            normal.y = 1;
        }
        else if (max === relative.z) {
            normal.z = 1;
        }

        return normal.multiply(Math.sign(max));
    }
}
