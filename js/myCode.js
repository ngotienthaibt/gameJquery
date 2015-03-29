
$(document).ready(function(){



var container = $('.container'),count = 0, cube = container.find('div.rotateObj'),bean = container.find('div.bean'),score = container.find('.score');
container.data('deg', 0);
container.data('colorIndex',0);
score.text(count.toString());
container.css({
	height: $(window).height().toString()
});
function  rotateObj(){
	self = this;
	this.posi = {};
	this.getPosi = function(){
		this.posi.top = cube.offset().top;
		this.posi.left = cube.offset().left;
	}
		

	
	this.colorList = [cube.css('border-top-color'),cube.css('border-left-color'),cube.css('border-bottom-color'),cube.css('border-right-color')];

	this.colorActive = this.colorList[container.data('colorIndex')]; //top-left-bottom-right -> 0-90-180-270  360-450-540-630

	this.rotate = function() {
		self.getPosi();
		container.on('click', function(event) {
			event.preventDefault();
			document.getElementById("spin").pause();
			document.getElementById("spin").currentTime = 0;
			document.getElementById("spin").play();
			var deg = $(this).data('deg');
				deg = deg + 90;

			var degStr = deg.toString();
			cube.css({
				transform: 'rotate('+degStr+'deg)'	
			});

			$(this).data('deg',deg);
			var colorIndex = $(this).data('colorIndex');
			if(colorIndex > 2) {
				colorIndex = 0;
			} else{
				colorIndex = colorIndex+1;
			}
			self.colorActive = self.colorList[colorIndex];
			$(this).data('colorIndex',colorIndex)
			console.log(self.colorActive);
		});
	}
};
var ro = new rotateObj();
ro.rotate();
function beanObj(){
	selfb = this;
	this.beanColor = "";
	this.setColor = function() {
		var random =Math.floor((Math.random() *4))+1;
		selfb.beanColor = ro.colorList[random-1];
		bean.css({
			'background-color': selfb.beanColor
		});
	};
	
	this.move = function() {
		bean.css({
			'top': '-50px'
		});
		var check = function(){
			if(ro.colorActive == selfb.beanColor){
				count++;
				score.text(count.toString());
				document.getElementById("point").pause();
				document.getElementById("point").currentTime=0;
				document.getElementById("point").play();
				
			}else{
				score.text("game over");
				document.getElementById('die').play();
			}
		};
		var m = function(){
			bean.css({
					'top': '-50px'
				});
			bean.animate({top: ro.posi.top}, 2000,'linear',function(){
				check();
				selfb.setColor();
				setTimeout(m(),10);
			});
		}
				m();
	};
}
var be = new beanObj();
be.setColor();
be.move();
});