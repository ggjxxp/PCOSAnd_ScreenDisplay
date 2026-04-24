function locker_push_records(user_action,client_date,lock_name,lock_board,lock_no,user_openid,user_phone,verify_type,verify_code,user_sub_openid,user_name){
  
   locker_push_records_inner(mer_id,store_id,device_id,device_name,user_action,client_date,lock_name,lock_board,lock_no,user_openid,user_phone,verify_type,verify_code,user_sub_openid,user_name);
  // cyberwin_setLockerStatus();//读取状态
}

function locker_push_records_inner(mer_id,store_id,device_id,device_name,user_action,client_date,lock_name,lock_board,lock_no,user_openid,user_phone,verify_type,verify_code,user_sub_openid,user_name){
	var api=server_root+'/TSSLSDF/'+mer_id+'?action=pushrecord';
     //alert(api);
		console.log(api);

		   var cyberwin_app_data={
		'mer_id':mer_id,
		'store_id':store_id,
		'device_id':device_id,
		'device_name':device_name,
			'user_action':user_action,
			'client_date':client_date,
			'lock_name':lock_name,
			'lock_board':lock_board,
			'lock_no':lock_no,
			'user_openid':user_openid,
			'user_phone':user_phone,
			'verify_type':verify_type,
			'client_sn':client_sn,
			'verify_code':verify_code,
			'user_sub_openid':user_sub_openid,
			'user_name':user_name,
		 



		};

		   var cyberwin_app_data_str=JSON.stringify(cyberwin_app_data);
		   var cyberwinapp_aj= Cyber_JsPrinterStandard.cyberwinapp_aj(api,"POST",cyberwin_app_data_str);
		   //服务器指令
			var timestamp1 = (new Date()).valueOf();

			//$("#debugpush").text(cyberwinapp_aj);

		/* 

	$.ajax({
		cache:false,  
		url:api, 
		type : "post",
		dataType : 'json',
		data:{
		'mer_id':mer_id,
		'store_id':store_id,
		'device_id':device_id,
		'device_name':device_name,
			'user_action':user_action,
			'client_date':client_date,
			'lock_board':lock_board,
			'lock_no':lock_no,
			'user_openid':user_openid,
			'user_phone':user_phone,
			'verify_type':verify_type,
			'client_sn':client_sn,
			'verify_code':verify_code,
		 



		}, 
		success:function(response){
			//服务器指令
			var timestamp1 = (new Date()).valueOf();

			$("#debugpush").text(response.message+"--"+timestamp1);

			//console.log(response);
			 
	}
	});
	*/

}

function locker_get_NewCommand(mer_id,store_id,device_id,device_name){
	try{
		console.log("设备id="+device_id);
		if(mer_id){
			
		}else{
			console.log("设备信息无效");
			return;
		}
		var timestamp1 = (new Date()).valueOf();

	//	$("#debug").text("--本机----"+timestamp1+"\n");

		//var xhr = null;

		var api=server_root+'/TSSLSDF/'+mer_id+'?action=getLockerCommand&nowtime='+timestamp1;

		var cyberwin_app_data={
			'mer_id':mer_id,
			'store_id':store_id,
			'device_id':device_id,
			'client_sn':client_sn,
			'device_name':device_name,
			'client_timestamp':timestamp1,
			 



			};

		var cyberwin_app_data_str=JSON.stringify(cyberwin_app_data);
		var cyberwinapp_aj= Cyber_JsPrinterStandard.cyberwinapp_aj(api,"POST",cyberwin_app_data_str);

		// var debugtext=$("#debug").text();

		// $("#debug").text(debugtext+"--网络--"+cyberwinapp_aj);
		 var response = eval('(' + cyberwinapp_aj + ')');
		 if (response.status==1) {
			var command=response.data;
					//alert(command.name);
			  //cwpd_openlock_save("server",command.user_openid);
			  if(command.user_action=="in"){
			      cwpd_locker_checkin("server",command.user_openid,'--','服务');
			  }

			  if(command.user_action=="out"){
			      cwpd_locker_checkout("server",command.user_openid,'--','服务');
			  }

			  cyberwin_setLockerStatus();//读取状态

		 }else{
					//无效指令
		 }

		 var t=setTimeout("locker_get_NewCommand(mer_id,store_id,device_id,device_name);",1800);
	 }catch(err){
				 //alert("发生了错误"+err);
			// $("#debugerror").text("发生了错误"+err);
			 var t=setTimeout("locker_get_NewCommand(mer_id,store_id,device_id,device_name);",1800);
	 }
	//debugerror

/*
	$.ajax({
		cache:false,  
		url:api, 
		type : "post",
		dataType : 'json',
		data:{
		'mer_id':mer_id,
		'store_id':store_id,
		'device_id':device_id,
		'client_sn':client_sn,
		'device_name':device_name,
		 



		}, 
		success:function(response){
			//服务器指令

			var debugtext=$("#debug").text();

			$("#debug").text(debugtext+"--服务--"+response.message+"--"+response.time);

			console.log(response);
			if (response.status==1) {
				var command=response.data;
				//alert(command.name);
				 cwpd_openlock_save("server",command.user_openid);
			}else{
				//无效指令
			}
	}

	,
	complete: function(XMLHttpRequest, textStatus) {
           var debugtext=$("#debug").text();

			         $("#debug").text(debugtext+"--完成--"+textStatus);
	}

	,
	error: function (XMLHttpRequest, textStatus, errorThrown) {
                    // 状态码
                  //  console.log(XMLHttpRequest.status);
                    // 状态
                   // console.log(XMLHttpRequest.readyState);
                    // 错误信息   
                  //  console.log(textStatus);
				  var debugtext=$("#debug").text();

			         $("#debug").text(debugtext+"--网络错误--"+textStatus);
					 ajax.abort();//丢弃原有ajax
					 
                     xhr.abort();
					 locker_get_NewCommand(mer_id,store_id,device_id,device_name);
           },
			beforeSend: function(jqXHR, settings) {

				xhr = jqXHR; // To get the ajax XmlHttpRequest

				},
	});
	*/
}



	//2022-6-22 未来之窗门锁控制
	function cyberwin_handle_open(commandtype,boardAddStr,lockAddStr){
		boardAddStr='01';
		lockAddStr='01';
		//alert(lockAddStr);
		CyberWin_JsStandardPlug.cyber_handle_lock(addressStr,bauteRateStr,commandtype,boardAddStr,lockAddStr);
	}

	//2022-6-23 未来之窗门锁控制
	function cyberwin_handle_open_noscreen(commandtype,boardAddStr,lockAddStr){
		//boardAddStr='01';
		//lockAddStr='01';
		//alert(lockAddStr);
		//2022-7-8 关闭门锁信息 

		CyberWin_JsStandardPlug.cyber_handle_lock_NoScreen(addressStr,bauteRateStr,commandtype,boardAddStr,lockAddStr);
	}




	

			//var lock_order_add=lock_add_2022.store_id+"-"+lock_add_2022.device_id+"-"+lock_add_2022.lock_board+"-"+lock_add_2022.lock_no+"-"+lock_add_2022.lock_name;
           function cyber_create_locker_order_key(lock_board,lock_no){
					//var locker_user=CyberWin_JsStandardPlug.locStorage_getVal("未来之窗","lockers",15);
				// alert(userinfo);
				 

				var order_k=store_id+">"+device_id+">"+lock_board+">"+lock_no;
				return order_k;
			}



			function cyber_find_locker_order(verif_type,user_authen){
				 
					//var locker_user=CyberWin_JsStandardPlug.locStorage_getVal("未来之窗","lockers",15);
				// alert(locker_user);
				//var locker =new Array();
				//alert("验证"+verif_type+"授权"+user_authen);

				//验证不判定vip
				
				for(var i=1 ; i<=30 ;i++){
					var locker_i=CyberWin_JsStandardPlug.locStorage_getVal("未来之窗","lockers",i);

					//alert("寻找空20223="+locker_i);

					if(locker_i.length<2){
						continue;
					}

					///locker.push(locker_i);
					//检测柜子使用状态

					//
					var lock_add_2022 = eval('(' + locker_i + ')');
					//var lock_add_2022=

					//"72-900215-0"+i+"-10"
					

					var lock_order_add=lock_add_2022.store_id+"-"+lock_add_2022.device_id+"-"+lock_add_2022.lock_board+"-"+lock_add_2022.lock_no+"-"+lock_add_2022.lock_name;


					//alert("寻找空20224="+lock_order_add);


					lock_add_2022.address=cyber_create_locker_order_key(lock_add_2022.lock_board,lock_add_2022.lock_no);

					//alert("寻找空2022="+lock_add_2022.address);


					var locker_order=CyberWin_JsStandardPlug.locStorage_getVal("未来之窗","lockers_order",lock_add_2022.address);
				//	alert("寻找空2022="+locker_order);

					if(locker_order){
						//alert(locker_i+"有人"+locker_order);
						var lock_order_obj = eval('(' + locker_order + ')');

						lock_order_obj.isvip=lock_add_2022.isvip;//是否是VIP

						//	$("#cyberwin_lock_"+i).css("background-color","#F44336");

						lock_order_obj.address=cyber_create_locker_order_key(lock_order_obj.lock_board,lock_order_obj.lock_no);

						if(verif_type=="face"){
						   //user_openid=user_authen;
						   if(user_authen==lock_order_obj.user_openid){
								return lock_order_obj;
							}
						}
						if(verif_type=="server"){
							 //verify_code=user_authen;
							 if(user_authen==lock_order_obj.user_openid){
								return lock_order_obj;
							}
						}
						if(verif_type=="very"){
							// verify_code=user_authen;
							if(user_authen==lock_order_obj.verify_code){
								return lock_order_obj;
							}
						}
						if(verif_type=="phone"){
							// user_phone=user_authen;
							if(user_authen==lock_order_obj.user_phone){
								return lock_order_obj;
							}

							if(user_authen==lock_order_obj.verify_code){
								//验证码也可以取件
								//lock_add_2022
								return lock_order_obj;
							}
						}


					}else{
						//alert(locker_i+"空锁"+lock_add_2022.address);
						//return lock_add_2022;
							//$("#cyberwin_lock_"+i).css("background-color","rgba(229,240,233,0.53)");
					}

				}

				return "";

			}



			function cyber_find_locker_empty(){
					//var locker_user=CyberWin_JsStandardPlug.locStorage_getVal("未来之窗","lockers",15);
				// alert(locker_user);
				//var locker =new Array();
				
				for(var i=1 ; i<=30 ;i++){
					var locker_i=CyberWin_JsStandardPlug.locStorage_getVal("未来之窗","lockers",i);

					//alert("寻找空20223="+locker_i);

					if(locker_i.length<2){
						continue;
					}

					///locker.push(locker_i);
					//检测柜子使用状态

					//
					var lock_add_2022 = eval('(' + locker_i + ')');
					//var lock_add_2022=

					//"72-900215-0"+i+"-10"

					//2022-6-26 跳过vip
					if(lock_add_2022.isvip=="Y"){
						//保护VIP
						continue;
					}
					

					var lock_order_add=lock_add_2022.store_id+"-"+lock_add_2022.device_id+"-"+lock_add_2022.lock_board+"-"+lock_add_2022.lock_no+"-"+lock_add_2022.lock_name;


					//alert("寻找空20224="+lock_order_add);


					lock_add_2022.address=cyber_create_locker_order_key(lock_add_2022.lock_board,lock_add_2022.lock_no);

					//alert("寻找空2022="+lock_add_2022.address);


					var locker_order=CyberWin_JsStandardPlug.locStorage_getVal("未来之窗","lockers_order",lock_add_2022.address);
				//	alert("寻找空2022="+locker_order);

					if(locker_order){
						//alert(locker_i+"有人"+locker_order);
						//cyberwin_lock_
						//background

						//$("#cyberwin_lock_"+i).css("background-color","#F44336");

					}else{
						//alert(locker_i+"空锁"+lock_add_2022.address);
						//$("#cyberwin_lock_"+i).css("background-color","rgba(229,240,233,0.53)");

						return lock_add_2022;
					}

				}

				return "";
			}

			//function cyber_find_locker_order(verif_type,user_authen){



//本地数据解析
 function cyberwin_parseData(lockMixAndUserinfo){
				 //cyber_find_locker_order
				 var lockMixAndUserinfo_0 = lockMixAndUserinfo.split("|");

				 var lockMixAndUserinfo_lock=lockMixAndUserinfo_0[0].split("-");
				 var lockMixAndUserinfo_userinfo=lockMixAndUserinfo_0[1].split(",");

				 cyberwin_lock_userinfo_struct.store_id=lockMixAndUserinfo_lock[0];
				 cyberwin_lock_userinfo_struct.device_id=lockMixAndUserinfo_lock[1];
				 cyberwin_lock_userinfo_struct.lock_bord=lockMixAndUserinfo_lock[2];
				 cyberwin_lock_userinfo_struct.lock_no=lockMixAndUserinfo_lock[3];

				  cyberwin_lock_userinfo_struct.user_openid=lockMixAndUserinfo_userinfo[0];
				   cyberwin_lock_userinfo_struct.order_date=lockMixAndUserinfo_userinfo[1];
				    cyberwin_lock_userinfo_struct.user_phone=lockMixAndUserinfo_userinfo[2];

				 





				 

 }

	function getMer_id(){
		return CyberWin_JsStandardPlug.cwpd_system_get("locker_config","mer_id","20225578-2019");
	}


	function getStore_id(){
		return CyberWin_JsStandardPlug.cwpd_system_get("locker_config","store_id","20225578-2019");
	}

	function getDevice_name(){
		return CyberWin_JsStandardPlug.cwpd_system_get("locker_config","device_name","20225578-2019");
	}

	function getDevice_id(){
		return CyberWin_JsStandardPlug.cwpd_system_get("locker_config","device_id","20225578-2019");
	}

	function cyber_find_locker_vipbyopenid(user_openid){
		var locker_userVIP=CyberWin_JsStandardPlug.locStorage_getVal("未来之窗","lockers_user",user_openid);
		if(locker_userVIP){
			 var locker_userVIP_obj = eval('(' + locker_userVIP + ')');
			 	locker_userVIP_obj.address=cyber_create_locker_order_key(locker_userVIP_obj.lock_board,locker_userVIP_obj.lock_no);

			 return locker_userVIP_obj;

		}else{
			return false;
		}
	
	}

	 function cyber_init_config(){
		  var name=prompt("请输入初始密码","");
		  if (name=="88888888"){
		  }else{
			  alert("密码错误");
			  return;
		  }
		 layer.open({
		  type: 2, //Layer提供了5种层类型。可传入的值有：0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）,
		  shade:0.1, //遮罩层透明度
		  area:['450px','500px'], //弹出层宽高
		  title:'未来之窗智能柜初始化',//弹出层标题
		  content: 'http://51.onelink.ynwlzc.cn/o2o/client/device_app/lockers_v2022_setup.html?v=202255228888', //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
			 btn: ['关闭', '取消']
		 });
	 
	 }


	 //刷脸缓存技术
	 //48分钟执行一次
  function readyFace(){
	//  var p_new='<?xml version="1.0"?><cyberwinpay><paymethod>wlzc_face_merchant_ready</paymethod><config_platform>wlzc_o2o_merchant</config_platform><config_service>127.0.0.1</config_service><wlzc_client_merchant_platform>wlzc_o2o_merchant</wlzc_client_merchant_platform><wlzc_client_merchant_id>'+merchant_id+'</wlzc_client_merchant_id><wlzc_client_store_id>'+store_id+'</wlzc_client_store_id><wlzc_client_store_name>'+store_name+'</wlzc_client_store_name><wlzc_client_order_price>0.01</wlzc_client_order_price><wlzc_client_out_trade_no>1987</wlzc_client_out_trade_no><param1>1507462791|1510181421|0.01|北京|wx6e4a5cef9bdab82c|wx1eb85e107e36a21d|20220626</param1><face_authtype>once111</face_authtype></cyberwinpay>';
       var p_new='<?xml version="1.0"?><cyberwinpay><paymethod>wlzc_face_merchant_ready</paymethod><config_platform>wlzc_o2o_merchant</config_platform><config_service>127.0.0.1</config_service><wlzc_client_merchant_platform>wlzc_o2o_merchant</wlzc_client_merchant_platform><wlzc_client_merchant_id>77</wlzc_client_merchant_id><wlzc_client_store_id>72</wlzc_client_store_id><wlzc_client_store_name>未来之窗</wlzc_client_store_name><wlzc_client_order_price>0.01</wlzc_client_order_price><wlzc_client_out_trade_no>123456</wlzc_client_out_trade_no><param1>1507462791|1510181421|0.01|wlzc|wx6e4a5cef9bdab82c|wx1eb85e107e36a21d|123456</param1><face_authtype>once111</face_authtype></cyberwinpay>';

			          var r2=Cyber_JsPrinterStandard.getMemberClient_Union(p_new);
       Cyber_JsPrinterStandard.getMemberClient_Union(p_new);
  }

  function time_diff_now(d1) {//di作为一个变量传进来
//如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
       // var dateBegin = d1;//new Date(d1.replace(/-/g, "/"));//将-转化为/，使用new Date
        var dateEnd =  (new Date()).valueOf();//new Date();;//获取当前时间
         var dateDiff =parseFloat(dateEnd)- parseFloat(d1);// dateEnd.valueOf() - dateBegin.valueOf();//时间差的毫秒数
		// console.log("55555555555555d1="+d1);
		//  console.log("55555555555555"+dateEnd);
		  // console.log("55555555555555"+dateDiff);
		 dateDiff=parseFloat(dateDiff);
		var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
		var leave1=dateDiff%(24*3600*1000) //计算天数后剩余的毫秒数
		var hours=Math.floor(leave1/(3600*1000))//计算出小时数
		//计算相差分钟数
		var leave2=leave1%(3600*1000) //计算小时数后剩余的毫秒数
		var minutes=Math.floor(leave2/(60*1000))//计算相差分钟数
		//计算相差秒数
		var leave3=leave2%(60*1000) //计算分钟数后剩余的毫秒数
		var seconds=Math.round(leave3/1000);

		run_time_minute=Math.floor(dateDiff/(60*1000));//运行分钟

		//console.log(" 相差 "+dayDiff+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒")
		//console.log(dateDiff+"时间差的毫秒数",dayDiff+"计算出相差天数",leave1+"计算天数后剩余的毫秒数"
		//,hours+"计算出小时数",minutes+"计算相差分钟数",seconds+"计算相差秒数");

		var returun=dayDiff+"天 "+hours+"时 "+minutes+" 分"+seconds+" 秒";
		return returun;
}
//let t3="2017-08-18 04:56:38";
//timeFn(t3);

	//网络检测
	function cyberwin_inOnline(){
		if(navigator.onLine){
		     //console.log('网络正常！');
			 return "在线";
			}else{
				//console.log('网络中断！');
				 return "离线";
			}
	}



function cyberwin_init_locker_div(){
	//alert(11);
	var cyberwin_lockinfo_raw = new Array(); 

	for(var i=1 ; i<=30 ;i++){
		 
		var locker_i=CyberWin_JsStandardPlug.locStorage_getVal("未来之窗","lockers",i);

		if(locker_i.length<2){
						continue;
		}

		//alert("门锁--初始化"+locker_i);

		var lock_add_2022 = eval('(' + locker_i + ')');

		cyberwin_lockinfo_raw.push(lock_add_2022);
		
		//background

		

		//var cyberdiv='<input type="button" value="'+lock_add_2022.lock_name+'" id="cyberwin_lock_'+i+'" class="button ">';
		//var cyberdiv='<input type="button" value="'+i+'" id="cyberwin_lock_'+i+'" class="button ">';

		//rgba(229,240,233,0.53)

		

		//$("#cyberwin_locker_status_div_locker").append(cyberdiv);

		//$("#cyberwin_lock_"+i).css("background-color","#F44336");
	}

	//alert("门锁--初始化");

	var cyberwin_lockinfo_sort = cyber_upsort(cyberwin_lockinfo_raw,'sort');


	//未来之窗二次加载2022-7-7
	for(var i2=0 ; i2 < 30 ;i2++){
		var lock_add_2022=cyberwin_lockinfo_sort[i2];
	   // var cyberdiv='<input type="button" value="'+lock_add_2022.lock_name+'" id="cyberwin_lock_'+i2+'" class="button ">';
	   // var cyberdiv='<input type="button" value="'+lock_add_2022.lock_name+'" id="cyberwin_lock_'+lock_add_2022.lock_board+"_"+lock_add_2022.lock_no+'" class="button ">';

		//$("#cyberwin_locker_status_div_locker").append(cyberdiv);
		//var pobj=document.getElementById('cyberwin_locker_status_div_locker');
		//pobj.appendChild(cyberdiv);

		var pobj=document.getElementById('cyberwin_locker_status_div_locker');

		var cyberdiv_node=document.createElement("input");
		cyberdiv_node.id="cyberwin_lock_"+lock_add_2022.lock_board+"_"+lock_add_2022.lock_no;
		cyberdiv_node.value=lock_add_2022.lock_name;
		cyberdiv_node.type="button";
		cyberdiv_node.setAttribute("class","button");
		//cyberdiv_node.

		pobj.appendChild(cyberdiv_node);

	}

   


}


function cyberwin_setLockerStatus(){
	
			 
				
				for(var i=1 ; i<=30 ;i++){
					var locker_i=CyberWin_JsStandardPlug.locStorage_getVal("未来之窗","lockers",i);

					//alert("寻找空20223="+locker_i);

					if(locker_i.length<2){
						continue;
					}

					var lock_add_2022 = eval('(' + locker_i + ')');
					//var lock_add_2022=

					//"72-900215-0"+i+"-10"

					//2022-6-26 跳过vip
					if(lock_add_2022.isvip=="Y"){
						//保护VIP
						//continue;
					}
					

					var lock_order_add=lock_add_2022.store_id+"-"+lock_add_2022.device_id+"-"+lock_add_2022.lock_board+"-"+lock_add_2022.lock_no+"-"+lock_add_2022.lock_name;


					//alert("寻找空20224="+lock_order_add);


					lock_add_2022.address=cyber_create_locker_order_key(lock_add_2022.lock_board,lock_add_2022.lock_no);

					//alert("寻找空2022="+lock_add_2022.address);


					var locker_order=CyberWin_JsStandardPlug.locStorage_getVal("未来之窗","lockers_order",lock_add_2022.address);
				//	alert("寻找空2022="+locker_order);

					if(locker_order){
						//alert(locker_i+"有人"+"cyberwin_lock_"+lock_add_2022.lock_board+"_"+lock_add_2022.lock_no);
						//$("#cyberwin_lock_"+i).css("background-color","#F44336");
						//2022-7-8
						// id="cyberwin_lock_'+lock_add_2022.lock_board+"_"+lock_add_2022.lock_no+'"
						//$("#cyberwin_lock_"+lock_add_2022.lock_board+"_"+lock_add_2022.lock_no).css("background-color","#F44336");
						$cq("#cyberwin_lock_"+lock_add_2022.lock_board+"_"+lock_add_2022.lock_no).css("background-color","#F44336");
						//$cq('#cyberwin_lock_1_1').css('background-color','#FF0000');

					}else{
						//alert(locker_i+"空锁"+lock_add_2022.address);
						//return lock_add_2022;
						//$("#cyberwin_lock_"+i).css("background-color","rgba(229,240,233,0.53)");
						//2022-7-8
						//
						//$("#cyberwin_lock_"+lock_add_2022.lock_board+"_"+lock_add_2022.lock_no).css("background-color","rgba(229,240,233,0.53)");
						$cq("#cyberwin_lock_"+lock_add_2022.lock_board+"_"+lock_add_2022.lock_no).css("background-color","rgba(229,240,233,0.53)");

					}

				}

				layer.closeAll();

				return "";
			
}


////操作
    function cwpd_takeout_bycode(){
		layer.load(0, {shade: [0.1,'#000000']});

				 var lock_no =$("#number_or_name_member").val();

				 var cwpd_command=cpwd_cmd_command(lock_no);

				 if(cwpd_command==true){
					 //
					 //
					 layer.closeAll();
					// $("#number_or_name_member").val('');
					 $cq("#number_or_name_member").val('');
					 return ;
				 }

				 cwpd_locker_checkout("phone",lock_no,'');

				// $("#number_or_name_member").val('');
				 $cq("#number_or_name_member").val('');
				 cyberwin_setLockerStatus();//读取状态
 	}


		function cpwd_cmd_command(cmd){
			if(cmd=="88889999"){
               cyberwin_handle_open_noscreen('','01','00');
			 //  cyberwin_handle_open_noscreen('',lock_no_user_order_obj.lock_board,lock_no_user_order_obj.lock_no);
				return true;
			}


			if(cmd=="44447777"){
				 CyberWin_JsStandardPlug.locStorage_clear("未来之窗","lockers_order");
             //  cyberwin_handle_open_noscreen('','01','00');
			 //  cyberwin_handle_open_noscreen('',lock_no_user_order_obj.lock_board,lock_no_user_order_obj.lock_no);
			  cyberwin_setLockerStatus();//读取状态
				return true;
			}


			//str.split(" ")
			if(cmd.startsWith("88889999")){
				var cmd2 =cmd.substr(8,2);
				//alert(cmd2);
				 cyberwin_handle_open_noscreen('','01',''+cmd2);
				return true;
			}

			if(cmd.startsWith("88889922")){
				var cmd2 =cmd.substr(8,2);
				//alert(cmd2);
				 cyberwin_handle_open_noscreen('','02',''+cmd2);
				return true;
			}

			if(cmd=="55555555"){
              CyberWin_JsStandardPlug.cwpd_system_set("APP","debug","0","20225578-2019");
			  alert("关闭日志");
				return true;
			}

			if(cmd=="55555556"){
                CyberWin_JsStandardPlug.cwpd_system_set("APP","debug","1","20225578-2019");
				alert("开启日志");
				return true;
			}

			if(cmd=="55555557"){
               window.location.href='http://51.onelink.ynwlzc.cn/o2o/client/cyberwin_load/cyberwinapp.html';
				return true;
			}

			if(cmd=="55555558"){
				var url="http://51.onelink.ynwlzc.cn/o2o/client/device_app/device_app.zip";
                var cyberwinapp_du= Cyber_JsPrinterStandard.cyber_download_apppackage("lockerwenti","123456",url);
				alert(cyberwinapp_du);
				return true;
			}

			if(cmd=="55555559"){
				CyberWin_JsStandardPlug.cwpd_system_set("APP","DefaultHome","cyberwin_app://lockerwenti","20225578-2019");

				var cyberwinapp_du = CyberWin_JsStandardPlug.cwpd_system_get("APP","DefaultHome","20225578-2019");
                
				alert(cyberwinapp_du);
				return true;
			}

			// var cyberwinapp_aj= Cyber_JsPrinterStandard.cyberwinapp_aj(api,"POST",cyberwin_app_data_str);

			//http://51.onelink.ynwlzc.cn/o2o/client/cyberwin_load/cyberwinapp.html

			return false;
		}

	  function cwpd_checkin_byface(){
					// var lock_no =$("#number_or_name_member").val();
					// cwpd_openlock_save("phone",lock_no);

					 //$("#number_or_name_member").val('');
					 cyber_lockerhandle_byfacepaywexin("in");
					   cyberwin_setLockerStatus();//读取状态
		}

	  function cwpd_takeout_byface(){
					// var lock_no =$("#number_or_name_member").val();
					// cwpd_openlock_save("phone",lock_no);

					// $("#number_or_name_member").val('');
					 cyber_lockerhandle_byfacepaywexin("out");
					   cyberwin_setLockerStatus();//读取状态
	}

///刷脸
 function cyber_lockerhandle_byfacepaywexin(inout){
			// CyberWin_JsStandardPlug.speakText("开始刷脸");
				  var current_total_price="0";//$("#number_or_name_member").val();

				  if(cyberwin_face_and_submit_re == true){
					   layer.msg("正在刷脸", {
							time: 500, //20s后自动关闭
							btn: ['请勿重复点击', '知道了']
						  });
				  }
				  cyberwin_face_and_submit_re=true;//防止重复
				  //layer.load(0, {shade: [0.1,'#000000']});

				  


				  var current_order_timestamp = (new Date()).valueOf(); 

				  //var current_order_id="s_"+merchant_id+"_"+store_id+"-"+current_order_timestamp;

				   var current_order_id="store|"+merchant_id+"|"+store_id+"_"+current_order_timestamp;

				  var staff_name="广州大酒店";

			     var    cwpd_price_wxface=current_total_price;
				         cwpd_price_wxface=cwpd_price_wxface*100;

						 console.log(current_order_id);
						  console.log(cwpd_price_wxface);
			   		   

						var p_new='<?xml version="1.0"?><cyberwinpay><paymethod>wlzc_o2o_merchant_member</paymethod><config_platform>wlzc_o2o_merchant</config_platform><config_service>127.0.0.1</config_service><wlzc_client_merchant_platform>wlzc_o2o_merchant</wlzc_client_merchant_platform><wlzc_client_merchant_id>'+merchant_id+'</wlzc_client_merchant_id><wlzc_client_store_id>'+store_id+'</wlzc_client_store_id><wlzc_client_store_name>'+store_name+'</wlzc_client_store_name><wlzc_client_order_price>'+cwpd_price_wxface+'</wlzc_client_order_price><wlzc_client_out_trade_no>'+current_order_id+'</wlzc_client_out_trade_no><param1>1507462791|1510181421|'+cwpd_price_wxface+'|'+staff_name+'|wx6e4a5cef9bdab82c|wx1eb85e107e36a21d|'+current_order_id+'</param1><face_authtype>once111</face_authtype></cyberwinpay>';

			          var r2=Cyber_JsPrinterStandard.getMemberClient_Union(p_new);
					  //alert(r2);
					  var cwpd_bj = eval('(' + r2 + ')');   
                     //4.     alert(obj.toJSONString()); 
					 //openid

                        //sub_openid
                       
					   //
					   //alert("人脸ID="+cwpd_bj.openid);
						//  $(".left_card_name").html("姓名:"+cwpd_bj.nickName);

						if((cwpd_bj.openid.length < 5)||(cwpd_bj.openid == "--")){

							 layer.msg(cwpd_bj.nickName, {
							    time: 5000, //20s后自动关闭
							    btn: ['识别失败', '知道了']
						     });
								Cyber_JsPrinterStandard.speakText(" 识别失败");

								 cyberwin_face_and_submit_re=false;
								// layer.closeAll();
								return ;

						}
						 

						   layer.msg(cwpd_bj.nickName, {
							time: 5000, //20s后自动关闭
							btn: ['人脸识别成功', '知道了']
						  });
							//alert("人脸ID="+cwpd_bj.openid);

							//alert("id="+cwpd_bj.openid);
							

						  //cwpd_bj.sub_openid

						 // alert("商户"+cwpd_bj.openid);
						 //  alert("子商户"+cwpd_bj.sub_openid);

						  cyberwin_face_and_submit_re=false;

						  if(inout=="out"){

						     cwpd_locker_checkout("face",cwpd_bj.openid,cwpd_bj.sub_openid,cwpd_bj.nickName);
							    //cyberwin_setLockerStatus();//读取状态
						  }else{
							   cwpd_locker_checkin("face",cwpd_bj.openid,cwpd_bj.sub_openid,cwpd_bj.nickName);
							    //  cyberwin_setLockerStatus();//读取状态
						  }
						  // layer.closeAll();
						  


					 
			}



/////
		     function cwpd_locker_checkout(type,very_info,user_sub_openid,user_name){
				 var dnow = new Date();

				 var now=dnow.getFullYear()+"-"+(dnow.getMonth()+1)+"-"+dnow.getDate()+" "+dnow.getHours()+":"+dnow.getMinutes()+":"+dnow.getSeconds();

				  cyberwin_lock_userinfo_struct = {
					  store_id: "",
					  device_id : "",
					  lock_bord:"",
					  lock_no:"",
					  user_openid:"",
					  order_date:"",
					  user_phone:"",

					};

					

				
				// alert(lock_no);
				 
				// alert(addressStr);
				//2022-6-25
				var lock_no_user_order_obj = cyber_find_locker_order(type,very_info);

				var verify_code="";
				var timestamp1 = (new Date()).valueOf();
		        timestamp1 ="" +timestamp1;
				//校验码
                verify_code =timestamp1.substring(timestamp1.length-4);

				

				if(lock_no_user_order_obj){


					//贵宾寻找
					if((type=="face")||(type=="server")){
						var vipinfo = cyber_find_locker_vipbyopenid(very_info);
						if(vipinfo){

							//alert(JSON.stringify(vipinfo));



							cyberwin_handle_open_noscreen('',vipinfo.lock_board,vipinfo.lock_no);

							//Cyber_JsPrinterStandard.speakText("  欢迎贵宾回家，"+vipinfo.user_name);
							//lock_name
							Cyber_JsPrinterStandard.speakText("  欢迎贵宾回家，"+vipinfo.user_name+"  你的存放的柜子是：，"+vipinfo.lock_name);

							 //  locker_push_records('out',now,vipinfo.lock_name,vipinfo.lock_board,vipinfo.lock_no,very_info,vipinfo.user_phone,type,verify_code);
                               locker_push_records('out',now,vipinfo.lock_name,vipinfo.lock_board,vipinfo.lock_no,vipinfo.user_openid,vipinfo.user_phone,type,verify_code
								   ,vipinfo.sub_openid,vipinfo.nickName);

							   CyberWin_JsStandardPlug.locStorage_remove("未来之窗","lockers_order",vipinfo.address);


							return ;

						}
					}

					
					 

					//开锁
					//cyberwin_handle_open_noscreen('',cyberwin_lock_userinfo_struct.lock_bord,cyberwin_lock_userinfo_struct.lock_no);

					cyberwin_handle_open_noscreen('',lock_no_user_order_obj.lock_board,lock_no_user_order_obj.lock_no);

					if(lock_no_user_order_obj.isvip=="Y"){
						////保护VIP
						
						var vipinfo_2 = cyber_find_locker_vipbyopenid(lock_no_user_order_obj.user_openid);
						Cyber_JsPrinterStandard.speakText("  欢迎贵宾，"+vipinfo_2.user_name+"  你的存放的柜子是：，"+lock_no_user_order_obj.lock_name);

					}else{
					 
					     Cyber_JsPrinterStandard.speakText("您的物品存放在"+lock_no_user_order_obj.lock_name);
					}

					//alert(JSON.stringify(lock_no_user_order_obj));

				 

					//alert(now);
					
					if(type=="face"){
						   //locker_push_records('out',now,lock_no_user_order_obj.lock_name,lock_no_user_order_obj.lock_board,lock_no_user_order_obj.lock_no
							//   ,very_info,lock_no_user_order_obj.user_phone,type,verify_code,user_sub_openid,user_name);

						   locker_push_records('out',now,lock_no_user_order_obj.lock_name,lock_no_user_order_obj.lock_board,lock_no_user_order_obj.lock_no
							   ,lock_no_user_order_obj.user_openid,lock_no_user_order_obj.user_phone,type,verify_code,user_sub_openid,user_name);
					}
					else if(type=="server"){
						  // locker_push_records('out',now,lock_no_user_order_obj.lock_name,lock_no_user_order_obj.lock_board,lock_no_user_order_obj.lock_no,very_info,lock_no_user_order_obj.user_phone,type,verify_code);
						  locker_push_records('out',now,lock_no_user_order_obj.lock_name,lock_no_user_order_obj.lock_board,lock_no_user_order_obj.lock_no,
							  lock_no_user_order_obj.user_openid,lock_no_user_order_obj.user_phone,type,verify_code);

					}
					else{

					   //2022-7-7   locker_push_records('out',now,lock_no_user_order_obj.lock_name,lock_no_user_order_obj.lock_board,lock_no_user_order_obj.lock_no,'',lock_no_user_order_obj.user_phone,type,verify_code);
						 locker_push_records('out',now,lock_no_user_order_obj.lock_name,lock_no_user_order_obj.lock_board,lock_no_user_order_obj.lock_no,
							 lock_no_user_order_obj.user_openid,lock_no_user_order_obj.user_phone,type,verify_code);
					
				
					
					
					}
					
					// locker_push_records('out',now,lock_no_user_order_obj.lock_board,lock_no_user_order_obj.lock_no,'',lock_no_user_order_obj.user_phone,type,verify_code);

					//删除门锁记录
					// var lockMixAndUserinfo_delete = lock_no_user.split("|");

					 

					CyberWin_JsStandardPlug.locStorage_remove("未来之窗","lockers_order",lock_no_user_order_obj.address);



					
                    
				
				}else{
					//alert("第一次");

							//贵宾不受约束
							  Cyber_JsPrinterStandard.speakText("  您还没有存放，不能取出");
							  cyberwin_setLockerStatus();//读取状态
					
				
             
			     }
			 }


//////
		     function cwpd_locker_checkin(type,very_info,user_sub_openid,user_name){
				 var dnow = new Date();

				 var now=dnow.getFullYear()+"-"+(dnow.getMonth()+1)+"-"+dnow.getDate()+" "+dnow.getHours()+":"+dnow.getMinutes()+":"+dnow.getSeconds();

				  cyberwin_lock_userinfo_struct = {
					  store_id: "",
					  device_id : "",
					  lock_bord:"",
					  lock_no:"",
					  user_openid:"",
					  order_date:"",
					  user_phone:"",

					};

					

				
				// alert(lock_no);
				 
				// alert(addressStr);
				//2022-6-25
				var lock_no_user_order_obj = cyber_find_locker_order(type,very_info);

				var verify_code="";
				var timestamp1 = (new Date()).valueOf();
		        timestamp1 ="" +timestamp1;
				//校验码
                verify_code =timestamp1.substring(timestamp1.length-4);

				

				if(lock_no_user_order_obj){


					//贵宾寻找
                      Cyber_JsPrinterStandard.speakText("  您存放的还没取出，不能新开");
					  cyberwin_setLockerStatus();//读取状态
					
					
					
                    
				
				}else{
					//alert("第一次");

							//贵宾不受约束
					//贵宾寻找
					if((type=="face")||(type=="server")){
						var vipinfo = cyber_find_locker_vipbyopenid(very_info);
						if(vipinfo){



							cyberwin_handle_open_noscreen('',vipinfo.lock_board,vipinfo.lock_no);

							//Cyber_JsPrinterStandard.speakText("  欢迎贵宾回家，"+vipinfo.user_name);
							//lock_name
							Cyber_JsPrinterStandard.speakText("  欢迎贵宾回家，"+vipinfo.user_name+"  请将物品存放在柜子，"+vipinfo.lock_name);


							   locker_push_records('in',now,vipinfo.lock_name,vipinfo.lock_board,vipinfo.lock_no,very_info,vipinfo.user_phone,type,verify_code);


							   var lockone_order_vip = {store_id:store_id,device_id:device_id,lock_board:vipinfo.lock_board,lock_no:vipinfo.lock_no,
					           lock_name:vipinfo.lock_name,
							client_date:now,
							user_openid:very_info,
							user_phone:'',
							verify_code:verify_code
							};

							 var lockone_order_vip_str=JSON.stringify(lockone_order_vip);

							// alert(vipinfo.address);
							//  alert(lockone_order_vip_str);


							   CyberWin_JsStandardPlug.locStorage_setVal("未来之窗","lockers_order",vipinfo.address,lockone_order_vip_str);


							return ;

						}
					}

					var lock_empty_obj =cyber_find_locker_empty();

			

					if(lock_empty_obj.length < 3){
						Cyber_JsPrinterStandard.speakText("已经没有空柜");
						//alert("已经没有空锁");
						locker_push_records('in',now,'无空','无空','','','',type,'');
						return;
					}

					//alert("第一次");
					//alert("第一次"+lock_empty_obj.address);
					//alert("第1一次主板"+lock_empty_obj.lock_board+"锁"+lock_empty_obj.lock_no);

					
					var user_info="oppop,"+now+","+very_info;
					var lockone_order="";

					if(type=="phone"){
						//user_info="oppop,"+now+","+very_info;
						lockone_order = {store_id:lock_empty_obj.store_id,device_id:lock_empty_obj.device_id,lock_board:lock_empty_obj.lock_board,lock_no:lock_empty_obj.lock_no,
					     lock_name:lock_empty_obj.lock_name,
							client_date:now,
							user_openid:'',
							user_phone:very_info,
							verify_code:verify_code
							};
					}

					if(type=="face"){
						//user_info=very_info+","+now+","+"";
						lockone_order = {store_id:lock_empty_obj.store_id,device_id:lock_empty_obj.device_id,lock_board:lock_empty_obj.lock_board,lock_no:lock_empty_obj.lock_no,
					     lock_name:lock_empty_obj.lock_name,
							client_date:now,
							user_openid:very_info,
							user_phone:'',
							verify_code:verify_code
							};
					}

					if(type=="server"){
						//user_info=very_info+","+now+","+"";
						lockone_order = {store_id:lock_empty_obj.store_id,device_id:lock_empty_obj.device_id,lock_board:lock_empty_obj.lock_board,lock_no:lock_empty_obj.lock_no,
					     lock_name:lock_empty_obj.lock_name,
							client_date:now,
							user_openid:very_info,
							user_phone:'',
							verify_code:verify_code
							};
					}

					if(type=="very"){
						//user_info=","+now+","+","+very_info;
						lockone_order = {store_id:lock_empty_obj.store_id,device_id:lock_empty_obj.device_id,lock_board:lock_empty_obj.lock_board,lock_no:lock_empty_obj.lock_no,
					     lock_name:lock_empty_obj.lock_name,
							client_date:now,
							user_openid:'',
							user_phone:'',
							verify_code:verify_code
							};
					}

					
                //   alert("第一次"+user_info);
				  
				    //var order_k=cyber_create_locker_order_key(type,very_info);
					//user_openid+">"+user_phone+">"+user_phone+">"+verify_code;

					//var lockone_order = 
				    var lockone_order_str=JSON.stringify(lockone_order);


					CyberWin_JsStandardPlug.locStorage_setVal("未来之窗","lockers_order",lock_empty_obj.address,lockone_order_str);

					//cyberwin_parseData(lock_empty+"|"+user_info);

				   // alert("第一次");

                    //开锁
					cyberwin_handle_open_noscreen('',''+lock_empty_obj.lock_board,''+lock_empty_obj.lock_no);

					 
					Cyber_JsPrinterStandard.speakText("请将物品存放在"+lock_empty_obj.lock_name);

					 locker_push_records('in',now,lock_empty_obj.lock_name,lock_empty_obj.lock_board,lock_empty_obj.lock_no,lockone_order.user_openid,lockone_order.user_phone,type,verify_code,user_sub_openid,user_name);

					/*

					if(type=="face"){
						 locker_push_records('in',now,lock_empty_obj.lock_board,lock_empty_obj.lock_no,very_info,lock_empty_obj.user_phone,type,verify_code);
					}
					else if(type=="server"){
						 locker_push_records('in',now,lock_empty_obj.lock_board,lock_empty_obj.lock_no,very_info,lock_empty_obj.user_phone,type,verify_code);
					}
					else{

					   locker_push_records('in',now,lock_empty_obj.lock_board,lock_empty_obj.lock_no,lockone_order.user_openid,lockone_order.user_phone,type,verify_code);
					}
					*/



					//alert("第一次"+lock_empty);
				}

				// CyberWin_JsStandardPlug.cyber_handle_lock(addressStr,bauteRateStr,commandtype,boardAddStr,lockAddStr);
			 }




///////////////////////////////////////////////
//2022-7-8
//////////////////////////////////////////////
//排序算法
/**
 * @description:降序 排序根据哪那个字段,适用于二维数组排序
 * @param {*}arr 要排序的数组
 * @param {*}key 需要排序的键名
 * @return {*}
 */
const cyber_downsort = (arr = [], key) => {
  let tmp = JSON.parse(JSON.stringify(arr)); //深拷贝一份
  tmp.sort(function(a, b) {
  	//判断是不是数字,数字则不处理,不是数字则转为对应Unicode码
    a = !isNaN(Number(a[key])) ? a[key] : a[key].charCodeAt(0); 
    b = !isNaN(Number(b[key])) ? b[key] : b[key].charCodeAt(0);
    return a - b;
  });
  return tmp;
};

/**
 * @description: 升序 排序根据哪那个字段,适用于二维数组排序
 * @param {*}arr 要排序的数组
 * @param {*}key 需要排序的键名
 * @return {*}
 */
const cyber_upsort = (arr = [], key) => {
  let tmp = JSON.parse(JSON.stringify(arr)); //深拷贝一份
  tmp.sort(function(a, b) {
    a = !isNaN(Number(a[key])) ? a[key] : a[key].charCodeAt(0);
    b = !isNaN(Number(b[key])) ? b[key] : b[key].charCodeAt(0);
    return b - a;
  });
  return tmp;
};
