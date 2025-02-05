export const getUniqueArray = (arr = [], key) => {
  const uniqueArray = [];
  const uniqueMap = {};
  arr.forEach(item => {
    const existingItem = uniqueMap[item[key]]; // get item if it already exists in uniqueMap
    if (!existingItem) {
      uniqueMap[item[key]] = item[key];
      uniqueArray.push(item); // if item doesn't exist in uniqueMap, add item to uniqueArray
    }
  });

  return uniqueArray;
};
