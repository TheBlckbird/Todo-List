// let todos = []
let todos = [
    {
        "todo": "asdfgh",
        "completed": false,
        "id": 0
    },
    {
        "todo": "sadfghjhgfdsadfghjk,",
        "completed": false,
        "id": 1
    },
    {
        "todo": "jhgfdsfghjkkj",
        "completed": false,
        "id": 2
    },
    {
        "todo": "hgfdsdfghjk",
        "completed": false,
        "id": 3
    },
    {
        "todo": "jh",
        "completed": false,
        "id": 4
    },
    {
        "todo": "sdfghjkljhgfds",
        "completed": false,
        "id": 5
    },
    {
        "todo": "fghjk,j",
        "completed": false,
        "id": 6
    },
    {
        "todo": "hgfdsa",
        "completed": false,
        "id": 7
    },
    {
        "todo": "dfghjgf",
        "completed": false,
        "id": 8
    },
    {
        "todo": "dsadfgh",
        "completed": false,
        "id": 9
    }
]

render();

function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

function render() {
    const todosElement = document.getElementById('todos');
    let newHtml = '<div class="number">Completed: ' + todos.filter(item => item.completed).length + ' of ' + todos.length + '</div>';

    for (const todoIndex in todos) {
        const todo = todos[todoIndex];

        if (todo.completed) continue;

        newHtml += '<div class="row" data-id="' + todo.id + '">';
        newHtml += '<button id="complete" onclick="complete(' + todo.id + ')">✓</button>';
        newHtml += escapeHtml(todo.todo);
        newHtml += '<button id="remove" onclick="remove(' + todo.id + ')">X</button></div>';
    }

    todosElement.innerHTML = newHtml;
}

function complete(id) {
    todos[todos.map(item => item.id).indexOf(id)].completed = true;
    render();
}

function remove(id) {
    todos.splice(todos.map(item => item.id).indexOf(id), 1);
    render();
}

document.getElementById('new-item-form').addEventListener('submit', (e) => {
    e.preventDefault();
    let newTodo = document.getElementById('new-item').value;
    if (newTodo === '') return;

    let lastItemId = 0;

    try {
        lastItemId = todos[todos.length - 1].id
    } catch (error) {
        lastItemId = -1;
    }

    todos.push({
        'todo': newTodo,
        'completed': false,
        'id': lastItemId + 1,
    });
    render();

    document.getElementById('new-item').value = '';
});