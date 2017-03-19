/**
 *
 *
 */
function RippleEffect(element){
    this.element = element;
    this.element.addEventListener('click', this.run.bind(this), false);
}
RippleEffect.prototype = {
    run: function(event){
        var ripplerContainer = this.element.querySelector('.ripple-container');
        var offsetInfo = this.element.getBoundingClientRect();
        if(ripplerContainer) {
            ripplerContainer.remove();
        }
        var rippleContainer = document.createElement('div');
        rippleContainer.style.position = 'fixed';
        rippleContainer.style.zIndex = 99;
        rippleContainer.style.width = offsetInfo.width + 'px';
        rippleContainer.style.left = offsetInfo.left + 'px';
        rippleContainer.style.top = offsetInfo.top + 'px';
        rippleContainer.style.height = offsetInfo.height + 'px';
        rippleContainer.className = 'ripple-container';
        rippleContainer.style.overflow = 'hidden';
        this.element.appendChild(rippleContainer);
        
         // fixed the bug
        var maxLength = offsetInfo.width > offsetInfo.height ? offsetInfo.width : offsetInfo.height;
        var circleD = maxLength * 2;

        var ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.width = circleD + 'px';
        ripple.style.height = circleD + 'px';
        ripple.style.borderRadius = '500px';
        ripple.style.left = ((event.pageX - offsetInfo.left) - circleD/2) + 'px';
        ripple.style.top = ((event.pageY - offsetInfo.top) - circleD/2) + 'px';
        ripple.className = 'ripple';
        rippleContainer.appendChild(ripple);
        ripple.addEventListener('animationend', function(){
            rippleContainer.remove();
        }.bind(this), false);
    }
};
