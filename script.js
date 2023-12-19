
const $start = document.querySelector('#start')
const $size = document.querySelector('#size')
const $body = document.querySelector('#body')
const $container = document.createElement('div')
$container.classList.add('container')
$body.append($container);

let state= 0;
const arr=[];
let size;


$start.addEventListener('click', startFunc);
$container.addEventListener('click', boxClickFunc)
function startFunc(){
    size = $size.value;

    hide($size);
    hide($start);

    show($container)


    for (let i = 0; i < size; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        arr[i] = [];
        for (let j = 0; j < size; j++) {
            const box = document.createElement('span');
            box.classList.add('box');
            box.setAttribute('data-box', 'true');
            box.setAttribute(`data-index-i`, `${i}`);
            box.setAttribute(`data-index-j`, `${j}`);

            row.append(box)
            arr[i][j] = " ";
    }
        $container.append(row)
    }

}

function boxClickFunc(e) {


    if (e.target.dataset.box && !e.target.textContent.trim()) {
        if (state % 2 === 0) {
            e.target.textContent = 'x'
            arr[e.target.dataset.indexI][e.target.dataset.indexJ] = e.target.textContent
                state++
        } else {
            e.target.textContent = 'o'
            arr[e.target.dataset.indexI][e.target.dataset.indexJ] = e.target.textContent

            state++

        }
    }
    if (state > 4) {
        rowCheckWin()
        columCheckWin()
        mainDiagonalWin()
        auxiliaryDiagonalWin()

    }
    if (state === size**2 && $container.textContent !==""){
        endGameFunc("nobody")
    }
}

function rowCheckWin() {

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].every((elem) => elem === 'x')) {
            endGameFunc("x")
        }
        if (arr[i].every((elem) => elem === 'o')) {
            endGameFunc("o")
        }
    }
}

function columCheckWin() {
    for (let j = 0; j < arr[0].length; j++) {
        const colum = [];
        for (let i = 0; i < arr.length; i++) {
            colum.push(arr[i][j])
        }
        if (colum.every((elem) => elem === 'x')) {
            endGameFunc("x")
        }
        if (colum.every((elem) => elem === 'o')) {
            endGameFunc("o")
        }
    }
}

function mainDiagonalWin(){
    const diagonal = []
    for (let i = 0; i < size; i++) {
            diagonal.push(arr[i][i])
    }
    if (diagonal.every((elem) => elem === 'x')) {
        endGameFunc("x")
    }
    if (diagonal.every((elem) => elem === 'o')) {
        endGameFunc("o")
    }

}

function auxiliaryDiagonalWin(){
    const diagonal = []
    let j = size-1
    for (let i = 0; i < size; i++) {
            diagonal.push(arr[i][j])
        j--
    }

    if (diagonal.every((elem) => elem === 'x')) {
        endGameFunc("x")
    }
    if (diagonal.every((elem) => elem === 'o')) {
        endGameFunc("o")
    }
}


function endGameFunc(el){
    hide($container);
    $container.textContent=""
    const gameAgain = document.createElement('div');
    gameAgain.classList.add('again')
    const win = document.createElement('span')
    win.textContent = `win ${el}`

    const again = document.createElement('button');
    again.textContent = 'Start again'

    gameAgain.append(win)
    gameAgain.append(again)

    $body.append(gameAgain)
    again.addEventListener('click', starNewGameFunc=()=>{
        hide(gameAgain)
        show($start)
        show($size)
        state = 0;
        $size.value = 3;
    })


}


function hide(el){
    el.classList.add('hide');
}


function show(el) {
    el.classList.remove('hide');
}

