//fn_smart_screen_localpersistence.js?v=2023" alt="未来之窗智慧大屏幕-本地持久化
//2024-12-09
function 东方仙盟_千丝冥缘_本地持久化_写入(肉体){
     var 播放数据= JSON.stringify(肉体);
	 console.log("渲染"+播放数据);
	 
	 localStorage.setItem('pcsmartscrren_hardware_smart_layout', 播放数据);

	 东方仙盟_千丝冥缘_本地持久化_多播放_写入(肉体.data);
	 return;
	 try{
	     //cwpd_system_set
    	CyberWin_JsStandardPlug.cwpd_system_set("pcsmartscrren","hardware_smart_layout",播放数据,"20225578-2019");
					 //localStorage.setItem('pcsmartscrren_hardware_smart_layout', 播放数据);
	 }catch(Exception){
	     localStorage.setItem('pcsmartscrren_hardware_smart_layout', 播放数据);
	 }
					
}

function 东方仙盟_千丝冥缘_本地持久化_写入设备(肉体){
     //var 播放数据= JSON.stringify(肉体);
	 //console.log("渲染"+播放数据);
	 var 设备id =肉体.hardware_smart.cyber_id;
	  localStorage.setItem('pcsmartscrren_hardware_smart_layout_smart_device_id', 设备id);
	  return;
	 try{
	     //cwpd_system_set cwpd_system_o2o_set
	     
    	CyberWin_JsStandardPlug.cwpd_system_set("pcsmartscrren","hardware_smart_device_id",设备id,"20225578-2019");
					 //localStorage.setItem('pcsmartscrren_hardware_smart_layout', 播放数据);
	 }catch(Exception){
	     localStorage.setItem('pcsmartscrren_hardware_smart_layout_smart_device_id', 设备id);
	 }
					
}


function 东方仙盟_千丝冥缘_本地持久化_提取(){
      return localStorage.getItem('pcsmartscrren_hardware_smart_layout');
					     //console.log("渲染"+播放数据);
	 try{
         var 灵体材料 =	CyberWin_JsStandardPlug.cwpd_system_get("pcsmartscrren","hardware_smart_layout","20225578-2019");
					 //localStorage.setItem('pcsmartscrren_hardware_smart_layout', 播放数据);
			return	灵体材料;	
		  }catch(Exception){
	        return localStorage.getItem('pcsmartscrren_hardware_smart_layout');
	 }
}

function 东方仙盟_千丝冥缘_本地持久化_提取设备id(){
      return localStorage.getItem('pcsmartscrren_hardware_smart_layout_smart_device_id');
					     //console.log("渲染"+播放数据);
	 try{
	     //cwpd_system_get  cwpd_system_o2o_get
         var 灵体材料 =	CyberWin_JsStandardPlug.cwpd_system_get("pcsmartscrren","hardware_smart_device_id","20225578-2019");
					 //localStorage.setItem('pcsmartscrren_hardware_smart_layout', 播放数据);
			return	灵体材料;	
		  }catch(Exception){
	        return localStorage.getItem('pcsmartscrren_hardware_smart_layout_smart_device_id');
	 }
}


function 东方仙盟_千丝冥缘_本地持久化_检测本地合规(){
    var 肉体 = 东方仙盟_千丝冥缘_本地持久化_提取();
    if(肉体){
        
    }else{
        //空值
        return false;
    }
    const 身体 = JSON.parse(肉体);
    
    if(身体){
        
    }else{
        //空值
        return false;
    }
     
    if (身体.status ==9) {
        //alert("本地化数据正常");
        return true;
    }else{
        return false;
    }
}


function 东方仙盟_千丝冥缘_本地持久化_get灵体(){
    var 肉体 = 东方仙盟_千丝冥缘_本地持久化_提取();
    if(肉体){
        
    }else{
        //空值
        return false;
    }
    const 身体 = JSON.parse(肉体);
    
    if(身体){
        
    }else{
        //空值
        return false;
    }
     
    if (身体.status ==9) {
        //alert("本地化数据正常");
        return 身体;
    }else{
        return false;
    }
}


//2026-04-27
function 东方仙盟_千丝冥缘_本地持久化_多播放_写入(肉体){

	// 读取多页
    let pages = [];
    const pagesStr = localStorage.getItem('fams_smartscrren_hardware_smart_pages');

	if (pagesStr) {
	try {
		pages = JSON.parse(pagesStr); // 存在 → 读取
	  } catch (e) {
	  }
	}
    const isCovered = 肉体.iscovered === 'Y';

	if (isCovered) {
	    console.log("覆盖");
	    pages = [];//清空

	} else {
	  // ================
	  // 不覆盖 = 多页轮播
	  // ================
	  // 一页一页轮播
	  // 每一页用自己的 max_play_duration 时长
	  console.log("追加");
	}

	pages.push(肉体);


     var 播放数据pages= JSON.stringify(pages);
	 
	 
	 localStorage.setItem('fams_smartscrren_hardware_smart_pages', 播放数据pages);
	 return;
	 
					
}