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
 
; !
function() {
    
    var cyberwin_dialog_style=` <style>
		 .cyberwin_dialog_mask{
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
	</style>`;

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
	f.open = function(arg1,arg2,btnok,btncancel){
			var content = "<div id='alert-layer'>"+
			"<div id='alert-container'>"+
				"<div id='alert-text-container'>"+
					"<p id='cyberwin_alert-title'>"+arg1+"——玄武芯辰</p>"+
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
		f.alert_confirm();

	};

	f.alert_confirm = function(){
		console.log("加载按钮");
			$("#cyberwin_alert-confirm").click(function(){
			$('#alert-layer').fadeOut();
			setTimeout(function(){$('#alert-layer').remove();},500);
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

		

		if(cyberwin_obj.type){
			未来之窗_layer_type=cyberwin_obj.type;
		}

		if(cyberwin_obj.close){
			未来之窗_layer_close_btn=cyberwin_obj.close;
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

		



		



		 

		if(未来之窗_layer_type == "confirm"){
			f.open(未来之窗_layer_title,content,"关闭","取消");
			return;
		}


		switch(未来之窗_layer_alignment) {
			 case 1://坎
			{
				未来之窗_layer_alignmentstyle="";
			}
				break;
			 case 2:
			{
			}
				break;
				case 3:
			{
			}
				break;
				case 4:
			{
			}
				break;
				case 5:
			{
					var right_ =parseFloat(CyberWin_Dialog_screen_width-width_layer)/2;
					未来之窗_layer_alignmentstyle="right: "+right_+"px;";
					//CyberWin_Dialog_screen_width
					//
			}
				break;
				case 6:
			{
			}
				break;
				case 7:
			{
			}
				break;
				case 8:
			{
					未来之窗_layer_alignmentstyle="top:auto;bottom:0px;right: auto;";
			}
				break;
				case 9:
			{
			}
				break;
			 default:
			{

			} 
		}

		var content_html_mask = `<cyberdiv class="cyberwin_dialog_mask" id="`+未来之窗_layer_id+`" style="`+未来之窗_layer_mask_style+`"><div class="cyberwin_dialog_localapp_fix " style="dispaly:none1;width:`+未来之窗_layer_width+`;height:`+未来之窗_layer_height+`;min-height:`+未来之窗_layer_height+`;`+未来之窗_layer_alignmentstyle+`">
		<div class="set_top">
			<div class="set" style="cursor:move;`+未来之窗_layer_titlebar_captionstyle+`">`+未来之窗_layer_title+`</div>
			<div class="return" onClick="cyberwin_closedlg('`+未来之窗_layer_id+`');" style="width:`+未来之窗_layer_titlebar_closewidth+`;">`+未来之窗_layer_btncancel+`</div>
		</div>
		<div class="set_end clr" style="height:`+未来之窗_layer_body_height+`;overflow-y:scroll;">`+content+
			"</div>"+
		"</div></cyberdiv>";

		var content_html_nomast = ` <div class="cyberwin_dialog_localapp_fix " id="`+未来之窗_layer_id+`" style="dispaly:none1;width:`+未来之窗_layer_width+`;height:`+未来之窗_layer_height+`;min-height:`+未来之窗_layer_height+`;`+未来之窗_layer_alignmentstyle+`">
		<div class="set_top">
			<div class="set" style="cursor:move;`+未来之窗_layer_titlebar_captionstyle+`">`+未来之窗_layer_title+`</div>
			<div class="return" onClick="cyberwin_closedlg('`+未来之窗_layer_id+`');" style="width:`+未来之窗_layer_titlebar_closewidth+`;">`+未来之窗_layer_btncancel+`</div>
		</div>
		<div class="set_end clr" style="height:`+未来之窗_layer_body_height+`;overflow-y:scroll;">`+content+
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
		   f.cyberwin_move(未来之窗_layer_id);
		}







	};

    f.v = "2023.1",
    "function" == typeof define ? define(function() {
        return f
    }) : "undefined" != typeof exports ? module.exports = f: window.CyberWin_Dialog = f
} ();

//document.write(cyberwin_alert_style);
CyberWin_Dialog.init();
var CyberWin_Dialog_screen_width = document.body.clientWidth;

  function cyberwin_closedlg(obj_id){
		$("#"+obj_id).hide();
		$("#"+obj_id).remove()

 }