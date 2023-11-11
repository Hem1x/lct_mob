export const flattenNestedLists = (nestedList: any[][]) => {
  let flatList: any[] = [];

  function flatten(list: any[][]) {
    list.forEach((item) => {
      if (Array.isArray(item)) {
        flatten(item);
      } else {
        flatList.push(item);
      }
    });
  }

  flatten(nestedList);

  return flatList;
};
