more info here
http://stackoverflow.com/questions/26692678/how-do-you-observe-the-width-of-an-element-in-polymer
and here
http://www.prevent-default.com/detect-size-change-of-elements-using-transitions/

in your css
:host {
  transition:width 0.01s, height 0.01s;
}

in your javascript
this.addEventListener("transitionend",function(e){
  this.elementWidth = this.clientWidth;
})
