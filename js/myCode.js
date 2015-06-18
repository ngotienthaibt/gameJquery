
$(document).ready(function(){



var container = $('.container'),count = 0, cube = container.find('div.rotateObj'),bean = container.find('div.bean'),score = container.find('.score'), deg = 0,colorIndex = 0,beforePlay = $(".play"),finalGame = $(".gameover"), cookie = getCookie("bestScore");


function setCookie(cname,cvalue,exdays){
	var d = new Date();
	d.setTime(d.getTime()+(exdays*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname+"="+cvalue + "; " +expires;
}
function getCookie(cname){
	var name = cname + "=",
		ca = document.cookie.split(";");
		for(var i = 0;i<ca.length;i++){
			var c = ca[i];
			while(c.charAt(0)==" "){c = c.substring(1)};
			if(c.indexOf(name)==0) return c.substring(name.length,c.length);
		}
		return "";

}

function  rotateObj(){
	self = this;
	this.posi = cube.offset().top;
	this.colorList = [cube.css('border-top-color'),cube.css('border-left-color'),cube.css('border-bottom-color'),cube.css('border-right-color')];
	this.colorActive = this.colorList[colorIndex];
	this.rotate = function() {
		container.on('click', function(event) {
			event.preventDefault();
			var spin = document.getElementById("spin");
			spin.pause();
			spin.currentTime = 0;
			spin.play();
			
				deg = deg + 90;
			cube.css({
				transform: 'rotate('+deg.toString()+'deg)'	
			});

			colorIndex = colorIndex>2 ?  0: colorIndex + 1;
			self.colorActive = self.colorList[colorIndex];
		});
	}
};

function beanObj(ro){
	var autoFall,ck;
	selfb = this;
	this.beanColor = "";
	this.setColor = function() {
		var random =Math.floor((Math.random() *4))+1;
		selfb.beanColor = ro.colorList[random-1];
		bean.css({
			'background-color': selfb.beanColor
		});
	};

	this.check = function(){
			if(ro.colorActive == selfb.beanColor){
				count++;
				score.text(count.toString());
				var point = document.getElementById("point");
				point.pause();
				point.currentTime=0;
				point.play();
				ck=true;
				
			}else{
				ck = false;
				//debugger;
					finalGame.find('.final-score').text(count.toString());
					finalGame.css({display: "block"});
					container.off("click");
					var intCookie = parseInt(cookie); 
					if(intCookie < count){
						var ckv = count.toString();
						setCookie("bestScore",ckv,100);
					}
					var fs = getCookie("bestScore");
					finalGame.find('.fbs').text(fs);

				document.getElementById('die').play();
			}
	};
	this.move = function() {

		bean.css({
				'top': '-50px'
			});
		bean.animate({top: ro.posi}, 1000,'linear',function(){
			selfb.check();
			selfb.setColor();
			setTimeout(function(){
				if(ck == true){
						selfb.move();
				}
			},10);
		});

	};
}

	function action() {
		
		var ro,be;
		if(typeof ro != "object" ){
			ro = new rotateObj();
			be = new beanObj(ro);
		}
		score.text(count.toString());
		container.css({
			height: $(window).height().toString()
		});
		
		ro.rotate();
		
		be.setColor();
		be.move();
	}


	function play() {

		var ckv = count.toString();
		if(cookie==""){
			setCookie("bestScore",ckv,100);

			cookie = getCookie("bestScore");
		}
		
		beforePlay.find(".best-score").text(cookie);

		var playButton = beforePlay.find("#play");
		playButton.click(function(){
			beforePlay.css({display: "none"});
			action();
		});

		finalGame.on('click', '#replay', function(event) {

			count = 0;
			deg = 0;
			colorIndex = 0;
			cube.css({
				transform: 'rotate(0deg)'	
			});
			
			new action();
			finalGame.css({display: "none"});
		});;
	}

	play();

});