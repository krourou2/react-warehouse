import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.

const articles = [
  {
    article_id: 1001,
    account_id: 1001,
    manufacturer: "Apple",
    description: "Iphone 4 8gb White",
    universal_product_code: "885909543274"
  },
  {
    article_id: 1002,
    account_id: 1001,
    manufacturer: "Apple",
    description: "Iphone 4 16gb White",
    universal_product_code: "885909420445"
  },
  {
    article_id: 1003,
    account_id: 1001,
    manufacturer: "Apple",
    description: "Iphone 4 8gb Black",
    universal_product_code: "885909543267"
  },
  {
    article_id: 1004,
    account_id: 1001,
    manufacturer: "Apple",
    description: "Iphone 4 16gb Black",
    universal_product_code: "885909407576"
  }
];


function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (article) => {
  return replaceAll(article.article_id, ' ', '-');
};

class ArticleApi {
  static getAllArticles() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], articles));
      }, delay);
    });
  }

  static saveArticle(article) {
    article = Object.assign({}, article); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minArticleUPCLength = 1;
        if (article.universal_product_code < minArticleUPCLength) {
          reject(`Title must be at least ${minArticleUPCLength} characters.`);
        }

        if (article.article_id) {
          const existingCourseIndex = articles.findIndex(a => a.id == article.article_id);
          articles.splice(existingCourseIndex, 1, article);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new courses in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          article.article_id = generateId(article);
          articles.push(article);
        }

        resolve(article);
      }, delay);
    });
  }

  static deleteArticle(articleId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfArticleToDelete = articles.findIndex(article => {
          article.article_id == articleId;
        });
        articles.splice(indexOfArticleToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default ArticleApi;
