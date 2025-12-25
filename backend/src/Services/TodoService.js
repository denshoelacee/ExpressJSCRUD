import TodoRepository  from '../Repository/TodoRepository.js'

class TodoService {
    async createTodo(todo) {

        const status = 'pending';
        todo.status = status;

        return await TodoRepository.createTodo(todo); 
    }

    async getTodos(user_id) {
        return await TodoRepository.getTodosByUser(user_id);
    }

    async deleteTodo(id) {
        return await TodoRepository.deleteTodo(id);
    }

    async updateTodoStatus(id, status) {

        return await TodoRepository.updateTodoStatus(id, status);
    }

    async updateTodoDetails(id, title, description, due_date) {
        return await TodoRepository.updateTodoDetails(id, title, description, due_date);
    }

}
export default new TodoService();