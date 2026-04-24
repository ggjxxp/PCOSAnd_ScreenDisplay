Page({
    data: {
        userInfo: null,
        cyber_var_openid: "no",
        cyber_shopnew_yye: "0000.00",
        cyber_shopnew_yye_cashier: "0.00",
        cyber_login_modalHidden: !0,
        cyber_login_tip: "请输入未来之窗收银商户账号密码",
        cyberwin_cashier_url: ""
    },
    onLoad: function(e) {
		console.log("页面加载完成未来之窗2023");
		//alert(client_uuid);
		/*
		var ip = CyberWin_JsStandardPlug.getDeviceIP();
		//alert(ip);
		var client_uuid=CyberWin_JsStandardPlug.getDeviceUUid();
		//alert(client_uuid);
		var url="https://51.onelink.ynwlzc.cn/o2o/cyberwin_xcx_ycyrzhgl_qr/wap.php?g=Wap&c=CyberWin_LocalApp&a=deviceControlMiniProByManualip&clien_ip="
		+ip+"&client_uuid="+client_uuid;
		//取消在小程序中打开

		url="https://51.onelink.ynwlzc.cn/o2o/wap.php?g=Wap&c=CyberWin_LocalApp&a=deviceControlMiniProByManualip&clien_ip="
		+ip+"&client_uuid="+client_uuid;

		

		   $("#cyber_device_control_qr").qrcode({
			render: "canvas",
			text: url,
			width: "180", //二维码的宽度
			height: "180", //二维码的高度
			background: "#ffffff", //二维码的后景色
			foreground: "#000000", //二维码的前景色
			src: './cyberwin_applogon.png' //二维码中间的图片
		});
		*/
		
	},
    onReady: function() {
	},
    onShow: function() {
		console.log("读取数据");
		

		// this.client_uuid=CyberWin_JsStandardPlug.getDeviceUUid();
		/*
		try {
              // adddlert("欢迎光临！");
			  var smargscreen_gcxx_body = CyberWin_JsStandardPlug.cwpd_system_get("smargscreen","gcxx_body","20225578-2019");
	            // alert(cyberwinapp_du);
				if(smargscreen_gcxx_body.length>50){
					//alert("找到");
					var smargscreen_gcxx_bodyobj=eval("("+smargscreen_gcxx_body+")");
					 CyberWin_ClientRender($('#cyber_cyberwinapp_tpl').html()).render(smargscreen_gcxx_bodyobj, function(html){
					  //2020-8-14修改下单模板
					 // console.log("渲染");
					  setTimeout(function(){ cybber_load_splash_img(); }, 3000);
						$('#cyber_cyberwinapp_body').append(html);
						//cybber_load_splash_img();
			      });
				

					return;
				}
			}
			catch(err) {
				//document.getElementById("demo").innerHTML = err.message;
			}
			//alert("加载服务");
			*/

		// this.client_uuid='418F96E084176580a4548779b6f629b0ab3d59c';
		//2023-3-26
		  var client_uuid='wlzzcnoext-vir_hybird_yy_englishidemo';
		  //'wlzzcnoext-418F96Eab769dfe34f74512a478234a808cf005';//'wlzzcnoext-0249b573-da3e-2da0-ac94-8df3f94e2fdf';//
		  //河南 '00000000-6bf9-6d03-6bf9-6d0300000000-00';//'00000000-3fa1-4f28-3fa1-4f2800000000';//未来之窗 '00000000-6bf9-6d03-6bf9-6d0300000000';
		  var 未来之窗_安卓低版本补丁 = false;
		  try{
		        client_uuid=CyberWin_JsStandardPlug.getDeviceUUid();
		  }catch(err) {
			 var uuid = "wlzzcnoext-"+device_guid2();
			 //DeviceUUidEx
			  
			   console.log("读取设备id失败"+uuid);
			   未来之窗_安卓低版本补丁 =true;
			  $("#IP20230815").html("读取设备id"+uuid);
				 
		  }

		  if(未来之窗_安卓低版本补丁 == true){

			    var client_uuid_str= "wlzzcnoext-"+device_guid2();

				 try{

						var  配置client_sn =  CyberWin_JsStandardPlug.cwpd_system_get('DeviceInfo','DeviceUUidEx',"20225578-2019");
						if(配置client_sn.length <10){
							client_uuid = client_uuid_str;

							 CyberWin_JsStandardPlug.cwpd_system_set('DeviceInfo','DeviceUUidEx',client_uuid_str,"20225578-2019");
						}else{
							client_uuid = 配置client_sn;
						}

				 }catch(err) {
					 //var uuid = "wlzzcnoext-"+device_guid2();
					 //DeviceUUidEx
					    console.log("读取设备id失败2024"+uuid);
					  // 未来之窗_安卓低版本补丁 =true;
						 
				  }

			  
		  }
		  
		  var 读取持久化设备id=东方仙盟_千丝冥缘_本地持久化_提取设备id();
		  
		  if(读取持久化设备id){
		      	东方仙盟_千丝冥缘_加载终端(读取持久化设备id);
		  }



		console.log("读取数据uuid="+client_uuid);
		var cwpd_screen_width=window.screen.width;
		var cwpd_screen_height=window.screen.height;
		var cwpd_screen_colorDepth=window.screen.colorDepth;
		var cwpd_screen_pixelDepth=window.screen.pixelDepth;
		//加入设备终端参数
		
		var 未来之窗_认证服务="http://pc.pcdzkj.com/xf_API/hcacolapp.php/ApplicationclientAPI/clientScreenDataAPI";

		 $.post(未来之窗_认证服务,{client_uuid:client_uuid,datatradetype:""
		 ,screen_colordepth:cwpd_screen_colorDepth,screen_pixeldepth:cwpd_screen_pixelDepth,screen_width:cwpd_screen_width,screen_height:cwpd_screen_height},function(response){
			   //$("span").html(result);
			   console.log("服务器-数据");
			   	console.log(response);
				if(response.status ==75 ){
					//弹出
					var acturl="https://51.onelink.ynwlzc.cn/o2o/cyberwin_xcxqr/index.php/ApplicationclientAPI/o2owlzcactive?client_uuid="+client_uuid;
					//http://pc.ynwlzc.net/xf_merchant/hcacolapp.php
					acturl="http://pc.pcdzkj.com/xf_merchant/hcacolapp.php/ApplicationclientAPI/hcacolpccactive?client_uuid="+client_uuid;

    	               var qrimgurl="https://51.onelink.ynwlzc.cn//cyber_lib/qr/cyber_qrg.php?url="+encodeURIComponent(acturl);
				//	cyberwin_alert_open('设备未授权','<img src="'+qrimgurl+'" style="width:340px;"><br>请微信扫码绑定',"同意","不同意");
					var 新版激活代码 ='<p id="cyberwin_hcacolapp_activeqr" class="cyberwinqr"></p>';
					cyberwin_alert_open('设备未授权',新版激活代码+'<br>请微信扫码绑定',"关闭","取消");
					 未来之窗_人工智能_二维码('cyberwin_hcacolapp_activeqr',acturl);
					 
					return;
				}


			   	console.log(response.data);
			   	东方仙盟_千丝冥缘_加载终端(response.data);
			   	/*东方仙盟_千丝冥缘_加载终端
				// console.log("服务器=data_video_1_yyzz_tsjyxkz");
				 //	console.log(response.data[0]['data_video_1_yyzz_tsjyxkz']);
					//console.log(response.data[0]['cw_infodata']['command']);

					$(".hotel_screen_title_div_hotelname").html(response.data.storeinfo.store_name);
					$(".hotel_screen_title_div_hoteldesc").html(response.data.storeinfo.store_feature);
					

					// console.log($('#cyber_cyberwinapp_tpl').html());
				var jsonstring =	JSON.stringify(response.data);
				
				//不保存CyberWin_JsStandardPlug.cwpd_system_set("smargscreen","gcxx_body",jsonstring,"20225578-2019");

				//2023-1-27 加载房价
				 console.log("设备信息");
               console.log(response.data.hardware_smart);

			   var 酒店房价模板 ="cyber_cyberwinapp_hotelprice_tpl_market_now";//#cyber_cyberwinapp_hotelprice_tpl_market_now_member

			   var wlzc_ecogen_酒店房价牌模板_头 = tpl_head_酒店房价牌_挂牌_现价;
			   var wlzc_ecogen_酒店房价牌模板_价格主体 = $('#'+酒店房价模板).html();

			   var 未来之窗智能设备 = response.data.hardware_smart;


			   if(未来之窗智能设备.param2.length >5){
				    console.log("读取信息");
					wlzc_ecogen_酒店房价牌模板_头 = 未来之窗智能设备.param2;
			   }else{
				    console.log("没得信息");
			   }
			    if(未来之窗智能设备.param3.length >5){
				    console.log("读取信息");
					wlzc_ecogen_酒店房价牌模板_价格主体 = 未来之窗智能设备.param3;
			   }else{
				    console.log("没得信息");
			   }
				

				//
				$('.cl_handle_data_roomtypebodyheader').html(wlzc_ecogen_酒店房价牌模板_头);

				//cyber_cyberwinapp_hotelprice_tpl_market_now

				

				
				CyberWin_ClientRender(wlzc_ecogen_酒店房价牌模板_价格主体).render(response.data.hotel_type, function(html){
					$('#roomtypebody').html(html);
				 });

				//2020-11-6 加载
				//2023-3-28 图片单独加载
				//cyber_cyberwinapp_tpl_max_w_1000

				if(未来之窗智能设备.param1 == "only_price"){
					//不加载图片
					// $("p").width(200);
					 $(".colorline_one").width("18%");
					 $(".yellow").css("margin-top","20px");
					 $(".white").css("margin-top","20px");
					 //.white
					 //https://cdn.ynwlzc.net/cus/cus_hotel/591494x60.png
					 //hotel_screen_title_div_hotel_logo
					 ///ljlhlk
				//取消logo2024-5-1	  $(".hotel_screen_title_div_hotel_logo").attr("src", "https://cdn.ynwlzc.net/cus/cus_hotel/591494x60.png");

					  //.hotel_screen_title_div
					  //2023-5-3
					  $(".hotel_screen_title_div").css("color","#000000");
					  $(".hotel_screen_title_div").css('font-size',"42px");
					  $(".hotel_screen_title_div").css('line-height',"60px");
					   $(".hotel_screen_title_div").css('height',"60px");
					   //: 50px;

					   //.colorline_one
					    $(".colorline_one").css('font-size',"29px");


				}else if(未来之窗智能设备.param1 == "price_4_picshow"){
				    //cyber_cyberwinapp_tpl_hotel_roomimg_width_752
				    
				}
				else if(未来之窗智能设备.param1 == "store_5982008"){
				    
				    //2024-1-27 $(".colorline_one").width("24%");//专用
				     $(".colorline_one").width("21%");//专用
				     $(".clo_hometype").width("33%");//专用
				     //clo_hometype
				      $(".hotel_screen_title_div_hotel_logo").attr("src", "https://51.onelink.ynwlzc.cn/o2o/client/device_local_app/CyberTrade_hotelScreen_defalutBy591455_981631/cus/punlogon.png");
				    
				    	//加载图片
				    	

							var 房价图片模板 = "cyber_cyberwinapp_tpl";//cwpd_screen_width
						   //强制图片大小
							房价图片模板="cyber_cyberwinapp_tpl_hotel_roomimg_width_700";

							  CyberWin_ClientRender($('#'+房价图片模板).html()).render(response.data.hotel_room_images, function(html){
								  //2020-8-14修改下单模板
								  console.log("渲染");
								  //2022-11-18
								   setTimeout(function(){ cybber_load_splash_img(); }, 3000);
									$('#cyber_cyberwinapp_body').html(html);
									
							  });

				    
				}
				    
				else{

					//加载图片

							var 房价图片模板 = "cyber_cyberwinapp_tpl";//cwpd_screen_width
							if(cwpd_screen_width <1000){
								//alert("1000");
								 房价图片模板 = "cyber_cyberwinapp_tpl_max_w_1000";
							}

							  CyberWin_ClientRender($('#'+房价图片模板).html()).render(response.data.hotel_room_images, function(html){
								  //2020-8-14修改下单模板
								  console.log("渲染");
								  //2022-11-18
								   setTimeout(function(){ cybber_load_splash_img(); }, 3000);
									$('#cyber_cyberwinapp_body').html(html);
									
							  });

				}


				  //加载背景音乐
				  if(response.data.hotel_bgsound.status==9){
					  //
					  document.getElementById("cyberwin_bgsound").src=response.data.hotel_bgsound.audio;
				  }
				  */


		  }, 'json');
	}
});