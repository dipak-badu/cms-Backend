import UserModel from "../model/user.model";
interface IPaginationProps {
  limit: number;
  skip: number;
  page: number;
}

class UserService {
  static async getAllUsers(
    filter: Record<string, any>,
    paginationConfig: IPaginationProps,
  ) {
    try {
      const allRows = await UserModel.find(filter, { password: 0, __v: 0 })
        .limit(paginationConfig.limit as number)
        .skip(paginationConfig.skip as number);

      const total = await UserModel.countDocuments(filter);

      const paginationResponse = {
        total: total,
        limit: paginationConfig.limit,
        skip: paginationConfig.skip,
        totalPage: Math.ceil(total / paginationConfig.limit),
      };
      return { users: allRows, pagination: paginationResponse };
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
