$(function(){
  $('#Container').mixItUp({
    animation: {
      animateResizeContainer: false,
      effects: 'fade scale(0.8)',
      duration: 400,
      queue: true,
      queueLimit: 1
    },
    selectors: {
      sort: '.blog-sort',
      filter: '.blog-filter'
    },
    load: {
      filter: 'all',
      sort: 'date:random'
    },
    controls: {
      toggleFilterButtons: true,
      toggleLogic: 'and'
    },
    callbacks: {
      onMixStart: function(state, futureState){
        if(futureState.$hide.length == 0) {
          document.querySelector('*.tagcloud-item[data-filter="all"]').classList.add('active');
          Array.prototype.slice.call(document.querySelectorAll('*.blog-filter[data-filter].active:not(*[data-filter="all"])')).forEach(function(ele, i) {
            ele.classList.remove('active');
          });
        } else {
          document.querySelector('*.tagcloud-item[data-filter="all"]').classList.remove('active');
        }
      }
    }
  });

  document.querySelector('*.tagcloud-item[data-filter="all"]').addEventListener('click', function(evt) {
    $('#Container').mixItUp('filter','all');
  });
});
