/** 
 
 @Name： 未来之窗渲染引擎
 @Author：cybersnow
 @Site： www.ynwlzc.cn
 @LastEdit: 未来之窗
 2022-10-17
 CyberWin_APP_artDialog.js
 */
 /* egCyberWin_ClientRender
      CyberWin_ClientRender($('#cyberwin_tpl_printergoods').html()).render(persons, function(html){//2020-8-14修改下单模板
						$('#cyberwin_data_table').append(html);
			});

 */

 //2023-5-20 升级关闭按钮
 //2023-6-4 增加  未来之窗_layer_body_height隐藏标题栏
 //2023-5-31 升级都透明

 //2023-8-8 修复遮罩拖动
 //增加url 模式
 //2023-8-11 增加隐藏标题下部分，手动
//2023-8-17 增加输入
//cyberwin_arg_input_0D3EB0CDBBA6A535543A5E7714DA67E6
//2023-10-16 增减屏幕宽度初始化
//2023-11-8 增加收缩窗口  fold
//2023-11-11 默认关闭 切换收缩 canfold wlzc_dialog_swithbody
//2024-2-13 适应未来之窗 ai要求
; !
function() {
    
    var cyberwin_dialog_style=` <style>
	   .cyberwin_dialog_hide_body_20230811{
				min-height:40px!important;
				height:40px!important;
		}

		 .cyberwin_dialog_mask{
				display: none;
				 
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: rgba(0,0,0,.7);
				text-align: center;
				color: #696969;
				z-index: 99999;
			}
           .cyberwin_dialog_localapp_fix{ 
						 position: fixed; 
					 
						top: 150px;
						 
						/*left: 500px; */
						right:10px;
						background: #f3f5f7;
						width: 730px; 
						/*z-index: 999; */
						min-height:400px;
						border:1px solid #48a731;
						height:400px;
						display:block;
						border-radius: 10px;
					 }
			 .cyberwin_dialog_localapp_fix .set_top{
			   background: #48a731; line-height: 35px; padding-left: 22px;/* padding-right: 198px;*/
			   border-radius: 10px 10px 0 0;
			   }
				.cyberwin_dialog_localapp_fix .set_top .set{
					font-size: 18px; color: #fff; 
				}
              .cyberwin_dialog_localapp_fix .set_top .return{ width: 198px; background: #ffbc15; font-size: 24px; color: #101010;  position: absolute; right: 0px; top: 0px; text-indent: 50px; cursor: pointer;
			  border-radius: 0 10px 0 0;}
			  .cyberwin_dialog_localapp_fix .set_end{ padding: 5px 12px; }

			  #cyberwin_arg_input_0D3EB0CDBBA6A535543A5E7714DA67E6{
		line-height: 18px;
		border: 1px solid #ccc;
		background-color: #fff;
		box-shadow: 2px 2px 2px #f0f0f0 inset;
		height: 18px;
		padding: 4px 4px;
	}
			  </style>`;

    var cyberwin_alert_style=`<style>
#alert-layer{
	display: none;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.5);
	text-align: center;
	color: #696969;
	z-index: 99999;
	}
	#alert-container{
		background: #f3f8f7;
		margin: 5%;
		width: 90%;
		max-height: 90%;
		overflow: auto;
		border-radius: 15px;
		padding-top: 1px;
	}
	#alert-text-container{
		font-size: 13px;
		line-height: 25px;
	}
	#cyberwin_alert-title{
		margin: 10px auto;
		font-size: 16px;
		font-size:26px;
		border-bottom:1px solid red;
		padding-bottom: 8px;
		text-align:left;
		padding-left: 80px;
		color:#f9b526;
	}
	#cyberwin_alert-detail{
	   background:#FFFFFF;
	   min-height:50px;
	}
	#cyberwin_alert-detail H1{
	   background:#FFFFFF;
	}
	

	#check-username{
		font-size: 16px;
	}
	#cyberwin_alert-btn{
		height: 60px;
		line-height: 60px;
		border-top: 1px solid #aaa;
	}

	.cyberwin_alert-btn_child{
		display:inline-block;
		line-height:32px;
		background:#FFFFFF;
		padding-top: 10px;
		padding-bottom: 10px;
		padding-left: 15px;
		padding-right: 15px;
		margin-left: 5px;
		border-radius:10px;


 
 
	margin-bottom: 0;
	font-size: 26px;
 
	color: #333;
	text-align: center;
	text-shadow: 0 1px 1px rgba(255,255,255,0.75);
	vertical-align: middle;
	background-color: #f5f5f5;
	background-image: -webkit-gradient(linear,0 0,0 100%,from(#fff),to(#e6e6e6));
	background-image: -webkit-linear-gradient(top,#fff,#e6e6e6);
	background-image: linear-gradient(to bottom,#fff,#e6e6e6);
	background-repeat: repeat-x;
	border: 1px solid #ccc;
	border-color: #e6e6e6 #e6e6e6 #bfbfbf;
	border-color: rgba(0,0,0,0.1) rgba(0,0,0,0.1) rgba(0,0,0,0.25);
	border-bottom-color: #b3b3b3;
	-webkit-border-radius: 4px;
	border-radius: 4px;
	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffffff',endColorstr='#ffe6e6e6',GradientType=0);
	filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);
	-webkit-box-shadow: inset 0 1px 0 rgba(255,255,255,0.2),0 1px 2px rgba(0,0,0,0.05);
	box-shadow: inset 0 1px 0 rgba(255,255,255,0.2),0 1px 2px rgba(0,0,0,0.05);
}
	}

	.cwpd-btn-block{
      	border-radius: 15px;
       }
		.cwpd-btn-block-info{
			background: #02b099;
			color:#ffffff;
		}
		.cwpd-btn-block-info:hover{
			background: #018372;
		}
		.cwpd-btn-block-warning{
			background: #ff683d;
		}


	#cyberwin_alert-confirm:hover{
		border-bottom-left-radius: 20px;
		border-bottom-right-radius: 20px;
	}
	#cyberwin_alert-confirm:hover{
		background: #ddd;
	}
	#cyberwin_arg_input_0D3EB0CDBBA6A535543A5E7714DA67E6{
		line-height: 18px;
		border: 1px solid #ccc;
		background-color: #fff;
		box-shadow: 2px 2px 2px #f0f0f0 inset;
		height: 18px;
		padding: 4px 4px;
	}
	</style>`;

	var 未来之窗加载html = `<img src="data:data:image/gif;base64,R0lGODlhyADIAOZ/AEK7fY3Wsd7z6dry5i60cNTw4vj9+qXewdLv4eX27lrEjvX7+P7+/imybM3t3Ty3emHGk3nPo3XNoH3Qpki9gl3FkLbkzUG1fXHMnvr9+8Do1LDjyT25evL69onUrjS2dKHdvpXZtrvn0VHAiKrgxVTBimnJmTK1cr7o01KuiOn38Mns2jW2deD06k2/hYHRqSuzbji3d02whcXq2Oz48vz+/UW8gJnaup7cvTa3dTC0cjC0ca/iyIbTrKLewJLYtWXIlu759CSwaZDXs7jlzzm4d6zhxmzKmvz+/sjr2eP17BytZEmxguv48YPSqvD69c/u38Pp2C20b2/LnCCvZ8Tq16jfxD66e5bZt9fx406/hobUrPD59VDAh7LjylbCiy2zbzO2c+f27/P79zO1c0WzgMrs28Lq1pvbu/H69mjIl0u+g1Cvhy20cEyxhMLp1ajgxLTkzL/o08Hp1szt3E+/ibLjy7Pky7TjzSiybDS2c6ffw/L69f///zq4eP///yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozODIzRjNBNUE5QTRFRDExOTAyRjk1Mzc0NzQ2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" >`;

	var f, b = {
        open: "{cwpdapp{",
        close: "}}"
    };

    
    e = function(a) {
        this.tpl = a
    };
   
    f = function(a) {
        return   new e(a)
    },
    f.init = function(a) {
			console.log("组件加载");
        document.write(cyberwin_alert_style);
		document.write(cyberwin_dialog_style);
		//
    };
	f.open = function(arg1,arg2,btnok,btncancel,callback){//增加回调
			var content = "<div id='alert-layer'>"+
			"<div id='alert-container'>"+
				"<div id='alert-text-container'>"+
					"<p id='cyberwin_alert-title'>"+arg1+"——未来之窗新思想</p>"+
					"<p id='cyberwin_alert-detail'>"+arg2+"</p>"+
				"</div>"+
				"<div id='alert-btn'>"+
						"<div id='cyberwin_alert-confirm' class='cyberwin_alert-btn_child cwpd-btn-block-info'>"+btnok+"</div>"+
						"<div id='cyberwin_alert-cancel' class='cyberwin_alert-btn_child'>"+btncancel+"</div>"+
				"</div>"+
			"</div>"+
		"</div>";



		$(content).appendTo($('body'));
		//$('body').append(content);
	//	console.log($(content));
		//console.log($($('body')));
		$('#alert-layer').fadeIn();
		f.alert_confirm(callback);

	};

	//2023-8-10
	//提醒
	f.ok = function(arg1,arg2,btnok,callback){
			var content = "<div id='alert-layer' style='text-align: center;'>"+
			"<div id='alert-container' style='width:auto;display: inline-block;'>"+
				"<div id='alert-text-container'>"+
					"<p id='cyberwin_alert-title' style='width: 200px;'>"+arg1+"</p>"+
					"<p id='cyberwin_alert-detail'>"+arg2+"</p>"+
				"</div>"+
				"<div id='alert-btn'>"+
						"<div id='cyberwin_alert-confirm' class='cyberwin_alert-btn_child cwpd-btn-block-info' style='padding-top: 4px;padding-bottom: 4px; padding-left: 5px;padding-right: 5px;'>"+btnok+"</div>"+
						""+
				"</div>"+
			"</div>"+
		"</div>";



		$(content).appendTo($('body'));
		//$('body').append(content);
	//	console.log($(content));
		//console.log($($('body')));
		$('#alert-layer').fadeIn();
		f.alert_confirm(callback);

	};

	f.alert_confirm = function(callback){
		console.log("加载按钮");
			$("#cyberwin_alert-confirm").click(function(){
			$('#alert-layer').fadeOut();
			setTimeout(function(){$('#alert-layer').remove();},500);
			//
			if(callback){
				//2023-8-10 回调
				//open
				if($("#cyberwin_arg_input_0D3EB0CDBBA6A535543A5E7714DA67E6").length>0)
				{
				  //alert('对象存在');
				  callback($("#cyberwin_arg_input_0D3EB0CDBBA6A535543A5E7714DA67E6").val());
				}else{

			      	//alert('对象不存在');
					callback();
				}
				//callback();
			}
		})
		$("#cyberwin_alert-cancel").click(function(){
			//$('#alert-layer').fadeOut();
			//setTimeout(function(){$('#alert-layer').remove();},500);
			$('#alert-layer').fadeOut();
			setTimeout(function(){$('#alert-layer').remove();},500);
		})
	};

	//未来之窗 窗口可移动
	f.cyberwin_move = function(未来之窗_layer_id){

		var _move=false;//移动标记  
		var _x,_y;//鼠标离控件左上角的相对位置  
		$("#"+未来之窗_layer_id).click(function(){  
			//alert("click");//点击（松开后触发）  
			}).mousedown(function(e){  
				
			_move=true;  
			_x=e.pageX-parseInt($("#"+未来之窗_layer_id).css("left"));  
			_y=e.pageY-parseInt($("#"+未来之窗_layer_id).css("top"));  
			$("#"+未来之窗_layer_id).fadeTo(20, 0.5);//点击后开始拖动并透明显示  
		});  
		$("#"+未来之窗_layer_id).mousemove(function(e){  
			if(_move){  
				var x=e.pageX-_x;//移动时根据鼠标位置计算控件左上角的绝对位置  
				var y=e.pageY-_y;  
				$("#"+未来之窗_layer_id).css({top:y,left:x});//控件新位置  
			}  
		}).mouseup(function(){  
		   _move=false;  
   	 	$("#"+未来之窗_layer_id).fadeTo("fast", 1);//松开鼠标后停止移动并恢复成不透明  "fast":规定褪色效果的速度。
  		});  

	};

	f.layer = function(content,cyberwin_obj){
		if(cyberwin_obj){
		}else{
			f.open('提示',content,"关闭","取消");
			return;
		}

		//frame 操作按钮
		var 未来之窗_layer_close_btn=true;
		var 未来之窗_layer_type="confirm";
		var 未来之窗_layer_title="提示";
		var 未来之窗_layer_id="cyberwin_app_artdialog2023";
		var 未来之窗_layer_btncancel="关闭";
		var 未来之窗_layer_can_movedialog = true;

		var 未来之窗_layer_width = "730px";
		var 未来之窗_layer_height = "400px";
		var 未来之窗_layer_body_height = "350px";
		var 未来之窗_layer_titlebar_closewidth = "198px;";
		var 未来之窗_layer_titlebar_captionstyle = "";
		var 未来之窗_layer_mask = false;

		var 未来之窗_layer_mask_style = "";

		var 未来之窗_layer_alignment=5;

		var 未来之窗_layer_alignmentstyle = "";

			//2023-5-31 隐藏标题
		//2023-5-31 透明
		var 未来之窗_layer_hidetitle = false;
		var 未来之窗_layer_alpha = 1;

		//2023-11-8
		//fold
		var  未来之窗_layer_fold = "N";//非折叠
       //2023-11-11
		var 未来之窗_layer_canfold = "N";////canfold 默认不可以收缩 

		//未来之窗回调
		var 未来之窗_layer_callback = function(){ 
			/*不执行*/
        };

		

		if(cyberwin_obj.type){
			未来之窗_layer_type=cyberwin_obj.type;
		}

		if(cyberwin_obj.hideclose){
			未来之窗_layer_close_btn=false;//cyberwin_obj.close;
		}

		if(cyberwin_obj.title){
			未来之窗_layer_title=cyberwin_obj.title;
		}

		if(cyberwin_obj.id){
			未来之窗_layer_id=cyberwin_obj.id;
		}
		if(cyberwin_obj.cancel_caption){
			未来之窗_layer_btncancel=cyberwin_obj.cancel_caption;
		}

        //2023-5-31
		if(cyberwin_obj.hidetitle){
			未来之窗_layer_hidetitle=cyberwin_obj.hidetitle;
		}

		if(cyberwin_obj.alpha){
			未来之窗_layer_alpha=cyberwin_obj.alpha;
		}


		try{
			未来之窗_layer_can_movedialog=cyberwin_obj.move;
		}catch(ex){
		}

		 

		//模糊背景
		try{
			未来之窗_layer_mask=cyberwin_obj.mask;
		}catch(ex){
		}
		

		if(cyberwin_obj.width){
			未来之窗_layer_width=cyberwin_obj.width;
		}

		if(cyberwin_obj.height){
			未来之窗_layer_height=cyberwin_obj.height;
		}

		//2023-8-10 回调
		if(cyberwin_obj.callback){
			未来之窗_layer_callback=cyberwin_obj.callback;
		}

		//未来之窗_layer_fold
		if(cyberwin_obj.fold){
			未来之窗_layer_fold=cyberwin_obj.fold;
		}

		//2023-11-11 未来之窗 不可
		//	var 未来之窗_layer_canfold = "N";////canfold 默认不可以收缩 
		if(cyberwin_obj.canfold){
			未来之窗_layer_canfold=cyberwin_obj.canfold;
		}


		//var 未来之窗_layer_can_movedialog = true;

		//未来之窗_layer_body_height
		var height_layer =未来之窗_layer_height.replace("px","");
		var width_layer =未来之窗_layer_width.replace("px","");

		height_layer = parseFloat(height_layer);
		width_layer = parseFloat(width_layer);

		if(height_layer>50){
			//修正内容
			未来之窗_layer_body_height =parseFloat(height_layer-50)+"px";
		}

		if(width_layer < 300){
			未来之窗_layer_titlebar_closewidth = "60px;text-indent: 5px;";
			未来之窗_layer_titlebar_captionstyle = "width:"+parseFloat(width_layer-60)+"px;";
		}

		if(width_layer < 600){
			未来之窗_layer_titlebar_closewidth = "60px;text-indent: 5px;";
			未来之窗_layer_titlebar_captionstyle = "width:"+parseFloat(width_layer-60)+"px;";
		}

		//background: rgba(0,0,0,.5);
		if($("#"+未来之窗_layer_id).length>0)
		{
		  //alert('对象存在');
		  "防止多次点击"
		  return ;
		}else{
		 
		  //alert('对象不存在');
		}

		//未来之窗_layer_mask_style
		if(未来之窗_layer_mask){
			//alert("ma");
			//未来之窗_layer_mask_style="";//"display:block;width:100vh;height:100vh;background: rgba(0,0,0,.5);z-index: 999;position: fixed; top: 0;left: 0;";
		}


		if(cyberwin_obj.align){
			未来之窗_layer_alignment=cyberwin_obj.align;
		}

		



		
        //2023-8-17
		if(未来之窗_layer_type == "input"){
			var 新内容=content+`<input type="txt" class="input" id="cyberwin_arg_input_0D3EB0CDBBA6A535543A5E7714DA67E6" name="cyberwin_arg_input_0D3EB0CDBBA6A535543A5E7714DA67E6"   tips="" >`;
			f.open(未来之窗_layer_title,新内容,"确定","取消",未来之窗_layer_callback);
			return;
		} 


		if(未来之窗_layer_type == "notice"){
			f.ok(未来之窗_layer_title,content,"确定",未来之窗_layer_callback);
			return;
		} 

		if(未来之窗_layer_type == "confirm"){
			f.open(未来之窗_layer_title,content,"确定","取消",未来之窗_layer_callback);
			return;
		}

		//2023-8-11 进程对话
		if(未来之窗_layer_type == "progress"){

			let 未来之窗任务服务名称 ="cyberwin_global_intent_applocal_Progress";

			window.localStorage.setItem(未来之窗任务服务名称,"");//清空
            let 未来之窗任务服务 = JSON.stringify(content);
			window.localStorage.setItem(未来之窗任务服务名称,未来之窗任务服务);

			//开始弹窗
			width_layer = 350;
			height_layer = 350;//强制窗口大小
			//重新定义内容
			//更目录开始
			let 进度窗口="./wlzc_runtime/dialog/applocal_Progress.html";
			//2024-2-13 content = `<iframe width="500" height="450" frameborder="0" scrolling="auto" hspace="0" src="`+进度窗口+`" style="border-radius: 20px;"></iframe>`;
            content = `<iframe id='`+未来之窗_layer_id+`_frame' name='`+未来之窗_layer_id+`_frame' width="500" height="450" frameborder="0" scrolling="auto" hspace="0" src="`+进度窗口+`" style="border-radius: 20px;"></iframe>`;


   
   //window.localStorage.setItem(未来之窗任务服务名称,未来之窗任务服务);
		}


		//2023-8-8加入url 
		if(未来之窗_layer_type == "url"){
			//f.open(未来之窗_layer_title,content,"关闭","取消");
			//return;
			//var tpl_模板 = '<iframe width="1250" height="550" frameborder="0" scrolling="no" hspace="0" src="https://i.tianqi.com/?c=code&a=getcode&id=55&icon=1"></iframe>';
		    var url窗口宽度 = width_layer-50;
		    var url窗口高 = height_layer -55;//窗口标题缩减
			 if(未来之窗_layer_hidetitle==true){
				 url窗口高 = height_layer -20 ;
			 }
			 //2024-6-14
			 url窗口宽度 = width_layer-10;
		  
		   //   content = `<iframe width="`+url窗口宽度+`" height="`+url窗口高+`" frameborder="0" scrolling="auto" hspace="0" src="`+content+`" style="border-radius: 20px;"></iframe>`;
		
		    //2024-2-3
			  content = `<iframe id='`+未来之窗_layer_id+`_frame' name='`+未来之窗_layer_id+`_frame' width="`+url窗口宽度+`" height="`+url窗口高+`" frameborder="0" scrolling="auto" hspace="0" src="`+content+`" style="border-radius: 20px;"></iframe>`;
		
		}

		//未来之窗2023-8-9等待技术
		if(未来之窗_layer_type == "load"){
			content = 未来之窗加载html;
			//强制200
			width_layer = 200;
			height_layer = 200;
		}



		switch(未来之窗_layer_alignment) {
			 case 1://坎 底部中央
			{
				 
				var right_ =parseFloat(CyberWin_Dialog_screen_width-width_layer)/2;
				未来之窗_layer_alignmentstyle="top:auto;bottom:0px;right:"+right_+"px;";
			}
				break;
			 case 2:
			{
				 //右上角
				 未来之窗_layer_alignmentstyle="top: 0px;right: 0px;";
			}
				break;
				case 3:
			{
					//左边中间
					var hight_ =parseFloat(CyberWin_Dialog_screen_height - height_layer)/2;
					未来之窗_layer_alignmentstyle="top: "+hight_+"px;left: 0px;";
			}
				break;
				case 4:
			{
					//左上角
					未来之窗_layer_alignmentstyle="top: 0 px;left: 0px;";
			}
				break;
				case 5:
			{
					var right_ =parseFloat(CyberWin_Dialog_screen_width-width_layer)/2;

					var hight_ =parseFloat(CyberWin_Dialog_screen_height - height_layer)/2;

					//z增加坐标未来之窗_layer_alignmentstyle="right: "+right_+"px;";
					未来之窗_layer_alignmentstyle="top: "+hight_+"px;right: "+right_+"px;";
					//CyberWin_Dialog_screen_width
					//
			}
				break;
				case 6:
			{
					//右下角
					 未来之窗_layer_alignmentstyle="bottom: 0 px;right: 0px;";
			}
				break;
				case 7:
			{
					//2027-5-20 中间右侧
					console.log("CyberWin_Dialog_screen_height="+CyberWin_Dialog_screen_height);
					console.log("height_layer="+height_layer);
					var hight_ =parseFloat(CyberWin_Dialog_screen_height - height_layer)/2;
					未来之窗_layer_alignmentstyle="top: "+hight_+"px;right: 0px;";

			}
				break;
				case 8:
			{
					未来之窗_layer_alignmentstyle="top:auto;bottom:0px;right: auto;";
			}
				break;
			case 9://离 2023-8-8 顶部部中央
			{
				var right_ =parseFloat(CyberWin_Dialog_screen_width-width_layer)/2;
				未来之窗_layer_alignmentstyle="top:0px; right: "+right_+"px;";

			}
				break;
			//复合参数
				case 59: //中宫偏上离
			{
				 //2023-8-9 未来之窗 
				   var right_ =parseFloat(CyberWin_Dialog_screen_width-width_layer)/2;

					var hight_ =parseFloat(CyberWin_Dialog_screen_height - height_layer)/2;



					if(hight_ >40){
						hight_ = hight_ -35 ;//减少15个坐标
					}

					//z增加坐标未来之窗_layer_alignmentstyle="right: "+right_+"px;";
					未来之窗_layer_alignmentstyle="top: "+hight_+"px;right: "+right_+"px;";
					//CyberWin_Dialog_screen_width
					//CyberWin_Dialog_screen_width
					//
			}
				break;
			 default:
			{

			} 
		}

		var wlzc_tool_bar_close_html = "<div class=\"return\" onClick=\"cyberwin_closeAndDeldlg('"+未来之窗_layer_id + "');\" style=\"width:" + 未来之窗_layer_titlebar_closewidth + ";\">"+未来之窗_layer_btncancel+"</div>";
		if(未来之窗_layer_close_btn ==  false){
			//alert("禁止");
			wlzc_tool_bar_close_html="";
		}else{
			//alert(未来之窗_layer_close_btn);
		}


		//2023-5-31
			var 未来之窗元素_标题 = `<div class="set_top"><div class="set" style="cursor:move;`+未来之窗_layer_titlebar_captionstyle+`" onClick="wlzc_dialog_swithbody('`+未来之窗_layer_id+`','`+未来之窗_layer_canfold+`');" >`+未来之窗_layer_title+"</div>"
		    +wlzc_tool_bar_close_html
				+"</div>";

		var 未来之窗_div_透明 = "background:rgba(243,245,247,"+未来之窗_layer_alpha+");";

	   if(未来之窗_layer_hidetitle==true){
		   未来之窗元素_标题 ="";//隐藏
		   //还原内容高度
		   未来之窗_layer_body_height =height_layer+"px" ;//parseFloat(height_layer - 50)+"px";
	   }


/*
		var content_html_mask_移动bug = `<cyberdiv class="cyberwin_dialog_mask" id="`+未来之窗_layer_id+`" style="`+未来之窗_layer_mask_style+`"><div class="cyberwin_dialog_localapp_fix " style="dispaly:none1;width:`+未来之窗_layer_width+`;height:`+未来之窗_layer_height+`;min-height:`+未来之窗_layer_height+`;`+未来之窗_layer_alignmentstyle+`">
		<div class="set_top">
			<div class="set" style="cursor:move;`+未来之窗_layer_titlebar_captionstyle+`">`+未来之窗_layer_title+"</div>"
		    +wlzc_tool_bar_close_html
				+`</div>
		<div class="set_end clr" style="height:`+未来之窗_layer_body_height+`;overflow-y:scroll;">`+content+
			"</div>"+
		"</div></cyberdiv>";

		var content_html_mask_202301 = `<cyberdiv class="cyberwin_dialog_mask" id="`+未来之窗_layer_id+`" style="`+未来之窗_layer_mask_style+`"><div class="cyberwin_dialog_localapp_fix " id="`+未来之窗_layer_id+`_maskmove" style="dispaly:none1;width:`+未来之窗_layer_width+`;height:`+未来之窗_layer_height+`;min-height:`+未来之窗_layer_height+`;`+未来之窗_layer_alignmentstyle+`">
		 <div class="set_top" >
			<div class="set" style="cursor:move;`+未来之窗_layer_titlebar_captionstyle+`">`+未来之窗_layer_title+"</div>"
		    +wlzc_tool_bar_close_html
				+`</div>
		<div class="set_end clr" style="height:`+未来之窗_layer_body_height+`;overflow-y:scroll;">`+content+
			"</div>"+
		"</div></cyberdiv>";
		*/

		//2023-5-31+

		var content_html_mask = '<cyberdiv class="cyberwin_dialog_mask" id="'+未来之窗_layer_id+`" style="`+未来之窗_layer_mask_style+`"><div class="cyberwin_dialog_localapp_fix " id="`+未来之窗_layer_id+`_maskmove" style="dispaly:none1;width:`+未来之窗_layer_width+`;height:`+未来之窗_layer_height+`;min-height:`+未来之窗_layer_height+`;`+未来之窗_layer_alignmentstyle+未来之窗_div_透明+`">
		`+未来之窗元素_标题+`
		<div class="set_end clr"  id="`+未来之窗_layer_id+`_body" style="height:`+未来之窗_layer_body_height+`;overflow-y:auto;">`+content+
			"</div>"+
		"</div></cyberdiv>";



		var content_html_nomast_202301 = ` <div class="cyberwin_dialog_localapp_fix " id="`+未来之窗_layer_id+`" style="dispaly:none1;width:`+未来之窗_layer_width+`;height:`+未来之窗_layer_height+`;min-height:`+未来之窗_layer_height+`;`+未来之窗_layer_alignmentstyle+`">
		<div class="set_top">
			<div class="set" style="cursor:move;`+未来之窗_layer_titlebar_captionstyle+`">`+未来之窗_layer_title+"</div>"
		+wlzc_tool_bar_close_html
			+`</div>
		    <div class="set_end clr" style="height:`+未来之窗_layer_body_height+`;overflow-y:scroll;">`+content+
			"</div>"+
		"</div> ";

			var content_html_nomast = ' <div class="cyberwin_dialog_localapp_fix " id="'+未来之窗_layer_id+`" style="dispaly:none1;width:`+未来之窗_layer_width+`;height:`+未来之窗_layer_height+`;min-height:`+未来之窗_layer_height+`;`+未来之窗_layer_alignmentstyle+未来之窗_div_透明+`">
		`+未来之窗元素_标题+`
		    <div class="set_end clr" id="`+未来之窗_layer_id+`_body" style="height:`+未来之窗_layer_body_height+`;overflow-y:auto;">`+content+
			"</div>"+
		"</div> ";


		if(未来之窗_layer_mask){
			$(content_html_mask).appendTo($('body'));
		}else{
			$(content_html_nomast).appendTo($('body'));
		}

		

		
	 
		$('#'+未来之窗_layer_id).fadeIn();
		//f.alert_confirm();
		if(未来之窗_layer_can_movedialog == true){
			//有个bug 带遮罩不行
			// f.cyberwin_move(未来之窗_layer_id);
		  
		   if(未来之窗_layer_mask){
			   //2023-8-8
			    f.cyberwin_move(未来之窗_layer_id+"_maskmove");
		   }else{
			    f.cyberwin_move(未来之窗_layer_id);
		   }

		   //_maskmove
		}

		//document.getElementById ("div").style.border="thick solid #0000FF"; 
		//未来之窗_layer_id
		if(未来之窗_layer_type == "load"){
			//加载动画删除边框
			
			if(未来之窗_layer_mask){
			   //2023-8-8
			   
				document.getElementById(未来之窗_layer_id+"_maskmove").style.border="0 solid #000000"; 
		   }else{
			   document.getElementById(未来之窗_layer_id).style.border="0 solid #000000"; 
		   }

		}

		if(未来之窗_layer_fold == "Y"){
			 $("#"+未来之窗_layer_id).addClass("cyberwin_dialog_hide_body_20230811");
		     $("#"+未来之窗_layer_id+"_body").hide();

		}








	};

    f.v = "2023.1",
    "function" == typeof define ? define(function() {
        return f
    }) : "undefined" != typeof exports ? module.exports = f: window.CyberWin_Dialog = f
} ();

//document.write(cyberwin_alert_style);
//2023-10-16
//CyberWin_Dialog.init();
//var CyberWin_Dialog_screen_width = document.body.clientWidth;
//clientHeight 2023-5-20 屏幕高度
//var CyberWin_Dialog_screen_height = window.screen.availHeight;//document.body.clientHeight;
//alert(window.screen.width);
//alert(window.screen.height);
var CyberWin_Dialog_screen_width = 1000;//document.body.clientWidth;
//clientHeight 2023-5-20 屏幕高度
    CyberWin_Dialog_screen_width=1366;
var CyberWin_Dialog_screen_height = 500;//window.screen.availHeight;//document.body.clientHeight;
  CyberWin_Dialog_screen_width = window.screen.width;
  CyberWin_Dialog_screen_height = window.screen.height;//document.body.clientHeight;

		try{
			CyberWin_Dialog_screen_width=window.screen.width;
			CyberWin_Dialog_screen_height=window.screen.height;
		}catch(ex){
		}
 CyberWin_Dialog.init();
 /*
window.onload = function(){
    //2023-10-15 修正文档未加载
     console.log("未来之窗加完成");
    CyberWin_Dialog_screen_width = document.body.clientWidth;
    CyberWin_Dialog_screen_height = window.screen.availHeight;//document.body.clientHeight;
   // CyberWin_Dialog.init();
};
*/


  function cyberwin_closeAndDeldlg(obj_id){
		$("#"+obj_id).hide();
		$("#"+obj_id).remove()

 }
 //cyberwin_closeAndDeldlg

 //未来之窗 隐藏
 //2023-8-11 增加内容隐藏
 // function  wlzc_dialog_swithbody(obj_id){
	 //2023-11-11 默认关闭收缩
  function  wlzc_dialog_swithbody(obj_id , 是否可收缩){

	  if(是否可收缩 == "N"){
		  return "忽略切换";
	  }
	  //未来之窗_layer_canfold
	  //主体 obj_id+_body
	  var 已经隐藏 = $("#"+obj_id).hasClass("cyberwin_dialog_hide_body_20230811");
	 // $("#"+obj_id).hide();
	  //cyberwin_dialog_hide_body_20230811
	  if(已经隐藏 == true){
		   $("#"+obj_id).removeClass("cyberwin_dialog_hide_body_20230811");
		   $("#"+obj_id+"_body").show();
	  }else{
		   $("#"+obj_id).addClass("cyberwin_dialog_hide_body_20230811");
		   $("#"+obj_id+"_body").hide();
	  }
  }