/*
未来之窗本地化技术
2020-3-26 
雪莲计划V3-6089
本地化控制技术
半离线模式：
本地化项目
1.页面回退
2.产品多种类持久化，如果单个产品更新需要刷新缓存
3.产品每次登陆下载一次
4.结账优化
5.本地数据库
6.电脑死机，重启，未结算账单不会丢失
*/
//新单UI操作


var CyberWin_Systerm_ApplictionClientControl=function(){
	this.homever=0;
    this.client_uuid=0;
    this.systemctlping="https://51.onelink.ynwlzc.cn/o2o/index.php/ApplicationclientAPI/systemctlping";
    //this.salary=111;
	this.initialization= function(){

		 console.log("初始化");

		 this.client_uuid=CyberWin_JsStandardPlug.getDeviceUUid();

		 //this.client_uuid='418F96E084176580a4548779b6f629b0ab3d59c';

         this.homever= CyberWin_JsStandardPlug.cwpd_system_get("APP","systemctl_version","20225578-2019");
	  // this.homever= 2020043;
	}

	this.clientActivate=function(){
		//alert( this.client_uuid);
		//cyberwin_cus_yckjqr
		//cyberwin_xcx_ycyrzhgl_qr
		var acturl="https://51.onelink.ynwlzc.cn/o2o/cyberwin_cus_yckjqr/index.php/ApplicationclientAPI/yckjsaactive?client_uuid="+this.client_uuid;

		var url="https://51.onelink.ynwlzc.cn//cyber_lib/qr/cyber_qrg.php?url="+encodeURIComponent(acturl);

		$("#active_qr").attr("src",url);//

	}

	this.clientActivateWLZC=function(){
		//alert( this.client_uuid);
		//cyberwin_cus_yckjqr
		//cyberwin_xcx_ycyrzhgl_qr
		var acturl="https://51.onelink.ynwlzc.cn/o2o/cyberwin_xcxqr/index.php/ApplicationclientAPI/o2owlzcactive?client_uuid="+this.client_uuid;

    	var url="https://51.onelink.ynwlzc.cn//cyber_lib/qr/cyber_qrg.php?url="+encodeURIComponent(acturl);

	    $("#active_qr").attr("src",url);//

	}

	this.clientRegOK  = function (){
		var url="";//https://51.onelink.ynwlzc.cn//cyber_lib/qr/cyber_qrg.php?url="+encodeURIComponent(acturl);
		//$("#active_qr").attr("src",url);//
		$("#cwpd_store_name_act").html("设备配对成功，可以通过手机控制-2");
	}

	this.getUUID = function (){
		return  this.client_uuid;
	}


	this.start = function(){
		  layer.msg("链接服务器.......");
		  var conn_c=1;
		  var connerror=0;
     // alert( "ff="+this.client_uuid);
	  var uuid_i=this.client_uuid;
	  var cwpd_gateway=this.systemctlping;
	  var cwpd_homever=this.homever;
	//  $("#cwpd_store_name_act").html("设备配对成功，可以通过手机控制");
		setInterval(function(){
			conn_c=conn_c+1;
			 layer.msg("链接服务器.次数"+conn_c+"......");
			
			//cyber_openhome()

			// $("#cwpd_store_name_act").html("设备配对成功，可以通过手机控制"+cwpd_gateway);
			
		//$.post("https://51.onelink.ynwlzc.cn/o2o/index.php/ApplicationclientAPI/systemctlping");
		 $.post(cwpd_gateway,{suggest:"11",client_uuid:uuid_i},function(result){
			 // $("span").html(result);
			   layer.msg("链接服务器成功!.......");
			   // this.clientActivate();
				 var home_url_sys=CyberWin_JsStandardPlug.cwpd_system_get("APP","DefaultHome","20225578-2019");
				    window.location.href=home_url_sys;

			    if(connerror==1){
				     connerror=0;
				      this.clientActivate();

               //  CyberWin_JsStandardPlug.cwpd_system_set("APP","DefaultHome",""+homeurl,"20225578-2019");
			       //var home_url_sys=CyberWin_JsStandardPlug.cwpd_system_get("APP","DefaultHome","20225578-2019");
				  //  window.location.href=home_url_sys;

				}


			 var log= $("#runcwpdlog").val();
			 var s=JSON.stringify(result);
			 $("#runcwpdlog").val(log+s);

			//alert("11");
			 console.log(result);
			//alert(result.active);
			cwpd_sysytemctl_command(result);
		//	alert("10="+result.active);
			//active
			
			if("1"==result.active){
				$("#cwpd_store_name").html(""+result.store_name);
				$("#cwpd_store_name_act").html("设备配对成功，可以通过手机控制 v="+cwpd_homever);
				//cwpd_store_name_act
				//2020-4-2 激活状态检测设备信息
				if(cwpd_homever!=result.homever){
				    $("#runcwpdlog2").val("版本不一致");
					cwpd_sysytemctl_changepage(result);
				}else{
					$("#runcwpdlog2").val("版本一致");
				}
			}else{
				$("#cwpd_store_name_act").html("设备配连接服务器，请激活"+uuid_i);
			}

			//cwpd_store_name
		   }
		   ,'json').error(function() {
			   layer.msg("无网络"+conn_c+"......");
			   connerror=1;
			   this.clientActivate();

			   //alert("error");
			  }
			   );//json
	},1000);

	}


	 function cwpd_sysytemctl_changepage (svrobj){
	  //alert("11"+svrobj.homever);
	  CyberWin_JsStandardPlug.cwpd_system_set("APP","systemctl_version",""+svrobj.homever,"20225578-2019");
	  CyberWin_JsStandardPlug.cwpd_system_set("APP","DefaultHome",""+svrobj.url,"20225578-2019");
	  homever= CyberWin_JsStandardPlug.cwpd_system_get("APP","systemctl_version","20225578-2019");
	  window.location.href=svrobj.url;
 }

//cwpd_systemgetmac

  function cwpd_sysytemctl_command(svrobj){

	 //alert("2222"+svrobj.command.command_type);
	  //alert("11"+svrobj.homever);
	  switch(svrobj.command.command_type){
		  case "command":{
			  eval(svrobj.command.command);
		  }
		  break;
		   case "display":{
			 // eval(svrobj.command.command);
			  window.location.href=svrobj.command.command;

		  }
		  break;

		    case "alert":{
			  alert(svrobj.command.command);
		  }
		  break;

		   case "sethomeanddisplay":{
			 // alert(svrobj.command.command);
			  var homeurl=svrobj.command.command;
			 // CyberWin_JsStandardPlug.cwpd_system_set("APP","systemctl_version",""+svrobj.homever,"20225578-2019");
	          CyberWin_JsStandardPlug.cwpd_system_set("APP","DefaultHome",""+homeurl,"20225578-2019");
	        // homever= CyberWin_JsStandardPlug.cwpd_system_get("APP","systemctl_version","20225578-2019");
		  }
		  break;

		   case "message":{
			 // alert(svrobj.command.command);
			 layer.msg(svrobj.command.command);

		  }
		  break;
		  case "yckj_cw_message":{
			 // alert(svrobj.command.command);
			 $("#cwpd_yckj_scrool_message").text(svrobj.command.command);

		  }
		  break;
		  //政策 检查
		  //yckj_import_message
		  //yckj_zexx_message
		  case "yckj_zexx_message":{
			 // alert(svrobj.command.command);
			 //yckj_import_message
			 $("#yckj_import_message").css('display','block'); 
			 $("#yckj_import_message_text").text(svrobj.command.command);

		  }
		  break;

		   case "yckj_zexx_message":{
			 // alert(svrobj.command.command);
			 //yckj_import_message
			 $("#yckj_import_message").css('display','block'); 
			 $("#yckj_import_message_text").text(svrobj.command.command);

		  }
		  break;

		  case "yckj_close_import_message":{
			 // alert(svrobj.command.command);
			 //yckj_import_message
			 $("#yckj_import_message").css('display','none'); 
			// $("#yckj_import_message_text").text(svrobj.command.command);

		  }
		  break;





		  //cwpd_yckj_scrool_message
		   case "popuimg":{
			 //// alert(svrobj.command.command);
			  
			layer.open({
				title:svrobj.command.command_title,
			  type: 1,
			  skin: 'layui-layer-rim', //加上边框
			  area: ['800px', '600px'], //宽高
			  content: "<img src='"+svrobj.command.command+"'>"
			});
		  }
		  break;

		  case "popuweb":{
			  //alert(svrobj.command.command);
			  layer.open({
				title:svrobj.command.command_title,
			  type: 1,
			  skin: 'layui-layer-rim', //加上边框
			  area: ['800px', '600px'], //宽高
			  content: "<iframe src='"+svrobj.command.command+"'>"
			});
		  }
		  break;

		   case "notice":{
			//  alert(svrobj.command.command);
			layer.open({
				title:svrobj.command.command_title,
			  type: 1,
			  skin: 'layui-layer-rim', //加上边框
			  area: ['800px', '600px'], //宽高
			  content: svrobj.command.command
			});
		  }
		  break;

		  case "yckj_videofullscreen":{
			 // var testh='<iframe src="'+svrobj.command.param1+'" border="0"  frameborder="0" style="width:100%;height:100%" border="0"   frameborder="0" style="width:100%;height:1000px"  scrolling="no">';
 //var testh='<iframe src="http://51.onelink.ynwlzc.cn/o2o/dev_cus/yckj/ckplayer2/sample/rtmpfull.php" border="0"  frameborder="0" style="width:100%;height:100%" border="0"   frameborder="0" style="width:100%;height:1000px"  scrolling="no">';
//rtmpmp4.php
var testh='<iframe src="http://51.onelink.ynwlzc.cn/o2o/dev_cus/yckj/ckplayer2/sample/rtmp.php" border="0"  frameborder="0" style="width:100%;height:100%" border="0"   frameborder="0" style="width:100%;height:1000px"  scrolling="no">';

			  var videohtml='';
			  $("#cwpdvideofull").css('display','block'); 
			  $("#cwpdvideofull").html(testh);
			  
				  $("#cwpdvideo_1").html("");
				   $("#cwpdvideo_2").html("");
		  }
		  break;

		   case "yckj_videofullscreen_close":{
			  
			  $("#cwpdvideofull").css('display','none'); 
			  $("#cwpdvideofull").html("");
			   
			   window.location.reload(true);
		  }
		  break;

		    case "yckj_videofullscreen_vx":{
			 
                 var testh='<iframe src="http://51.onelink.ynwlzc.cn/o2o/dev_cus/yckj/ckplayer2/sample/rtmp.php" border="0"  frameborder="0" style="width:100%;height:100%" border="0"   frameborder="0" style="width:100%;height:1000px"  scrolling="no">';

			  var videohtml='';
			  $("#cwpdvideofull").css('display','block'); 
			  $("#cwpdvideofull").html(testh);
			  
				  $("#cwpdvideo_1").html("");
				   $("#cwpdvideo_2").html("");
				   CyberWin_JsStandardPlug.cwpdPlayMediaPlug('http://shianqujing.cn/v/siss.mp4','居中直播','1','3','0.3','0.4','0','0','1','0','0');
		  }
		  break;

		   case "yckj_videofullscreen_close_vx":{
			   //alert(111);
			   CyberWin_JsStandardPlug.cyber_sendKeyBack();
			    CyberWin_JsStandardPlug.cyber_sendKeyBack();
				 CyberWin_JsStandardPlug.cyber_sendKeyBack();
			  
			   //window.location.reload(true);
		  }
		  break;
		  //restartapp
		  //cyber_sendKeyBack

		   case "refresh":{
			//  alert(svrobj.command.command);
			  window.location.reload(true);
		  }
		  break;

		  default:{
		  }
		  break;
	  }
	  //window.location.href=svrobj.url;
 }




}


//employee.prototype.salary=null;
//bill.salary=20000;


//var homever=0;
// var client_uuid;
 //var systemctlping="https://51.onelink.ynwlzc.cn/o2o/index.php/ApplicationclientAPI/systemctlping"
/*

function initialization(){
    client_uuid=CyberWin_JsStandardPlug.getDeviceUUid();

	homever= CyberWin_JsStandardPlug.cwpd_system_get("APP","systemctl_version","20225578-2019");
	              //  alert("当前版本：:"+homever);

	//alert(client_uuid);

}
function clientActivate(){

	var acturl="https://51.onelink.ynwlzc.cn/o2o/cyberwin_xcx_ycyrzhgl_qr/index.php/ApplicationclientAPI/yckjsaactive?client_uuid="+client_uuid;

	var url="https://51.onelink.ynwlzc.cn//cyber_lib/qr/cyber_qrg.php?url="+encodeURIComponent(acturl);

	$("#active_qr").attr("src",url);//

}
//window.setTimeout(hello,5000);
function start(){
//window.setTimeout(cloudClientCtl,5000);


	setInterval(function(){
		//$.post("https://51.onelink.ynwlzc.cn/o2o/index.php/ApplicationclientAPI/systemctlping");
		 $.post(systemctlping,{suggest:"11",client_uuid:client_uuid},function(result){
			 // $("span").html(result);
			 var log= $("#runcwpdlog").val();
			 var s=JSON.stringify(result);
			 $("#runcwpdlog").val(log+s);
			// console.log(result);
			cwpd_sysytemctl_command(result);
			
			//active
			if("1"==result.active){
				$("#cwpd_store_name").html("商家："+result.store_name);
				$("#cwpd_store_name_act").html("设备配对成功，可以通过手机控制");
				//cwpd_store_name_act
				//2020-4-2 激活状态检测设备信息
				if(homever!=result.homever){
				$("#runcwpdlog2").val("版本不一致");
					cwpd_sysytemctl_changepage(result);
				}else{
					$("#runcwpdlog2").val("版本一致");
				}
			}

			//cwpd_store_name
		   },'json');//json
	},1000);
}

function cwpd_sysytemctl_changepage(svrobj){
	  //alert("11"+svrobj.homever);
	  CyberWin_JsStandardPlug.cwpd_system_set("APP","systemctl_version",""+svrobj.homever,"20225578-2019");
	  CyberWin_JsStandardPlug.cwpd_system_set("APP","DefaultHome",""+svrobj.url,"20225578-2019");
	  homever= CyberWin_JsStandardPlug.cwpd_system_get("APP","systemctl_version","20225578-2019");
	  window.location.href=svrobj.url;
 }

//cwpd_systemgetmac

function cwpd_sysytemctl_command(svrobj){
	  //alert("11"+svrobj.homever);
	  switch(svrobj.command.command_type){
		  case "command":{
			  eval(svrobj.command.command);
		  }
		  break;
		   case "display":{
			 // eval(svrobj.command.command);
			  window.location.href=svrobj.command.command;

		  }
		  break;

		    case "alert":{
			  alert(svrobj.command.command);
		  }
		  break;

		   case "sethomeanddisplay":{
			 // alert(svrobj.command.command);
			  var homeurl=svrobj.command.command;
			 // CyberWin_JsStandardPlug.cwpd_system_set("APP","systemctl_version",""+svrobj.homever,"20225578-2019");
	          CyberWin_JsStandardPlug.cwpd_system_set("APP","DefaultHome",""+homeurl,"20225578-2019");
	        // homever= CyberWin_JsStandardPlug.cwpd_system_get("APP","systemctl_version","20225578-2019");
		  }
		  break;

		   case "message":{
			 // alert(svrobj.command.command);
			 layer.msg(svrobj.command.command);

		  }
		  break;
		   case "popuimg":{
			 //// alert(svrobj.command.command);
			  
			layer.open({
				title:svrobj.command.command_title,
			  type: 1,
			  skin: 'layui-layer-rim', //加上边框
			  area: ['800px', '600px'], //宽高
			  content: "<img src='"+svrobj.command.command+"'>"
			});
		  }
		  break;

		  case "popuweb":{
			  //alert(svrobj.command.command);
			  layer.open({
				title:svrobj.command.command_title,
			  type: 1,
			  skin: 'layui-layer-rim', //加上边框
			  area: ['800px', '600px'], //宽高
			  content: "<iframe src='"+svrobj.command.command+"'>"
			});
		  }
		  break;

		   case "notice":{
			//  alert(svrobj.command.command);
			layer.open({
				title:svrobj.command.command_title,
			  type: 1,
			  skin: 'layui-layer-rim', //加上边框
			  area: ['800px', '600px'], //宽高
			  content: svrobj.command.command
			});
		  }
		  break;

		   case "refresh":{
			//  alert(svrobj.command.command);
			  window.location.reload(true);
		  }
		  break;
	  }
	  //window.location.href=svrobj.url;
 }
*/
//

