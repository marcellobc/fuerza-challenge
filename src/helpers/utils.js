module.exports = {
  paginatedResult: async (model, params = {}, where = {}) => {
    const page = params.page ? parseInt(params.page) : 1;
    const limit = params.limit ? parseInt(params.limit) : 10;

    return model
      .find(where)
      .limit(limit)
      .skip((page - 1) * limit);
  },
};
