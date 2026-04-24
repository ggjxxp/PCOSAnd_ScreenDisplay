/*
 未来之窗库
 javascript loader design by cyberwin
 2022-7-8 
*/
/*
  var CyberWin_App_loader=new CyberWin_App_loader();
                                   cyberwin_pay_Wxminiprogram.pay(''+mer_id,''+store_id,'--',''+result.price,'TSS_'+result.order_id);
								   */
var CyberWin_App_loader=function(){

	this.init = function(){
		 $cq("#cyberwin_app_loader").show();
		 
	}

	this.finish = function(){
		 $cq("#cyberwin_app_loader").hide();
		 
	}

	this.loadimg = function(img_arr){
		var nums = img_arr.length;
		  var start = 0;
		  for(var i in img_arr){
		   var img = document.createElement('img');
		   img.src = img_arr[i];
		   (function(j){
			img.onload = function(){
			 start++;
			 if(start == nums){
			  console.log('全部加载完成');
			 }
			 //document.getElementById('loading').style.width = (start/nums)*100 + '%';
			};
			img.onerror = function(){
			 start++;
			 console.log(img_arr[j] + '失败');
			 //document.getElementById('loading').style.width = (start/nums)*100 + '%';
			}
		   })(i);
		 
		  }
		 
	}


	this.loadscript = function(scriptes){
		var nums = scriptes.length;
		 var start = 0;
		 for(var i in scriptes){
		  var script = document.createElement('script');
		  script.src = scriptes[i];
		  (function(j){
		   document.body.appendChild(script);
		   script.onload = function(){
			start++;
			if(start == nums){
			   console.log('全部加载完成');
			}
			//document.getElementById('loading').style.width = (start/nums)*100 + '%';
		   };
		   script.onerror = function(){
			start++;
			console.log(srcript_arr[j] + '失败');
			//document.getElementById('loading').style.width = (start/nums)*100 + '%';
		   }
		  })(i);
		 
	   }
	}


	this.pay = function(mer_id,store_id,title,price,order_id){
		//alert("pay");
		 wx.miniProgram.navigateTo({
				url:'/cyberwin/pay/cyberwinpay?mer_id='+mer_id+'&store_id='+store_id+'&title='+title+'&price='+price+'&order_id='+order_id+"&returnurl=123",
				success: function(){
					console.log('success')
						//alert("success22");
				},
				fail: function(){
					console.log('fail');
				},
				complete:function(){
					console.log('complete');
				}
	 

	});
	}
}

