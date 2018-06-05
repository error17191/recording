var $boxes = document.getElementsByClassName('box');
var total = $boxes.length;
var recording = {
    actions: [],
    mousePositions: []
};
var $playBack = document.getElementById('play-back');
var $overlay = document.getElementById('overlay');
var $fakePointer = document.getElementById('pointer');


Array.from($boxes).forEach(function ($box, index) {
    $box.addEventListener('click', function () {
        changeBoxColor(this, randomColor());
    });
});

document.body.addEventListener('mousemove', function (ev) {
    recording.mousePositions.push({
        x: ev.clientX,
        y: ev.clientY,
        timestamp: ev.timeStamp
    });
});

$playBack.addEventListener('click', function () {
    showOverlay();
    showFakePointer();
    playBackMouse();
});

function randomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function showFakePointer() {
    $fakePointer.style.display = 'block';
}

function hideFakePointer() {
    $fakePointer.style.display = 'none';
}

function changeBoxColor($box, color) {
    $box.style.backgroundColor = color;
}

function showOverlay() {
    $overlay.style.display = 'block';
}

function hideOverlay() {
    $overlay.style.display = 'none';
}

function playBackMouse(currentIndex = 0) {
    if (currentIndex == recording.mousePositions.length) {
        return;
    }
    var currentPosition = recording.mousePositions[currentIndex];

    setTimeout(function () {
        $fakePointer.style.top = currentPosition.y + 'px';
        $fakePointer.style.left = currentPosition.x + 'px';
        if (currentIndex == recording.mousePositions.length -1) {
            hideOverlay();
            hideFakePointer();
            recording.mousePositions = [];
        }
    }, currentPosition.timestamp);

    playBackMouse(++currentIndex);
}