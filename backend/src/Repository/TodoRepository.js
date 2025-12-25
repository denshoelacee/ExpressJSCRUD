import pool from "../config/db.js";

class TodoRepository  {
    //get data from the database, insert
    async createTodo(todo) {
        const result = await pool.query(
            'INSERT INTO todos (user_id, title, description, due_date, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [todo.user_id, todo.title, todo.description, todo.due_date, todo.status]
        );
        return result.rows[0];
        }

    async getTodosByUser(user_id) {
        const result = await pool.query(
        'SELECT * FROM todos WHERE user_id = $1',
        [user_id]
        );
        return result.rows;
    }

    async deleteTodo(id) {
        await pool.query('DELETE FROM todos WHERE todo_id = $1', [id]);
    }

    async updateTodoStatus(id, status) {
        const result = await pool.query(
            'UPDATE todos SET status = $1 WHERE todo_id = $2 RETURNING *',
            [status, id]
        );
        return result.rows[0];
    }

    async updateTodoDetails(id, title, description, due_date) {
        const result = await pool.query(
            'UPDATE todos SET title = $1, description = $2, due_date = $3 WHERE todo_id = $4 RETURNING *',
            [title, description, due_date, id]
        );
        return result.rows[0];
    }

    async findById(todo_id) {
        const result = await pool.query(
        'SELECT * FROM todos WHERE todo_id = $1',
        [todo_id]
        );
        return result.rows[0];
    }

}

export default new TodoRepository();