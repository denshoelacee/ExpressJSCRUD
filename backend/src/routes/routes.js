import express from 'express';
import AuthController from '../Controller/AuthController.js';
import AuthMiddleware from '../Middleware/AuthMiddleware.js';
import TodoController from '../Controller/TodoController.js';
import ProfileController from '../Controller/ProfileController.js';
const router = express.Router();

router.get('/pakyo', (req, res) => {
    res.send('API is healthy');
});

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

router.use(AuthMiddleware.authenticate); // Protect all routes below
//add todo
router.post('/add', TodoController.createTodo);
//get todos
router.get('/getTodo', TodoController.getTodos);
//delete todo
router.delete('/deleteTodo/:id', TodoController.deleteTodo);
//update todo status
router.put('/updatestatus/:id', TodoController.updateTodoStatus);
//update todo details
router.put('/updatedetails/:id', TodoController.updateTodoDetails);

// Get authenticated user info
router.get("/profile", ProfileController.getProfile);


router.get("/user", (req, res) => {
  res.json(req.user);
});

export default router;
