const setDifference = (a, b) => new Set([...a].filter(x => !b.has(x)));
const setIntersection = (a, b) => new Set([...a].filter(x => b.has(x)));
const setUnion = (a, b) => new Set([...a, ...b]);

module.exports = {setDifference, setIntersection, setUnion}