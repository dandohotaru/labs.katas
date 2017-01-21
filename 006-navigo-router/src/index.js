//import { jquery as $ } from "jquery";

$(() => {
  const result = $("#result");
  var router = new Navigo(null, false);

  function print(text) {
    var message = JSON.stringify(text);
    result.text(message);
    console.log(message);
  }

  function notify(type, message){
    $("#alertBox").removeClass();
    $("#alertBox").addClass(`alert alert-${type}`);
    $("#alertBox").show();
    $("#alertText").html(message);
  }

  function load(context) {

    var options = ["home", "breweries", "beers", "account"];

    options.filter(item => item != context).forEach(item => {
      $(`#${item}Panel`).hide();
      $(`#${item}Menu`).removeClass("active");
    });

    options.filter(item => item == context).forEach(item => {
      $(`#${item}Panel`).show();
      $(`#${item}Menu`).addClass("active");
    });
  }

  router
    .on(() => {
      load("home");
    })
    .on("breweries", () => {
      load("breweries");
    })
    .on("beers", (params, query) => {
      load("beers");
    })
    .on("settings", (params, query) => {
      notify("warning", "Context not implemented, falling back to default");
      router.navigate("home");
    })
    .on("account", (params, query) => {
      load("account");
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

