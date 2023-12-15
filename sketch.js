function setup() {
    let cnv = createCanvas(1111, 1111);
    cnv.parent('canvasContainer');

    background(255);
    noLoop();

    let drawButton = select('#drawButton');
    drawButton.mousePressed(drawNewLines);

    let autoButton = select('#autoButton');
    autoButton.mousePressed(toggleAutoplay);

    let clearButton = select('#clearButton');
    clearButton.mousePressed(clearDrawing);

    let exportSVGButton = select('#exportSVGButton');
    exportSVGButton.mousePressed(exportSVG);

    let exportPNGButton = select('#exportPNGButton');
    exportPNGButton.mousePressed(exportPNG);
}

let lines = [];
let autoplay = false;

function draw() {
    if (autoplay) {
        drawNewLines();
    }
}

function drawNewLines() {
    for (let i = 0; i < 1111; i++) {
        let lineParams = {
            x1: random(width),
            y1: random(height),
            x2: random(-50, 50),
            y2: random(-50, 50),
            cx1: random(-10, 10),
            cy1: random(-10, 10),
            cx2: random(-10, 10),
            cy2: random(-10, 10),
            strokeWeight: random(0.5, 1.5)
        };

        lines.push(lineParams);
        drawLine(lineParams);
    }
}

function drawLineWithGraphics(params, graphics) {
    graphics.stroke(0);
    graphics.strokeWeight(params.strokeWeight);

    let x2 = params.x1 + params.x2;
    let y2 = params.y1 + params.y2;
    let cx1 = params.x1 + params.cx1;
    let cy1 = params.y1 + params.cy1;
    let cx2 = x2 + params.cx2;
    let cy2 = y2 + params.cy2;

    graphics.bezier(params.x1, params.y1, cx1, cy1, cx2, cy2, x2, y2);
    graphics.line(params.x1, params.y1, x2, y2);
}

function drawLine(params) {
    drawLineWithGraphics(params, this);
}

function drawLineSVG(params, graphics) {
    drawLineWithGraphics(params, graphics);
}

function toggleAutoplay() {
    autoplay = !autoplay;
    if (autoplay) {
        frameRate(3);
        select('#autoButton').html('Stop Growing');
        loop();
    } else {
        frameRate(60);
        select('#autoButton').html('Watch Grow');
        noLoop();
    }
}

function clearDrawing() {
    background(255);
    lines = [];
}

function getFormattedTimestamp() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = now.getHours();
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');
    const ampm = hour >= 12 ? 'pm' : 'am';
    const formattedHour = hour % 12 || 12;

    return `${year}-${month}-${day} at ${formattedHour}.${minute}.${second} ${ampm}`;
}

function exportSVG() {
    const filename = `Watch Grass by Benbodhi - ${getFormattedTimestamp()}.svg`;
    let svg = createGraphics(1111, 1111, SVG);
    lines.forEach(line => drawLineSVG(line, svg));
    save(svg, filename);
    svg.remove();
}

function exportPNG() {
    const filename = `Watch Grass by Benbodhi - ${getFormattedTimestamp()}.png`;
    saveCanvas(filename, 'png');
}