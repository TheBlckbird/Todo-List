let todos = []

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