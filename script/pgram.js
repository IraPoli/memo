let myImg = document.getElementById('sp1');

let stateArr = [];
let arrAnsv = [];


let btn = document.getElementById("button");

function rundomColor() {
    return Math.floor(Math.random() * 16777215).toString(16)
}

//chack if all insertd back;
function isAllInsert(arr) {
    let isNotFull = arr.some(el => {
        return el.isEmpty
    });
    if (!isNotFull) {
        chackAnsv(arrAnsv);
        butSwith();
    }
}

function chackAnsv(arr) {
    // let result = 'you win!';

    let text = document.createElement('h2');
    let elemResulr = document.getElementById("result");

    if (arr.every(el => { return el.idIn === el.idCorrect })) {
        elemResulr.innerHTML = 'correct!';
        elemResulr.style.color = 'green';
    } else {
        elemResulr.innerHTML = 'incorrect!';
        elemResulr.style.color = 'red';
    };

    var size = 50;
    var id = setInterval(frame, 10);

    function frame() {
        if (size == 150) {
            clearInterval(id);
            elemResulr.innerHTML = '';
        } else {
            size++;
            elemResulr.style.fontSize = size + 'px';
        }
    }


}

function rendomNumber() {
    let num = 0;
    do {
        num = Math.floor(Math.random() * 30);
    }
    while (!arrAnsv.every(el => { return el.idCorrect !== 'sp' + num }))
    return num

}

// finding rendom plase where to put batton
function findRundomEmptyPosition(arr) {
    let position = 0;
    do {
        position = [Math.floor(Math.random() * arr.length)];
    }
    while (!arr[position].isEmpty)
    return position;
}
////////////
//get line and colomn settings 
let lines = 2;
let count = 3;
let spead = 0;
let inputLin = document.getElementById('lines_len');
let inputColomn = document.getElementById('lines_colomn');
inputLin.oninput = function() { lines = inputLin.value; };
inputColomn.oninput = function() {
    count = inputColomn.value;
};

//disabel buttons
function butSwith() {
    let ArrParam = document.getElementsByClassName("input_param");
    for (element of ArrParam) {
        element.disabled = !element.disabled;
    }
    //document.getElementById("button").disabled = !document.getElementById("button").disabled;
}


//}
///////////
function init(numb) {
    butSwith();

    let parent = document.getElementById("main-tabel");
    let tableRows = document.getElementsByClassName("line")
        ///get spead//
    spead = parseInt(document.querySelector('input[name=spead]:checked').value, 10);
    console.log("spead " + spead);
    ///

    //remuv old rows
    for (var x = tableRows.length - 1; x >= 0; x--) {
        parent.removeChild(tableRows[x]);
    }

    //init first tabel
    for (let j = 0; j < lines; j++) {
        let line = document.createElement('tr');
        line.className = "line";
        for (let i = 1; i <= numb; i++) {
            let card = document.createElement('td');
            card.className = "dropzone";
            let sp = document.createElement('button');
            const curNumb = rendomNumber(); // i + j * numb; 
            sp.innerText = curNumb;

            sp.draggable = "true";
            sp.style.color = "#" + rundomColor();
            sp.id = 'sp' + curNumb;
            card.id = "card" + curNumb;
            sp.className = "b_span";
            console.log(sp.id);
            card.appendChild(sp);
            line.appendChild(card);
            parent.appendChild(line);

            arrAnsv.push({ idBox: card.id, isEmpty: true, idIn: 0, idCorrect: sp.id }); /////////////
        }
    }


    let secontTabl = document.getElementById("second-tabel");
    let tableRows2 = document.getElementsByClassName("line2")


    //remuv old rows
    for (var x = tableRows2.length - 1; x >= 0; x--) {
        secontTabl.removeChild(tableRows2[x]);
    }

    for (let i = 0; i < 5; i++) {
        let line = document.createElement('tr');
        line.className = "line2";
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
    let spanArr = document.getElementsByClassName("b_span");
    for (let i = spanArr.length - 1; i >= 0; i--) {

        let pos = findRundomEmptyPosition(stateArr);
        stateArr[pos].isEmpty = false;

        let newParent = document.getElementById(stateArr[pos].idSt);
        newParent.appendChild(spanArr[i]);
    }
}

btn.addEventListener("click", () => {
    init(count);
    setTimeout(fly, 100 * lines * count * spead);

});

////////////////////////////////////////////////////////////
let chButton = document.getElementById("chack_btn");
chButton.addEventListener("click", () => {
    //  let isCorrect = true;
    let tagArr = document.getElementsByClassName("b_span");
    for (let i = 0; i < tagArr.length; i++) {
        console.log(tagArr[i]);
    }
});




//Draggin buttons/
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

    /* console.log("we leave" + event.target.id);
      for (el of arrAnsv) {
          console.log('chack' + el.idBox);
          if (el.idBox == event.target.id) {
              el.isEmpty = true;
              el.idIn = 0;
          }
      };*/
}, false);

/* events fired on the drop targets */
document.addEventListener("dragover", function(event) {
    // prevent default to allow drop
    event.preventDefault();
}, false);

document.addEventListener("dragenter", function(event) {
    // highlight potential drop target when the draggable element enters it
    if (event.target.className == "dropzone") {
        event.target.style.background = 'rosybrown';
        // console.log(event.target);
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
        console.log("we dragg " + dragged.id);
        console.log("from  " + dragged.parentNode.id);


        for (el of arrAnsv) {
            if (el.idBox == dragged.parentNode.id) {
                el.isEmpty = true;
                el.idIn = 0;
            }
        };

        event.target.style.background = "";
        dragged.parentNode.removeChild(dragged);
        event.target.appendChild(dragged);


        // console.log("dropped to" + event.target.id);
        for (el of arrAnsv) {
            if (el.idBox == event.target.id) {
                el.isEmpty = false;
                el.idIn = dragged.id;
            }
        };
        console.log(".............")
        isAllInsert(arrAnsv); ////////////////
    }

}, false);