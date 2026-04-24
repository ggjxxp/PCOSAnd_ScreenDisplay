//资源下载
//CyberWin_JsStandardPlug.cyber_downfile_forsmartscreen("https://taichiresource.gbim.vip/dtsweekly/weeklyducument/30智慧北京/智慧城市北京.mp4","files","12345","zhcsbj.mp4","mp4");
function fn_东方仙盟_资源_下载提示(title,msg,机器人宽度,机器人高度){
      var 机器人默认page=msg;//$(this).attr('href');
      var 未来之窗app_通用ID="wlzccommon_handle_tipsds";
		   //	var title=$(this).data('title');
	  CyberWin_Dialog.layer(机器人默认page,{type:"frame",title:title,move:false,width:机器人宽度+"px",height:机器人高度+"px",id:未来之窗app_通用ID,mask:true,align:59,hideclose:true});
 }
 function fn_东方仙盟_资源_下载提示关闭(){
    
      var 未来之窗app_通用ID="wlzccommon_handle_tipsds";
		   //	var title=$(this).data('title');
	  //wlzccommon_handle_tipsds
	  $("#"+未来之窗app_通用ID).remove();
 }
 
function fn_东方仙盟_资源_下载资源(节目id){
        // cyberwin_alert_open('同步节目','正在加载资源',"","");
        fn_东方仙盟_资源_下载提示('同步节目','正在加载资源',300,80);
         CyberWin_JsStandardPlug.speakText("开始下载资源");
    
    	var 未来之窗_服务="http://pc.ynwlzc.net/xf_API/hcacolapp.php/ApplicationclientAPI/hcacol_clientScreenDataV2025API_getProRes";

		 $.post(未来之窗_服务,{program_id:节目id,datatradetype:""
		 },function(response){
		     
			   //$("span").html(result);
			   console.log("服务器-数据-资源下载");
			   	console.log(response);
				if(response.status ==9 ){
					//弹出
					var 服务器资源=response.data.smartres;
					
					 服务器资源.forEach((资源, i) => {
                   
                        CyberWin_JsStandardPlug.cyber_downfile_forsmartscreen(资源.url,"files",资源.id,资源.filenamewithext,资源.filetype);
           
                    });
                    
                    fn_东方仙盟_资源_下载提示关闭();
				  CyberWin_JsStandardPlug.speakText("下载完成");
				 
					 
					return;
				}else{
				    console.log("服务器-数据-无新数据"); 
				}
		 }, 'json');
    
}