export default function (value) {

  var result = "";
  
  let random = Math.floor((Math.random() * 5) + 1);
  for (let index = 0; index < random; index++) {
    result = result.concat(value);
  }

  return result;
}