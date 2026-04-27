//终端用户操作
//2024-12-15
    let 东方令牌 = 0;
   //  let startTime;
    let 通道开启时间 = null;
    
function 东方仙盟_冥界_飞升_用户操作复制载体(灵舟)
{
    let 灵体 = document.getElementById(灵舟);

    灵体.addEventListener('click', function (event) {
      if (event.clientX < 180 && event.clientY < 180) {
       // if (startTime === undefined) {
        if (通道开启时间 === null) {
           通道开启时间 = new Date().getTime();
        }
        东方令牌++;
        if (东方令牌 === 5 && (new Date().getTime() - 通道开启时间) <= 5000) { 
          //alert('在 5 秒内左上角 100 像素范围内点击了 5 次！');
          var 未来之窗配置page="cus_app/apppage/system_settings.html";
          未来之窗_通用_对话框2("系统设置——信发系统",未来之窗配置page,500,500);
          通道开启时间 = null;
          东方令牌 = 0;
        }
      }
    });
}