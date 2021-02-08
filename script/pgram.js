let myImg = document.getElementById('sp1');

let lines = 2;
let count = 3;
let stateArr = [];

//myImg.style.color = red;

let btn = document.getElementById("button");

function rundomColor() {
    return Math.floor(Math.random() * 16777215).toString(16)
}

function findRundomEmptyPosition(arr) {
    let position = 0;
    do {
        position = [Math.floor(Math.random() * arr.length)];
        console.log("we chack possition" + position);
    }
    while (!arr[position].isEmpty)
    console.log(arr[position].id + "   is empty");
    return position;
}

function init(numb) {
    let parent = document.getElementById("main-tabel");

    for (let j = 0; j < lines; j++) {
        let line = document.createElement('tr');
        for (let i = 1; i <= numb; i++) {
            let card = document.createElement('td');
            card.className = "dropzone";
            // let sp = document.createElement('span');
            let sp = document.createElement('button');
            const curNumb = i + j * numb;
            sp.innerText = curNumb;

            //sp.style.draggable = "true";
            sp.draggable = "true";

            sp.style.color = "#" + rundomColor();
            sp.id = 'sp' + curNumb;
            sp.className = "span";
            console.log(sp.id);
            card.appendChild(sp);
            line.appendChild(card);
            parent.appendChild(line);
        }
    }

    let secontTabl = document.getElementById("second-tabel");
    for (let i = 0; i < 4; i++) {
        let line = document.createElement('tr');
        for (let j = 1; j < 6; j++) {
            let card = document.createElement('td');
            card.className = "dropzone";
            let curNumb = j + i * 10;
            card.id = "st" + curNumb;
            console.log(card.id);
            line.appendChild(card);


            stateArr.push({ idSt: card.id, isEmpty: true });
        }
        secontTabl.appendChild(line);
    };

}


function fly() {

    let spanArr = document.getElementsByClassName("span");

    for (let i = spanArr.length - 1; i >= 0; i--) {

        let pos = findRundomEmptyPosition(stateArr);
        stateArr[pos].isEmpty = false;
        let newParent = document.getElementById(stateArr[pos].idSt);
        newParent.appendChild(spanArr[i]);
    }
}

btn.addEventListener("click", () => {

    let chBtn = document.getElementById("chack_btn");
    chBtn.style.visibility = 'visible';
    btn.style.visibility = 'hidden';
    init(count);
    setTimeout(fly, 3000);


});



////////////////////////////////////////////////////////////
var dragged;

/* events fired on the draggable target */
document.addEventListener("drag", function(event) {

}, false);

document.addEventListener("dragstart", function(event) {
    // store a ref. on the dragged elem
    dragged = event.target;
    // make it half transparent
    event.target.style.opacity = .5;
}, false);

document.addEventListener("dragend", function(event) {
    // reset the transparency
    event.target.style.opacity = "";
}, false);

/* events fired on the drop targets */
document.addEventListener("dragover", function(event) {
    // prevent default to allow drop
    event.preventDefault();
}, false);

document.addEventListener("dragenter", function(event) {
    // highlight potential drop target when the draggable element enters it
    if (event.target.className == "dropzone") {
        event.target.style.background = "purple";
    }

}, false);

document.addEventListener("dragleave", function(event) {
    // reset background of potential drop target when the draggable element leaves it
    if (event.target.className == "dropzone") {
        event.target.style.background = "";
    }

}, false);

document.addEventListener("drop", function(event) {
    // prevent default action (open as link for some elements)
    event.preventDefault();
    // move dragged elem to the selected drop target
    if (event.target.className == "dropzone") {
        event.target.style.background = "";
        dragged.parentNode.removeChild(dragged);
        event.target.appendChild(dragged);
    }

}, false);