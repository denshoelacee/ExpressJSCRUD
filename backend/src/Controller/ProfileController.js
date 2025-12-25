import ProfileService from "../Services/ProfileService.js";


class ProfileController {

    async getProfile(req, res) {
        try {
            const profile = await ProfileService.getProfile(req.user.user.user_id);
            res.json(profile);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default new ProfileController();