/*未来之窗运行时
 env 架构
，加载page 
2022-11-06
*/
var cyber_this_page;

function Page(pageobj){
	//console.log(pageobj);
	cyber_this_page=pageobj;
}

window.onload = function(){
	//alert("页面加载完成====》onload");
	console.log(cyber_this_page);
	//未来之窗
	cyber_this_page.onLoad();
	//加载未来之窗运行时
	setTimeout("cyber_this_page.onShow();",1800);
}


//未来之窗网络全局控制
 var cw=new Object();
  cw.request=function(url,method,data,success){
    
  };