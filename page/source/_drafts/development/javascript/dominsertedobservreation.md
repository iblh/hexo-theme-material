more info here http://davidwalsh.name/detect-node-insertion

in your css

@keyframes nodeInserted {
  from { opacity: 0.99; }
  to { opacity: 1; }
}


label[is="swl-ribbon-group-title"] {
  animation-duration: 0.001s;
  animation-name: nodeInserted;
}


in your javascript

document.querySelector('label[is="swl-ribbon-group-title"]').addEventListener("animationstart", function(e) {
  console.dir(e);
  console.log(e.target.clientWidth);
}, false);
