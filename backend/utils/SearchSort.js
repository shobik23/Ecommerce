class SearchSort {
  constructor(query, queryString) {
    this.query = query; //Product.find()
    this.queryString = queryString; // { keyword: 'Laptop' }
    // product.find({"name":"Laptop"})
  }

  search() {
    const keyword = this.queryString.keyword
      ? {
          name: {
            $regex: this.queryString.keyword, // Laptop laptop LAPTOP HP Laptop
            $options: "i",
          },
        }
      : {}; // "asd":"sadasd", "sdasd":"sadsad"
    this.query = this.query.find({ ...keyword }); // Product.find()
    return this;
  }

  filter() {
    console.log(this.queryString);
    const queryCopy = { ...this.queryString };
    // console.log(queryCopy);

    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);

    let queryString = JSON.stringify(queryCopy);
    queryString = queryString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (key) => `$${key}`
    );

    this.query = this.query.find(JSON.parse(queryString));
    // console.log(this.query);
    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryString.page) || 1;
    const skip = resultPerPage * (currentPage - 1); //1
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = SearchSort;

//{}
