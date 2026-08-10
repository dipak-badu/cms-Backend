import UserModel from "../model/user.model";
import type { RegisterDTOType } from "../request/AuthRequest";

class AuthService {
  static async registerUser(data: RegisterDTOType) {
    try {
      console.log("IMAGE SCHEMA:");
      console.log(UserModel.schema.path("image"));

      console.log("IMAGE DATA:");
      console.log(data.image);
      const userOObj = new UserModel(data);
      return await userOObj.save();
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  }
}

export default AuthService;
