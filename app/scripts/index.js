let $ = require('jquery');
let handlebars = require('handlebars');

//selecting html template with jquery
let source = $('#item-template').html();
//compiling HTML with handlebars (put on 'stamp')
let template = handlebars.compile(source);
//creates api var
let url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=nuclear&includes=Images,Shop&sort_on=score";

//fetches from API
function fetchJSONP(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    var script = document.createElement('script');

    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}

//api//API
fetchJSONP(url, function(data) {
  //redefines
  data = data.results;
  console.log(data);
  //runs on each object in array
  data.forEach(function(info){
    //stamps into HTML
    $('#item-container').append(template(info));
  })

});
