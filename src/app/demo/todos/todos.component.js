import template from "./todos.component.hbs";
import styles from "./todos.component.css";
import data from "./todos.component.json";
import moment from 'moment';
import $ from 'jquery';

export class TodosComponent {

  init(selector) {

    // Enrich
    data.tasks.forEach(p => {
      p.stamp = moment(p.stamp).toDate();
    });

    // Bind
    $(selector).html(template(data));

    // Handlers
    $('.star').on('click', function () {
      $(this).toggleClass('star-checked');
    });

    $('.ckbox label').on('click', function () {
      $(this).parents('tr').toggleClass('selected');
    });

    $('.btn-filter').on('click', function () {
      var $target = $(this).data('target');
      if ($target != 'all') {
        $('.table tr').css('display', 'none');
        $('.table tr[data-status="' + $target + '"]').fadeIn('slow');
      } else {
        $('.table tr').css('display', 'none').fadeIn('slow');
      }
    });
  }
}