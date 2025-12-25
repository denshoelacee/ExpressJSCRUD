import AuthService from '../Services/AuthService.js';

class AuthController {
    // Register Function
    async register(req, res) {
        try {
            // call register service, pass the requested body
            const user = await AuthService.register(req.body);
            res.status(201).json({ success: true, message: "User created successfully!", user: user.email });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    // Login Function
    async login(req, res) {
        try {
            // call login service, pass the requested body
            const { token, user } = await AuthService.login(req.body);

            res.json({ token, user: {first_name: user.first_name, last_name: user.last_name, email: user.email } });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default new AuthController();
