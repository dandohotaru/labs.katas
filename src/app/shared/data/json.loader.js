export class JsonLoader {

  load(path, bind) {

    var request = new XMLHttpRequest();

    request.open('GET', path);
    
    request.onload = event => {

      if (request.status >= 200 && request.status < 400) {
        var data = JSON.parse(request.responseText);
        bind(data);
      } else {
        console.log(`Error: ${request.status} - ${request.statusText})`);
      }
    };

    request.onerror = event => {
      console.log(`Error: ${event}`);
    };

    request.send();
  }
}