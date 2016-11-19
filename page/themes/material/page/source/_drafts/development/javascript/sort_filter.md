var list = [];

var sorters = {
  byOrder: function(a, b) {
    return (a.order - b.order);
  }
}

Array.prototype.slice.call(document.querySelectorAll('div.test2')).forEach(function(ele, i) {
  list.push({ id: ele.dataset.id, dom: ele });
  });

  document.querySelector('#random').addEventListener('click', function(evt) {

    var t = [];
    for (var i = 0; i < list.length; i++) {
      var r = Math.floor(Math.random() * list.length);
      while(inArray(t,r)) {
        r = Math.floor(Math.random() * list.length);
      }
      t.push(r);
      list[i].order = r;
    }

    list.sort(sorters.byOrder);

    for(var i = 0; i < list.length; i++) {
      list[i].dom.style.gridColumn = i % 4;
      //list[i].dom.parentNode.appendChild(list[i].dom);
    }

    });


    function inArray(a, value) {
      for (var i = 0; i < a.length; i++) {
        if (a[i] === value) {
          return true;
        }
      }
      return false;
    }




















    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter




    function isBigEnough(element) {
      return element >= 10;
    }
    var filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
    // filtered is [12, 130, 44]



    
