import TodoService from '../Services/TodoService.js';

class TodoController {
    async createTodo(req, res) {
        try {
            const todo = await TodoService.createTodo({
                user_id: req.user.user.user_id,
                title: req.body.title,
                description: req.body.description,
                due_date: req.body.due_date
            });
            //console.log("Request body:", req.body);
            res.status(201).json(todo);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getTodos(req, res) {
        try {
            const todos = await TodoService.getTodos(req.user.user.user_id);
            //console.log("Fetched todos for user ID:", req.user.user.user_id, todos);
            res.json(todos);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteTodo(req, res) {
        try {
            const todo_id = req.params.id;
            //console.log("Deleting todo with ID:", todo_id);
            await TodoService.deleteTodo(todo_id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateTodoStatus(req, res) {
        try {
            const todo_id = req.params.id;
            const todo = await TodoService.updateTodoStatus(todo_id, 'completed');
            //console.log("Updated todo:", todo);
            res.json(todo);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateTodoDetails(req, res) {
        try {
            const todo_id = req.params.id;
            const { title, description, due_date } = req.body;
            const todo = await TodoService.updateTodoDetails(todo_id, title, description, due_date);
            //console.log("Updated todo details:", todo);
            res.json(todo);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

}

export default new TodoController();
