//智慧屏幕实时同步

function 东方仙盟_千丝冥缘_实时同步(设备数据_id){
    var demo1 = setInterval(function(){
       // console.log("demo1回调时间:" + new Date());
       
         	
 //   var 设备数据_id =	设备数据.hardware_smart.cyber_id;
     console.log("设备数据_id="+设备数据_id);
    	//http://pc.pcdzkj.com/
    		var 未来之窗_服务="http://pc.pcdzkj.com/xf_API/hcacolapp.php/ApplicationclientAPI/hcacol_clientScreenDataV2025API_realtime";

		 $cq.post(未来之窗_服务,{device_id:设备数据_id,datatradetype:""
		 },function(response){
		     
			   //$("span").html(result);
			   console.log("服务器-数据");
			   	console.log(response);
				if(response.status ==9 ){
					//弹出
					  //  var 播放数据= JSON.stringify(response.data.hardware_smart_layout);
					   //  console.log("渲染"+播放数据);
					//	CyberWin_JsStandardPlug.cwpd_system_set("pcsmartscrren","hardware_smart_layout",播放数据,"20225578-2019");
					// localStorage.setItem('pcsmartscrren_hardware_smart_layout', 播放数据);
					东方仙盟_千丝冥缘_本地持久化_写入(response);
						东方仙盟_千丝冥缘_统一渲染界面(response.data.hardware_smart_layout,设备数据_id);
					/*
					
					
					  CyberWin_ClientRender(tpl_未来之窗_东方仙盟_布局).render(response.data.hardware_smart_layout, function(html){
								  //2020-8-14修改下单模板
								  console.log("渲染");
								 // console.log(html);
								  //2022-11-18
								  // setTimeout(function(){ cybber_load_splash_img(); }, 3000);
								  
								  	$('#hcacol_cyberwinapp_body').html("");
									$('#hcacol_cyberwinapp_body').append(html);
									
								
									
									
									 setTimeout(function(){ 未来之窗_东方仙盟_轮播_加载所有(response.data.hardware_smart_layout,设备数据_id); }, 3000);
								 
									
						 
									
							  });
							 */ 
							  
							  if(response.downloadres=="Y"){
							     fn_东方仙盟_资源_下载资源(response.program_id); 
							  }
				 
					 
					return;
				}else{
				    console.log("服务器-数据-无新数据"); 
				}
		 }, 'JSON');
		 
    }, 1000)

}