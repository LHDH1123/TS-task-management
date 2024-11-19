interface ObjectPage {
  currentPage: number;
  limitItem: number;
  skipItem?: number;
  totalPage?: number;
}

const paginationHelper = (
  objectPage: ObjectPage,
  query: Record<string, any>,
  totalProduct: number
): ObjectPage => {
  if (query.page) {
    objectPage.currentPage = parseInt(query.page);
  }

  if (query.limit) {
    objectPage.limitItem = parseInt(query.limit);
  }

  objectPage.skipItem = (objectPage.currentPage - 1) * objectPage.limitItem;

  objectPage.totalPage = Math.ceil(totalProduct / objectPage.limitItem);

  return objectPage;
};

export default paginationHelper;
