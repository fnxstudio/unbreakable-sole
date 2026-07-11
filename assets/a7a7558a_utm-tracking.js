$(function () {
  function getParam (key) {
    return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
  }

  var content = getParam('utm_content') || 'organic';
  var setMrt = function () {
    $('input[name="mrt"]').val(content);
  }
  setInterval(setMrt, 2000);
  setMrt();
});
