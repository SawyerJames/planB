//自闭包函数
;(function(){
	'use strict';
	//parameter
	var $form_add = $('.test-add'),
		test_list = [],
		$del_item;

	//API	
	init();

	//clear store--->
	// store.clear();

	//band form button
	function add_item(){
		$form_add.on('click',function(event){
			var new_test = {},
				$input = $(this).find('input[name=content]');
			event.preventDefault();
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

	// iteration and append tpl
	function render_test_list(){
		var $test_list = $('.test-list');
		$test_list.html('');
		for (var i=0; i<test_list.length; i++) {
			var $test = test_list_item(test_list[i],i);
			$test_list.append($test);
		}
			$del_item = $('.t-del');
		del_item();
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