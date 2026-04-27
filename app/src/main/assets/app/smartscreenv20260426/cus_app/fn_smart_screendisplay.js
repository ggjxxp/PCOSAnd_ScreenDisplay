function 东方仙盟_千丝冥缘_加载终端(设备数据){
    
    console.log("东方仙盟_千丝冥缘_加载终端");
     console.log("设备数据");
    	console.log(设备数据);
    var 本地Persistence =	东方仙盟_千丝冥缘_本地持久化_检测本地合规();
    if(本地Persistence){
       // alert("本地化数据正常");
          var 本地设备数据_id =东方仙盟_千丝冥缘_本地持久化_提取设备id();
          var 灵体材料obj = 东方仙盟_千丝冥缘_本地持久化_get灵体();
          
        	东方仙盟_千丝冥缘_统一渲染界面(灵体材料obj.data.hardware_smart_layout,本地设备数据_id);
				   //实时数据
				 
		   东方仙盟_千丝冥缘_实时同步(本地设备数据_id);
				   
        return;
    }else{
      //  alert("本地化数据错误");
    }
    	
    var 设备数据_id =	设备数据.hardware_smart.cyber_id;
     console.log("设备数据_id="+设备数据_id);
     
     	东方仙盟_千丝冥缘_本地持久化_写入设备(设备数据);
    	
    		var 未来之窗_服务="http://pc.pcdzkj.com/xf_API/hcacolapp.php/ApplicationclientAPI/hcacol_clientScreenDataV2025API";

		 $.post(未来之窗_服务,{device_id:设备数据_id,datatradetype:""
		 },function(response){
			   //$("span").html(result);
			   console.log("服务器-数据");
			   	console.log(response);
				if(response.status ==9 ){
					//弹出
						//弹出
					  //  var 播放数据= JSON.stringify(response.data.hardware_smart_layout);
					  //   console.log("渲染"+播放数据);
					//	CyberWin_JsStandardPlug.cwpd_system_set("pcsmartscrren","hardware_smart_layout",播放数据,"20225578-2019");
					 //localStorage.setItem('pcsmartscrren_hardware_smart_layout', 播放数据);
					东方仙盟_千丝冥缘_本地持久化_写入(response);
					/*
					  CyberWin_ClientRender(tpl_未来之窗_东方仙盟_布局).render(response.data.hardware_smart_layout, function(html){
								  //2020-8-14修改下单模板
								  console.log("渲染");
								 // console.log(html);
								  //2022-11-18
								  // setTimeout(function(){ cybber_load_splash_img(); }, 3000);
									$('#hcacol_cyberwinapp_body').append(html);
									
									
									 setTimeout(function(){ 未来之窗_东方仙盟_轮播_加载所有(response.data.hardware_smart_layout,设备数据_id); }, 3000);
								 
									
						 
									
							  });
							  
				*/
				东方仙盟_千丝冥缘_统一渲染界面(response.data.hardware_smart_layout,设备数据_id);
				   //实时数据
				   东方仙盟_千丝冥缘_实时同步(设备数据_id);
				    if(response.downloadres=="Y"){
							     fn_东方仙盟_资源_下载资源(response.program_id); 
					 }
				 
					 
					return;
				}
		 }, 'json');

}

//轮播函数
  function 未来之窗_东方仙盟_轮播(轮播主体, delay) {
      const slider = document.querySelector(`.${轮播主体}`);
      const slide项目 = document.querySelectorAll(`.${轮播主体} .slide_item`);
      let 灵体_轮播序号 = 0;
      let intervalId;
      console.log("未来之窗_东方仙盟_轮播==未来之窗_东方仙盟_轮播");

      function showSlide(index) {
         // console.log("开始了"+轮播主体);
        slide项目.forEach((slide, i) => {
          if (i === index) {
           // slide.style.transform = 'translateX(0)';
            // slide.style.transform = 'translateY(0)';
             
                slide.style.display = 'block';
               slider.style.animation = 'none'; // 清除之前的动画，避免冲突
               slider.offsetHeight; // 触发重绘
           //  slide.style.transform = 'translateX(0)';
             slider.style.animation = 'slideIn 0.5s ease-in-out'; // 重新应用动画
          } else {
               slide.style.display = 'none'
              //slide.style.transform = 'rotateX(30deg) rotateY(45deg) rotateZ(60deg)';
               slide.style.left = "000px";
            //slide.style.transform = 'translateX(100%)';
            //slide.style.transform = 'translateY(100%)';
            /*
             const element = document.getElementById('myElement');
   // 3D平移
   element.style.transform = 'translateZ(100px)';
   // 3D旋转
   element.style.transform = 'rotateX(30deg) rotateY(45deg) rotateZ(60deg)';
   // 3D缩放
   element.style.transform = 'scale3d(1.5, 2, 1)';
            */
           //  slide.style.transform = 'scale3d(1.5, 2, 1)';
              //slide.style.transform = 'rotateX(30deg) rotateY(45deg) rotateZ(60deg)';
          }
          // console.log(slide);
          //  console.log("播放=index="+index+"i ="+i);
           
        });
      }

      function fn_东方仙盟_图片放映_departure() {
        intervalId = setInterval(() => {
          灵体_轮播序号++;
          if (灵体_轮播序号 >= slide项目.length) {
            灵体_轮播序号 = 0;
             console.log('一轮播放完成');
          }
          showSlide(灵体_轮播序号);
        }, delay);
      }

      function stop() {
        clearInterval(intervalId);
      }

      fn_东方仙盟_图片放映_departure();

      slider.addEventListener('mouseenter', stop);
      slider.addEventListener('mouseleave', () => fn_东方仙盟_图片放映_departure());

      return {
        fn_东方仙盟_图片放映_departure: fn_东方仙盟_图片放映_departure,
        stop: stop
      };
    }
    
   function 未来之窗_东方仙盟_轮播_加载所有(数据obj,设备数据_id){
        数据obj.forEach((千丝冥缘_小世界) => {
             console.log("千丝冥缘_小世界");
			   	console.log(千丝冥缘_小世界);
			   	
			   	//slidercl
			   	if(千丝冥缘_小世界.piccount>1){
			   	    //  const slider1 = startSlider('slider1', 1500);
			   	    console.log("千丝冥缘_小世界-未来之窗_东方仙盟_轮播"+千丝冥缘_小世界.slidercl);
			      	未来之窗_东方仙盟_轮播(千丝冥缘_小世界.slidercl,1500);
			   	}
			   	
			   	//2024-10-22 excel
			   	if(千丝冥缘_小世界.excelcount > 0){
			   	    //  const slider1 = startSlider('slider1', 1500);
			   	    //console.log("千丝冥缘_小世界-未来之窗_东方仙盟_excel");
			      //	未来之窗_东方仙盟_轮播(千丝冥缘_小世界.slidercl,1500);
			      未来之窗_东方仙盟_服务器_加载Excel("excel_"+千丝冥缘_小世界.cyber_id,千丝冥缘_小世界.src);
			   	}
			   	
        });
    }
    
  var 未来之窗2024拆分单元格显示="Y" ; 
  
   const base64ToBlob = base64 => {
            let arr = base64.split(','), type = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], {type});
        };
        
function dataURItoBlob(base64Data) {
    //console.log(base64Data);//data:image/png;base64,
    var byteString;
    if(base64Data.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(base64Data.split(',')[1]);//base64 解码
    else{
        byteString = unescape(base64Data.split(',')[1]);
    }
    var mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];//mime类型 -- image/png

    // var arrayBuffer = new ArrayBuffer(byteString.length); //创建缓冲数组
    // var ia = new Uint8Array(arrayBuffer);//创建视图
    var ia = new Uint8Array(byteString.length);//创建视图
    for(var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ia], {
        type: mimeString
    });
    return blob;
}

function base64toBlob(base64, contentType) {
  var byteCharacters = atob(base64);
  var byteArrays = [];
  for (var i = 0; i < byteCharacters.length; i++) {
    byteArrays.push(byteCharacters.charCodeAt(i));
  }
  var byteArray = new Uint8Array(byteArrays);
  return new Blob([byteArray], {type: contentType});
}
function base64ToExcel(base64Data) {
  // 去除可能存在的 `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,` 前缀
  const data = base64Data.replace(/^data:application\/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,/, '');
  const binaryData = atob(data);
  const arrayBuffer = new ArrayBuffer(binaryData.length);
  const uint8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < binaryData.length; i++) {
    uint8Array[i] = binaryData.charCodeAt(i);
  }
  const workbook = XLSX.read(arrayBuffer, { type: 'array' });
  XLSX.writeFile(workbook, 'your_file_name.xlsx');
}

function base64ToExcel222(base64Data) {
  // 去除可能存在的 `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,` 前缀
 // const data = base64Data.replace(/^data:application\/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,/, '');
  const binaryData = atob(base64Data);
  return binaryData;
  const arrayBuffer = new ArrayBuffer(binaryData.length);
  //const uint8Array = new Uint8Array(arrayBuffer);
 // for (let i = 0; i < binaryData.length; i++) {
 //   uint8Array[i] = binaryData.charCodeAt(i);
 // }
  //const workbook = XLSX.read(arrayBuffer, { type: 'array' });
 // XLSX.writeFile(workbook, 'your_file_name.xlsx');
}

        
    function 未来之窗_东方仙盟_服务器_加载Excel(宿主 , 数据地址,设备数据_id){
        	var 未来之窗_服务=数据地址;
        	console.log("未来之窗_服务excel="+未来之窗_服务);
        	console.log("未来之窗_服务excel="+宿主);
        //	console.log("未来之窗_东方仙盟_服务器_加载Excel");
/*
		 $.get(未来之窗_服务,{device_id:设备数据_id,datatradetype:""
		 },function(response){
		     
			   
			   console.log("未来之窗_东方仙盟_服务器_加载Excel");
			   	console.log(response);
			       未来之窗_NewRetailDataToo_服务器_加载Excel_高级(response,未来之窗2024拆分单元格显示,"YES",0);
			 
		 });//数据地址
		 */
		 /*
		  xhrFields: {
                responseType: 'blob'
            },
            
            xhrFields: {
    responseType: 'blob'
  },
    responseType: 'arraybuffer',	// 切记必须写上，否则可能下载的是空白页
            */
           /*
		 $.ajax({
            url: 未来之窗_服务,
            method: 'GET',
           
            responseType: 'json',	// 切记必须写上，否则可能下载的是空白页
            success: function(response) {
                console.log("未来之窗_东方仙盟_服务器_加载Excel=blob");
			   	console.log(response);
			  // const 服务器数据 = dataURItoBlob(response.data);
			 // const 服务器数据 = base64toBlob(response.data);
			  //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet , 13.44 KiB
			//   var contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
              //  var 服务器数据 = base64toBlob(response.data, contentType);
               //var 服务器数据 = decodeURIComponent(response.data);
               
               	console.log("未来之窗_NewRetailDataToo==打印数据");
               		console.log(response.status);
               			console.log(response.data);
               	
               	 
                 var 服务器数据 = base64ToExcel222(response.data);
			   
			       未来之窗_NewRetailDataToo_服务器_加载Excel_高级(服务器数据,未来之窗2024拆分单元格显示,"YES",0);
            },
            error: function(xhr, status, error) { // 请求失败时的回调函数
                console.error(error); // 在控制台打印错误信息
            }
        });
        */
        
        

		 $.post(未来之窗_服务,{device_id:设备数据_id,datatradetype:""
		 },function(response){
			   //$("span").html(result);
			   console.log("服务器-数据");
			   	console.log(response);
				if(response.status ==9 ){
					//弹出
					
				 
				   	console.log("未来之窗_NewRetailDataToo==打印数据");
               	//	console.log(response.status);
               			console.log(response.data);
               			
               			 var 服务器数据 = base64ToExcel222(response.data);
			   
			     //  未来之窗_NewRetailDataToo_服务器_加载Excel_高级(服务器数据,未来之窗2024拆分单元格显示,"YES",0);
			   	未来之窗_NewRetailDataToo_服务器_加载Excel_通用	(服务器数据,宿主);
					return;
				}
		 }, 'json');

         
		 
    }
    
      ////
    function 未来之窗_NewRetailDataToo_服务器_加载Excel_通用(服务器数据,宿主id){
//	 var files = e.target.files;
      //  var fileReader = new FileReader();
      //  fileReader.onload = function(ev) {
       console.log("未来之窗_东方仙盟_服务器_加载Excel");
            try {
                var data = 服务器数据;
                var workbook = XLSX.read(data, {
                    type: 'binary'//array binary
                }) // 以二进制流方式读取得到整份excel表格对象
                var persons = []; // 存储获取到的数据
				数据表单workbook = workbook;// XLSX.read(data, {
               //     type: 'array'//array binary
             //   })//workbook;
				//2023-7-11 赋值
            } catch (e) {
                console.log('文件类型不正确');
                return;
            }
            	var 数据表单worksheet = 数据表单workbook.Sheets['Sheet1'];
            	let table = XLSX.utils.sheet_to_html(数据表单worksheet);
            	$("#"+宿主id).html(table);
           
            
              //未来之窗_NewRetailDataToo_原始渲染表格(数据表单workbook.Sheets);
              return;
            
    }
    
    
    ////
    function 未来之窗_NewRetailDataToo_服务器_加载Excel_高级(服务器数据,未来之窗2024拆分单元格显示,添加表头,数据开始行数,原始解析){
//	 var files = e.target.files;
      //  var fileReader = new FileReader();
      //  fileReader.onload = function(ev) {
       console.log("未来之窗_东方仙盟_服务器_加载Excel");
            try {
                var data = 服务器数据;
                var workbook = XLSX.read(data, {
                    type: 'binary'//array binary
                }) // 以二进制流方式读取得到整份excel表格对象
                var persons = []; // 存储获取到的数据
				数据表单workbook = workbook;// XLSX.read(data, {
               //     type: 'array'//array binary
             //   })//workbook;
				//2023-7-11 赋值
            } catch (e) {
                console.log('文件类型不正确');
                return;
            }
            if(原始解析=="YES"){
            
              未来之窗_NewRetailDataToo_原始渲染表格(数据表单workbook.Sheets);
              return;
            }
            // 表格的表格范围，可用于判断表头是否数量是否正确
            var fromTo = '';
            // 遍历每张表读取
			数据表单worksheet = 数据表单workbook.Sheets['Sheet1'];

            for (var sheet in workbook.Sheets) {
                if (workbook.Sheets.hasOwnProperty(sheet)) {
                    fromTo = workbook.Sheets[sheet]['!ref'];
                    console.log(fromTo);
                    persons = persons.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                    // break; // 如果只取第一张表，就取消注释这行
                }
            }
            //在控制台打印出来表格中的数据
           console.log(persons);
		//	console.log(persons[0]["品名"]);
		 console.log('未来之窗随机');
		 data_count_team = persons.length;//总队五
         // console.log(persons[0]);
          未来之窗_数据库_Excel_表头 = [];//清空表头
		  Object.keys(persons[0]).forEach(function (key) {
        	   //要是能在colmnMapping[key]中找到对应的英文，则变成对应的数据，否则还是用原来的
        	    // newRow[columnMapping[key] || key] = row[key];    
				//console.log('表头');
				 //console.log(key);
				 未来之窗_数据库_Excel_表头.push(key);
             });
  
			 var 表头=未来之窗_NewRetailDataToo_渲染表头_html(未来之窗_数据库_Excel_表头);
		//	 $('#cyber_cyberwinapp_header').html(表头);
			  if(添加表头=="NO"){
			     
			 }else{
			      $('#cyber_cyberwinapp_header').html(表头);
			 }
			 
			 //2024-4-14
            //  var 表格内容=未来之窗_NewRetailDataToo_渲染数据_html(未来之窗_数据库_Excel_表头,persons);
			 // var 表格内容=未来之窗_NewRetailDataToo_渲染数据_html(未来之窗_数据库_Excel_表头,persons,未来之窗2024拆分单元格显示);
			  var 表格内容=未来之窗_NewRetailDataToo_渲染数据_html(未来之窗_数据库_Excel_表头,persons,未来之窗2024拆分单元格显示,数据开始行数);
			  //数据开始行数
			 $('#cyber_cyberwinapp_body').html(表格内容);


			//cyberwin_data_table
           // $("#area").val(JSON.stringify(persons));
     //   };
        // 以二进制方式打开文件
      //  fileReader.readAsBinaryString(files[0]);
}

function 未来之窗_NewRetailDataToo_原始渲染表格(sheets) {
		//	let div = $("<div></div>")
			//遍历每一张sheet表格
			for (let i in sheets) {
				//转换HTML是一个数组对象，分为三部分:meta,title,table
				let table = $(XLSX.utils.sheet_to_html(sheets[i]))[2];
				let $table = $(table)
				$table.attr("width","80%")
				$table.attr("border","1")
				$table.attr("align","center")
				$table.css({
					"margin":"5%"
				})
				console.log("原始渲染表格");
				//	console.log($table);
					//innerHTML
				var 未来之窗表格内容tobody主体 =$table[0].innerHTML;
				console.log("原始渲染表格2222");
				console.log(未来之窗表格内容tobody主体);
				//tbody
				//tbody
				var 未来之窗表格内容tobody去除外表 =	未来之窗表格内容tobody主体.replace("<tbody>", "");
				    未来之窗表格内容tobody去除外表 =	未来之窗表格内容tobody去除外表.replace("</tbody>", "");
				  	console.log("原始渲染表格2222");
				console.log(未来之窗表格内容tobody去除外表);  
				//$("#tableContainer").append($table)
				$('#cyber_cyberwinapp_body').html(未来之窗表格内容tobody去除外表);
			}
		}
		

function 未来之窗_NewRetailDataToo_渲染表头_html(data表头){
	var  未来之窗rethtml = "<tr>";

		data表头.forEach(function(element) {
		  //console.log(element);
		  未来之窗rethtml =未来之窗rethtml + "<th >"+element+"</th>";
		});

		未来之窗rethtml =未来之窗rethtml + "</tr>";

		return 未来之窗rethtml;

}
//2024-5-14
function 未来之窗_NewRetailDataToo_渲染数据_html(data表头,数据,未来之窗2024拆分单元格显示,数据开始行数){

	var  未来之窗rethtml = "";
	
	var 未来之窗垂直列包含数据20240414={};
	
	var 数据函数20240514 = 0;

	 for (var element数据 in 数据) {
	        数据函数20240514 = 数据函数20240514 +1;
	        if(数据函数20240514 < 数据开始行数){
	            //数据开始前 终端
	            continue;
	        }
	        
				// 未来之窗_随机_抽选IDS.push(persons[idinfo].序号);
				未来之窗rethtml =未来之窗rethtml + "<tr>";
				data表头.forEach(function(element表头) {
			  //console.log(element);
			  /*
			  //积分商品 cyber_score_good
				//cyber_yanjuanduanma
				//cyber_good_des
				//cyber_stock_1 cyber_stock_2
				*/
								
					if(element表头 == "cyber_stock_0"){
						  未来之窗rethtml =未来之窗rethtml + "<td >"+'0'+"</td>";
					 }else if(element表头 == "cyber_stock_1"){
						 未来之窗rethtml =未来之窗rethtml + "<td >"+' '+"</td>";

					 }else if(element表头 == "cyber_stock_2"){
						 未来之窗rethtml =未来之窗rethtml + "<td >"+' '+"</td>";

					 }else if(element表头 == "cyber_yanjuanduanma"){
						 未来之窗rethtml =未来之窗rethtml + "<td >"+' '+"</td>";

					 }else if(element表头 == "cyber_score_good"){
						 未来之窗rethtml =未来之窗rethtml + "<td >"+'否'+"</td>";

					 }else if(element表头 == "cyber_good_des"){
						 未来之窗rethtml =未来之窗rethtml + "<td >"+' '+"</td>";

					 }else{
						 //条形码
					   var 未来之窗数据表格 = 数据[element数据][element表头];
					   if(未来之窗2024拆分单元格显示=="Y"){
					       //加载数据上一行
					       if(数据[element数据][element表头]){
					           未来之窗垂直列包含数据20240414[element表头]=未来之窗数据表格;
					           console.log("保留数据element表头="+element表头+"；数据="+未来之窗数据表格);
					           未来之窗rethtml =未来之窗rethtml + "<td >"+未来之窗数据表格+"</td>";
					       }else{
					            console.log("=========");
					             console.log(未来之窗垂直列包含数据20240414);
					            
					            
					           var 未来之窗数据表格_非合并=""+未来之窗垂直列包含数据20240414[element表头];
					          // 未来之窗rethtml =未来之窗rethtml + "<td >"+element表头+">"+未来之窗数据表格_非合并+"</td>";
					          未来之窗rethtml =未来之窗rethtml + "<td >"+未来之窗数据表格_非合并+"</td>";
					       }
					       
					   }else{
					       未来之窗rethtml =未来之窗rethtml + "<td >"+未来之窗数据表格+"</td>";
					   }
					 }
				});

				未来之窗rethtml =未来之窗rethtml + "</tr>";
		}

/*
		data表头.forEach(function(element数据) {
		  //console.log(element);
		  //未来之窗rethtml =未来之窗rethtml + "<th >"+element+"</th>";
				data表头.forEach(function(element表头) {
			  //console.log(element);
				   未来之窗rethtml =未来之窗rethtml + "<th >"+element+"</th>";
				});
		});
		*/

		

	return 未来之窗rethtml;


}

//
function 东方仙盟_千丝冥缘_统一渲染界面(灵体材料obj,设备数据_id){
		$cq.未来之窗_通用技术_模板渲染(tpl_未来之窗_东方仙盟_布局).render(灵体材料obj, function(html) {
                console.log("渲染");             
                $cq('#hcacol_cyberwinapp_body').html("");
				$cq('#hcacol_cyberwinapp_body').append(html);
				 setTimeout(function(){ 未来之窗_东方仙盟_轮播_加载所有(灵体材料obj,设备数据_id); }, 3000);
           });

	return;
     CyberWin_ClientRender(tpl_未来之窗_东方仙盟_布局).render(灵体材料obj, function(html){
								  //2020-8-14修改下单模板
								  console.log("渲染");
								 // console.log(html);
								  //2022-11-18
								  // setTimeout(function(){ cybber_load_splash_img(); }, 3000);
								  	$cq('#hcacol_cyberwinapp_body').html("");
								//	$('#hcacol_cyberwinapp_body').append(html);
									$cq('#hcacol_cyberwinapp_body').append(html);
									
									
									 setTimeout(function(){ 未来之窗_东方仙盟_轮播_加载所有(灵体材料obj,设备数据_id); }, 3000);
								 
									
						 
									
							  });
}
