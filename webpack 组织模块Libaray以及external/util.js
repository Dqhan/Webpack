import $ from 'jquery'

function sayHello() {
  console.log("Hello");
}
console.log($('#app'));
function hideImages() {
    console.log(1);
}

export default {
  sayHello: sayHello,
  hideImages: hideImages
}