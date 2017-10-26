;(function(){
	var Barrage = function(options){
		this.opt = options || {};
		this.el = this.opt.el;
		this.btn = this.opt.btn;
		this.text = this.opt.text;
		this.textBox = this.opt.textBox;
		this.domList = [];
		this.rect = this.el.getBoundingClientRect();
		this.domWidth = this.rect.right - this.rect.left;
		this.domHeight = this.rect.bottom - this.rect.top;
		this.init();
	}
	Barrage.prototype = {
		init: function(){
			var self = this;

			this.el.style.position = "relative";

			this.btn.onclick = function(){
				var value = self.text.value;
				self.shoot(value);
				self.appendList(value);
			}
		},
		shoot: function(text){
			var self = this;

			var div = document.createElement("div");
			div.style.position = "absolute";
			div.style.left = this.domWidth + "px";
			div.style.top = (this.domHeight - 20) * (+Math.random().toFixed(2)) + "px";
			div.style.whiteSpace = 'nowrap';
			div.style.color = '#' + Math.floor(Math.random() * 256).toString(10);
			div.innerText = text;
			this.el.appendChild(div);

			var roll = function(timer){
				var now = +new Date();
				roll.last = roll.last || now;
				roll.timer = roll.timer || timer;
				var left = div.offsetLeft;
				var rect = div.getBoundingClientRect();

				if(left < (rect.left - rect.right)){
					self.el.removeChild(div);
				}else{
					if(now - roll.last >= roll.timer){
						roll.last = now;
						left -= 3;
						div.style.left = left + "px";
					}
					requestAnimationFrame(roll);
				}
			}
			roll(50 * Math.random().toFixed(2));
		},
		appendList: function(text){
			var p = document.createElement("p");
			p.innerText = text;
			this.textBox.appendChild(p);
		}
	}

	window.Barrage = Barrage;
})();