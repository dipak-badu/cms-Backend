import MessageModel from "../model/chat.model";
class MessageService {
  // create
  async storeMessage(data: any) {
    try {
      const message = await MessageModel.create(data);
      return message;
    } catch (error) {
      throw error;
    }
  }

  // read sql
  // Fetch all data
  async getAllMessagesByFilter(filter: Record<string, any>, config: any) {
    try {
      const limit = config.limit || 10;
      const page = config.page ? config.page : 1;
      let skip = (+page - 1) * limit;

      const { rows, count } = await MessageModel.findAndCountAll({
        where: filter,
        limit: limit,
        offset: skip,
      });
      return {
        rows,
        pagination: { page: page, limit: limit, total: count, skip: skip },
      };
    } catch (error) {
      throw error;
    }
  }

  // get single message by filter

  async getSingleMessageByFilter(filter: Record<string, any>) {
    try {
      const row = await MessageModel.findOne({
        where: filter,
      });
      return row;
    } catch (error) {
      throw error;
    }
  }

  // edit message by filter
  async updateMessageByFilter(
    filter: Record<string, any>,
    data: Record<string, any>,
  ) {
    try {
      const updatedMessage = await MessageModel.update(data, {
        where: filter,
      });
      return updatedMessage;
    } catch (error) {
      throw error;
    }
  }

  async deleteMessageByFilter(filter: Record<string, any>) {
    try {
      const deletedMessage = await MessageModel.destroy({
        where: filter,
      });
      return deletedMessage;
    } catch (error) {
      throw error;
    }
  }
}

export default MessageService;
