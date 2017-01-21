// import { jquery } from "jquery"


$(() => {
  const result = $("#result");
  var router = new Navigo(null, false);

  function print(text) {
    var message = JSON.stringify(text);
    result.text(message);
    console.log(message);
  }

  router
    .on(() => {
      print("home page");
      
    })
    .on("home", (params, query) => {
      print(query);
      router.navigate('products/list');
    })
    .on("test", (params, query) => {
      print(query);
    })
    .on("settings", (params, query) => {
      print(query);
    })
    .on("quit", (params, query) => {
      print(query);
    })
    .on("products/list", () => {
      print("display all the products");
    })
    .on({
      "book/:id/note/:noteId": print, 
      "book/:id": params => print(params),
      "book/:id/note/:noteId": print,
      //"*": () => print("home") // all routs lead to home page
    })
    .notFound((query) => {
      print("i give up");
    })
    .resolve();
})