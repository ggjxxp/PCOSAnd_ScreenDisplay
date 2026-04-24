// 指定长度和基数
function uuid2(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [],
        i;
    radix = radix || chars.length;

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
        // rfc4122, version 4 form
        var r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }

    return uuid.join('');
}
//uuid2(16, 16) // "277571702EE33E11"

function device_guid2() {
    var syscacheuuid="";
     try{
		       
		          syscacheuuid = CyberWin_JsStandardPlug.cwpd_system_get("hotel_device_info","client_uuid","20225578-2019");
	  }catch(err) {
	       console.log("设备算法设备丢失2024-5--1");
	      syscacheuuid="418F96Eab769dfe34f74512a478234a808cf005";//加载未来之窗72
	  }
//	   syscacheuuid = CyberWin_JsStandardPlug.cwpd_system_get("hotel_device_info","client_uuid","20225578-2019");
	 if(syscacheuuid){
		 if(syscacheuuid.length > 10){
			 return syscacheuuid;
		 }
	 }
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

	var wlzc_old2026versionuid = (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());

	// CyberWin_JsStandardPlug.cwpd_system_set('hotel_device_info','client_uuid',""+wlzc_old2026versionuid,"20225578-2019");
	  try{
		       
		      CyberWin_JsStandardPlug.cwpd_system_set('hotel_device_info','client_uuid',""+wlzc_old2026versionuid,"20225578-2019");
	  }catch(err) {
	       console.log("设备算法设备丢失-无法保存2024-5--1");
	      
	  }

    return wlzc_old2026versionuid;
}
//guid2() // "748eea29-f842-4af9-a552-e1e1aa3ed979"



