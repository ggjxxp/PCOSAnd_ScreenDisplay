/*
fn_fams_smartscreen_localmulticast
2026-04-27 多播放系统
*/
// ====================== FAMS 多页整页轮播 独立模块 ======================
// 统一前缀：fams_current_
// 触发条件：1.设备授权开关开启  2.读取到多页列表数据 才启动定时器
// =======================================================================

// 【1.全局核心变量 全部fams_current_前缀】
var fams_current_switch        = false;   // 轮播总开关：授权合格+有数据=true
var fams_current_page_index    = 0;       // 当前页面索引
var fams_current_page_duration = 0;       // 当前页播放时长(毫秒)
var fams_current_start_time    = 0;       // 当前页开始时间戳
var fams_current_timer         = null;    // 全局轮询定时器
var fams_current_pages_list    = [];      // 缓存多页列表数据

var fams_current_本地设备数据 =[] ;

// 【2.初始化入口：授权检测 + 读取多页数据】
function fams_ssmulticast_current_init_play()
{
    // 1.检测设备授权（复用你原有本地合规方法）
    let 设备已授权 = true;// 东方仙盟_千丝冥缘_本地持久化_检测本地合规();
	/*
    if(!设备已授权){
        fams_ssmulticast_current_close_timer();
        fams_current_switch = false;
        return;
    }
	*/

    // 2.读取本地多页配置
    fams_current_pages_list = [];
    let pagesStr = localStorage.getItem('fams_smartscrren_hardware_smart_pages');
    if(pagesStr)
    {
        try{
            fams_current_pages_list = JSON.parse(pagesStr);
        }catch(e){
            fams_current_pages_list = [];
        }
    }

    // 3.双重条件：授权通过 + 存在有效多页数据 → 开启轮播
    if(设备已授权 && fams_current_pages_list.length > 0)
    {
        fams_current_switch = true;
        fams_current_page_index = 0;
        // 初始化第一页计时
        fams_ssmulticast_current_reset_page_time();
        // 启动轮询定时器 1000ms检测一次
        fams_ssmulticast_current_open_timer();
    }else{
        fams_current_switch = false;
        fams_ssmulticast_current_close_timer();
    }
}

// 【3.重置当前页：时长 + 开始时间戳】
function fams_ssmulticast_current_reset_page_time()
{
    let 一页数据 = fams_current_pages_list[fams_current_page_index] || {};
    // 服务端max_play_duration 秒转毫秒
    fams_current_page_duration = Number(一页数据.max_play_duration || 10) * 1000;
    fams_current_start_time = Date.now();



	 console.warn("当前分页="+fams_current_page_index+"当前时长="+fams_current_page_duration);

	 if(fams_current_page_duration < 1){
		 fams_current_page_duration = 10* 1000;
	 }

	  console.warn("当前分页="+fams_current_page_index+"当前时长="+fams_current_page_duration);


}

// 【4.定时器开启】
function fams_ssmulticast_current_open_timer()
{
    fams_ssmulticast_current_close_timer();
    fams_current_timer = setInterval(function(){
        fams_ssmulticast_current_check_time_loop();
    }, 1000);
}

// 【5.定时器关闭】
function fams_ssmulticast_current_close_timer()
{
    if(fams_current_timer != null)
    {
        clearInterval(fams_current_timer);
        fams_current_timer = null;
    }
}

// 【6.核心时间检测循环】
function fams_ssmulticast_current_check_time_loop()
{
    // 总开关关闭 直接拦截
    if(!fams_current_switch) return;

    let 已播放毫秒 = Date.now() - fams_current_start_time;
    // 达到设定时长 → 切页
    if(已播放毫秒 >= fams_current_page_duration)
    {
        fams_ssmulticast_current_switch_page();
    }
}

// 【7.页面切换 + 无限循环 + 单页防白屏】
function fams_ssmulticast_current_switch_page()
{
    let 总页数 = fams_current_pages_list.length;
    if(总页数 <= 0) return;

    // 单页场景：只重置时间，不重新渲染 防止白屏
    if(总页数 === 1)
    {

        fams_ssmulticast_current_reset_page_time();
        return;
    }

    // 多页：索引递增 + 边界循环归零
    fams_current_page_index ++;
    if(fams_current_page_index >= 总页数)
    {
        fams_current_page_index = 0;
    }

    // 渲染新页面
    let 新页面数据 = fams_current_pages_list[fams_current_page_index];
  //  东方仙盟_千丝冥缘_统一渲染界面(新页面数据.hardware_smart_layout, "");

	 const 设备数据_id =	fams_current_本地设备数据.hardware_smart.cyber_id;

	 东方仙盟_千丝冥缘_统一渲染界面(新页面数据.hardware_smart_layout,设备数据_id);
	
 
    
    // 重置新页面计时
    fams_ssmulticast_current_reset_page_time();
}

// 【8.外部调用：在你 加载终端 函数最后执行初始化】
// fams_ssmulticast_current_init_play();

//
function fams_东方仙盟_千丝冥缘_多播系统_加载终端(设备数据){

	fams_current_本地设备数据=设备数据;
    
    console.warn("fams_东方仙盟_千丝冥缘_多播系统_加载终端");
     console.warn("设备数据");
    	console.warn(设备数据);
    var 本地Persistence =	东方仙盟_千丝冥缘_本地持久化_检测本地合规();

	 let pages = [];

	 const pagesStr合规 = localStorage.getItem('fams_smartscrren_hardware_smart_pages');

	if (pagesStr合规) {
	try {
		pages = JSON.parse(pagesStr合规); // 存在 → 读取
	  } catch (e) {
	  }
	}

  let 总页数 = pages.length;
  console.warn("总页数"+总页数);

   ;

    if(总页数 > 0){
       // alert("本地化数据正常");
         // var 本地设备数据_id =东方仙盟_千丝冥缘_本地持久化_提取设备id();
        //  var 灵体材料obj = 东方仙盟_千丝冥缘_本地持久化_get灵体();
          
        //	东方仙盟_千丝冥缘_统一渲染界面(灵体材料obj.data.hardware_smart_layout,本地设备数据_id);
				   //实时数据
				 
		 //  东方仙盟_千丝冥缘_实时同步(本地设备数据_id);
		 fams_ssmulticast_current_init_play();
				   
        return;
    }else{
      //  alert("本地化数据错误");
    }
    	
    var 设备数据_id =	设备数据.hardware_smart.cyber_id;
     console.log("设备数据_id="+设备数据_id);
     
     	东方仙盟_千丝冥缘_本地持久化_写入设备(设备数据);
    	
    		var 未来之窗_服务="http://pc.pcdzkj.com/xf_API/hcacolapp.php/ApplicationclientAPI/hcacol_clientScreenDataV2025API";

		 $cq.post(未来之窗_服务,{device_id:设备数据_id,datatradetype:""
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
					 
				东方仙盟_千丝冥缘_统一渲染界面(response.data.hardware_smart_layout,设备数据_id);
				   //实时数据
				   东方仙盟_千丝冥缘_实时同步(设备数据_id);
				    if(response.downloadres=="Y"){
							     fn_东方仙盟_资源_下载资源(response.program_id); 
					 }
				 
					 
					return;
				}
		 }, 'JSON');

}