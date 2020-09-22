const getInputElm = (props) => {
    let inpElm = document.createElement("input");
    for (let key in props) inpElm.setAttribute(key, props[key]);
    return inpElm;
};

const form = {
    element: document.getElementById("data-form"),
    init() {
        for (let obj of Object.values(this.items)) obj.init();
        // On submit function for form.
        this.element.onsubmit = () => {
            let isValid = true;
            let formData = form.element;
            for (let obj of Object.values(form.items)) {
                if (obj.isValid) isValid &= obj.isValid();
                if (document.getElementsByName(obj.name).length > 0) {
                    document.getElementsByName(obj.name)[0].value = obj.value;
                    continue;
                }
                let inpElm = getInputElm({
                    type: "hidden",
                    value: obj.value,
                    name: obj.name,
                });
                formData.appendChild(inpElm);
            }
            return Boolean(isValid);
        };
    },
    items: {
        pointX: {
            input: document.getElementById("x-input"),
            range: { min: -5, max: 3 },
            name: "x",
            value: null,
            init() {
                const eachRow = 3;
                const { min, max } = this.range;
                for (let i = min; i <= max; ++i) {
                    let divElm = document.createElement("div");
                    for (const st = i; i <= Math.min(st + eachRow - 1, max); ++i) {
                        let buttonElm = getInputElm({
                            type: "button",
                            class: "x-btn",
                            value: i,
                        });
                        divElm.appendChild(buttonElm);
                    }
                    this.input.appendChild(divElm);
                    i--;
                }

                let buttons = document.getElementsByClassName("x-btn");

                for (let btn of buttons) {
                    btn.onclick = function () {
                        for (let button of buttons) button.classList.remove("btn-click");
                        this.classList.add("btn-click");
                        form.items.pointX.value = this.value;
                        let xError = document.getElementById("x-err");
                        xError.innerText = "";
                    }
                }
            },
            isValid() {
                let xError = document.getElementById("x-err");
                if (this.value == null) {
                    xError.innerText = "Point X should be chosen";
                    return false;
                }
                return true;
            },
        },
        pointY: {
            input: document.getElementById("y-input"),
            range: { min: -3, max: 5 },
            name: "y",
            value: null,
            init() {
                let inpElm = getInputElm({
                    type: "text",
                });
                this.input.appendChild(inpElm);

                inpElm.onkeyup = () => {
                    form.items.pointY.value = inpElm.value;
                    let yError = document.getElementById("y-err");
                    yError.innerText = "";
                }
            },
            isValid() {
                let yError = document.getElementById("y-err");
                if (this.value == null) {
                    yError.innerText = "Point Y should not be empty";
                    return false;
                }
                if (isNaN(this.value)) {
                    yError.innerText = "Point Y should be a number";
                    return false;
                }

                let yValue = Number(this.value);
                if (yValue <= this.range.min || yValue >= this.range.max) {
                    yError.innerText = `Point Y should be a number between ${this.range.min} & ${this.range.max}`;
                    return false;
                }
                this.value = Number(this.value);
                return true;
            }
        },
        radius: {
            input: document.getElementById("radius-input"),
            range: { min: 1, max: 5 },
            name: "radius",
            value: 1,
            init() {
                let selectElm = document.createElement("select");
                for (let i = this.range.min; i <= this.range.max; ++i) {
                    let optionElm = document.createElement("option");
                    optionElm.setAttribute("value", i);
                    optionElm.innerText = i;
                    selectElm.appendChild(optionElm);
                }
                this.input.appendChild(selectElm);

                selectElm.onchange = () => {
                    form.items.radius.value = selectElm.value;
                }
            }
        }
    }
};


form.init();