//自闭包函数
;(function(){
	'use strict';
//parameter
	var $form_add = $('.test-add'),
		test_list = [],
		$mask = $('.mask'),
		$msg = $('.msg'),
		$det_contain = $('.det-contain'),
		$msg_content = $('.msg-content'),
		$msg_btn = $('.msg-button'),
		$sanjiaoxing,
		$det_item,
		$del_item,
		$t_item,
		$checkbox_complete,
		$update_form,
		$det_title,
		$test_detail,
		$old_det_title,
		$nav,
		current_index
		;

//API	
	init();

//clear store--->
// store.clear();

//band form button
//submit use form>>
	function add_item(){
		$form_add.on('submit',function(event){
			event.preventDefault();
			var new_test = {},
				$input = $(this).find('input[name=content]');
			new_test.content = $input.val();
			if (!new_test.content) {
				return;
			}
			if (add_test(new_test)) {
				$input.val(null);
			}
		})
	}

//band del button
	function del_item(){
		$del_item.on('click', function() {
		var $this = $(this); //make this  switch jq-obj;
		var $item = $this.parent();
		var index = $item.data('index');
		var tem = confirm ('确认删除？');
		tem ? delete_item(index) : null;
		})
	}

//band det button
	function det_item(){
		$det_item.on('click',function(){
		var $this = $(this);
		var $item = $this.parent();
		var index = $item.data('index');
		show_det(index);
		})
	}

//band mask button
	function mask_button(){
		$mask.on('click',function() {
		var i = confirm('更新了么？');
		i ? hide_det() : null;
		})
	}

//band checkbox button
	function checkbox_button(){
		$checkbox_complete.on('click',function() {
			var $this = $(this);
			var index = $this.parent().parent().data('index');
			var item = get(index);
			if (item.complete) {
				update_textarea(index,{complete:false});
			}
			else{
				update_textarea(index,{complete:true});
			}
		})
	}

//show or hide det
	function show_det(index){   //--->>it use show det
		show_det2(index);
		$mask.show();
	}
	function show_det2(index){  //--->>it also use notify_msg funtion
		test_list_det(index);
		current_index = index;
		$det_contain.show();
		$test_detail.animate({right:'0'},200);
	}
	function hide_det(){
		$test_detail.animate({right:'-282px'},200);
		$mask.hide();
	}

//save & extraction & API
	function add_test(new_test){
		test_list.push(new_test);
		refresh_list();
		return true;
	}
	function init(){
		add_item();
		test_list = store.get('test_list') || [];
		if (test_list.length) {
			render_test_list();
		}
		check_date();
		msg_btn();
	}

//check obj-dateTime and current time
	function check_date(){
		var current_time;
		var sit = setInterval(function(){
			for (var i = 0; i < test_list.length; i++) {
				var item = get(i),obj_time;
				if (!item || !item.remind_date || item.informed) {
					continue;
				}
				current_time = (new Date()).getTime();
				obj_time = (new Date(item.remind_date)).getTime();
				if (current_time - obj_time >= 1) {
					update_textarea(i,{informed:true});
					notify_msg();
				}
			}
		},300);	
	}

//notify message show and hide
	function notify_msg(){
		var $item = $del_item.parent();
		var index = $item.data('index');
		$msg.show();
		show_det2(index);
	}
	function hide_msg(){
		$msg.hide();
		$det_contain.hide();
	}
	function msg_btn(){
		$msg_btn.on('click', function(event) {
			event.preventDefault();
			hide_msg();
		});
	}

//refresh det-textarea
	function update_textarea(index,data){
		if (!index || !test_list[index]) {
			return;
		}
		test_list[index] = $.extend({}, test_list[index], data);
		refresh_list();
	}

//------------------------------------------------------------------------//
// iteration and prepend tpl-------------------->>>>> foremost function  -//
// -----------------------------------------------------------------------//
	function render_test_list(){
		var $test_list = $('.test-list');
		$test_list.html('');
		var complete_box = [];
		//iteration
		for (var i=0; i<test_list.length; i++) {
			var item = test_list[i];
			if (item && item.complete) {
				complete_box[i] = item;
			}
			else {
				var $test = test_list_item(item,i);
				$test_list.prepend($test);
			}
		}
		for (var j=0; j<complete_box.length; j++) {
			$test = test_list_item(complete_box[j],j);
			 if (!$test) continue;
			$test.addClass('complete-item');
			$test_list.append($test);		
		}
		//assignment
		$del_item = $('.t-del');
		$sanjiaoxing  = $('.triangle-up');
		$det_item = $('.t-det');
		$t_item = $('.t-item');
		$checkbox_complete = $('.complete');
		//tirgger function 
		del_item();
		det_item();
		mask_button();
		checkbox_button();
	}
	function test_list_item(data,index){
		if (!data){
			return;
		}
		var list_item_tpl = 
			'<div class="t-item" data-index="'+ index +'">'+
			'<span><input type="checkbox" '+(data.complete ? "checked" : "")+' class="fl complete"></span>'+
			'<span class="fl t-content">'+ data.content +'</span>'+
			'<span class="fr t-del">删除</span>'+
			'<span class="fr t-det">详情</span>'+
			'</div>';
			return $(list_item_tpl);
	}
	function test_list_det(index){
		if (!index||!test_list[index]) {
			return;
		}
		var item  = test_list[index];
		var list_det_tpl = 
		'<form id="formDet">'+
			'<div class="test-detail">'+
				'<div class="t-title">' +item.content+ '</div>'+
				'<input type="text" name="content" value="'+ (item.content||'') +'" class="det-title" />'+
				'<div class="t-desc">'+
					'<textarea name="remind_content" id="remind_area" wrap = "physical">' +(item.desc ||'')+ '</textarea>'+
				'</div>'+
				'<div class="t-date">'+
					'<input type="text" class="datetime" name="remind_date" value="'+ (item.remind_date || '给计划个时间吧~!') +'" />'+
					'<button type="submit">更新！</button>'+
					'<img src="images/detLogo.png" alt="det-logo" id="det-logo"/>'+
				'</div>'+
			'</div>'+
		'</form>';
		$det_contain.html(null);
		$det_contain.html(list_det_tpl);
		$('.datetime').datetimepicker();
		$det_title = $('.det-title');
		$old_det_title = $('.t-title');
		$test_detail = $('.test-detail');
		$update_form = $('#formDet');
		$nav = $('.nav-button');
		$update_form.on('submit', function(event) {
			event.preventDefault();
			var data = {};
			data.content = $(this).find('[name = content]').val();
			data.desc = $(this).find('[name = remind_content]').val();
			data.remind_date = $(this).find('[name = remind_date]').val();
			update_textarea(index,data);
			$update_form.hide();
			$mask.hide();
			if ($msg.css('display') !== "none" ) {
				$msg.hide();
			}
		})
		$old_det_title.on('dblclick',function() {
			event.preventDefault();
			$det_title.show();
			$old_det_title.hide();
		});
	}
//-----------------------END this function------------------------------//

//refresh store and update tpl
	function refresh_list(){
		store.set('test_list',test_list);
		render_test_list();
	}

//get store
	function get(index){
		return store.get('test_list')[index];
	}
	
//del item
	function delete_item(index){
		if (index === undefined || !test_list[index]) {
			return;
		}
		delete test_list[index];
		refresh_list();
	}

})();