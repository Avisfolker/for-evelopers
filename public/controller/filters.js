app.filter('search', () => {
  return (items, searchName)=> {
    let filtered = [];
    items.forEach((item, i, arr) => {

      let builderName = item.builderName.toLowerCase();
      let blockName = item.blocks[0].blockName.toLowerCase();
      let searchName = searchName.toLowerCase();

      if(builderName.search(searchName) >= 0 || blockName.search(searchName) >= 0){
        filtered.push(item);
      }
    })
    return filtered;
  }
});