import UserRepository from "../Repository/UserRepository.js";

class ProfileService {

    async getProfile(user_id) {
        return await UserRepository.findById(user_id);
    }

}
export default new ProfileService();