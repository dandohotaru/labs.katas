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
      print("home alone");
    })
    .on("products/list", () => {
      print("products page");
    })
    .on("settings", (params, query) => {
      print(query);
    })
    .on("quit", (params, query) => {
      print(query);
      router.navigate('products/list');
    })
    .on({
      "book/:id/note/:noteId": (params, query) => print(params),
      "book/:id": (params, query) => print(params),
      "book*": (params, query) => {
        print(query);
      },
    })
    .notFound((query) => {
      print("i give up");
    })
    .resolve();
})

