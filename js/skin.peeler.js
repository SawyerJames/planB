//closure function
;(function(){
	'use strict';

//api 
	tpl();

//tpl
	function tpl(){
		var tpl = 
		'<div id="more">'+
		'<div class="nav-button">更多</div>'+
		'<div id="Y_more">'+
			'<a target="_blank" href="https://sawyerjames.github.io/blog/" class="mo1"><span>作者</span></a>'+
			'<div id="share">分享到</div>'+
			'<a id="shareQQ" target="_blank" class="mo2"><span>空间</span></a>'+
			'<a id="shareSina" target="_blank" class="mo3"><span>微博</span></a>'+
			'<a id="shareWeixin" target="_blank" class="mo4">'+
				'<span>微信</span>'+
				'<img src="images/2dbc.jpg" alt="2-dimensional bar code" id="tdbc" />'+
			'</a>'+
			'<a id="shareDouban" target="_blank" class="mo5"><span>豆瓣</span></a>'+
		'</div>'+
		'</div>'+
		'<div id="skin">'+
			'<div class="nav-skin">换肤</div>'+
			'<div id="Y_skin">'+
				'<span class="sk1"></span>'+
				'<span class="sk2"></span>'+
				'<span class="sk3"></span>'+
				'<span class="sk4"></span>'+
				'<span class="sk5"></span>'+
				'<span class="sk6"></span>'+
				'<span class="sk7"></span>'+
				'<span class="sk8"></span>'+
				'<span class="sk9"></span>'+
			'</div>'+
		'</div>';
		$('body').append(tpl);
	}

//var argument
	var $more = $('.nav-button')
		,$skin = $('.nav-skin')
		,$Y_more = $('#Y_more')
		,$Y_skin = $('#Y_skin')
		,$body = $('body')
		,csk = store.get('csk')
		,$tdbc = $('#tdbc')
		;

//store css
	$body.addClass(csk);
	// store.clear();

//band more and skin buttn
	$more.on('mouseenter', function() {
		$Y_more.show('fast');
	});
	$Y_more.on('mouseleave', function() {
		$Y_more.hide('fast');
	});

	$skin.on('mouseenter', function() {
		$Y_skin.show('fast');
	});
	$Y_skin.on('mouseleave', function() {
		$Y_skin.hide('fast');
	});

//band skin css
	$('.sk1').on('click', function() {
		$body.removeClass();
		$body.addClass('sk_1');
		store.set('csk','sk_1');
	});
	$('.sk2').on('click', function() {
		$body.removeClass();
		$body.addClass('sk_2');
		store.set('csk','sk_2');
	});
	$('.sk3').on('click', function() {
		$body.removeClass();
		$body.addClass('sk_3');
		store.set('csk','sk_3');
	});
	$('.sk4').on('click', function() {
		$body.removeClass();
		$body.addClass('sk_4');
		store.set('csk','sk_4');
	});
	$('.sk5').on('click', function() {
		$body.removeClass();
		$body.addClass('sk_5');
		store.set('csk','sk_5');
	});
	$('.sk6').on('click', function() {
		$body.removeClass();
		$body.addClass('sk_6');
		store.set('csk','sk_6');
	});
	$('.sk7').on('click', function() {
		$body.removeClass();
		$body.addClass('sk_7');
		store.set('csk','sk_7');
	});
	$('.sk8').on('click', function() {
		$body.removeClass();
		$body.addClass('sk_8');
		store.set('csk','sk_8');
	});
	$('.sk9').on('click', function() {
		$body.removeClass();
		$body.addClass('sk_9');
		store.set('csk','sk_9');
	});

//share assembly
	$("#shareQQ").on("click",function(){
   		$(this).socialShare("qZone",{
    		url: 'https://sawyerjames.github.io/planB/',  
   			title: '想要拥有一个自我规划的清单么？PlanB,一款帮你搞定一切的计划应用',
   			content: '它有着绝对简约的页面，由你亲自定制的计划清单，贴心的准时提醒，更可以用它来记录你每天的点点滴滴。你还在等待什么？快加入我们！',
  			pic: 'https://sawyerjames.github.io/planB/images/1.jpg'
  			});
	});
	$("#shareSina").on("click",function(){
   		$(this).socialShare("sinaWeibo",{
    		url: 'https://sawyerjames.github.io/planB/',  
   			title: '想要拥有一个自我规划的清单么？PlanB,一款帮你搞定一切的计划应用',
   			content: '它有着绝对简约的页面，由你亲自定制的计划清单，贴心的准时提醒，更可以用它来记录你每天的点点滴滴。你还在等待什么？快加入我们！',
  			pic: 'https://sawyerjames.github.io/planB/images/1.jpg'
  			});
	});
	$("#shareWeixin").on("click",function(){
		if ($tdbc.css('display') == 'none') {
			$tdbc.show('fast');
		}
   		else{
   			$tdbc.hide('fast');
   		}
	});
	$Y_more.on("mouseleave",function(){
   		$tdbc.hide('fast');
	});
	$("#shareDouban").on("click",function(){
   		$(this).socialShare("doubanShare",{
    		url: 'https://sawyerjames.github.io/planB/',  
   			title: '想要拥有一个自我规划的清单么？PlanB,一款帮你搞定一切的计划应用',
   			content: '它有着绝对简约的页面，由你亲自定制的计划清单，贴心的准时提醒，更可以用它来记录你每天的点点滴滴。你还在等待什么？快加入我们！',
  			pic: 'https://sawyerjames.github.io/planB/images/1.jpg'
  			});
	});

})();