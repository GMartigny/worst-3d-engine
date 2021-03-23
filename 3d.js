import { Sphere, Plane, Box } from "./components";
import Position from "./position.js";
import rayMarching from "./ray-marching.js";
import Color from "./color.js";

// Scene constants
const pixel = 8;
const size = {
    width: 800,
    height: 600,
};
const limit = 700;
const camera = new Position();
const perspective = 200;
const components = [
    new Sphere([0, 0, 200], new Color(200, 1, 1), 100),
    new Box([100, 50, 100], new Color(0, 1, 0.5), 30, 30, 30),
    new Plane([0, (size.height / pixel) + pixel, perspective], new Color(0, 0, 0.4), new Position(0, 1, 0)),
];
const light = new Position(0, -50, 0);

// Create the canvas
const canvas = document.createElement("canvas");
canvas.width = size.width;
canvas.height = size.height;
canvas.style.backgroundColor = "#000";
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

let frame = 0;
// Render loop
function render () {
    requestAnimationFrame(render);
    ctx.clearRect(0, 0, size.width, size.height);

    // Move the light around
    light.x = Math.sin(frame / 30) * 250;
    light.z = Math.cos(frame / 30) * 250 + 200;

    // For each pixel on the screen
    for (let x = 0; x < size.width; x += pixel) {
        for (let y = 0; y < size.height; y += pixel) {
            const max = new Position(x - (size.width / 2), y - (size.height / 2), perspective);
            max.length = limit;
            const [intersect, point] = rayMarching(camera, max, components);
            // The ray intersect a component
            if (intersect) {
                // Compute diffuse light
                const normal = intersect.getNormal(point);
                const angle = normal.angle(light.clone().subtract(point));
                const diffuse = (angle / Math.PI) ** 2;
                // Compute specular light
                const step = light.clone().subtract(point);
                step.length = 20;
                point.add(step);
                const shadowed = rayMarching(point, light, components);
                const specular = shadowed.length ? 0.3 : 0.7;
                // Mix current lightness with diffuse and specular
                ctx.fillStyle = intersect.color.clone().lightness(intersect.color.l * specular * diffuse);
                // Draw the pixel
                ctx.fillRect(x, y, pixel, pixel);
            }
        }
    }
    frame++;
}

render();
