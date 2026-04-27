 var control_keyEvent=true;

	// $(document).keydown(function (event) { 
$cq(document).事件('keydown',function(event){
		// alert(event.keyCode); 
		 //alert(String.fromCharCode(event.keyCode));
		 if (event.ctrlKey && event.keyCode == 13) { 
			   alert('Ctrl+Enter'); 
		}; 

             //回退 
			 if(event.keyCode == 8){
				  // alert("支付");
				  var text = $cq("#number_or_name_member").val(); 
				//  alert(text);
					if (text == "0" || text == "") {
						$cq("#number_or_name_member").val('');
					} else {
						var last_value = text.substr(-2, 1);
						if (last_value == '.') {
							$cq("#number_or_name_member").val(text.substr(0, text.length - 2));
						} else {
							$cq("#number_or_name_member").val(text.substr(0, text.length - 1));
						}
					}
					 return false;
	 
			 }
			 if(event.keyCode == 13){
				  // alert("支付");
				 // cyber_facepaywexin_payonly();
				// cpwd_query_member_info();
				var cybermoney=$cq("#number_or_name_member").val();
				//alert(cybermoney);

				if(cybermoney==""){
					Cyber_JsPrinterStandard.speakText(" 输入无效");
					return;
				}
				if(cybermoney=="0"){
					Cyber_JsPrinterStandard.speakText(" 输入无效");
					return;
				}


				 cyberwin_local_app_go();
	 
			 }else{
				 if(event.keyCode == 144){
					 //青蛙键盘消除
					 return ;
				 }

				 //alert(event.keyCode);
				 var data = String.fromCharCode(event.keyCode);
				 var text = $cq("#number_or_name_member").val();
				 //text=Number(text);
				 
				 if (text != '0') {
					$cq("#number_or_name_member").val(text  +''+ data);
				} else {
					if (!(data == '0' || data == '00')) {
						$cq("#number_or_name_member").val(data);
					}
				}
		}

			 switch (event.keyCode) {
				 case 37: alert('方向键-左'); break;
				 case 39: alert('方向键-右'); break;
				 };
				 return false;

	 });
