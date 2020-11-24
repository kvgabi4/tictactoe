// maga a mátrix, egyelőre csak egy üres tömb
const matrix = [];
const inverzMatrix = [];
const diagonalArray1 = [];
const diagonalArray2 = [];
// sorok és oszlopok száma, hátha nem nágyzetes
const rows = 3;
const cols = 3;
// lépések száma
let stepCount = 0;
// az aktuális jel
let mark = 'X'

// csak feltöltöm a mátrixot (valójában opcionális lépés is lehet)
const initState = () => {
    // ehelyett a fill metódussal szebb lenne
    for (let i = 0; i < rows; i += 1) {
        matrix[i] = [];
        inverzMatrix[i] = [];
        diagonalArray1[i] = null;
        diagonalArray2[i] = null;
        for (let j = 0; j < cols; j += 1) {
            matrix[i][j] = null;
            inverzMatrix[i][j] = null;
        }
    }
}

// a mátrix egy elemének értéket adok, az adott elem data attrinutumait 
// felhasználva nyerem ki az értéket
const changeMatrixValue = (element) => {
    const row = parseInt(element.dataset.row, 10);
    const cell = parseInt(element.dataset.cell, 10);
    matrix[row][cell] = element.textContent;
}

const increaseCounter = () => {
    stepCount += 1;
}

const setMark = () => {
    mark = mark === 'X' ? 'O' : 'X';
}
const modifyCell = (element) => {
    element.removeEventListener('click', handleClick);
    element.textContent = mark;
}

// kattintáskor mi történjen, érdemes lenne több függvényre bontani
const handleClick = (event) => {
    increaseCounter();
    modifyCell(event.target);
    const winer = mark;
    setMark();
    changeMatrixValue(event.target);
    checkWinner(winer);
}


// minden elemhez hozzáadom az eseményfigyelőt
const addListener = () => {
    document.querySelectorAll('.tictactoe__cell').forEach(element => {
        element.addEventListener('click', handleClick)
    });
}

// ha van győrztes minden elemről eltávolítom az eseményfigyelőt
const removeListener = () => {
    document.querySelectorAll('.tictactoe__cell').forEach(element => {
        element.removeEventListener('click', handleClick)
    });
}

// Megnézem hogy van-e olyan sor, ahol minden elem ugyanaz
const checkRowValues = () => {
    const values = matrix.map(row =>
        row.every((value) => value === 'X') ||
        row.every((value) => value === 'O'))
    return values.indexOf(true) !== -1 ? true : false;
}

const setInverzMatrix = (m) => {
    for (let i = 0; i < m.length; i += 1) {
        for (let j = 0; j < m[i].length; j += 1) {
            inverzMatrix[i][j] = m[j][i];
        }
    }
}
// Megnézem hogy van-e olyan oszlop, ahol minden elem ugyanaz
// TODO: Meg kell írnod, boolean adjon vissza
const checkColumnValues = () => {
    setInverzMatrix(matrix);
    checkRowValues(inverzMatrix);
    const values = inverzMatrix.map(row =>
        row.every((value) => value === 'X') ||
        row.every((value) => value === 'O'))
    return values.indexOf(true) !== -1 ? true : false;
}

const setDiagonalArray = (m) => {
    for (let i = 0; i < m.length; i += 1) {
        diagonalArray1[i] = m[i][i];
        diagonalArray2[i] = m[m.length - 1 - i][i];
    }
}
// Megnézem hogy van-e olyan átló, ahol minden elem ugyanaz
// TODO: Meg kell írnod, boolean adjon vissza
const checkDiagonalValues = () => {
    setDiagonalArray(matrix);
    const values1 = diagonalArray1.every((value) => value === 'X') || diagonalArray1.every((value) => value === 'O');
    const values2 = diagonalArray2.every((value) => value === 'X') || diagonalArray2.every((value) => value === 'O');
    return values1 || values2;
}

const setTextContent = (className, txt) => {
    document.querySelector(className).textContent = txt;
}

const removeClass = (className,removeClass) => {
    document.querySelector(className).classList.remove(removeClass);
}

// TODO: Meg kell írnod, nincs befejezve
const checkWinner = (mark) => {
    if (checkRowValues() || checkColumnValues() || checkDiagonalValues()) {
        removeClass('.winer', 'hide');
        setTextContent('.winer', 'The game is over. ' + mark + ' is the winer!!!');
        stepCount = 0;
        removeListener();
    }
    else if (stepCount === 9) {
        removeClass('.winer', 'hide');
        setTextContent('.winer', 'The game is over. No one has won!!!');
        stepCount = 0;
    }
    // Akár a checkRowValues, checkColumnValues, checkDiagonalValues true, akkor van győztes
    // Csak azért van itt a log hogy lássátok hogy true akkor lesz ha van olyan sor ahol minden elem ugyanaz
}

// New game
const playNewGame = () => {
    const newGame = document.querySelector('.newGame');
    const cells = document.querySelectorAll('.tictactoe__cell');
    newGame.addEventListener('click', () => {
        initState();
        for (i = 0; i < cells.length; i += 1) {
            cells[i].textContent = '';
        };
        document.querySelector('.winer').classList.add('hide');
        setTextContent('.winer', '');
        addListener();
    });
}

initState();
playNewGame();
addListener();
