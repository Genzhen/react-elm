import Http from "../util/http";

let CategoryModel = {
  async getSiftFactors(latitude, longitude, entryId) {
    const result = await Http.get(
      `/api/shopping/food/sift_factors?latitude=${latitude}&longitude=${longitude}&entry_id=${entryId}`
    );
    return result;
  },
  async getCategory(latitude, longitude) {
    const result = await Http.get(
      `/api/shopping/category?latitude=${latitude}&longitude=${longitude}`
    );
    return result;
  }
};
export default CategoryModel;
