//自闭包函数
;(function(){
	'use strict';
	//parameter
	var $form_add = $('.test-add'),
		test_list = [],
		$mask = $('.mask'),
		$det_contain = $('.det-contain'),
		$sanjiaoxing,
		$det_item,
		$del_item,
		$t_item,
		$update_form,
		$det_title,
		$old_det_title,
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
		hide_det();
		})
	}

	//band item button
	function t_item(){
		var $this = $(this);
		var index = $this.data('index');
		$t_item.on('dblclick', function(index) {
			show_det(index);
		})
	}

	//show or hide det
	function show_det(index){
		test_list_det(index);
		current_index = index;
		$mask.show();
		$det_contain.show();
	}
	function hide_det(){
		$mask.hide();
		$det_contain.hide();
	}

	//save & extraction
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
	}

	//refresh det-textarea
	function update_textarea(index,data){
		if (!index || !test_list[index]) {
			return;
		}
		test_list[index] = $.extend({}, test_list[index], data);
		refresh_list();
	}

	// iteration and prepend tpl
	function render_test_list(){
		var $test_list = $('.test-list');
		$test_list.html('');
		for (var i=0; i<test_list.length; i++) {
			var $test = test_list_item(test_list[i],i);
			$test_list.prepend($test)
		}
		$del_item = $('.t-del');
		$sanjiaoxing  = $('.triangle-up');
		$det_item = $('.t-det');
		$t_item = $('.t-item');
		//tirgger function 
		del_item();
		det_item();
		mask_button();
		t_item();
	}
	function test_list_item(data,index){
		if (!data || !index) {
			return;
		}
		var list_item_tpl = 
		'<div class="t-item" data-index="'+ index +'">'+
		'<span><input type="checkbox" class="fl"></span>'+
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
		'<div class="triangle-up"></div>'+
		'<form id="formDet">'+
		'<div class="test-detail">'+
		'<div class="t-title">' +item.content+ '</div>'+
		'<input type="text" name="content" value="'+ (item.content||'') +'" class="det-title">'+
		'<div class="t-desc">'+
		'<textarea name="remind_content" id="remind_area" cols="45" rows="8">' +(item.desc ||'')+ '</textarea>'+
		'</div>'+
		'<div class="t-date">'+
		'<h5>提醒时间：</h5>'+
		'<input type="date" name="remind_date" value="'+ item.remind_date +'">'+
		'<button type="submit">更新！</button>'+
		'</div>'+
		'</div>'+
		'</form>';
		$det_contain.html(null);
		$det_contain.html(list_det_tpl);
		$det_title = $('.det-title');
		$old_det_title = $('.t-title')
		$update_form = $('#formDet');
		$update_form.on('submit', function(event) {
			event.preventDefault();
			var data = {};
			data.content = $(this).find('[name = content]').val();
			data.desc = $(this).find('[name = remind_content]').val();
			data.remind_date = $(this).find('[name = remind_date]').val();
			update_textarea(index,data);
			$update_form.hide();
			$mask.hide();
		})
		$old_det_title.on('dblclick',function() {
			event.preventDefault();
			$det_title.show();
			$old_det_title.hide();
		});
	}

	//refresh store and update tpl
	function refresh_list(){
		store.set('test_list',test_list);
		render_test_list();
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