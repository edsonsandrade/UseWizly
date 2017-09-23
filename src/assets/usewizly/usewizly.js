

function initScrollTable() {
  var options = [
    {selector: '#scrollTable', offset: 500, callback: loadPageOfUsers() },
  ];
  Materialize.scrollFire(options);
}
