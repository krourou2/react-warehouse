import delay from './delay';
import ArticleProxy from '../service/articleProxy';
// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.

const articles = [
  {
    articleId: "1001",
    accountId: "1001",
    manufacturer: "Apple",
    description: "Iphone 4 8gb White",
    universalProductCode: "885909543274"
  },
  {
    articleId: "1002",
    accountId: "1001",
    manufacturer: "Apple",
    description: "Iphone 4 16gb White",
    universalProductCode: "885909420445"
  },
  {
    articleId: "1003",
    accountId: "1001",
    manufacturer: "Apple",
    description: "Iphone 4 8gb Black",
    universalProductCode: "885909543267"
  },
  {
    articleId: "1004",
    accountId: "1001",
    manufacturer: "Apple",
    description: "Iphone 4 16gb Black",
    universalProductCode: "885909407576"
  }
];


function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (article) => {
  console.log("ARTICLE GENERATE ID", article);
  return replaceAll(article.articleId, ' ', '-');
};

class ArticleApi {
  static getAllArticles() {
      console.log("ARTICLE PROXY", ArticleProxy);
    return ArticleProxy.Get().then(response => {
      console.log("response", JSON.stringify(response));
      return response;
    });
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve(Object.assign([], articles));
    //   }, delay);
    // });
  }

  static saveArticle(article) {
    article = Object.assign({}, article); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minArticleUPCLength = 1;
        if (article.universalProductCode < minArticleUPCLength) {
          reject(`Title must be at least ${minArticleUPCLength} characters.`);
        }

        if (article.articleId) {
          const existingCourseIndex = articles.findIndex(a => a.articleId == article.articleId);
          articles.splice(existingCourseIndex, 1, article);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new courses in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          console.log("SAVE ARTICLE", article);
          article.articleId = generateId(article);
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
          article.articleId == articleId;
        });
        articles.splice(indexOfArticleToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default ArticleApi;
