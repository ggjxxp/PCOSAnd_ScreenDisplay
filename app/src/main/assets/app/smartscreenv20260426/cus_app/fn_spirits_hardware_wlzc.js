//东方仙盟-冥界传送器

function cyberWin_Device_AIOT_Monitor(action,param){
	var 灵体 = "类型："+action+"param="+param;
	alert(灵体);
	 未来之窗_通用_对话框内容("传送",灵体,300,200);
}

function 未来之窗_通用_对话框内容(title,灵体,宽度,高度){
      var 机器人默认page=灵体;//$(this).attr('href');
              var 未来之窗app_通用ID="wlzccommon_handle_msg";
		   //	var title=$(this).data('title');
				 
						var 机器人宽度=宽度;//720;
					 
							
						var 机器人高度=高度;//450;
			 
			          CyberWin_Dialog.layer(机器人默认page,{type:"frame",title:title,move:false,width:机器人宽度+"px",height:机器人高度+"px",id:未来之窗app_通用ID,mask:false,align:59,hideclose:false,alpha:0.7});
 }
