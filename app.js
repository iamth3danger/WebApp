const canvas = document.getElementById('canvas');
const ghostCanvas = document.getElementById('ghost-canvas');

let offset = canvas.getBoundingClientRect();

const clearButton = document.getElementById('clear-btn');
let snakeBtn = document.getElementById('snake-btn');
let eraserBtn = document.getElementById('erase-btn');
let undoBtn = document.getElementById('undo-btn');
let vortexBtn = document.getElementById('dimensional-vortex-btn');
let paintBtn = document.getElementById('paint-btn');

let squareBtn = document.getElementById('square-btn');
let triangleBtn = document.getElementById('triangle-btn');
let circleBtn = document.getElementById('circle-btn');

let redSlider = document.getElementById('red-sld');
let blueSlider = document.getElementById('blue-sld');
let greenSlider = document.getElementById('green-sld');
let fontSlider = document.getElementById('fnt-sld');

document.body.style.backgroundColor = "#57BB9B";

update = (slider) => slider.value;



let width = .8 * window.innerWidth;
let height = .9 * window.innerHeight;

function setCanvas(canvas){
canvas.width = width;
canvas.height = height;
}

setCanvas(canvas);
setCanvas(ghostCanvas);

let ctx = canvas.getContext('2d');
let ghostContext = ghostCanvas.getContext('2d');

var c = document.getElementById("myCanvas");
const centerX = (c.width / 2) - 15;
const centerY = c.height / 2;
const radius = 45;
var contx = c.getContext("2d");

let pos = {
    x: 0,
    y: 0
};

function getPosition(el) {
    var xPosition = 0;
    var yPosition = 0;
   
    while (el) {
      xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
      el = el.offsetParent;
    }
    return {
      x: xPosition,
      y: yPosition
    };
}   

function whiteCanvas(){
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function setPosition(e){
    pos.x = e.clientX;
    pos.y = e.clientY;
}

function resize() {
    ctx.canvas.width = width;
    ctx.canvas.height = height;
}

function setMousePosition(e) {
    if (e.buttons === 1) {
        ghostContext.clearRect(0, 0, canvas.width, canvas.height);
        return;
    }

    mouseX = e.clientX - canvasPos.x;
    mouseY = e.clientY - canvasPos.y;

    const radius = parseInt(fontSlider.value) / 2;
    let sideLength = parseInt(fontSlider.value);

    ghostContext.clearRect(0, 0, canvas.width, canvas.height);
    if (squareBtn.value === 'On'){
        drawSquare(ghostContext, mouseX, mouseY, sideLength);
    }
    else if (triangleBtn.value === 'On'){
        drawTriangle(ghostContext, mouseX, mouseY, sideLength);
    }
    else {
        drawEmptyCircle(ghostContext, mouseX, mouseY, radius);

    }

}

function snakeShape(){
    let centerX = pos.x;
    let centerY = pos.y;
    const radius = parseInt(fontSlider.value) / 2;
    let sideLength = parseInt(fontSlider.value);

    if (snakeBtn.value ===  'Off') return;
    
    if (squareBtn.value == 'On'){
        canvasSquare(ctx, centerX, centerY, sideLength);
    }
    else if (triangleBtn.value === 'On'){
        canvasTriangle(ctx, centerX, centerY, sideLength);
    }
    else {
        canvasCircle(ctx, centerX, centerY, radius);
    }

}

function canvasCircle(ctx, centerX, centerY, radius){
    drawCircle (ctx, centerX, centerY, radius);
    ctx.lineWidth = 1;
    ctx.stroke();
}

function canvasSquare(canvas, centerX, centerY, sideLength){
    drawSquare(canvas, centerX, centerY, sideLength);
    canvas.lineWidth = 1;
    canvas.stroke();
    fillShape(canvas);
}

function canvasTriangle(canvas, centerX, centerY, sideLength){
    drawTriangle(canvas, centerX, centerY, sideLength);
    canvas.lineWidth = 1;
    canvas.stroke();
    fillShape(canvas);
}

function dimensionalVorexPosition(e) {
    if (e.buttons !== 1) return;

    if (vortexBtn.value === 'On'){
        mouseX = e.clientX - canvasPos.x;
        mouseY = e.clientY - canvasPos.y;

        const radius = parseInt(fontSlider.value) / 2;
        const sideLength = parseInt(fontSlider.value);
        if (squareBtn.value === 'On'){
            drawSquare(ctx, mouseX, mouseY, sideLength);
        }
        else if (triangleBtn.value === 'On'){
            drawTriangle(ctx, mouseX, mouseY, sideLength);
        }
        else {
            drawEmptyCircle(ctx, mouseX, mouseY, radius);
    
        }

    }
}
let pixelArray = [];
let value = 0;
function paintBtnHandler(e){
    if (e.buttons !== 1) return;

    let centerX = pos.x;
    let centerY = pos.y;
    let startPixel = -1;
    if (paintBtn.value === 'On'){
        var imgData = ctx.getImageData(0, 0, width, height);
        value++;
        let pixelWidth = Math.floor(width);
        //let pixelHeight = Math.floor(height);
        if (value === 1){
            let pixelX = 0;
            let pixelY = 1;

            for (let i = 0; i < imgData.data.length; i += 4){
                pixelX++
                if (pixelX === pixelWidth){
                    pixelX -= pixelWidth;
                    pixelY++;
                }
                let red = imgData.data[i];
                let green = imgData.data[i + 1];
                let blue = imgData.data[i + 2]
                let pixelLog = {
                    red : red,
                    green : green,
                    blue : blue,
                    x : pixelX,
                    y : pixelY
                };
                pixelArray.push(pixelLog);

            }
        }
        let borderArray = [];
        for (let i = 0; i < pixelArray.length; i++){
            if (centerX === pixelArray[i].x
            && centerY === pixelArray[i].y){
                startPixel = i;
            }
            if (pixelArray[i].red !== 255 
                || pixelArray[i].green !== 255
                || pixelArray[i].blue !== 255){
                let borderLog = {
                    x : pixelArray[i].x,
                    y : pixelArray[i].y
                };
                borderArray.push(borderLog)
            }
        }
        // for (let i = startPixel; i < pixelArray.length; i++){
        //     if (pixelArray[i].red === 255 
        //         && pixelArray[i].green === 255
        //         && pixelArray[i].blue === 255){
        //         ctx.fillStyle = "green";
        //         ctx.fillRect(pixelArray[i].x, pixelArray[i].y, 1, 1);
        //     }
        // }
        console.log(`width is : ${width}`);
        console.log(`height is : ${height}`);
        console.log(pixelArray.length);
        console.log(borderArray);
        arrayEraser(pixelArray);

    }
}

function drawTriangle(canvas, x, y, size) {
    let height = (size / 2) * Math.sqrt(3);
    let posX = x - size / 2;
    let posY = y - Math.sqrt(3)*(size / 4) + size / 2;
    canvas.beginPath();
    canvas.moveTo(posX, posY);
    canvas.lineTo(posX + size, posY);
    canvas.lineTo(posX + (size / 2), posY - height);
    canvas.lineTo(posX, posY);
  
    canvas.lineWidth = 1;
    canvas.strokeStyle = "rgb("+ redSlider.value +","+ greenSlider.value
    +","+ blueSlider.value +")";
    canvas.stroke();
}

function drawEmptyCircle(canvas, x, y, radius){
    canvas.beginPath();
    canvas.arc(x, y, radius, 0, 2 * Math.PI, true);
    canvas.lineWidth = 1;
    canvas.strokeStyle = "rgb("+ redSlider.value +","+ greenSlider.value
    +","+ blueSlider.value +")";
    canvas.stroke();
}

function drawCircle (canvas, x, y, radius){
    canvas.beginPath();
    canvas.arc(x, y, radius, 0, 2 * Math.PI, false);
    canvas.fillStyle =  "rgb("+ redSlider.value +","+ greenSlider.value
    +","+ blueSlider.value +")";
    canvas.fill();
}

function drawSquare(canvas, x, y, size){
    canvas.beginPath();
    canvas.rect(x, y, size, size);
    canvas.lineWidth = 1;
    canvas.strokeStyle =  "rgb("+ redSlider.value +","+ greenSlider.value
    +","+ blueSlider.value +")";
    canvas.stroke();
}



function colorCircle() {
    contx.lineWidth = 1;
    contx.strokeStyle = '#000000';
    contx.stroke();
}

function fillCircle(e){
    if (e.buttons !== 1) return;

    fillShape(contx);
}

function fillShape(canvas){
    canvas.fillStyle =  "rgb("+ redSlider.value +","+ greenSlider.value
     +","+ blueSlider.value +")";
    canvas.fill();
}

const clear = function (){
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, width, height);
    whiteCanvas();
}

function onOff(btn) {
    if (btn.value === 'Off')
        btn.value = 'On';
    else
        btn.value = 'Off';
}
 
let buttons = [snakeBtn, vortexBtn, eraserBtn, paintBtn];

function turnOffLastButton(btn, buttons){
    for (let i = 0; i < buttons.length; i++){
        if(buttons[i] !== btn){
            buttons[i].value = 'Off';
            buttonClick(buttons[i]);
        }
    }
}

function turnOffShapeButtons(){
    if (snakeBtn.value === 'Off'
    && vortexBtn.value === 'Off'){
        for (let i = 0; i < shapeButtons.length; i++){
            if (shapeButtons[i].value === 'On'){
                onOff(shapeButtons[i]);
                buttonClick(shapeButtons[i]);
            }
        }
    }
}

function buttonClick(btn) {
    if (btn.value === 'On' ){
        btn.style.backgroundColor = '#61CAF5';
    }
    else if (btn.value === 'Off')
        btn.style.backgroundColor = '#3FB4AE';
}

whiteCanvas();
drawCircle(contx, centerX, centerY, radius);
colorCircle();

function fullButtonHandler(btn){
    turnOffLastButton(btn, buttons);
    onOff(btn);
    buttonClick(btn);
}

function shapeButtonHandler(btn){
    if (snakeBtn.value === 'On' 
    || vortexBtn.value === 'On'){
        onOff(btn);
        buttonClick(btn);
        turnOffLastButton(btn, shapeButtons);
    }
}

function eraser() {
    if (eraserBtn.value === 'On' && snakeBtn.value !== 'On')
    {
        ctx.strokeStyle = '#FFFFFF';
    }
    else if (snakeBtn.value === 'On' && eraserBtn.value !== 'On'){
        document.addEventListener('mousemove', snakeShape);
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#FFFFFF';
    }
    else {
        ctx.strokeStyle =  "rgb("+ redSlider.value +","+ greenSlider.value
        +","+ blueSlider.value +")"; 
    }
}

function draw(e){
    if (e.buttons !== 1 || vortexBtn.value === 'On' 
        || paintBtn.value === 'On') {
        return;
    }
    
    
    ctx.beginPath();
    
    ctx.lineWidth = fontSlider.value;
    ctx.lineCap = 'round';
    eraser();
    ctx.moveTo(pos.x, pos.y);
    setPosition(e);
    ctx.lineTo(pos.x, pos.y);

    ctx.stroke();

    logEntry = {
        x : pos.x,
        y : pos.y,
        font : fontSlider.value,
        color : "rgb("+ redSlider.value +","+ greenSlider.value
        +","+ blueSlider.value +")"
    };
    mouseLog.push(logEntry);
}


// start of undo button functions

let mouseLog = [];
let count = 0;
let bigBigArray = [];

let undoArrayValue = [];
let anotherArray = [];


function arrayPusher(store, begin, end){
    let arr = [];
    
    if (begin >= 0){
        value = bigBigArray[begin].arr.length;
    }
    else {
        value = 0;
    }
    for (let i = value; i < bigBigArray[end].arr.length; i++){
        arr.push(bigBigArray[end].arr[i]);
    }
    let arrayLog = {arr : arr};
    store.push(arrayLog);
}

function arrayEraser(arr){
    arr = [];
}

function writeToLog(mouseLogStorage, count){
    let superLongLog = {
        arr : mouseLogStorage,
        i : count
    };
    bigBigArray.push(superLongLog);
}


function clickChecker(){
    count++;
    let mouseLogStorage = [];
    
    for (let i = 0; i < mouseLog.length; i++){
        mouseLogStorage.push(mouseLog[i]);
    }
    
    writeToLog(mouseLogStorage, count);
}


function findDelta(arr){
    let start = 1;
    for (let i = 1; i < arr.length; i++){
        var diffX = (arr[i].x - arr[i - 1].x);
        var diffY = (arr[i].y - arr[i - 1].y);
        if (diffX < -100 
        || diffX > 100
        || diffY < -100
        || diffY > 100){
            start = i;
        }
    }
    return start;
}


function undoPainter(begin, end, arr, strokeStyle){
    for(let i = begin; i < end; i++)
    {
        ctx.beginPath();
        ctx.lineWidth = (1.2) * parseInt(fontSlider.value);
        ctx.lineCap = 'round';
        ctx.strokeStyle = strokeStyle;
        ctx.moveTo(arr[i - 1].x, arr[i - 1].y);
        ctx.lineTo(arr[i].x, arr[i].y);
        ctx.stroke();
    }
}

function rePrint(end, arr, font, strokeStyle){
    for(let i = 1; i < end; i++)
    {
        ctx.beginPath();
        ctx.lineWidth = parseInt(font);
        ctx.lineCap = 'round';
        ctx.strokeStyle = strokeStyle;
        ctx.moveTo(arr[i - 1].x, arr[i - 1].y);
        ctx.lineTo(arr[i].x, arr[i].y);
        ctx.stroke();
    }
}

function objectIterator(store){
    let end = store.length - 1;
    let arr = [];

    for (let i = 0; i < end; i++){
        let bool = true;
        for (let n = 0; n < undoArrayValue.length; n++){
            if (undoArrayValue[n] === i)
                bool = false;
        }
        if (bool === false){
            continue;
        }
        let elToArr = -1;
        for (let j = 0; j < store[i].arr.length; j++){
            for (let k = 0; k < store[end].arr.length; k++){
                if (store[i].arr[j].x <= store[end].arr[k].x + parseInt(fontSlider.value) / 2.5 
                    && store[i].arr[j].x >= store[end].arr[k].x - parseInt(fontSlider.value) / 2.5
                    && store[i].arr[j].y <= store[end].arr[k].y + parseInt(fontSlider.value) / 2.5
                    && store[i].arr[j].y >= store[end].arr[k].y - parseInt(fontSlider.value) / 2.5 ){
                        elToArr = i;
                        continue;
                }

            }
        }
        if(elToArr >= 0)
            arr.push(elToArr);

    }
    return arr;
}

function undo(){
    let store = [];
    let toRemove = [];

    for (let i = 0; i < bigBigArray.length; i++){
        arrayPusher(store, i - 1, i);
    }

    let end = store.length - 1;
    let length = bigBigArray.length;
    let start = findDelta(store[end].arr);

    let begin = 0;
    console.log(mouseLog);
    for (let i = 0; i < length; i++){
        begin = bigBigArray[i].arr.length;
    }
    undoPainter(start, store[end].arr.length, store[end].arr, '#FFFFFF');
    undoPainter(begin, mouseLog.length, mouseLog, '#FFFFFF');
    toRemove = objectIterator(store);

    undoArrayValue.push(end);
    for (let i = 0; i < toRemove.length; i++){
        rePrint(store[toRemove[i]].arr.length, store[toRemove[i]].arr,
            store[toRemove[i]].arr[0].font, store[toRemove[i]].arr[0].color);  
    }
}

// end of undo button functions


eraserBtn.addEventListener('click', function () {
    fullButtonHandler(eraserBtn);
    turnOffShapeButtons();
});
snakeBtn.addEventListener('click', function () {
    fullButtonHandler(snakeBtn);
});
vortexBtn.addEventListener('click', function () {
    fullButtonHandler(vortexBtn);
});

paintBtn.addEventListener('click', function(){
    fullButtonHandler(paintBtn);
});

let shapeButtons = [triangleBtn, squareBtn, circleBtn];

squareBtn.addEventListener('click', function(){
    shapeButtonHandler(squareBtn);
});

triangleBtn.addEventListener('click', function(){
    shapeButtonHandler(triangleBtn);
});

circleBtn.addEventListener('click', function(){
    shapeButtonHandler(circleBtn);
});

undoBtn.addEventListener('click', function(){
    undo();
});

clearButton.addEventListener('click', function(){
    clear();
    arrayEraser(mouseLog);
    arrayEraser(bigBigArray);
});
window.addEventListener('resize', resize);
document.addEventListener('mousedown', setPosition);
document.addEventListener('mousemove', draw);
ghostCanvas.addEventListener('click', clickChecker);

document.addEventListener('mousemove', dimensionalVorexPosition);
document.addEventListener('mousemove', paintBtnHandler);

redSlider.addEventListener('input', update);
redSlider.addEventListener('mousemove', fillCircle);
let redSliderRefresh = update(redSlider);
redSliderRefresh;
blueSlider.addEventListener('input', update);
blueSlider.addEventListener('mousemove', fillCircle);
let blueSliderRefresh = update(blueSlider);
blueSliderRefresh;
greenSlider.addEventListener('input', update);
greenSlider.addEventListener('mousemove', fillCircle);
let greenSliderRefresh = update(greenSlider);
greenSliderRefresh;

var canvasPos = getPosition(ghostCanvas);
var mouseX = 0;
var mouseY = 0;

ghostCanvas.addEventListener("mousemove", setMousePosition);
ghostCanvas.addEventListener("mouseout", function (){
    ghostContext.clearRect(0, 0, canvas.width, canvas.height);
});
ghostCanvas.addEventListener('mouseleave', function (e){
    if (e.buttons !== 1) return;
    clickChecker();
})

eraser(eraserBtn);
eraser(snakeBtn);


