function run_on_load_or_immediately(func) {
    if (document.readyState === 'complete') {
        func();
    } else {
        document.addEventListener('DOMContentLoaded', func, {'once': true});
    }
}


function range(start, end) {
    if (!end) {
        end = start;
        start = 0;
    }
    return [...Array(end - start).keys()].map(x => x + start);
}


function select(selector) {
    return document.querySelector(selector);
}

function selectAll(selector) {
    return document.querySelectorAll(selector);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

let Mouse = {
    X: 0,
    Y: 0,
    velocity_sq: undefined,
}

Object.defineProperty(
    Mouse,
    'velocity',
    {
        get() {
            return Math.sqrt(Mouse.velocity_sq);
        },
        set(val) {
            throw "NotImplementedError";
        }
    }
)

document.addEventListener('mousemove',
    event => {
        Mouse.velocity_sq = Math.pow(event.movementX, 2) + Math.pow(event.movementY, 2);
        Mouse.X = event.clientX;
        Mouse.Y = event.clientY;
    }
);
