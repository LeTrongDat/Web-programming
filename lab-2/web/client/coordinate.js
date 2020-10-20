let radius;
let rEfficient = 5/6;
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let [maxX, maxY] = [canvas.width, canvas.height];
let [xCenter, yCenter] = [maxX / 2, maxY / 2];
let R = maxX / 2 * rEfficient;

// --------- Subjects --------------
let Ox = [[0, yCenter], [maxX, yCenter]];
let Oy = [[xCenter, maxY], [xCenter, 0]];
let xArrow = [[maxX - 10, yCenter - 5], [maxX, yCenter], [maxX - 10, yCenter + 5]];
let yArrow = [[xCenter - 5, 10], [xCenter, 0], [xCenter + 5, 10]];
let milestones = [];
for(let i = xCenter - R; i <= xCenter + R; i += R/2) {
    milestones.push([[i, yCenter - 2], [i, yCenter + 2]]);
    milestones.push([[xCenter - 2, i], [xCenter + 2, i]]);
};
let arcs = [xCenter, yCenter, R, 0, 0.5 * Math.PI];
let rect = [xCenter - R, yCenter - R/2, R, R/2];
let tri = [[xCenter, yCenter], [xCenter, yCenter - R/2], [xCenter + R/2, yCenter]];
let rText = [];
for(let i = xCenter - R; i <= xCenter + R; i += 2 * R) {
    rText.push([i+5, yCenter-5]);
    rText.push([yCenter+5, i-5]);
};
let r2Text = [];
for(let i = xCenter - R/2; i <= xCenter + R/2; i += R) {
    r2Text.push([i+5, yCenter-5]);
    r2Text.push([yCenter+5, i-5]);
};

// ----------------------- Draw function ----------------------------
let drawLine = function(points) {
    for(let point of points) {
        if (point === points[0]) ctx.moveTo(...point);
        else ctx.lineTo(...point);
    }
};
let drawArcs = function(arc) {
    ctx.moveTo(xCenter, yCenter);
    ctx.arc(...arc);
};
let drawRect = function(rect) {
    ctx.rect(...rect);
};

// -------------------- Drawing subjects -----------------------
ctx.fillStyle = "rgb(51, 153, 255, 0.3)";

drawArcs(arcs);
drawRect(rect);
drawLine(tri);
ctx.fill();

drawLine(Ox);
drawLine(Oy);
drawLine(xArrow);
drawLine(yArrow);
for(let milestone of milestones) drawLine(milestone);
for(let point of rText) ctx.strokeText("R", ...point);
for(let point of r2Text) ctx.strokeText("R/2", ...point);

ctx.stroke();

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    let xArr = [], yArr = [];
    for(let i = 0; i < radius.length; i++) {
        let x = (event.clientX - xCenter - rect.left) / R * radius[i];
        let y = (yCenter - event.clientY + rect.top) / R * radius[i];
        xArr.push(x);
        yArr.push(y);
    }

    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(event.clientX - rect.left, event.clientY - rect.top, 3, 0, 2*Math.PI);
    ctx.fill();
    ctx.closePath();
    redirect({x: xArr.join(","), y: yArr.join(","), radius}, "/lab-2_war/data-process");
};

function redirect(body, url) {
    let form = document.createElement("form");
    document.body.appendChild(form);
    form.method = "POST";
    form.action = url;
    for(let [key, value] of Object.entries(body)) {
        let inpElm = getInputElm({
            type: "hidden",
            value: value,
            name: key,
        });
        form.appendChild(inpElm);
    }
    form.submit();
}

document.querySelector('canvas').addEventListener('mousedown', function(e) {
    radius = form.items.radius.value;
    if (!form.items.radius.isValid()) {
        alert("It's impossible to determine coordinate of the point without radius value or multiple radius value");
        return;
    }
    getCursorPosition(document.querySelector('canvas'), e);
});