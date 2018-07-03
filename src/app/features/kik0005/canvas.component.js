import template from "./canvas.component.hbs";
import styles from "./canvas.component.css";
import $ from 'jquery';

export class CanvasComponent  {
  
  init(selector) {
    $(selector).html(template());

    var sidebar = false;
    var canvas = $('.offcanvas');
    var button = $('[data-toggle="canvas"]');
    var icon = $('[data-toggle="canvas"] > i');

    button.click(function () {
      if (sidebar) {
        canvas.removeClass("active");
        icon.removeClass("glyphicon-chevron-right");
        icon.addClass("glyphicon-chevron-left");
        sidebar = false;
      }
      else {
        canvas.addClass("active");
        icon.removeClass("glyphicon-chevron-left");
        icon.addClass("glyphicon-chevron-right");
        sidebar = true;
      }
    });
  }
}