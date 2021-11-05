let lists = document.querySelectorAll('.list');
let list_items = [];
loadFromStorage();

const add1 = document.querySelector('.add1');
const add2 = document.querySelector('.add2');
const add3 = document.querySelector('.add3');
const add4 = document.querySelector('.add4');

const input1 = document.querySelector('.input1');
const input2 = document.querySelector('.input2');
const input3 = document.querySelector('.input3');
const input4 = document.querySelector('.input4');

let draggedItem = null;

for (let j = 0; j < lists.length; j++) {
    let list = lists[j];
    addListEventListener(list, j);
}

function saveTasks() {
    let toBeSaved = [...list_items];

    let json = JSON.stringify(toBeSaved);
    localStorage.tasks = json;
}

function loadFromStorage() {
    let json = localStorage.tasks;
    if (!json) {
        list_items = [];
        return;
    }
    let tasks = JSON.parse(json);
    tasks.forEach((i) => {
        const newItem = document.createElement('div');
        newItem.textContent = i.text;
        addItemToList(newItem, i.listIndex);
    });
}

function addItemEventListener(item) {
    item.addEventListener('dragstart', function () {
        draggedItem = this;
        setTimeout(function () {
            item.style.display = 'none';
        }, 0);
        console.log('dragstart');
    });

    item.addEventListener('dragend', function () {
        setTimeout(function () {
            draggedItem.style.display = 'block';
            draggedItem = null;
        }, 0);
        console.log('dragend');
    });
}

function addListEventListener(list, listIndex) {
    list.addEventListener('dragover', function (e) {
        e.preventDefault();
        console.log('dragover');
    });

    list.addEventListener('dragenter', function (e) {
        e.preventDefault();
        this.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
        console.log('dragenter');
    });

    list.addEventListener('dragleave', function (e) {
        this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        console.log('dragleave');
    });

    list.addEventListener('drop', function (e) {
        this.append(draggedItem);

        let text = draggedItem.innerText;
        list_items.forEach((i) => {
            if (i.text == text) {
                i.listIndex = listIndex;
                saveTasks();
            }
        });

        this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        console.log('drop');
    });
}

input1.addEventListener('input', (e) => {
    value1 = e.target.value;
});

add1.addEventListener('click', () => {
    const newItem = document.createElement('div');
    newItem.textContent = value1;
    input1.value = '';
    addItemToList(newItem, 0);
});

input2.addEventListener('input', (e) => {
    value2 = e.target.value;
});

add2.addEventListener('click', () => {
    const newItem = document.createElement('div');
    newItem.textContent = value2;
    input2.value = '';
    addItemToList(newItem, 1);
});

input3.addEventListener('input', (e) => {
    value3 = e.target.value;
});

add3.addEventListener('click', () => {
    const newItem = document.createElement('div');
    newItem.textContent = value3;
    input3.value = '';
    addItemToList(newItem, 2);
});

input4.addEventListener('input', (e) => {
    value4 = e.target.value;
});

add4.addEventListener('click', () => {
    const newItem = document.createElement('div');
    newItem.textContent = value4;
    input4.value = '';
    addItemToList(newItem, 3);
});

function addItemToList(item, listIndex) {
    item.className = 'list-item';
    item.draggable = true;
    lists[listIndex].appendChild(item);
    list_items.push({
        text: item.textContent,
        listIndex: listIndex,
    });
    saveTasks();
    addItemEventListener(item);
}
