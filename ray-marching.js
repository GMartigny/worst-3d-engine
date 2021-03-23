// Find the closest component from a point
const findClosest = (point, components) => {
    let closest = components[0];
    let minDistance = closest.distance(point);
    for (let i = 1, l = components.length; i < l; ++i) {
        const distance = components[i].distance(point);
        if (distance < minDistance) {
            closest = components[i];
            minDistance = distance;
        }
    }
    return [closest, minDistance];
};

// Ray-marching function
export default (source, destination, components) => {
    // Minimum distance for collision
    const min = 0.9;
    // Maximum distance
    const max = destination.distance(source);
    const ray = source.clone();
    const step = destination.clone().subtract(source);

    // While the ray has not reach the maximum distance
    while (ray.distance(source) < max) {
        const [closest, distance] = findClosest(ray, components);
        // If the distance is under the minimum
        if (distance < min) {
            return [closest, ray];
        }
        // Step away
        step.length = distance;
        ray.add(step);
    }

    // Didn't find anything
    return [];
};
