/*
未来之窗昭和仙君
 未来之窗库
 javascript query design by cyberwin
 2022-7-8 
*/
/*
 未来之窗库 - 扩展版本
 javascript query design by cyberwin
 扩展功能: each方法、AJAX支持、WLZC_serializeJson方法
 2025-8-29
*/

 
//

function $cq(cyberobjname){
    return  new cyberwin_query(cyberobjname);
}
//未来之窗昭和仙君
function $zh(cyberobjname){
    return  new cyberwin_query(cyberobjname);
}
//未来之窗昭和仙君
function 未来之窗昭和仙君(cyberobjname){
    return  new cyberwin_query(cyberobjname);
}

function cyberwin_query(cyberobjname){//参数是变体变量
	/*
   this.elements=[];//选择器选择的元素扔到这个数组中
   // this.elements=[];//选择器选择的元素扔到这个数组中
  var idn= cyberobjname.startsWith("#");
  var obj_id=cyberobjname.replace("#","");

  var obj =document.getElementById(obj_id);
  return obj;*/
  this.elements=[];//选择器选择的元素扔到这个数组中
  //2025-09-25
  this.tempelements=[];
    switch(typeof cyberobjname){
        //如果参数是函数
        case 'function':
            myAddEvent(window,'load',cyberobjname);
            break;
        //如果参数是字符串
        case 'string2025':
            switch(cyberobjname.charAt(0)){
                case '#'://id选择器参数应该为#号之后的字符段
				    console.log("未来之窗操作器寻找id",cyberobjname.substring(1));
                    var obj=document.getElementById(cyberobjname.substring(1));
                    this.elements.push(obj);
					console.log("未来之窗操作器寻找id",obj);
                break;

                case '.'://class
			     {
                   // this.elements=getByClass(document,cyberobjname.substring(1));
				   this.elements = getSelectorByClassv2008(document,cyberobjname);
				 }
                    break;

                default://标签
                    this.elements=document.getElementsByTagName(cyberobjname);
            }
            break;
		case 'stringv202509wast':
		{
		    
			this.elements = getSelectorALLv2025(document,cyberobjname);
		}
		 break;
		 
		 case 'string':
		{
		    //// 支持创建新元素，如 cyberwin_query('<div>')
		      if(cyberobjname.startsWith('<') && cyberobjname.endsWith('>')) {
                 const temp = document.createElement('div');
                 temp.innerHTML = cyberobjname;
                // instance.elements = Array.from(temp.children);
                 this.elements.push(temp.children);
            } else {
		    	this.elements = getSelectorALLv2025(document,cyberobjname);
            }
		}
		 break;
        //如果参数是对象。
        case 'object':
            {
              if (cyberobjname instanceof HTMLElement){
                   this.elements.push(cyberobjname);
              }else{
                  this.elements.push(cyberobjname);
              }
            }
            break;
            
    }

}


//取值方法
cyberwin_query.prototype.val=function(value){
    if(arguments.length==1){//当参数个数为2时，使用设置css的方法
        var i=0;
		//console.log("元素赋值",value);
        for(i=0;i<this.elements.length;i++){
			//console.log("元素赋值",this.elements[i]);
            this.elements[i].value=value;
        }
    }else{//只有一个参数时获取样式
        return this.elements[0].value;;
    }
};



//2022-7-8 样式
//css方法
/*
cyberwin_query.prototype.css=function(attr,value){
    if(arguments.length==2){//当参数个数为2时，使用设置css的方法
        var i=0;
        for(i=0;i<this.elements.length;i++){
            this.elements[i].style[attr]=value;
            
        }
    }else{//只有一个参数时获取样式
        return getStyle(this.elements[0],attr);
    }
};

*/
//2025-09-20 
// 原始的css方法，重命名为css_Original
cyberwin_query.prototype.css_Original = function(attr, value) {
     //console.log("css in css_Original",attr,value); 
     
    if (arguments.length === 2) { // 当参数个数为2时，使用设置css的方法
        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].style[attr] = value;
        }
    } else { // 只有一个参数时获取样式
        return this.elements.length > 0 ? getStyle(this.elements[0], attr) : null;
    }
    return this;
};


function cyberwin_query_native_isNumber(value) {
  return typeof value === 'number' && !isNaN(value);
}

//2025-09-20 
/**
 * 增强版css方法，支持JSON对象批量设置样式
 * @param {Object|string} options - 样式对象{key: value}或单个样式属性
 * @param {string} [value] - 单个样式值（当第一个参数为字符串时）
 * @returns {Object|string} - 自身实例（设置时）或样式值（获取时）
 */
cyberwin_query.prototype.css = function(options, value) {
    // 情况1：如果是两个参数，调用原始方法设置单个样式
    if (typeof options === 'string' && arguments.length === 2) {
        return this.css_Original(options, value);
    }
    
    // 情况2：如果是一个参数且为对象，批量设置样式
    if (typeof options === 'object' && !Array.isArray(options)) {
        for (const key in options) {
          //  console.log("css in options",key);
          var cyberwin_valuecur = options[key];
          if(key == "left" || key == "top" || key == "width" || key == "height"){
             const retnumis = cyberwin_query_native_isNumber(cyberwin_valuecur);
             if(retnumis == true){
                 cyberwin_valuecur = cyberwin_valuecur + "px";
             }
          }
          
          this.css_Original(key, cyberwin_valuecur);
               /* 
            if (options.hasOwnProperty(key)) {
               //  console.log("css in options 有",key); 
                
                //this.css_Original(key, options[key]);
                this.css_Original(key, cyberwin_valuecur);
            }else{
               // console.log("css in options 没有",key); 
            }
            */
        }
        return this;
    }
    
    // 情况3：如果是一个参数且为字符串，获取样式值
    if (typeof options === 'string' && arguments.length === 1) {
        return this.css_Original(options);
    }
    
    return this;
};

//eq选择器
cyberwin_query.prototype.eq=function(n){
    return new cyberwin_query(this.elements[n]);
}

// 
//对选择器函数绑定click事件
cyberwin_query.prototype.click=function(fn){
	  // 如果传入处理器函数，则绑定事件
    if (typeof fn === 'function') {
        //return this.on('click', fn);
		    var i=0;
			//对于返回器数组的内容
			for(i=0;i<this.elements.length;i++){
				myAddEvent(this.elements[i],'click',fn);
			}
    }
    // 无参数时触发click事件
    else {
        return this.trigger('click');
    }

    var i=0;
    //对于返回器数组的内容
    for(i=0;i<this.elements.length;i++){
        myAddEvent(this.elements[i],'click',fn);
    }
}

cyberwin_query.prototype.find=function(str){
    var i=0;
    var cyberwin_find_Result=[];//存放临时数据

    for(i=0;i<this.elements.length;i++){
		/*
        switch(str.charAt(0)){

            case '.'://class类
                var aEle=getByClass(this.elements[i],str.substring(1));
            aResult.concat(aEle);//桥接到aResult内。但是
            break;

            default://其它标签名(TagName)
                var aEle=this.elements[i].getElementsByTagName(str);
                appendArr(aResult,aEle);
        }
		*/

		var ImmortalRealm_ul = getSelectorALLv2025(this.elements[i],str);
		//console.log("仙域",ImmortalRealm_ul);
		//仙域子民
		 var i_underling=0;
		 //for(i_underling=0;i_underling < this.ImmortalRealm_ul.length;i_underling++){
		 for (let i_underling in ImmortalRealm_ul) {
			 cyberwin_find_Result.push(ImmortalRealm_ul[i_underling]);//桥接到aResult内。但是
		 }

		
    }
  //  var newdQuery=new cyberwin_query();
  //  newdQuery.elements=aResult;
    //return newdQuery;//保持可链。
	//this.elements = aResult;
	//return this;
	 var newdQuery=new cyberwin_query();
   newdQuery.elements=cyberwin_find_Result;
    return newdQuery;//保持可链。
}


//可重复调用的加载函数
function myAddEvent(obj,sEv,fn){
    if(obj.attachEvent){
        obj.attachEvent('on'+sEv,function(){
            fn.call(obj);//兼容ie
        });
    }else{
        obj.addEventListener(sEv,fn,false);
    }
}


//可重复调用的加载函数
function 未来之窗_附加事件(obj,sEv,fn){
    if(obj.attachEvent){
        obj.attachEvent('on'+sEv,function(){
            fn.call(obj);//兼容ie
        });
    }else{
        obj.addEventListener(sEv,fn,false);
    }
}

//class选择器调用函数
function getByClass(oParent,sClass){
    var aEle=oParent.getElementsByTagName('*');//选择父元素的所有元素
    var aResult=[];
    var re=new RegExp('\\b'+sClass+'\\b','i');//正则边界
    var i=0;
    for(i=0;i<aEle.length;i++){
        if(re.test(aEle[i].className)){
            aResult.push(aEle[i]);
        }
    }
    return aResult;
}

//获取计算后的样式
function getStyle(obj,attr){
    //元素，样式
    if(obj.currentStyle){//兼容ie9及以下
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,false)[attr];
    }
}


//对选择器函数绑定show/hide事件
cyberwin_query.prototype.show=function(){
    var i=0;
    //对于返回器数组的内容
    for(i=0;i<this.elements.length;i++){
        //this.elements[i].style.display='block';
         //2025-10-25 保留原始信息
        var originalDisplay = this.elements[i].getAttribute('data-original-display');
        if (originalDisplay) {
            this.elements[i].style.display = originalDisplay;
        } else {
            // 如果没有存储到原始值，默认设置为 block
            this.elements[i].style.display = 'block';
        }
        
    }
}

cyberwin_query.prototype.hide=function(){
    var i=0;
    //对于返回器数组的内容
    for(i=0;i<this.elements.length;i++){
        //this.elements[i].style.display='none';
         // 存储原始的 display 属性值
         //2025-10-25 保留原始信息
        this.elements[i].setAttribute('data-original-display', this.elements[i].style.display || window.getComputedStyle(this.elements[i]).display);
        this.elements[i].style.display = 'none';
    }
};

function getSelectorByClassv2008(oParent,sClass){
    //var aEle=oParent.getElementsByTagName('*');//选择父元素的所有元素
   // var aResult=[];
    //var re=new RegExp('\\b'+sClass+'\\b','i');//正则边界
	//var aEle= oParent.querySelector(sClass); 
	//querySelectorAll
	var Cyberwin_Ele= oParent.querySelectorAll(sClass); 
	//console.log("未来之窗操作器text",Cyberwin_Ele);

	var cyberwin_ret=[];
    var i=0;
    for(i=0;i<Cyberwin_Ele.length;i++){
		//console.log("未来之窗操作器text",Cyberwin_Ele[i]);
        //if(re.test(Cyberwin_Ele[i].className)){
            cyberwin_ret.push(Cyberwin_Ele[i]);
       // }
    }
    return cyberwin_ret;
}


function getSelectorALLv2025(oParent,sClass){
    //var aEle=oParent.getElementsByTagName('*');//选择父元素的所有元素
   // var aResult=[];
    //var re=new RegExp('\\b'+sClass+'\\b','i');//正则边界
	//var aEle= oParent.querySelector(sClass); 
	//querySelectorAll
	var Cyberwin_Ele= oParent.querySelectorAll(sClass); 
	//console.log("getSelectorALLv2025",sClass,Cyberwin_Ele);

	var cyberwin_ret=[];
    var i=0;
    for(i=0;i<Cyberwin_Ele.length;i++){
		//console.log("未来之窗操作器text",Cyberwin_Ele[i]);
        //if(re.test(Cyberwin_Ele[i].className)){
            cyberwin_ret.push(Cyberwin_Ele[i]);
       // }
    }
    return cyberwin_ret;
}

//2025-8-29
//innerText innerHTML
cyberwin_query.prototype.text=function(value){
//	console.log("未来之窗操作器text",this);
	const that=this;

    if(arguments.length==1){//当参数个数为2时，使用设置css的方法
        var i=0;
		//console.log("未来之窗操作器text");
        for(i=0;i<that.elements.length;i++){
			//console.log("未来之窗操作器",that.elements[i]);
            that.elements[i].innerText=value;
        }
    }else{//只有一个参数时获取样式
        return that.elements[0].innerText;;
    }
};

cyberwin_query.prototype.html=function(value){
	const that=this;
    if(arguments.length==1){//当参数个数为2时，使用设置css的方法
        var i=0;
        for(i=0;i<that.elements.length;i++){
            that.elements[i].innerHTML=value;
        }
    }else{//只有一个参数时获取样式
        return that.elements[0].innerHTML;;
    }
};

////////////////////////////////
//增加append append
cyberwin_query.prototype.append=function(value){
	const that=this;
	
    if(arguments.length==1){//当参数个数为2时，使用设置css的方法
        var i=0;
        for(i=0;i<that.elements.length;i++){
            that.elements[i].innerHTML=value;
        }
    }else{//只有一个参数时获取样式
        return that.elements[0].innerHTML;;
    }
};

//////////////////////////////////////////////////////////
//获取数据
// 模拟 jQuery 的 data() 方法，用于获取和设置 data-* 属性
cyberwin_query.prototype.data = function(key, value) {
    // 如果没有参数，返回所有data属性的集合
    if (arguments.length === 0) {
        if (this.elements.length === 0) return null;
        
        var data = {};
        var dataset = this.elements[0].dataset;
        
        // 遍历所有data属性
        for (var prop in dataset) {
            if (dataset.hasOwnProperty(prop)) {
                // 尝试将值转换为适当的类型
                data[prop] = this.convertDataValue(dataset[prop]);
            }
        }
        return data;
    }
    
    // 如果只有一个参数，获取指定的data属性
    if (arguments.length === 1) {
        if (this.elements.length === 0) return undefined;
        
        // 转换为驼峰式命名，因为dataset使用驼峰式
        var camelCaseKey = this.toCamelCase(key);
        var value = this.elements[0].dataset[camelCaseKey];
        
        // 转换数据类型
        return this.convertDataValue(value);
    }
    
    // 两个参数，设置data属性
    if (arguments.length === 2) {
        var camelCaseKey = this.toCamelCase(key);
        
        for (var i = 0; i < this.elements.length; i++) {
            // 设置dataset属性，自动处理为data-*属性
            this.elements[i].dataset[camelCaseKey] = value;
        }
        
        // 支持链式调用
        return this;
    }
};

// 辅助方法：将连字符命名转换为驼峰式命名
cyberwin_query.prototype.toCamelCase = function(str) {
    return str.replace(/-([a-z])/g, function(match, letter) {
        return letter.toUpperCase();
    });
};

// 辅助方法：将字符串值转换为适当的数据类型
cyberwin_query.prototype.convertDataValue = function(value) {
    if (value === undefined) return undefined;
    
    // 尝试转换为数字
    if (!isNaN(value) && value !== '') {
        return Number(value);
    }
    
    // 转换布尔值
    if (value === 'true') return true;
    if (value === 'false') return false;
    
    // 尝试解析JSON
    try {
        return JSON.parse(value);
    } catch (e) {
        // 不是JSON，返回原始字符串
        return value;
    }
};

////////////////////////////////////////////////////////

///////////////////////////////////////
//属性
// 模拟 jQuery 的 attr() 方法，用于获取和设置元素属性
cyberwin_query.prototype.attr = function(name, value) {
    // 没有元素时返回null
    if (this.elements.length === 0) {
        return null;
    }
    
    // 情况1: 传入一个对象，批量设置属性
    if (typeof name === 'object') {
        for (var prop in name) {
            if (name.hasOwnProperty(prop)) {
                this.attr(prop, name[prop]);
            }
        }
        return this; // 支持链式调用
    }
    
    // 情况2: 只传入属性名，获取属性值
	//console.log("attr",this.elements);
	//console.log("attr",this.elements[0]);
    if (arguments.length === 1) {
        return this.elements[0].getAttribute(name);
    }
    
    // 情况3: 传入属性名和值，设置属性
    if (arguments.length === 2) {
        // 对所有匹配元素设置属性
        for (var i = 0; i < this.elements.length; i++) {
            // 如果值为null，则移除该属性
            if (value === null) {
                this.elements[i].removeAttribute(name);
            } else {
                this.elements[i].setAttribute(name, value);
            }
        }
        return this; // 支持链式调用
    }
};

// 额外添加removeAttr方法，用于移除属性
cyberwin_query.prototype.removeAttr = function(name) {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].removeAttribute(name);
    }
    return this; // 支持链式调用
};
///////////////////////////////////////////////////////////////////////////////////////////

//排除
// 模拟 jQuery 的 not() 方法
cyberwin_query.prototype.not = function(selector) {
    // 存储过滤后的元素
    var filtered = [];
    var i, j, len, elem, match;
    
    // 遍历当前所有元素
    for (i = 0, len = this.elements.length; i < len; i++) {
        elem = this.elements[i];
        match = false;
        
        // 根据不同类型的选择器进行匹配检查
        if (typeof selector === 'string') {
            // 选择器字符串 - 检查元素是否匹配该选择器
            match = this.matchesSelector(elem, selector);
        } 
        else if (selector.nodeType) {
            // DOM 元素 - 检查是否为同一个元素
            match = elem === selector;
        } 
        else if (typeof selector === 'function') {
            // 函数 - 执行函数，返回true表示要排除
            match = selector.call(elem, i, elem);
        }
        else if (selector instanceof cyberwin_query) {
            // 另一个cyberwin_query对象 - 检查是否存在于该对象中
            for (j = 0; j < selector.elements.length; j++) {
                if (elem === selector.elements[j]) {
                    match = true;
                    break;
                }
            }
        }
        
        // 如果不匹配，则保留该元素
        if (!match) {
            filtered.push(elem);
        }
    }
    
    // 创建并返回新的cyberwin_query对象
    var newQuery = new cyberwin_query();
    newQuery.elements = filtered;
    return newQuery;
};

// 辅助方法：检查元素是否匹配选择器
cyberwin_query.prototype.matchesSelector = function(elem, selector) {
    // 现代浏览器支持的方法
    if (elem.matches) {
        return elem.matches(selector);
    }
    // 兼容旧版浏览器
    else if (elem.msMatchesSelector) {
        return elem.msMatchesSelector(selector);
    }
    else if (elem.webkitMatchesSelector) {
        return elem.webkitMatchesSelector(selector);
    }
    // 降级处理：使用选择器查找元素并检查是否包含当前元素
    else {
        var matches = (elem.document || elem.ownerDocument).querySelectorAll(selector);
        for (var i = 0; i < matches.length; i++) {
            if (matches[i] === elem) {
                return true;
            }
        }
        return false;
    }
};
//////////////////////////////////////////////////////
// 1. 添加each方法
cyberwin_query.prototype.each = function(callback) {
    if (typeof callback === 'function') {
        for (var i = 0; i < this.elements.length; i++) {
            // 执行回调函数，传入索引和当前元素，this指向当前元素
            callback.call(this.elements[i], i, this.elements[i]);
        }
    }
    return this; // 支持链式调用
};

//2025-08-29 表单校验
cyberwin_query.prototype.未东方仙盟_通用技术_检测表单 = function(tiptype) {
      var 通过检测=true;
	  const that=this;
/*
	   for(i=0;i<that.elements.length;i++){
			console.log("未东方仙盟_通用技术_检测表单",that.elements[i]);
            that.each(that.find("input,select,textarea,select"))
        }
			*/
			//that.find("input,select,textarea,select")
			/*
			$cq(".通用输入").each(function(){
    alert($cq(this).val())
  });*/
		that.each()
			that.each(function(){
				//alert($cq(this).val())
				   //console.log("仙域表单=",this);
				   const current_ImmortalRealm=this;
                   var current_underling_ImmortalRealm_elements_container = $cq(current_ImmortalRealm).find("input,select,textarea,select");
				  //  console.log("子民=",current_underling_ImmortalRealm_elements_container);
					//仙域大陆之圣天子民
					const current_underling_ImmortalRealm= current_underling_ImmortalRealm_elements_container.elements;

					for (let i_underling in current_underling_ImmortalRealm) {
						const iiunderling=current_underling_ImmortalRealm[i_underling];
						//console.log("仙域大陆之圣天子民子民=",iiunderling);

					    var validtips = $cq(iiunderling).attr('validtips');
						//console.log("仙域大陆之圣天子民子民=",validtips);
						var 校验混合 = $cq(iiunderling).attr('validform');
						if(校验混合){
					               varlidate_arr = 校验混合.split(';');
									for(var i in varlidate_arr){
										if(varlidate_arr[i] == 'required:true'){

											if($cq(iiunderling).val() == ''){
												//$cq(item).parent().append('<em for="'+em_for+'" generated="true" class="error tips">必填项</em>');
												//alert(validtips);
												iiunderling.focus();
												if(tiptype == "layer"){
													that.showAlert(validtips, "error", 5000,"校验");
												}else{
													alert(validtips);
												}
												
												通过检测 = false;
												return 通过检测;
											}else{
												//$cq(item).parent().append('<em for="'+em_for+'" generated="true" class="error success"></em>');
											}
											//break;
										}
										//2025-09-09
										else{
										    //other reg function test
										    const fairyallianceRegExp = new RegExp(varlidate_arr[i]);
										    const fairyallianceRegUserValue = $cq(iiunderling).val();
										    const fairyallianceRegExpRet = fairyallianceRegExp.test(fairyallianceRegUserValue);
										     if(fairyallianceRegExpRet == false){
										         iiunderling.focus();
										         if(tiptype == "layer"){
										             that.showAlert(validtips, "error", 5000,"校验");
										         }else{
										             alert(validtips);
										         }
										         通过检测 = false;
										         return 通过检测;
										    
										    
										    
										}
									}
							}
					  }

					}


			  });
/*
		$.each($cq('#'+魔都).find("input,select,textarea,select").not(":submit,:reset,:image,[disabled]"),function(i,灵体){
			        var 校验提示 = $cq(灵体).attr('validtips');
			        
			        console.log("tips="+校验提示);
			    
			        if(校验提示){
			        }
			        
			       var 校验混合 = $cq(灵体).attr('validform');
				if(校验混合){
					varlidate_arr = 校验混合.split(',');
					for(var i in varlidate_arr){
						if(varlidate_arr[i] == 'required:true'){

							if($cq(灵体).val() == ''){
								//$cq(item).parent().append('<em for="'+em_for+'" generated="true" class="error tips">必填项</em>');
								alert(校验提示);
								通过检测 = false;
								return 通过检测;
							}else{
								//$cq(item).parent().append('<em for="'+em_for+'" generated="true" class="error success"></em>');
							}
							//break;
						}
					}
				}
				
			    });
				*/
			    
			 return 通过检测;
};
 


//全局
// 2. AJAX相关功能
// 全局AJAX设置
var cyberwin_ajaxSettings = {
    type: 'GET',
    url: '',
    data: null,
    async: true,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    error: function() {},
    success: function() {},
    complete: function() {}
};

// AJAX设置方法
$cq.ajaxSetup = function(options) {
    for (var key in options) {
        if (options.hasOwnProperty(key)) {
		//	console.log("配置",key);
            cyberwin_ajaxSettings[key] = options[key];
        }
    }
};

// AJAX核心方法
$cq.ajax = function(options) {
    // 合并配置，优先级：调用时传入 > 全局设置
    var settings = {};
    for (var key in cyberwin_ajaxSettings) {
        settings[key] = cyberwin_ajaxSettings[key];
    }
    for (var key in options) {
        if (options.hasOwnProperty(key)) {
            settings[key] = options[key];
        }
    }

    // 创建XMLHttpRequest对象
    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        // 兼容IE6及以下
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
     // 标记是否为FormData类型
    //var isFormData = false;//settings.data instanceof FormData;
    
    //2026-04-09
     var isFormData = settings.data instanceof FormData;

    // 处理数据
    var dataStr = '';
    /*
    if (settings.data && typeof settings.data === 'object') {
        for (var key in settings.data) {
            if (settings.data.hasOwnProperty(key)) {
                dataStr += encodeURIComponent(key) + '=' + encodeURIComponent(settings.data[key]) + '&';
            }
        }
        dataStr = dataStr.slice(0, -1);
        
        isFormData =true;
    }
    
    */
    
    //2025-08-30
     // 处理不同类型的数据
    var sendData = null;
    if (settings.data) {
        if (isFormData || 
            settings.data instanceof Blob || 
            settings.data instanceof ArrayBuffer ||
            settings.data instanceof URLSearchParams) {
            sendData = settings.data;
            
            dataStr= sendData;
        } else if (typeof settings.data === "object") {
            // 深度序列化对象为表单编码格式
            function serializeFormData(data, prefix) {
                var formData = [];
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        var fullKey = prefix ? prefix + "[" + key + "]" : key;
                        if (typeof data[key] === "object" && data[key] !== null && !Array.isArray(data[key])) {
                            formData = formData.concat(serializeFormData(data[key], fullKey));
                        } else {
                            formData.push(encodeURIComponent(fullKey) + "=" + encodeURIComponent(data[key]));
                        }
                    }
                }
                return formData;
            }
            sendData = serializeFormData(settings.data).join("&");
            dataStr= sendData;
            //2026-04-09 传送二进制表单
            if (settings.data instanceof FormData){
               dataStr =settings.data; 
            }
            
            if (settings.data instanceof Blob || 
                 settings.data instanceof ArrayBuffer ||
                 settings.data instanceof URLSearchParams) {
                    dataStr =settings.data; 
              }
            
        } else {
            sendData = String(settings.data);
            dataStr= sendData;
        }
    }
    
    // 表单判断
   

    // 处理URL（GET方法时附加数据）
    var url = settings.url;
    if (settings.type.toUpperCase() === 'GET' && dataStr) {
        url += (url.indexOf('?') > -1 ? '&' : '?') + dataStr;
        dataStr = null; // GET方法不需要send数据
    }

    // 打开连接
    xhr.open(settings.type, url, settings.async);

    // 设置请求头
    /*
    for (var key in settings.headers) {
        if (settings.headers.hasOwnProperty(key)) {
			console.log("配置设置请求头",key);
            xhr.setRequestHeader(key, settings.headers[key]);
        }
    }
    */
    
     // 关键改进：FormData类型不设置Content-Type，让浏览器自动处理
    if (!isFormData) {
        // 非FormData类型才手动设置请求头
        if (settings.type.toUpperCase() === "POST" && typeof sendData === "string") {
            // 默认表单编码
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        }
        
        // 应用自定义请求头
        for (var key in settings.headers) {
            if (settings.headers.hasOwnProperty(key)) {
                xhr.setRequestHeader(key, settings.headers[key]);
            }
        }
    } else {
        // 针对FormData的特殊处理：清除可能存在的Content-Type覆盖
        if (settings.headers && settings.headers["Content-Type"]) {
            console.warn("使用FormData时不需要手动设置Content-Type，已自动移除");
            delete settings.headers["Content-Type"];
        }
        // 只应用除Content-Type外的其他自定义头
        for (var key in settings.headers) {
            if (settings.headers.hasOwnProperty(key) && key.toLowerCase() !== "content-type") {
                xhr.setRequestHeader(key, settings.headers[key]);
            }
        }
    }

    // 处理响应
	/*
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            // 调用完成回调
            settings.complete(xhr);
            
            if (xhr.status >= 200 && xhr.status < 300) {
                // 成功回调
                var responseData;
                try {
                    // 尝试解析JSON
                    responseData = JSON.parse(xhr.responseText);
                } catch (e) {
                    // 解析失败则返回原始文本
                    responseData = xhr.responseText;
                }
                settings.success(responseData, xhr.status, xhr);
            } else {
                // 错误回调
                settings.error(xhr, xhr.status, xhr.statusText);
            }
        }
    };
*/
// 改进AJAX的错误处理部分
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
				// 调用完成回调
				settings.complete(xhr);
				
				if (xhr.status >= 200 && xhr.status < 300) {
					// 成功回调（保持不变）
					var responseData;
					//dataType
					var wlzc_datatypereturn="normal";
					 if (options.hasOwnProperty("dataType")) {
                        wlzc_datatypereturn = options["dataType"];
					 }

					 if(wlzc_datatypereturn=="JSON"){
						 try {
						       responseData = JSON.parse(xhr.responseText);
						   } catch (e) {
							   // console.log("错误名称：", e.name);       // "ReferenceError"
                               //console.log("错误信息：", e.message);    // "undefinedFunction is not defined"
                               //console.log("调用栈：", e.stack);        // 显示错误发生的位置和调用链
							   var errorDetails = {
									net_status: xhr.status,
									net_statusText: xhr.statusText,
									net_response: xhr.responseText,
									net_type: xhr.status === 0 ? "网络错误" : "HTTP错误",
									net_message: xhr.status === 0 
										? "无法连接到服务器，可能是跨域问题或服务器未运行" 
										: "服务器返回错误状态: " + xhr.status + " " + xhr.statusText
									,status: 4001
									,err_name: e.name
									,err_message: e.message
									,err_stack: e.stack
								};
								
								// 调用错误回调并传递详细信息
								settings.error(errorDetails,xhr);
								


						   }

						// settings.success(responseData, xhr.status, xhr);
					 }
					 if(wlzc_datatypereturn=="normal"){
						 responseData = xhr.responseText;
					 }
/*
					try {
						responseData = JSON.parse(xhr.responseText);
					} catch (e) {
						responseData = xhr.responseText;
					}
					*/
					settings.success(responseData, xhr.status, xhr);
				} else {
					// 增强的错误信息
					var errorDetails = {
						status: xhr.status,
						statusText: xhr.statusText,
						response: xhr.responseText,
						type: xhr.status === 0 ? "网络错误" : "HTTP错误",
						message: xhr.status === 0 
							? "无法连接到服务器，可能是跨域问题或服务器未运行" 
							: "服务器返回错误状态: " + xhr.status + " " + xhr.statusText
					};
					
					// 调用错误回调并传递详细信息
					settings.error(xhr, errorDetails);

					 if (options.hasOwnProperty("error")) {
					     options.error(errorDetails);
				      }
				}
			}
		};
    // 发送请求
    //  console.log("最终发送的数据类型:", isFormData ? "FormData（正确）" : "普通字符串");
   // console.log("仙盟最后",dataStr);
		 try{
			xhr.send(dataStr);
		 } catch (cyberwin_e) {
						//responseData = xhr.responseText;
						var errorDetails = {
                status: xhr.status,
                statusText: xhr.statusText,
                response: xhr.responseText,
                type: xhr.status === 0 ? "网络错误" : "HTTP错误",
                message: xhr.status === 0 
                    ? "无法连接到服务器，可能是跨域问题或服务器未运行" 
                    : "服务器返回错误状态: " + xhr.status + " " + xhr.statusText
						};
			  //console.log(errorDetails);
			   if (options.hasOwnProperty("error")) {
					options.error(errorDetails);
				}
			  //error
		 }
    
    // 返回xhr对象，方便中断请求等操作
    return xhr;
};

// 快捷GET方法
$cq.get = function(url, data, success, dataType) {
    // 处理参数重载
    if (typeof data === 'function') {
        dataType = success;
        success = data;
        data = null;
    }
    
    return $cq.ajax({
        type: 'GET',
        url: url,
        data: data,
        success: success
    });
};

// 快捷POST方法
$cq.post = function(url, data, success, dataType) {
    // 处理参数重载
    if (typeof data === 'function') {
        dataType = success;
        success = data;
        data = null;
    }
    /*
    return $cq.ajax({
        type: 'POST',
        url: url,
        data: data,
        success: success
    });
    */
     return $cq.ajax({
        type: 'POST',
        url: url,
        data: data,
        success: success,//2026-04-08
        dataType:dataType
    });
};

 cyberwin_query.prototype.serializeJson=function(){  
        var serializeObj={};  
        var array=this.serializeArray();  
        $(array).each(function(){  
            if(serializeObj[this.name]){  
                if($.isArray(serializeObj[this.name])){  
                    serializeObj[this.name].push(this.value);  
                }else{  
                    serializeObj[this.name]=[serializeObj[this.name],this.value];  
                }  
            }else{  
                serializeObj[this.name]=this.value;   
            }  
        });  
        return serializeObj;  
    }; 
 cyberwin_query.prototype.WLZC_serializeJson2024=function(){  
        var wlzc_serializeObj={};  
        var array=this.serializeArray();  
        $(array).each(function(){ 
			var wlzc_ei_name = this.name;
			//ymethod[1][paymethod_id]
			var ie = wlzc_ei_name.indexOf("[");
			if(ie >=0){
				//console.log("未来之窗编码，存在" + wlzc_ei_name);
				var wlzc_ei_name_yh1 =wlzc_ei_name.replace(/]/g,"");
				const wlzc_ei_name_Array = wlzc_ei_name_yh1.split("[");
				//console.log("未来之窗编码，分组");
				const  wlzc_ei_len = wlzc_ei_name_Array.length;
			//	console.log(wlzc_ei_name_Array);
				if(wlzc_ei_len == 3){
					var array_1 =wlzc_ei_name_Array[0];
					var array_2 =wlzc_ei_name_Array[1];
					var array_3 =wlzc_ei_name_Array[2];
					//错误 wlzc_serializeObj[array_1][array_2][array_3]=this.value;  
					//var jsonobj = array_2[array_3]=this.value;  
					var jsonobj_3=Array();
                    jsonobj_3[array_3]=this.value;  
					//console.log("未来之窗编码，分组jsonobj_3");
					//console.log(jsonobj_3);

					var jsonobj_2=Array();
                    jsonobj_2[array_2] = jsonobj_3;  
					//console.log("未来之窗编码，分组jsonobj_2");
					//console.log(jsonobj_2);
					//wlzc_serializeObj[array_1]=jsonobj_2;
					if(wlzc_serializeObj[array_1]){ 
                       
					}else{
					//	wlzc_serializeObj[array_1]=[];  
						wlzc_serializeObj[array_1]={};  
					}

					if(wlzc_serializeObj[array_1][array_2]){ 
                       
					}else{
						// wlzc_serializeObj[array_1][array_2]=[]; 
						  wlzc_serializeObj[array_1][array_2]={}; 
					}

					if(wlzc_serializeObj[array_1][array_2][array_3]){ 
                       wlzc_serializeObj[array_1][array_2][array_3]=this.value;  
					}else{
						 wlzc_serializeObj[array_1][array_2][array_3]=this.value;  
						 
					}

				}
			}else{
               //未来之窗
				if(wlzc_serializeObj[this.name]){  
					if($.isArray(wlzc_serializeObj[this.name])){  
						wlzc_serializeObj[this.name].push(this.value);  
					}else{  
						wlzc_serializeObj[this.name]=[wlzc_serializeObj[this.name],this.value];  
					}  
				}else{  
					wlzc_serializeObj[this.name]=this.value;   
				}

			}
        });  
        return wlzc_serializeObj;  
    }; 

// 3. 添加WLZC_serializeJson方法
cyberwin_query.prototype.WLZC_serializeJson = function() {
    var wlzc_serializeObj = {};
    var elements = this.elements[0] ? this.elements[0].elements : [];
    
    // 收集表单数据
    var array = [];
    for (var i = 0; i < elements.length; i++) {
        var elem = elements[i];
        // 跳过禁用的元素和没有name属性的元素
        if (elem.disabled || !elem.name) continue;
        
        // 处理复选框和单选按钮
        if ((elem.type === 'checkbox' || elem.type === 'radio') && !elem.checked) continue;
        
        array.push({
            name: elem.name,
            value: elem.value
        });
    }
    
    // 处理数据结构
    for (var i = 0; i < array.length; i++) {
        var item = array[i];
        var wlzc_ei_name = item.name;
        var ie = wlzc_ei_name.indexOf("[");
        
        if (ie >= 0) {
            // 处理数组形式的name，如ymethod[1][paymethod_id]
            var wlzc_ei_name_yh1 = wlzc_ei_name.replace(/]/g, "");
            var wlzc_ei_name_Array = wlzc_ei_name_yh1.split("[");
            var wlzc_ei_len = wlzc_ei_name_Array.length;
            
            if (wlzc_ei_len === 3) {
                var array_1 = wlzc_ei_name_Array[0];
                var array_2 = wlzc_ei_name_Array[1];
                var array_3 = wlzc_ei_name_Array[2];
                
                // 初始化嵌套对象
                if (!wlzc_serializeObj[array_1]) {
                    wlzc_serializeObj[array_1] = {};
                }
                if (!wlzc_serializeObj[array_1][array_2]) {
                    wlzc_serializeObj[array_1][array_2] = {};
                }
                
                // 赋值
                wlzc_serializeObj[array_1][array_2][array_3] = item.value;
            }
        } else {
            // //未来之窗
            if (wlzc_serializeObj[wlzc_ei_name]) {
                if (Array.isArray(wlzc_serializeObj[wlzc_ei_name])) {
                    wlzc_serializeObj[wlzc_ei_name].push(item.value);
                } else {
                    wlzc_serializeObj[wlzc_ei_name] = [wlzc_serializeObj[wlzc_ei_name], item.value];
                }
            } else {
                wlzc_serializeObj[wlzc_ei_name] = item.value;
            }
        }
    }
    
    return wlzc_serializeObj;
};

cyberwin_query.prototype.showAlert = function(message, type ="info", duration = 1000,titleText) {
    const existingAlert = document.querySelector('.fairy_cyberwinqueryvalert_overlay');
    if (existingAlert) {
                existingAlert.remove();
    }
    const AlertType = {
            INFO: 'info',
            SUCCESS: 'success',
            WARNING: 'warning',
            ERROR: 'error'
        };
		// 创建            // 创建遮罩层
            const overlay = document.createElement('div');
             
			overlay.className = 'fairy_cyberwinqueryvalert_overlay';
			overlay.id = 'fairy_cyberwinqueryvalert_overlay_hhaha';
            
            // 创建提示框容器
            const alertBox = document.createElement('div');
           
		  
            
            // 设置提示框头部样式（根据类型）
            let headerClass, iconClass;
            switch(type) {
                case AlertType.SUCCESS:
                    headerClass = 'bg-success text-white';
                    iconClass = 'fa-check-circle';
                    break;
                case AlertType.WARNING:
                    headerClass = 'bg-warning text-white';
                    iconClass = 'fa-exclamation-triangle';
                    break;
                case AlertType.ERROR:
                    headerClass = 'bg-danger text-white';
                    iconClass = 'fa-times-circle';
                    break;
                default:
                    headerClass = 'bg-primary text-white';
                    iconClass = 'fa-info-circle';
            }

			 alertBox.className = `fairy_cyberwinqueryvalert_alert_box fairy_cyberwinqueryvalertty-${type} alert-enter`;
            // alertBox.className = `alert-box alert-${type} alert-enter`;
            // 设置提示框内容
			 // 设置标题文本
            //const titleText = type === AlertType.INFO ? '提示' : 
            //                 type === AlertType.SUCCESS ? '成功' : 
           //                  type === AlertType.WARNING ? '警告' : '错误';
            // 设置提示框内容
		    const 未来之窗style = `
			<style>
			/* 遮罩层样式 */
        .fairy_cyberwinqueryvalert_overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 999999;;
        }
		 .fairy_cyberwinqueryvalert_alert_box {
            background-color: white;
            border-radius: 8px;
            width: 90%;
            max-width: 400px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            overflow: hidden;
        }

		 .fairy_cyberwinqueryvalert_alert_header {
            padding: 16px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: white;
            font-weight: 600;
            font-size: 18px;
			 
        }
		 

        .fairy_cyberwinqueryvalertty-info .fairy_cyberwinqueryvalert_alert_header {
            background-color: #165DFF;
        }

        .fairy_cyberwinqueryvalertty-success .fairy_cyberwinqueryvalert_alert_header {
            background-color: #00B42A;
        }

        .fairy_cyberwinqueryvalertty-warning .fairy_cyberwinqueryvalert_alert_header {
            background-color: #FF7D00;
        }

        .fairy_cyberwinqueryvalertty-error .fairy_cyberwinqueryvalert_alert_header {
            background-color: #F53F3F;
        }

        /* 提示内容 */
        .fairy_cyberwinqueryvalert_alert_content {
            padding: 20px;
            font-size: 16px;
            color: #333;
            line-height: 1.5;
        }

        /* 按钮区域 */
        .fairy_cyberwinqueryvalert_alert_footer {
            padding: 12px 20px;
            background-color: #f5f5f5;
            display: flex;
            justify-content: flex-end;
        }

        .fairy_cyberwinqueryvalert_alert_footer button {
            background-color: #165DFF;
            color: white;
            padding: 8px 16px;
            font-size: 14px;
			border-radius: 6px;
    border: none;
        }

        .fairy_cyberwinqueryvalert_alert_footer button:hover {
            background-color: #0E42D2;
        }

        /* 关闭按钮 */
        .fairy_cyberwinqueryvalert_alert_close_btn {
            background: none;
            border: none;
            color: inherit;
            font-size: 20px;
            cursor: pointer;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

		</style>
		`;
            const 未来之窗mess = `
                <div class="fairy_cyberwinqueryvalert_alert_header fairy_cyberwinqueryvalertty-${type}">
                    <span>${titleText}</span>
                    <button class="fairy_cyberwinqueryvalert_alert_close_btn" onClick=" setTimeout(() => {
                    document.getElementById('fairy_cyberwinqueryvalert_overlay_hhaha').remove();
                }, 300);">&times;</button>
                </div>
                <div class="fairy_cyberwinqueryvalert_alert_content">
                    <p>${message}</p>
                </div>
                <div class="fairy_cyberwinqueryvalert_alert_footer">
                    <button class="confirm-btn" onClick=" setTimeout(() => {
                    document.getElementById('fairy_cyberwinqueryvalert_overlay_hhaha').remove();
                }, 300);">确定</button>
                </div>
            `;


			 alertBox.innerHTML = 未来之窗style+未来之窗mess;
            
            
            // 将提示框添加到遮罩层
            overlay.appendChild(alertBox);
            // 将遮罩层添加到页面
            document.body.appendChild(overlay);
            
            // 获取关闭按钮并添加事件
           // const closeBtn = alertBox.querySelector('.close-btn');
           // const confirmBtn = alertBox.querySelector('.confirm-btn');
            
          
            
            // 添加关闭事件
            //closeBtn.addEventListener('click', closeAlert);
           // confirmBtn.addEventListener('click', closeAlert);
            
            // 点击遮罩层关闭（可选）
			/*
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    closeAlert();
                }
            });
            */
            // 自动关闭（如果设置了duration）
            if (duration > 0) {
               // setTimeout(closeAlert, duration);
			   setTimeout(() => {
                    document.getElementById('fairy_cyberwinqueryvalert_overlay_hhaha').remove();
                }, duration);
            }
}

//2025-08-29 
//Cyber_JsPrinterStandard
//CyberWin_JsStandardPlug
//c#
//CyberWin_JsStandardPlug
//CyberWin_APP
//cyberwinapp_aj
//cwpd_aj
//cyberwinapp_ajs
//(String url, String method,String postdata,String key)
//public String cyberwinapp_aj(String url, String method,String postdata) {
 //public String cwpd_aj(String url, String method,String postdata) {
//cyberwinapp_aiot
//(string action, string param1, string param2)
//
$cq.net_aj = function(options) {
     return CyberWin_JsStandardPlug.cwpd_aj(options.url,options.method,options.data);
};
$cq.app_aj = function(options) {
     return CyberWin_JsStandardPlug.cyberwinapp_aj(options.url,options.method,options.data);
};

$cq.app_ajs = function(options) {
     return CyberWin_JsStandardPlug.cyberwinapp_ajs(options.url,options.method,options.data,options.key);
};
//pc
$cq.app_aiot = function(options) {
     return CyberWin_JsStandardPlug.cyberwinapp_aiot(options.action,options.param1,options.param2);
};
//and
// CyberWin_JsStandardPlug.cyberWin_Device_AIOT_Monitor(灵舟,灵魂);
//("spiritsssttclient",灵魂);
$cq.app_aiot_and = function(options) {
     return CyberWin_JsStandardPlug.cyberWin_Device_AIOT_Monitor(options.action,options.param1);
};

//2025-09-06
//读取电子秤数据
$cq.未来之窗_智能IOT_读取电子秤 = function(options) {
     return CyberWin_JsStandardPlug.cwpd_communicationelectronicscale_getweight(options);
};

//2025-08-30 
// 未来之窗渲染引擎整合到$cq库
// @Name： 未来之窗渲染引擎
// @Author：cybersnow
// @Site： www.ynwlzc.cn
// @LastEdit: 未来之窗
// 2022-10-17

//fairy_cyberwinquery

// 渲染引擎全局配置（可外部修改）
$cq.fairy_cyberwinqueryrenderConfig = {
    open: "{cwpdapp{",
    close: "}}"
};


	// AJAX设置方法
	$cq.渲染配置 = function(options) {
	   if (options && typeof options === "object") {
				if (options.open) $cq.fairy_cyberwinqueryrenderConfig.open = options.open;
				if (options.close) $cq.fairy_cyberwinqueryrenderConfig.close = options.close;
		 }
	};

	// 渲染引擎工具函数
	var fairy_cyberwinqueryrenderUtils = {
		exp: function(a) {
			return new RegExp(a, "g");
		},
		query_豆包不行: function(a, c, e) {
			var f = ["#([\\s\\S])+?", "([^{#}])*?"][a || 0];
	
			return this.exp((c || "") + $cq.fairy_cyberwinqueryrenderConfig.open + f + $cq.fairy_cyberwinqueryrenderConfig.close + (e || ""));
		},
		 
		 querynew2025: function(a, c, e) {
        // 修复：正则表达式范围从[\s\S]+?缩小为特定字符集，避免匹配HTML标签
            var f = [
            "#([\\w\\.\\[\\]\\s,\\+\\-\\*\\/\\%\\!\\=\\<\\>\\&\\|\\:\\?]+?)",  // 处理逻辑块
            "([\\w\\.\\[\\]\\s,\\+\\-\\*\\/\\%\\!\\=\\<\\>\\&\\|\\:\\?]+?)"   // 处理变量输出
                ][a || 0];

                return this.exp((c || "") + $cq.fairy_cyberwinqueryrenderConfig.open + f + $cq.fairy_cyberwinqueryrenderConfig.close + (e || ""));
          },
          query: function(a, c, e) {
            var f = ["#([\\s\\S])+?", "([^{#}])*?"][a || 0];
            // return d((c || "") +$cq.fairy_cyberwinqueryrenderConfig.open + f + $cq.fairy_cyberwinqueryrenderConfig.close + (e || ""))
            var wlzcfix_a=(c || "") +$cq.fairy_cyberwinqueryrenderConfig.open + f + $cq.fairy_cyberwinqueryrenderConfig.close + (e || "");
              return new RegExp(wlzcfix_a, "g");
           },
		escape: function(a) {
		//	return String(a || "").replace(/&(?!#?[a-zA-Z0-9]+;)/g, "&amp;")
				//.replace(/</g, "&lt;")
			//	.replace(/>/g, "&gt;")
			//	.replace(/'/g, "&#39;")
			//	.replace(/"/g, "&quot;");
				
				return String(a || "").replace(/&(?!#?[a-zA-Z0-9]+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;")
		},
		error: function(a, b) {
			var c = "未来之窗渲染引擎 Error：";
			if (typeof console !== "undefined" && console.error) {
				console.error(c + a + "\n" + (b || ""));
			}
			return c + a;
		}
	};

	// 渲染器构造函数
	function fairy_cyberwinqueryRenderEngine(tpl) {
		this.tpl = tpl;
		this.cache = null;
	}

	// 解析模板并生成渲染函数
	fairy_cyberwinqueryRenderEngine.prototype.parse = function(data) {
		var tpl = this.tpl;
//	console.log("原始",tpl);
	//	var openTag = fairy_cyberwinqueryrenderUtils.exp("^" + $cq.fairy_cyberwinqueryrenderConfig.open + "#", "");
	//	var closeTag = fairy_cyberwinqueryrenderUtils.exp($cq.fairy_cyberwinqueryrenderConfig.close + "$", "");
		
		 var config = $cq.fairy_cyberwinqueryrenderConfig;
    // 修复：原openTag/closeTag正则多了第二个参数""，RegExp构造函数不支持该参数，需删除
        var openTag = fairy_cyberwinqueryrenderUtils.exp("^" + config.open + "#");
         var closeTag = fairy_cyberwinqueryrenderUtils.exp(config.close + "$");
         
        // console.log("模板解释tpl",tpl);
         //console.log("模板解释",code);
        
		// 处理模板字符串，转换为可执行代码
		var code = tpl.replace(/[\r\t\n]/g, " ")
			.replace(fairy_cyberwinqueryrenderUtils.exp($cq.fairy_cyberwinqueryrenderConfig.open + "#"), $cq.fairy_cyberwinqueryrenderConfig.open + "# ")
			.replace(fairy_cyberwinqueryrenderUtils.exp($cq.fairy_cyberwinqueryrenderConfig.close + "}"), "} " + $cq.fairy_cyberwinqueryrenderConfig.close)
			.replace(/\\/g, "\\\\")
			.replace(/(?="|')/g, "\\")
			.replace(fairy_cyberwinqueryrenderUtils.query(), function(match) {
				match = match.replace(openTag, "").replace(closeTag, "");
				//return '";' + match.replace(/\\/g, "") + '; view+="'";
				return '";' + match.replace(/\\/g, "") + '; view+="';
				//'";' + a.replace(/\\/g, "") + '; view+="'
			})
			.replace(fairy_cyberwinqueryrenderUtils.query(1), function(match) {
				var prefix = '"+(';
				match = match.replace(fairy_cyberwinqueryrenderUtils.exp($cq.fairy_cyberwinqueryrenderConfig.open + "|" + $cq.fairy_cyberwinqueryrenderConfig.close), "");
				
				// 处理=开头的变量输出（自动转义）
				if (/^=/.test(match)) {
					match = match.replace(/^=/, "");
					prefix = '"+fairy_cyberwinqueryrenderUtils.escape(';
				}
				return prefix + match.replace(/\\/g, "") + ')+"';
			});
			
			 // 修复：调整处理顺序，先处理模板语法，再处理字符转义
    var codenew = tpl
        .replace(/[\r\t\n]/g, " ")
        .replace(fairy_cyberwinqueryrenderUtils.exp(config.open + "#"), config.open + "# ")
        .replace(fairy_cyberwinqueryrenderUtils.exp(config.close + "}"), "} " + config.close)
        // 先处理模板标签替换
        .replace(fairy_cyberwinqueryrenderUtils.query(), function(match) {
            match = match.replace(openTag, "").replace(closeTag, "");
            return '";' + match.replace(/\\/g, "") + '; view+="';
        })
        .replace(fairy_cyberwinqueryrenderUtils.query(1), function(match) {
            var prefix = '"+(';
            match = match.replace(fairy_cyberwinqueryrenderUtils.exp(config.open + "|" + config.close), "");
            
            if (/^=/.test(match)) {
                match = match.replace(/^=/, "");
                prefix = '"+fairy_cyberwinqueryrenderUtils.escape(';
            }
            return prefix + match.replace(/\\/g, "") + ')+"';
        })
        // 最后处理字符转义
        .replace(/\\/g, "\\\\")
        .replace(/(?="|')/g, "\\");

		// 包装为可执行函数
		code = '"use strict";var view = "' + code + '";return view;';

		try {
			this.cache = new Function("d", "fairy_cyberwinqueryrenderUtils", code);
			return this.cache(data, fairy_cyberwinqueryrenderUtils);
		} catch (e) {
			delete this.cache;
			return fairy_cyberwinqueryrenderUtils.error(e, tpl);
		}
	};

	// 执行渲染
	fairy_cyberwinqueryRenderEngine.prototype.CyberWin_InnerClientRender = function(data, callback) {
		if (!data) {
			return fairy_cyberwinqueryrenderUtils.error("没有提供渲染数据");
		}

		var result = this.cache ? this.cache(data, fairy_cyberwinqueryrenderUtils) : this.parse(data);

		if (callback && typeof callback === "function") {
			callback(result);
			return;
		}

		return result;
	};
	fairy_cyberwinqueryRenderEngine.prototype.render = function(data, callback) {
		if (!data) {
			return fairy_cyberwinqueryrenderUtils.error("没有提供渲染数据");
		}

		var result = this.cache ? this.cache(data, fairy_cyberwinqueryrenderUtils) : this.parse(data);

		if (callback && typeof callback === "function") {
			callback(result);
			return;
		}

		return result;
	};
	
	//render

	// 为$cq添加render方法（通过模板字符串创建渲染器）
	$cq.CyberWin_ClientRender = function(tpl) {
		if (typeof tpl !== "string") {
			return fairy_cyberwinqueryrenderUtils.error("模板必须是字符串类型");
		}
		return new fairy_cyberwinqueryRenderEngine(tpl);
	};

	// 为$cq原型添加render方法（通过选择器获取模板渲染）
	cyberwin_query.prototype.CyberWin_ClientRender = function(data, callback) {
		if (this.elements.length === 0) {
			return fairy_cyberwinqueryrenderUtils.error("没有找到匹配的模板元素");
		}

		// 获取第一个匹配元素的innerHTML作为模板
		var tpl = this.elements[0].innerHTML;
		//return $cq.CyberWin_ClientRender(tpl).CyberWin_InnerClientRender(data, callback);
		return $cq.CyberWin_ClientRender(tpl).render(data, callback);
	};

//未来之窗渲染引擎
    $cq.未来之窗_通用技术_模板渲染 = function(tpl) {
		if (typeof tpl !== "string") {
			return fairy_cyberwinqueryrenderUtils.error("模板必须是字符串类型");
		}
		return new fairy_cyberwinqueryRenderEngine(tpl);
	};

	cyberwin_query.prototype.未来之窗_通用技术_模板渲染 = function(data, callback) {
		if (this.elements.length === 0) {
			return fairy_cyberwinqueryrenderUtils.error("没有找到匹配的模板元素");
		}

		// 获取第一个匹配元素的innerHTML作为模板
		var tpl = this.elements[0].innerHTML;
		//render
	//	return $cq.CyberWin_ClientRender(tpl).CyberWin_InnerClientRender(data, callback);
		return $cq.CyberWin_ClientRender(tpl).render(data, callback);
	};
	
//////html前后操作
// 为CQ库添加DOM操作方法

// 辅助函数：将HTML字符串转换为DOM节点
/*
function cyberwinqueryhtmlToElements(html) {
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = html.trim();
    return Array.from(tempDiv.childNodes);
}
*/
//2025-12-16
// 辅助函数：将HTML字符串转换为DOM节点（修复tr/td等表格标签解析问题）
//div 容器无法直接包含 tr 标签：你的cyberwinqueryhtmlToElements函数里，是把 HTML 字符串放到<div>中解析的，但根据 HTML 的规范，<div>是块级元素，不能作为<tr>的直接父元素，浏览器在解析时会自动剔除<tr>标签，只保留其内部的内容，这就导致<tr>丢失了
function cyberwinqueryhtmlToElements(html) {
    html = html.trim();
    // 定义特殊标签的合法父容器映射
    const containerMap = {
        tr: '<table><tbody></tbody></table>', // tr的父容器是tbody（嵌套在table里）
        td: '<table><tbody><tr></tr></tbody></table>', // td的父容器是tr
        th: '<table><tbody><tr></tr></tbody></table>',
        tbody: '<table></table>',
        thead: '<table></table>',
        tfoot: '<table></table>'
    };

    // 匹配HTML字符串的根标签（简单正则匹配，适配单一根标签的情况）
    const rootTagMatch = html.match(/^<([a-z0-9]+)/i);
    let tempContainer, targetNode;

    if (rootTagMatch && containerMap[rootTagMatch[1]]) {
        // 如果是表格特殊标签，使用对应的合法容器
        tempContainer = document.createElement('div');
        tempContainer.innerHTML = containerMap[rootTagMatch[1]];
        // 找到容器里的目标子节点（比如tbody对应tr的父节点）
        targetNode = tempContainer.querySelector(rootTagMatch[1] === 'tr' ? 'tbody' : rootTagMatch[1] === 'td' || rootTagMatch[1] === 'th' ? 'tr' : rootTagMatch[1]);
        targetNode.innerHTML = html;
    } else {
        // 普通标签，还是用div容器
        tempContainer = document.createElement('div');
        tempContainer.innerHTML = html;
    }

    // 返回子节点（如果是表格标签，返回目标节点的子节点，否则返回div的子节点）
    const childNodes = targetNode ? Array.from(targetNode.childNodes) : Array.from(tempContainer.childNodes);
    return childNodes;
}

// 1. append() 方法：向每个匹配元素内部的末尾添加HTML内容
cyberwin_query.prototype.append = function(html) {
   // console.log("2026="+html);
    if (typeof html !== 'string') {
        console.error('append() 方法需要传入HTML字符串');
        return this;
    }
    
    var elements = cyberwinqueryhtmlToElements(html);
    
    for (var i = 0; i < this.elements.length; i++) {
        var target = this.elements[i];
        // 克隆节点并添加到每个目标元素
        elements.forEach(function(el) {
            target.appendChild(el.cloneNode(true));
        });
    }
    
    return this; // 支持链式调用
};

// 2. prepend() 方法：向每个匹配元素内部的开头添加HTML内容
cyberwin_query.prototype.prepend = function(html) {
    if (typeof html !== 'string') {
        console.error('prepend() 方法需要传入HTML字符串');
        return this;
    }
    
    var elements = cyberwinqueryhtmlToElements(html);
    
    for (var i = 0; i < this.elements.length; i++) {
        var target = this.elements[i];
        var firstChild = target.firstChild;
		//console.error('firstChild',firstChild);
		//console.error('target',target);
        
        // 克隆节点并添加到每个目标元素开头
        elements.forEach(function(el, index) {
            var clone = el.cloneNode(true);
			//.innerHTML
            //检测网页=
			var curretn_html = target.innerHTML;
			//console.error('不存在',curretn_html);
			if(curretn_html == ""){
				target.appendChild(clone);
				return ;
			}

            if (index === 0 && firstChild) {
				//console.error('存在',target);
                target.insertBefore(clone, firstChild);
            } else {
				//console.error('不存在',target);
				//console.error('不存在',clone);
                target.insertBefore(clone, firstChild.nextSibling);
				//target.insertBefore(clone,target);
            }
        });
    }
    
    return this; // 支持链式调用
};

// 3. insertBefore() 方法：在每个匹配元素之前插入HTML内容
cyberwin_query.prototype.insertBefore = function(html) {
    if (typeof html !== 'string') {
        console.error('insertBefore() 方法需要传入HTML字符串');
        return this;
    }
    
    var elements = cyberwinqueryhtmlToElements(html);
    
    for (var i = 0; i < this.elements.length; i++) {
        var target = this.elements[i];
        var parent = target.parentNode;
        
        if (parent) {
            // 克隆节点并插入到目标元素之前
            elements.forEach(function(el) {
                parent.insertBefore(el.cloneNode(true), target);
            });
        }
    }
    
    return this; // 支持链式调用
};

// 4. insertAfter() 方法：在每个匹配元素之后插入HTML内容
cyberwin_query.prototype.insertAfter = function(html) {
    if (typeof html !== 'string') {
        console.error('insertAfter() 方法需要传入HTML字符串');
        return this;
    }
    
    var elements = cyberwinqueryhtmlToElements(html);
    
    for (var i = 0; i < this.elements.length; i++) {
        var target = this.elements[i];
        var parent = target.parentNode;
        
        if (parent) {
            var nextSibling = target.nextSibling;
            // 克隆节点并插入到目标元素之后
            elements.forEach(function(el) {
                var clone = el.cloneNode(true);
                parent.insertBefore(clone, nextSibling);
                nextSibling = clone.nextSibling; // 处理多个节点的顺序
            });
        }
    }
    
    return this; // 支持链式调用
};


/*未来之窗通用数据渲染
	 
	2022-8-29
	fn_cyberwin_common_data_rendering.js
*/
$cq.未来之窗_人工智能_前端口_数据渲染到界面 = function(obj,前置参数) {

	 //console.group("未来之窗通用数据渲染");
	 var 未来之窗_渲染_前置参数 = "cl_handle_data_";
     前置参数 = "" + 前置参数 + "";
	 if(前置参数.length > 0){
		 未来之窗_渲染_前置参数 = 前置参数;
	 }


     for (var key in obj) {

							//  console.log("明细key= "+key+" v="+obj[key]);
						    //  console.log(obj[key]);
							  

							  var 未来之窗变量=未来之窗_渲染_前置参数 + key;
							  var 未来之窗数值 = obj[key];
							  
							 //  console.log("明细keyFND= "+key+" v="+未来之窗变量);

							  $cq("."+未来之窗变量).each(function(index){
								 
								//var 未来之窗tag = $cq(this)[0].tagName;
								var 未来之窗tag = $cq(this).tagName;
								    未来之窗tag =""+未来之窗tag;
								    未来之窗tag = 未来之窗tag.toLowerCase();
								   // console.log("明细key= "+key+" tagName="+ 未来之窗tag);

									// console.log("明细key= "+key+" tagName="+ 未来之窗tag+",未来之窗数值="+未来之窗数值 ,$cq(this));
                                 
									if(未来之窗tag == "input"){
										$cq(this).val(未来之窗数值);
										if($cq(this).attr("type") === "checkbox"){
											$cq(this).prop("checked", true);
										}

									}else if(未来之窗tag == "select"){
										$cq(this).val(未来之窗数值);
									}else if(未来之窗tag == "td"){
										$cq(this).text(未来之窗数值);
									}else if(未来之窗tag == "cyberdiv"){
										$cq(this).text(未来之窗数值);
									}else if(未来之窗tag == "img"){
										$cq(this).attr("src",未来之窗数值);
										 
									}else{
										$cq(this).text(未来之窗数值);
									}

								});
						  
			}

		//console.groupEnd();

	   
};

///2025-08-30
// 为$cq库扩展获取标签名的方法
/*
cyberwin_query.prototype.tagName = function() {
    // 如果没有匹配元素，返回空字符串
    if (this.elements.length === 0) {
        return '';
    }
    
    // 返回第一个匹配元素的标签名（大写形式，与原生DOM保持一致）
    return this.elements[0].tagName || '';
};

// 扩展：获取所有匹配元素的标签名列表
cyberwin_query.prototype.tagNames = function() {
    // 遍历所有匹配元素，返回标签名数组
    return this.elements.map(el => el.tagName || '');
};

*/
// 为$cq原型添加tagName属性（使用getter）
Object.defineProperty(cyberwin_query.prototype, 'tagName', {
    get: function() {
        // 逻辑与之前的方法保持一致
        if (this.elements.length === 0) {
            return '';
        }
        return this.elements[0].tagName || '';
    }
});

// 同理实现多元素标签名数组的属性形式
Object.defineProperty(cyberwin_query.prototype, 'tagNames', {
    get: function() {
        return this.elements.map(el => el.tagName || '');
    }
});

///常规属性
// 扩展获取常用属性的方法
// 获取id属性
Object.defineProperty(cyberwin_query.prototype, 'id', {
    get: function() {
        if (this.elements.length === 0) return '';
        return this.elements[0].id || '';
    }
});

// 获取name属性
Object.defineProperty(cyberwin_query.prototype, 'name', {
    get: function() {
        if (this.elements.length === 0) return '';
        return this.elements[0].name || '';
    }
});

// 获取class属性
Object.defineProperty(cyberwin_query.prototype, 'className', {
    get: function() {
        if (this.elements.length === 0) return '';
        return this.elements[0].className || '';
    }
});

// 获取src属性
Object.defineProperty(cyberwin_query.prototype, 'src', {
    get: function() {
        if (this.elements.length === 0) return '';
        return this.elements[0].src || '';
    }
});

// 获取href属性
Object.defineProperty(cyberwin_query.prototype, 'href', {
    get: function() {
        if (this.elements.length === 0) return '';
        return this.elements[0].href || '';
    }
});

// 通用属性/特性获取设置方法
cyberwin_query.prototype.prop = function(name, value) {
    // 无匹配元素时返回空
    if (this.elements.length === 0) {
        return value === undefined ? '' : this;
    }
    
    // 仅获取属性值
    if (value === undefined) {
        return this.elements[0][name] !== undefined ? this.elements[0][name] : '';
    }
    
    // 设置属性值
    this.elements.forEach(el => {
        el[name] = value;
    });
    return this; // 支持链式调用
};
    
//20:22
//未来之窗_附加事件
// 为cq库添加on方法，支持事件绑定
cyberwin_query.prototype.on = function(events, handler) {
    // 处理对象形式的事件配置 { event1: handler1, event2: handler2 }
    if (typeof events === 'object' && typeof handler === 'undefined') {
        Object.keys(events).forEach(eventName => {
            this.on(eventName, events[eventName]);
        });
        return this;
    }

    // 确保事件名和处理器有效
    if (typeof events !== 'string' || typeof handler !== 'function') {
        console.error('事件名必须为字符串且处理器必须为函数');
        return this;
    }

    // 为所有匹配元素绑定事件
    this.elements.forEach(element => {
        // 使用已有的myAddEvent函数绑定事件
        未来之窗_附加事件(element, events, function(e) {
            // 绑定this为当前元素，传递事件对象
            handler.call(element, e || window.event);
        });
    });

    return this; // 支持链式调用
};

cyberwin_query.prototype.事件 = function(events, handler) {
    // 处理对象形式的事件配置 { event1: handler1, event2: handler2 }
    if (typeof events === 'object' && typeof handler === 'undefined') {
        Object.keys(events).forEach(eventName => {
            this.事件(eventName, events[eventName]);
        });
        return this;
    }

    // 确保事件名和处理器有效
    if (typeof events !== 'string' || typeof handler !== 'function') {
        console.error('事件名必须为字符串且处理器必须为函数');
        return this;
    }

    // 为所有匹配元素绑定事件
    this.elements.forEach(element => {
        // 使用已有的myAddEvent函数绑定事件
        未来之窗_附加事件(element, events, function(e) {
            // 绑定this为当前元素，传递事件对象
            handler.call(element, e || window.event);
        });
    });

    return this; // 支持链式调用
};

//2025-09-03
// 1. 单击事件绑定（click方法）
/*
cyberwin_query.prototype.click = function(handler) {
    // 如果传入处理器函数，则绑定事件
    if (typeof handler === 'function') {
        return this.on('click', handler);
    }
    // 无参数时触发click事件
    else {
        return this.trigger('click');
    }
};
*/
cyberwin_query.prototype.单击 = function() {
    
        return this.事件触发('click');
    
};
// 2. 事件触发方法（trigger）
cyberwin_query.prototype.事件触发 = function(eventName) {
    if (typeof eventName !== 'string') {
        console.error('事件名必须为字符串类型');
        return this;
    }

    this.elements.forEach(element => {
        // 创建事件对象
        let event;
        try {
            // 现代浏览器方式
            event = new Event(eventName, {
                bubbles: true,    // 允许事件冒泡
                cancelable: true  // 允许事件被取消
            });
        } catch (e) {
            // IE兼容方式
            event = document.createEvent('Event');
            event.initEvent(eventName, true, true);
        }

        // 触发事件
        element.dispatchEvent(event);
    });

    return this; // 支持链式调用
};

// 2. 事件触发方法（trigger）
cyberwin_query.prototype.trigger = function(eventName) {
    if (typeof eventName !== 'string') {
        console.error('事件名必须为字符串类型');
        return this;
    }

    this.elements.forEach(element => {
        // 创建事件对象
        let event;
        try {
            // 现代浏览器方式
            event = new Event(eventName, {
                bubbles: true,    // 允许事件冒泡
                cancelable: true  // 允许事件被取消
            });
        } catch (e) {
            // IE兼容方式
            event = document.createEvent('Event');
            event.initEvent(eventName, true, true);
        }

        // 触发事件
        element.dispatchEvent(event);
    });

    return this; // 支持链式调用
};

cyberwin_query.prototype.ready = function (callback) {
    $cq.ready (callback);
    return this; // 支持链式调用
};

$cq.ready = function(callback) {
    // 验证回调是否为函数 if (typeof callback !== 'function') { console.error('ready方法需要传入函数类型的回调'); return; }
// 1. 检查 DOM 是否已加载完成（DOMContentLoaded 事件已触发）
if (document.readyState === 'complete' || document.readyState === 'interactive') {
// 已就绪，直接执行回调（使用 setTimeout 确保异步执行，与标准库行为一致）
     setTimeout (callback, 0);
   return;
}
};

//////////////
//2025-09-05
// 添加addClass方法：为元素添加一个或多个类
cyberwin_query.prototype.addClass = function(classNames) {
    // 处理类名参数（支持空格分隔的多个类）
    if (typeof classNames !== 'string' || classNames.trim() === '') {
        console.error('addClass需要传入有效的类名字符串');
        return this;
    }
    
    const classes = classNames.trim().split(/\s+/);
    
    this.elements.forEach(element => {
        // 为每个元素添加类（避免重复添加）
        classes.forEach(className => {
            if (!element.classList.contains(className)) {
                element.classList.add(className);
            }
        });
    });
    
    return this; // 支持链式调用
};

// 添加removeClass方法：为元素移除一个或多个类
cyberwin_query.prototype.removeClass = function(classNames) {
    // 处理类名参数（支持空格分隔的多个类，无参数则移除所有类）
    const classes = typeof classNames === 'string' 
        ? classNames.trim().split(/\s+/)
        : [];
    
    this.elements.forEach(element => {
        if (classes.length === 0) {
            // 无参数时移除所有类
            element.className = '';
        } else {
            // 移除指定的类
            classes.forEach(className => {
                if (element.classList.contains(className)) {
                    element.classList.remove(className);
                }
            });
        }
    });
    
    return this; // 支持链式调用
};

cyberwin_query.prototype.添加样式 = function(classNames) {
     return this.addClass(classNames); 
};
cyberwin_query.prototype.删除样式 = function(classNames) {
    return this.removeClass(classNames); 
};

//客户端指纹 -万象 2025-09-05
$cq.东方仙盟_bs_Fingerprint = function(options) {
      let fingerprint = {};

            // User - Agent
            fingerprint.userAgent = navigator.userAgent;

            // 屏幕分辨率
            fingerprint.screenResolution = `${screen.width}x${screen.height}`;

            // 浏览器语言
            fingerprint.language = navigator.language;

            // 时区偏移量
            fingerprint.timezoneOffset = new Date().getTimezoneOffset();

            // 字体列表
            const fonts = [];
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const fontFamilies = ['Arial', 'Times New Roman', 'Verdana'];
            fontFamilies.forEach(fontFamily => {
                ctx.font = `16px ${fontFamily}`;
                const text = 'abcdefg';
                const width1 = ctx.measureText(text).width;
                ctx.font = `16px sans - serif`;
                const width2 = ctx.measureText(text).width;
                if (width1!== width2) {
                    fonts.push(fontFamily);
                }
            });
            fingerprint.fonts = fonts;

            // 插件列表（现代浏览器获取插件信息方式有限）
            let plugins = [];
            if (typeof navigator.plugins!== 'undefined') {
                for (let i = 0; i < navigator.plugins.length; i++) {
                    plugins.push(navigator.plugins[i].name);
                }
            }
            fingerprint.plugins = plugins;

            return fingerprint;
};
//2026-03-28 压缩 算法  _assimilation
$cq.东方仙盟_文字压缩算法 = function(input) {
     // 第一步：将字符串转换为ANSI码数组并乘以位置序号
    let resultArray = Array.from(input).map((char, index) => {
        const ansiCode = char.charCodeAt(0);
        return ansiCode *20* (index + 1); // 位置序号从1开始
    });

    // 第二步：循环处理数组直到长度不超过28
    while (resultArray.length > 32) {
        const newArray = [];
        // 两两相加
        for (let i = 0; i < resultArray.length; i += 2) {
            if (i + 1 < resultArray.length) {
                newArray.push(resultArray[i] + resultArray[i + 1]);
            } else {
                // 处理奇数长度数组的最后一个元素
                newArray.push(resultArray[i]);
            }
        }
        resultArray = newArray;
    }

    // 第三步：转换为16进制并取最后一位连接成字符串
    return resultArray
        .map(num => num.toString(16).slice(-1))
        .join('');
};

//2025-09-11
function dataToDonetQueryFormat(data) {
    // 检查是否为数组或对象（PHP中的is_array对应JS中的Array.isArray）
    if (!Array.isArray(data) && typeof data !== 'object' || data === null) {
        return data;
    }
    
    let xml = '';
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            let processedKey = key;
            // 处理数字键名
            if (!isNaN(parseInt(key, 10)) && key === parseInt(key, 10).toString()) {
                processedKey = `item id="${key}"`;
            }
            
            xml += `CyberPHP->Param:${processedKey}CyberPHP->Value:`;
            
            // 递归处理数组或对象
            const val = data[key];
            if (Array.isArray(val) || (typeof val === 'object' && val !== null)) {
                xml += dataToDonetQueryFormat(val);
            } else {
                xml += val;
            }
            
            // 分割键名，只取第一个部分
            const keyParts = processedKey.split(' ');
            processedKey = keyParts[0];
        }
    }
    
    return xml;
}

function cyberWinAPPParse(strRaw) {
    const cyberData = {};
    const firstDataArray = strRaw.split("CyberPHP->Param:");
    
    for (const part of firstDataArray) {
        const secondSplit = part.split("CyberPHP->Value:");
        // 过滤空值
        if (!(secondSplit[0] === "" && secondSplit[1] === "")) {
            cyberData[secondSplit[0]] = secondSplit[1] || "";
        }
    }
    
    // 处理XML内容
    if (cyberData['Content']) {
        try {
            // 解析XML（浏览器环境可用DOMParser，Node.js环境需要其他库）
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(cyberData['Content'], "text/xml");
            
            const third = {};
            // 获取所有子节点
            const childNodes = xmlDoc.documentElement.childNodes;
            for (let i = 0; i < childNodes.length; i++) {
                const node = childNodes[i];
                if (node.nodeType === 1) { // 元素节点
                    third[node.nodeName] = node.textContent;
                }
            }
            
            cyberData['data'] = third;
        } catch (e) {
            console.error("XML解析错误:", e);
        }
    }
    
    return cyberData;
}

// 打印

//2025-09-06
//读取电子秤数据
$cq.未来之窗_智能IOT_打印标签 = function(options) {
     
     CyberWin_JsStandardPlug.cyber_print_label_Print(options.type,options.address,options.tpl,options.body,"cut");
};
// CyberWin_JsStandardPlug.printWithPrinter("条码",report_sn,cyber_printer);
$cq.未来之窗_智能IOT_打印 = function(options) {
     
     CyberWin_JsStandardPlug.printWithPrinter(options.打印机,options.模板,options.内容);
};
//语音 排队叫号
$cq.未来之窗_语音交互_播放收款 = function(options,auth_code="") {
     
     //CyberWin_JsStandardPlug.printWithPrinter(options.打印机,options.模板,options.内容);
     if(CyberWin_JsStandardPlug.bsPlayMent_PlayMoneyWithHeader){
			if(parseFloat(options)>0){
						//alert("支出0"+payPrice);
				//2022-1-23 微信支付宝判断
				var paysoundheader="wlzc_cashier_shoudao.wav";
				 var cyberwin_pay_authcode =auth_code; 
				 if(cyberwin_pay_authcode.startsWith("2")==true){
					 //支付宝
					// CyberWin_JsStandardPlug.bsPlaySoundV2("wlzc_cashier_alipay.wav",1700);//,"合计.wav");
					paysoundheader="wlzc_cashier_alipayshoukuan.wav";
				 }else{
					 //微信 
					   //CyberWin_JsStandardPlug.bsPlaySoundV2("wlzc_cashier_weixin.wav",1700);//,"合计.wav");
					   paysoundheader="wlzc_cashier_weixinshoukuan.wav";
				}
				 CyberWin_JsStandardPlug.bsPlayMent_PlayMoneyWithHeader(""+options,""+paysoundheader);//,"收到.wav");
			 }else{
								//alert("不支出0");
			 }

		}
};
$cq.未来之窗_语音交互_身份证读取失败 = function(options) {
     
     	CyberWin_JsStandardPlug.bsPlaySoundV2("idcard_fail.wav",1700);//,"合计.wav");
};
$cq.未来之窗_语音交互_身份证读取成功 = function(options) {
     
     	CyberWin_JsStandardPlug.bsPlaySoundV2("idcard_dengjiwanchneg.wav",1700);//,"合计.wav");
};
$cq.未来之窗_语音交互_放酒店房卡 = function(options) {
     
     	CyberWin_JsStandardPlug.bsPlaySoundV2("wlzc_hotel_card_placement.wav",1700);//,"合计.wav");
};
$cq.未来之窗_语音交互_出示付款码 = function(options) {
     
     	CyberWin_JsStandardPlug.bsPlaySoundV2("wlzc_cashier_qcsfkm.wav",1700);//,"合计.wav");
};
$cq.未来之窗_语音交互_等待用互操作 = function(options) {
     
     	CyberWin_JsStandardPlug.bsPlaySoundV2("wlzc_handle_dengdaiyonghucaozuo.wav",1700);//,"合计.wav");
};
$cq.未来之窗_语音交互_支付失败 = function(options) {
     
     	CyberWin_JsStandardPlug.bsPlaySoundV2("wlzc_handle_payerrorfail.wav",1700);//,"合计.wav");
};
$cq.未来之窗_语音交互_收款成功 = function(options) {
    const payPrice=options.price;
    const cyberwin_pay_authcode=options.code;
     
     	if(parseFloat(payPrice)>0){
				
			var paysoundheader="wlzc_cashier_shoudao.wav";
		     
			if(cyberwin_pay_authcode.startsWith("2")==true){
				
					paysoundheader="wlzc_cashier_alipayshoukuan.wav";
			 }else{
					 
			      paysoundheader="wlzc_cashier_weixinshoukuan.wav";
			}
				 CyberWin_JsStandardPlug.bsPlayMent_PlayMoneyWithHeader(""+payPrice,""+paysoundheader);//,"收到.wav");
		 }else{
								//alert("不支出0");
		}
};

$cq.未来之窗_语音交互_朗读文本 = function(options) {
    try{
     	CyberWin_JsStandardPlug.speakText(options); 
     }catch(ex){
        console.error("运行环境错误");   
     }
};
   
/*
function cwpd_Play_systemload(){
	  if(check_Support_CwpdClient()==false){
		  //��֧��δ��֮���ͻ��˼���
		  return ;
	  }
	  //2020-2-22 ���źϼƽ��
		if(CyberWin_JsStandardPlug.bsPlaySoundV2){
			CyberWin_JsStandardPlug.bsPlaySoundV2("wlzc_handle_ssytem_init.wav",1700);//,"�ϼ�.wav");
		}else{
		}
}
*/
//获取 浏览取
//2023-8-7 浏览器基础函数

//读取 url 参数
 
$cq.CMP_browser_getQueryVariable = function(options) {
     
   var query = window.location.search.substring(1);
   /*
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == options){return pair[1];}
    }
    return(false);
    */
    return $cq.CMP_browser_getURLVariableALL({url:query,param:options});
};

$cq.CMP_browser_getURLVariableALL = function(options) {
     
   var query = options.url;//window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == options.param){return pair[1];}
    }
    return(false);
};

$cq.未来之窗_网页库_获取当前网址参数 = function(options) {
    return $cq.CMP_browser_getQueryVariable(options); 
};
$cq.未来之窗_网页库_获取网址参数 = function(url,param) {
   return $cq.CMP_browser_getURLVariableALL({url:url,param:param});
};

//

/**
 *对Date的扩展，将 Date 转化为指定格式的String
 *月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 *年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *例子：
 *(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 *(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 */
 
$cq.cyberwinformat_date = function(options) {
    var 灵体 = options.date;
    var fmt = options.str;
    var o = {
        "M+": 灵体.getMonth() + 1, //月份
        "d+": 灵体.getDate(), //日
        "h+": 灵体.getHours(), //小时
        "m+": 灵体.getMinutes(), //分
        "s+": 灵体.getSeconds(), //秒
        "q+": Math.floor((灵体.getMonth() + 3) / 3), //季度
        "S": 灵体.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (灵体.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

$cq.未来之窗_时间_格式化 = function(options) {
    return $cq.cyberwinformat_date(options); 
};
//分页设置


// 改进cq库添加分页组件功能（改进版）
    // 分页默认样式
  const fairy_cyberwinquery_defaultPaginationStyle = `
        .cyberwin_pagination_ul{
            display: flex;
            background-color: #fff;
            border-radius: 50px;
            border: 1px solid #fe7300;
        }
        .cyberwin_pagination_li{
            margin: 8px;
            list-style: none;
            text-align: center;
            line-height: 45px;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            border-left: 1px solid #E2E9EE;
        }
        .cyberwin_pagination_ul li.cyberwin_paginatio_numb{
            width: 45px;
            height: 45px;
            border-radius: 5px;
        }
        .cyberwin_pagination_ul li.cyberwin_paginatio_dots{
            cursor: default;
            font-size: 20px;
            border-left: 1px solid #E2E9EE;
        }
        .cyberwin_pagination_ul li.cyberwin_paginatiobtn{
            padding: 0 20px;
        }
        .cyberwin_pagination_ul li.cyberwin_paginatio_prev{
            border-radius: 25px 5px 5px 25px;
        }
        .cyberwin_pagination_ul li.cyberwin_paginatio_next{
            border-radius: 5px 25px 25px 5px;
        }
        .cyberwin_pagination_ul li.active,
        .cyberwin_pagination_ul li.cyberwin_paginatiobtn:hover,
        .cyberwin_pagination_ul li.cyberwin_paginatio_numb:hover{
            color: #fff;
            background-color: #FE7300;
        }
    `;
    
    var cyberwinquery_PaginationSettings = {
     callback: cyberwinquery_defaultPageCallback,  // 回调函数,
     style:fairy_cyberwinquery_defaultPaginationStyle
   };

$cq.分页设置 = function(options) {
    for (var key in options) {
        if (options.hasOwnProperty(key)) {
		//	console.log("配置分页",key);
            cyberwinquery_PaginationSettings[key] = options[key];
        }
    }
};

    // 样式注入状态
    let styleInjected = false;

    // 默认回调函数
    function cyberwinquery_defaultPageCallback(page) {
      //  console.log("东方仙盟当前页码: " + page);
    }

    // 1. 分页样式初始化方法（手动调用）
    $cq.initPaginationStyle = function(customStyle) {
        if (styleInjected) {
            console.warn("分页样式已初始化，无需重复调用");
            return;
        }

        const styleEl = document.createElement('style');
        styleEl.setAttribute('data-cyberwin-pagination', 'true');
        
        // 使用自定义样式或默认样式
        styleEl.innerHTML = customStyle || cyberwinquery_PaginationSettings.style;
        
        document.head.appendChild(styleEl);
        styleInjected = true;
    };

    // 2. 分页样式配置方法（动态修改）
    $cq.configPaginationStyle  = function(customCss) {
        let styleEl = document.querySelector('style[data-cyberwin-pagination]');
        
        if (!styleEl) {
            // 如果样式未初始化，先初始化
            $cq.initPaginationStyle(customCss);
            return;
        }
        
        // 追加或覆盖样式
        styleEl.innerHTML += `\n${customCss}`;
    };

    // 3. 分页渲染方法
    cyberwin_query.prototype.pagination = function(options) {
        // 检查样式是否已初始化
        if (!styleInjected) {
            console.error('请先调用 $cq.initPaginationStyle() 初始化分页样式');
            return this;
        }

        // 处理参数
        /*
        const settings = {
            maxPage: options.maxPage || 1,    // 总页数
            currentPage: options.currentPage || 1,  // 当前页码
            callback: options.callback || defaultPageCallback  // 回调函数
        };
        */

        // 保存当前实例和设置
        const cyber_instance = this;
        //const paginationId =  options.paginationId;//this.elements[0]?.id;
        const paginationId =  options.id;//this.elements[0]?.id;
        
        if (!paginationId) {
            console.error('分页容器需要设置id属性');
            return this;
        }

        // 渲染分页
        function renderPage(page) {
           // console.log("渲染分页",page);
            let html = '<ul class="cyberwin_pagination_ul">';
            let 未来之窗页码 = ' <ul class="cyberwin_pagination_ul">';
            let activeClass;
            const beforePage = page - 1;
            const afterPage = page + 1;
           // const maxPage = settings.maxPage;
            const maxPage = options.maxPage;

/*
            // 上一页
            if (page > 1) {
                html += `<li class="cyberwin_paginatiobtn cyberwin_paginatio_prev cyberwin_pagination_li" 
                           onclick="$cq('#${paginationId}').pagination({maxPage: ${maxPage}, currentPage: ${page-1}, callback: settings.callback})">
                           <span>上一页(pre)</span></li>`;
            }

            // 第一页和省略号
            if (page > 2) {
                html += `<li class="cyberwin_paginatio_numb cyberwin_pagination_li" 
                           onclick="$cq('#${paginationId}').pagination({maxPage: ${maxPage}, currentPage: 1, callback: settings.callback})">1</li>`;
                if (page > 3) {
                    html += `<li class="cyberwin_paginatio_dots cyberwin_pagination_li">... </li>`;
                }
            }
            */
            //$cq
            //$cq('#${paginationId}').pagination({maxPage: ${maxPage}, currentPage: ${page-1}, callback: settings.callback})
            //$cq('#${paginationId}').pagination({maxPage: ${maxPage}, currentPage: ${page-1})
            if(page > 1){
                未来之窗页码 += `<li class="cyberwin_paginatiobtn cyberwin_paginatio_prev cyberwin_pagination_li" onclick="$cq('${paginationId}').pagination({id:'${paginationId}',maxPage: ${maxPage}, currentPage: ${page-1}})" ><span>上一页(pre)</span></li>`;
              }
         //$cq('#${paginationId}').pagination({maxPage: ${maxPage}, 1)
              if(page > 2){
                未来之窗页码 += `<li class="cyberwin_paginatio_numb cyberwin_pagination_li" onclick="$cq('${paginationId}').pagination({id:'${paginationId}',maxPage: ${maxPage}, currentPage:1})">1</li>`;
                if(page > 3){
                  未来之窗页码 += `<li class="cyberwin_paginatio_dots cyberwin_pagination_li">... </li>`;
                }
              }


            // 中间页码
            /*
            for (let i = beforePage; i <= afterPage; i++) {
                if (i > maxPage) continue;
                if (i < 1) {
                    i = 1;
                    if (i > afterPage) break;
                }

                activeClass = page === i ? "active" : "";
                html += `<li class="cyberwin_paginatio_numb ${activeClass} cyberwin_pagination_li" 
                           onclick="$cq('#${paginationId}').pagination({maxPage: ${maxPage}, currentPage: ${i}, callback: settings.callback})">${i}</li>`;
            }
            */
            
             for (let pageLength = beforePage; pageLength <= afterPage; pageLength++){
                if(pageLength > maxPage){
                  continue;
                }
                if(pageLength ==0){
                  pageLength = pageLength + 1;
                }
        
                if(page == pageLength){
                  activeLi = "active";
                }
                else{
                  activeLi = "";
                }
                // //$cq('#${paginationId}').pagination({maxPage: ${maxPage}, currentPage: ${pageLength})
                未来之窗页码 += `<li class="cyberwin_paginatio_numb ${activeLi} cyberwin_pagination_li" onclick="$cq('${paginationId}').pagination({id:'${paginationId}',maxPage: ${maxPage}, currentPage: ${pageLength}})">${pageLength}</li>`;
              }
             
              if(page < maxPage-2){
                未来之窗页码 += `<li class="cyberwin_paginatio_dots cyberwin_pagination_li">... </li>`;
              }
              // //$cq('#${paginationId}').pagination({maxPage: ${maxPage}, currentPage: ${maxPage})
              //CyberWin_Page.show('${pagination_id}',${maxPage},${maxPage})
              if(page < maxPage-1){
                未来之窗页码 += `<li class="cyberwin_paginatio_numb cyberwin_pagination_li" onclick="$cq('${paginationId}').pagination({id:'${paginationId}',maxPage: ${maxPage}, currentPage: ${maxPage}})">${maxPage}</li>`;
              }
             // //$cq('#${paginationId}').pagination({maxPage: ${maxPage}, currentPage: ${page+1})
             //CyberWin_Page.show('${pagination_id}',${maxPage},${page+1})
              if(page < maxPage){
                未来之窗页码 += `<li class="cyberwin_paginatiobtn cyberwin_paginatio_next cyberwin_pagination_li" onclick="$cq('${paginationId}').pagination({id:'${paginationId}',maxPage: ${maxPage}, currentPage: ${page+1}})" ><span>下一页(next)</span></li>`;
              }
        	  未来之窗页码+="</ul>";

            // 最后一页和省略号
            /*
            if (page < maxPage - 2) {
                html += `<li class="cyberwin_paginatio_dots cyberwin_pagination_li">... </li>`;
            }
            if (page < maxPage - 1) {
                html += `<li class="cyberwin_paginatio_numb cyberwin_pagination_li" 
                           onclick="$cq('#${paginationId}').pagination({maxPage: ${maxPage}, currentPage: ${maxPage}, callback: settings.callback})">${maxPage}</li>`;
            }
            */
/*
            // 下一页
            if (page < maxPage) {
                html += `<li class="cyberwin_paginatiobtn cyberwin_paginatio_next cyberwin_pagination_li" 
                           onclick="$cq('#${paginationId}').pagination({maxPage: ${maxPage}, currentPage: ${page+1}, callback: settings.callback})">
                           <span>下一页(next)</span></li>`;
            }

            html += "</ul>";
           */
           /*
            // 渲染到容器
            $this.html(html);
            */
            
            // 触发回调
           // settings.callback(page);
           cyber_instance.html(未来之窗页码);
          // console.log("渲染分页",未来之窗页码);
           cyberwinquery_PaginationSettings.callback(page);
        }

        // 初始渲染
       // renderPage(settings.currentPage);
        //options
         renderPage(options.currentPage);

        return this; // 支持链式调用
    };

//initPaginationStyle = function(customStyle) {
$cq.分页_初始化 = function(customStyle) {
    return $cq.initPaginationStyle(customStyle); 
};
// cyberwin_query.configPaginationStyle
$cq.分页_动态样式 = function(customCss) {
    return $cq.configPaginationStyle(customCss); 
};

cyberwin_query.prototype.分页 = function(options) {
    return this.pagination(options); 
};


/////////////////////////////////////////////////////////////////
//2025-09-20
  // 1. parent() 方法 - 获取父元素，支持选择器过滤
  cyberwin_query.prototype.parent = function(selector) {
        const parentElements = [];
        
        const thatInstance = this;
        
        this.elements.forEach(element => {
            // 获取直接父元素
            const parent = element.parentElement;
            if (parent) {
                // 如果有选择器，检查父元素是否匹配
                if (selector) {
                    // this.matchesSelector
                    //if (cyberwin_query.matchesSelector(parent, selector)) {
                    if (thatInstance.matchesSelector(parent, selector)) {
                        parentElements.push(parent);
                    }
                } else {
                    parentElements.push(parent);
                }
            }
        });
        
        // 去重处理（避免同一父元素被多次添加）
       // const uniqueParents = [...new Set(parentElements)];
        
        // 返回新的cq实例
       // const newInstance = cyberwin_query();
       // newInstance.elements = uniqueParents;
       // newInstance._originalSelector = this.getSelector ? `${this.getSelector()}.parent(${selector || ''})` : '';
      //  return newInstance;
      this.elements=parentElements;
      return this;
    };

//2025-09-20
 // 2. remove() 方法 - 删除元素
    cyberwin_query.prototype.remove = function() {
        this.elements.forEach(element => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        });
        // 清空当前实例的元素集合
        this.elements = [];
        return this;
    };
    
     // 3. size() 方法 - 计算元素总数
    cyberwin_query.prototype.size = function() {
        return this.elements.length;
    };
    
     // 4. scrollTop() 方法 - 控制页面滚动
     /**
 * 滚动到指定位置
 * @param {number} scrollValue - 目标滚动位置
 * @returns {Object} - 自身实例，支持链式调用
 */
    cyberwin_query.prototype.scrollTop = function(value) {
        // 无参数时，返回第一个元素的scrollTop值
        if (value === undefined) {
            if (this.elements.length > 0) {
                return this.elements[0].scrollTop;
            }
            return 0;
        }
        
        // 有参数时，设置所有元素的scrollTop值
        const scrollValue = typeof value === 'number' ? value : 0;
        this.elements.forEach(element => {
            element.scrollTop = scrollValue;
        });
        
        // 特殊处理：如果是window对象，使用scrollTo
        if (this.elements.includes(window)) {
            window.scrollTo(0, scrollValue);
        }
        
        return this;
    };
    
    //5.
     cyberwin_query.prototype.scrollLeft = function(value) {
        // 无参数时，返回第一个元素的scrollTop值
        if (value === undefined) {
            if (this.elements.length > 0) {
                return this.elements[0].scrollTop;
            }
            return 0;
        }
        
        // 有参数时，设置所有元素的scrollTop值
        const scrollValue = typeof value === 'number' ? value : 0;
        this.elements.forEach(element => {
            element.scrollLeft = scrollValue;
        });
        
        // 特殊处理：如果是window对象，使用scrollTo
        if (this.elements.includes(window)) {
            window.scrollTo(0, scrollValue);
        }
        
        return this;
    };
    
    //6
    // 为cq库添加scale()方法用于缩放元素
cyberwin_query.prototype.scale = function(scaleValue , enableTransition = true) {
    // 验证参数有效性
    if (typeof scaleValue !== 'number' || isNaN(scaleValue) || scaleValue <= 0) {
        console.error('缩放值必须是正数');
        return this;
    }

    // 为每个匹配元素应用缩放
    this.elements.forEach(element => {
        
        // 如果需要过渡动画，添加过渡样式
           if (enableTransition) {
                element.style.transition = 'transform 0.3s ease';
           }
           
        // 保存原始transform，避免覆盖其他变换
        const originalTransform = element.style.transform || '';
        
         
        
        // 检查是否已有scale变换
        if (originalTransform.includes('scale(')) {
            // 替换现有scale值
            element.style.transform = originalTransform.replace(/scale\([^)]*\)/, `scale(${scaleValue})`);
        } else {
            // 添加新的scale变换
            element.style.transform = originalTransform 
                ? `${originalTransform} scale(${scaleValue})` 
                : `scale(${scaleValue})`;
        }
        
        // 可选：设置变换原点为中心（可根据需求调整）
        if (!element.style.transformOrigin) {
            element.style.transformOrigin = 'center center';
        }
    });

    return this; // 支持链式调用
};
//7

// 为cq库添加元素旋转方法
cyberwin_query.prototype.ScreenrotationAngle = function(angle , enableTransition = true) {
    // 验证参数有效性
    if (typeof angle !== 'number' || isNaN(angle)) {
        console.error('旋转角度必须是有效的数字');
        return this;
    }

    // 为每个匹配元素应用旋转
    this.elements.forEach(element => {
        
          // 如果需要过渡动画，添加过渡样式
            if (enableTransition) {
                element.style.transition = 'transform 0.3s ease';
            }
            
        // 保存原始transform，避免覆盖其他变换
        const originalTransform = element.style.transform || '';
        
        // 检查是否已有rotate变换
        if (originalTransform.includes('rotate(')) {
            // 替换现有rotate值（支持deg/rad等单位，这里统一使用deg）
            element.style.transform = originalTransform.replace(/rotate\([^)]*\)/, `rotate(${angle}deg)`);
        } else {
            // 添加新的rotate变换
            element.style.transform = originalTransform 
                ? `${originalTransform} rotate(${angle}deg)` 
                : `rotate(${angle}deg)`;
        }
        
        // 可选：设置变换原点为中心（可根据需求调整）
        if (!element.style.transformOrigin) {
            element.style.transformOrigin = 'center center';
        }
    });

    return this; // 支持链式调用
};

//8
  // 8. 新增专门设置过渡效果的方法（可选）
  //过渡动画设置方法
 cyberwin_query.prototype.transition = function(duration = '0.3s', timingFunction = 'ease', property = 'transform') {
        this.elements.forEach(element => {
            element.style.transition = `${property} ${duration} ${timingFunction}`;
        });
        return this;
    };
//
//9 mousedown
cyberwin_query.prototype.mousedown = function(handler) {
    // 如果传入处理器函数，则绑定事件
    if (typeof handler === 'function') {
        return this.on('mousedown', handler);
    }
    // 无参数时触发click事件
    else {
        return this.trigger('mousedown');
    }
};

//10. 鼠标移动
cyberwin_query.prototype.mousemove = function(handler) {
    // 如果传入处理器函数，则绑定事件
    if (typeof handler === 'function') {
        return this.on('mousemove', handler);
    }
    // 无参数时触发click事件
    else {
        return this.trigger('mousemove');
    }
};

//11. mouseup
cyberwin_query.prototype.mouseup = function(handler) {
    // 如果传入处理器函数，则绑定事件
    if (typeof handler === 'function') {
        return this.on('mouseup', handler);
    }
    // 无参数时触发click事件
    else {
        return this.trigger('mouseup');
    }
};


/** 
 * 12
 * 检查元素是否包含指定类名
 * @param {string} className - 要检查的类名
 * @returns {boolean} - 如果至少有一个元素包含该类名则返回true，否则返回false
 */
cyberwin_query.prototype.hasClass = function(className) {
    // 验证类名参数
    if (typeof className !== 'string' || className.trim() === '') {
        console.warn('hasClass方法需要有效的类名参数');
        return false;
    }
    
    // 检查每个元素是否包含指定类名
    for (let i = 0; i < this.elements.length; i++) {
        if (this.elements[i].classList.contains(className)) {
            return true;
        }
    }
    
    return false;
};


// 工具函数：获取元素当前的不透明度
cyberwin_query.prototype._getOpacity = function(element) {
    const style = window.getComputedStyle(element);
    const opacity = style.opacity;
    return opacity === '' ? 1 : parseFloat(opacity);
};

 

/**
 * 09
 * 淡入淡出到指定透明度
 * @param {number|string} speed - 动画持续时间(毫秒)或预设('slow'=600, 'fast'=200)
 * @param {number} opacity - 目标透明度(0-1)
 * @param {Function} [callback] - 动画完成后的回调函数
 * @returns {Object} - 自身实例，支持链式调用
 */
cyberwin_query.prototype.fadeTo = function(speed, opacity, callback) {
    // 处理参数，支持可选的callback参数位置
    if (typeof opacity === 'function') {
        callback = opacity;
        opacity = speed;
        speed = 400; // 默认速度
    }
    
    // 解析速度参数
    const duration = typeof speed === 'string' 
        ? speed === 'slow' ? 600 : speed === 'fast' ? 200 : 400
        : typeof speed === 'number' ? speed : 400;
    
    // 验证透明度范围
    opacity = Math.max(0, Math.min(1, opacity));
    
    const startTime = performance.now();
    
    // 对每个元素执行动画
    this.elements.forEach(element => {
        // 保存初始不透明度
        const startOpacity = this._getOpacity(element);
        // 确保元素可见(设置display)
        if (window.getComputedStyle(element).display === 'none') {
            element.style.display = '';
            element.style.opacity = 0;
        }
        
        // 动画函数
        const animate = (timestamp) => {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // 简单的线性动画
            element.style.opacity = startOpacity + (opacity - startOpacity) * progress;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // 动画完成
                if (typeof callback === 'function') {
                    callback.call(element);
                }
            }
        };
        
        // 开始动画
        requestAnimationFrame(animate);
    });
    
    return this;
};

/**
 * 10
 * 淡出元素
 * @param {number|string} [speed=400] - 动画持续时间(毫秒)或预设('slow'=600, 'fast'=200)
 * @param {Function} [callback] - 动画完成后的回调函数
 * @returns {Object} - 自身实例，支持链式调用
 */
cyberwin_query.prototype.fadeOut = function(speed, callback) {
    // 处理参数
    if (typeof speed === 'function') {
        callback = speed;
        speed = 400;
    }
    
    // 调用fadeTo实现淡出效果，完成后隐藏元素
    return this.fadeTo(speed, 0, function() {
        this.style.display = 'none';
        this.style.opacity = ''; // 重置透明度
        if (typeof callback === 'function') {
            callback.call(this);
        }
    });
};

/**
 * 11.淡入元素
 * @param {number|string} [speed=400] - 动画持续时间(毫秒)或预设('slow'=600, 'fast'=200)
 * @param {Function} [callback] - 动画完成后的回调函数
 * @returns {Object} - 自身实例，支持链式调用
 */
cyberwin_query.prototype.fadeIn = function(speed, callback) {
    // 处理参数
    if (typeof speed === 'function') {
        callback = speed;
        speed = 400;
    }
    
    // 对每个元素进行预处理
    this.elements.forEach(element => {
        // 如果元素是隐藏的，先设置display并将透明度设为0
        if (window.getComputedStyle(element).display === 'none') {
            element.style.display = '';
            element.style.opacity = 0;
        }
    });
    
    // 调用fadeTo实现淡入效果，目标透明度为1
    return this.fadeTo(speed, 1, function() {
        this.style.opacity = ''; // 重置透明度为默认值
        if (typeof callback === 'function') {
            callback.call(this);
        }
    });
};

/**
 * 12
 * 将当前选中的元素添加到目标选择器元素中
 * @param {string} selector - 目标元素的CSS选择器
 * @returns {Object} - 自身实例，支持链式调用
 * 无测试过i
 */
cyberwin_query.prototype.appendTo = function(selector) {
    const target = cyberwin_query(selector);
    
    if (target.length === 0) {
        console.warn(`No elements found for selector: ${selector}`);
        return this;
    }
    
    this.elements.forEach((element, index) => {
        target.elements.forEach((targetElement, targetIndex) => {
            const elementToAppend = targetIndex === 0 && index === 0 
                ? element 
                : element.cloneNode(true);
            
            targetElement.appendChild(elementToAppend);
        });
    });
    
    return this;
};

//13. length
//常规属性 length
// 扩展获取常用属性的方法
// 获取id属性
Object.defineProperty(cyberwin_query.prototype, 'length', {
    get: function() {
        if (this.elements.length === 0) return 0;
        return this.elements.length;
    }
});
 
 cyberwin_query.prototype.父 = function(options) {
    return this.parent(options); 
};
 ///路由
 cyberwin_query.prototype.删除 = function() {
    return this.remove(); 
};

cyberwin_query.prototype.计数 = function() {
    return this.size(); 
};
cyberwin_query.prototype.滚动垂直 = function(options) {
    return this.scrollTop(options); 
};
//
cyberwin_query.prototype.滚动水平 = function(options) {
    return this.scrollLeft(options); 
};
//scale
cyberwin_query.prototype.缩放 = function(options , enableTransition = true) {
    return this.scale(options ,enableTransition); 
};
//
cyberwin_query.prototype.屏幕旋转 = function(options , enableTransition = true) {
    return this.ScreenrotationAngle(options ,enableTransition); 
};

//
  
 cyberwin_query.prototype.动画过度设置 = function(duration = '0.3s', timingFunction = 'ease', property = 'transform') {
    return this.transition(duration,timingFunction,property); 
};

//
cyberwin_query.prototype.添加 = function(options) {
    return this.append(options); 
};

//
 
 cyberwin_query.prototype.淡化到 = function(speed, opacity, callback) {
    return this.fadeTo(speed, opacity, callback); 
};

 cyberwin_query.prototype.淡出 = function(speed, callback) {
    return this.fadeOut(speed, callback); 
};
//
 cyberwin_query.prototype.淡入 = function(speed, callback) {
    return this.fadeIn(speed, callback); 
};
//弹窗
/** 
 
 @Name： 未来之窗渲染引擎与cq库合并版
 @Author：cybersnow
 @Site： www.ynwlzc.cn
 @LastEdit: 未来之窗
 2022-10-17
 CyberWin_APP_artDialog.js 与 cq库功能合并
 */
 
// 未来之窗对话框功能
const CyberWin_Dialog = (function() {
    var cyberwin_dialog_style = ` <style>
	   .cyberwin_dialog_hide_body_20230811{
				min-height:40px!important;
				height:40px!important;
		}

		 .cyberwin_dialog_mask{
				display: none;
				 
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: rgba(0,0,0,.7);
				text-align: center;
				color: #696969;
				z-index: 99999;
			}
           .cyberwin_dialog_localapp_fix{ 
						 position: fixed; 
					 
						top: 150px;
						 
						/*left: 500px; */
						right:10px;
						background: #f3f5f7;
						width: 730px; 
						/*z-index: 999; */
						min-height:400px;
						border:1px solid #48a731;
						height:400px;
						display:block;
						border-radius: 10px;
					 }
			 .cyberwin_dialog_localapp_fix .set_top{
			   background: #48a731; line-height: 35px; padding-left: 22px;/* padding-right: 198px;*/
			   border-radius: 10px 10px 0 0;
			   }
				.cyberwin_dialog_localapp_fix .set_top .set{
					font-size: 18px; color: #fff; 
				}
              .cyberwin_dialog_localapp_fix .set_top .return{ width: 198px; background: #ffbc15; font-size: 24px; color: #101010;  position: absolute; right: 0px; top: 0px; text-indent: 50px; cursor: pointer;
			  border-radius: 0 10px 0 0;}
			  .cyberwin_dialog_localapp_fix .set_end{ padding: 5px 12px; 
			      padding: 0px 0px; 
			  }

			  #cyberwin_arg_input_0D3EB0CDBBA6A535543A5E7714DA67E6{
		line-height: 18px;
		border: 1px solid #ccc;
		background-color: #fff;
		box-shadow: 2px 2px 2px #f0f0f0 inset;
		height: 18px;
		padding: 4px 4px;
	}
			  </style>
			   <style alt="合并2025">
			   .cyberwin_dialog_localapp_fix .set_top .minbox{ 
			   width: 198px; background: #ffbc15;   color: #101010;  position: absolute; 
			    top: 0px; 
			    right:200px;
			   text-indent: 0px; cursor: pointer;
			  border-radius: 5px 5px 0 0;
			        font-size:14px;
			   }
			  .cyberwin_dialog_localapp_fix .set_top .maxbox{ 
			  
			   width: 198px; background: #ffbc15;   color: #101010;  position: absolute; 
			    top: 0px; 
			    right:300px;
			   text-indent: 0px; cursor: pointer;
			  border-radius: 5px 5px 0 0;
			       font-size:14px;
			  }
			  .cyberwin_dialog_localapp_fix .set_top .fullbox{ 
			    font-size:14px;
			   width: 198px; background: #ffbc15;   color: #101010;  position: absolute; 
			    top: 0px; 
			    right:400px;
			   text-indent: 0px; cursor: pointer;
			  border-radius: 5px 5px 0 0;}
			  
			     .cyberwin_query_dialog_titlebarskin_phone{
			         font-size: 18px;
			     }
			     .cyberwin_query_dialog_titlebarskin_macos{
			         font-size: 12px;
			         line-height: 14px !important;
			     }
			     .cyberwin_query_dialog_titlebarskin_pc{
			          font-size: 12px;
			          line-height: 14px !important;
			     }
			     
			     .cyberwin_query_dialog_titlebarskin_macos .set{
			         font-size: 12px !important;
			         
			     }
			     .cyberwin_query_dialog_titlebarskin_macos .return {
                          font-size: 14px !important;
                          right: auto !important;
                          left: 0px !important;
                          border-radius: 10px 0 0 0 !important;
                          
			     }
			     
			      .cyberwin_query_dialog_titlebarskin_pc .set{
			         font-size: 12px !important;
			         
			     }
			     .cyberwin_query_dialog_titlebarskin_pc .return {
                          font-size: 14px !important;
                          /*
                          right: auto !important;
                          left: auto !important;
                        
                          border-radius: 10px 0 0 0 !important;
                            */
                           
			     }
			   </style>
			  `;

    var cyberwin_alert_style = `<style>
#alert-layer{
	display: none;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.5);
	text-align: center;
	color: #696969;
	z-index: 99999;
	}
	#alert-container{
		background: #f3f8f7;
		margin: 5%;
		width: 90%;
		max-height: 90%;
		overflow: auto;
		border-radius: 15px;
		padding-top: 1px;
	}
	#alert-text-container{
		font-size: 13px;
		line-height: 25px;
	}
	#cyberwin_alert-title{
		margin: 10px auto;
		font-size: 16px;
		font-size:26px;
		border-bottom:1px solid red;
		padding-bottom: 8px;
		text-align:left;
		padding-left: 80px;
		color:#f9b526;
	}
	#cyberwin_alert-detail{
	   background:#FFFFFF;
	   min-height:50px;
	}
	#cyberwin_alert-detail H1{
	   background:#FFFFFF;
	}
	

	#check-username{
		font-size: 16px;
	}
	#cyberwin_alert-btn{
		height: 60px;
		line-height: 60px;
		border-top: 1px solid #aaa;
	}

	.cyberwin_alert-btn_child{
		display:inline-block;
		line-height:32px;
		background:#FFFFFF;
		padding-top: 10px;
		padding-bottom: 10px;
		padding-left: 15px;
		padding-right: 15px;
		margin-left: 5px;
		border-radius:10px;


 
 
	margin-bottom: 0;
	font-size: 26px;
 
	color: #333;
	text-align: center;
	text-shadow: 0 1px 1px rgba(255,255,255,0.75);
	vertical-align: middle;
	background-color: #f5f5f5;
	background-image: -webkit-gradient(linear,0 0,0 100%,from(#fff),to(#e6e6e6));
	background-image: -webkit-linear-gradient(top,#fff,#e6e6e6);
	background-image: linear-gradient(to bottom,#fff,#e6e6e6);
	background-repeat: repeat-x;
	border: 1px solid #ccc;
	border-color: #e6e6e6 #e6e6e6 #bfbfbf;
	border-color: rgba(0,0,0,0.1) rgba(0,0,0,0.1) rgba(0,0,0,0.25);
	border-bottom-color: #b3b3b3;
	-webkit-border-radius: 4px;
	border-radius: 4px;
	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffffff',endColorstr='#ffe6e6e6',GradientType=0);
	filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);
	-webkit-box-shadow: inset 0 1px 0 rgba(255,255,255,0.2),0 1px 2px rgba(0,0,0,0.05);
	box-shadow: inset 0 1px 0 rgba(255,255,255,0.2),0 1px 2px rgba(0,0,0,0.05);
}
	}

	.cwpd-btn-block{
      	border-radius: 15px;
       }
		.cwpd-btn-block-info{
			background: #02b099;
			color:#ffffff;
		}
		.cwpd-btn-block-info:hover{
			background: #018372;
		}
		.cwpd-btn-block-warning{
			background: #ff683d;
		}


	#cyberwin_alert-confirm:hover{
		border-bottom-left-radius: 20px;
		border-bottom-right-radius: 20px;
	}
	#cyberwin_alert-confirm:hover{
		background: #ddd;
	}
	#cyberwin_arg_input_0D3EB0CDBBA6A535543A5E7714DA67E6{
		line-height: 18px;
		border: 1px solid #ccc;
		background-color: #fff;
		box-shadow: 2px 2px 2px #f0f0f0 inset;
		height: 18px;
		padding: 4px 4px;
	}
	</style>`;
	
	var cyberwin_dialog_style_动画 = `
	<style>
	.东方仙盟_灵颜妙手_动画_360旋转 {
            transform: rotate(360deg);
            transition: all 2s;
     }
      .东方仙盟_灵颜妙手_动画_从上往下 {
            top: -200% !important;
            transform: translateX(-50%);
            transition: top 2s ease-in-out;
        }
        .东方仙盟_灵颜妙手_动画_顶部80{
           top: 250px;
        }
</style>`;
  
  //2025-01-25 系统对话框
  	var cyberwin_dialog_style_sysdialog = `
  	<style>
  	     /* 原生dialog（sysdialog）样式 - 所有类添加 cyberwin_dialog_sysdhs 前缀 */
        .cyberwin_dialog_sysdhs-dynamic-dialog {
            width: 90%;
            max-width: 1000px;
            border: none;
            border-radius: 8px;
            padding: 0;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            overflow-y: hidden;
        }

        .cyberwin_dialog_sysdhs-dynamic-dialog::backdrop {
            background-color: rgba(0, 0, 0, 0.5);
        }

        .cyberwin_dialog_sysdhs-dialog-close-btn {
            position: absolute;
            top: 16px;
            right: 16px;
            width: 32px;
            height: 32px;
            font-size: 20px;
            cursor: pointer;
            background-color: rgba(255, 255, 255, 0.8);
            border: 1px solid #ff0000;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10;
        }

        .cyberwin_dialog_sysdhs-dialog-close-btn:hover {
            background-color: #f5f5f5;
        }

        /* sysdialog 专属内容容器（带前缀，避免样式冲突） */
        .cyberwin_dialog_sysdhs-sysdialog-content {
            width: 100%;
           /* min-height: 600px;*/
            padding: 16px;
            padding: 8px;
            box-sizing: border-box;
        }
  	</style>
  	`;
  	
  	  // 2. 复用你的两个辅助函数（修改关闭按钮类名，增加指定前缀）
    function sysdialog_generateRandomId(prefix = 'cyberwin_dialog_sysdhs-dialog-close-') {
        return prefix + Date.now() + '_' + Math.floor(Math.random() * 1000);
    }

    function sysdialog_createCloseBtn() {
        const closeBtn = document.createElement('button');
        const randomBtnId = sysdialog_generateRandomId();
        closeBtn.id = randomBtnId;
        // 关闭按钮类名添加 cyberwin_dialog_sysdhs 前缀
        closeBtn.className = 'cyberwin_dialog_sysdhs-dialog-close-btn';
        closeBtn.innerHTML = '&times;';
        return closeBtn;
    }
  

	var 未来之窗加载html = `<img src="data:image/gif;base64,R0lGODlhyADIAOZ/AEK7fY3Wsd7z6dry5i60cNTw4vj9+qXewdLv4eX27lrEjvX7+P7+/imybM3t3Ty3emHGk3nPo3XNoH3Qpki9gl3FkLbkzUG1fXHMnvr9+8Do1LDjyT25evL69onUrjS2dKHdvpXZtrvn0VHAiKrgxVTBimnJmTK1cr7o01KuiOn38Mns2jW2deD06k2/hYHRqSuzbji3d02whcXq2Oz48vz+/UW8gJnaup7cvTa3dTC0cjC0ca/iyIbTrKLewJLYtWXIlu759CSwaZDXs7jlzzm4d6zhxmzKmvz+/sjr2eP17BytZEmxguv48YPSqvD69c/u38Pp2C20b2/LnCCvZ8Tq16jfxD66e5bZt9fx406/hobUrPD59VDAh7LjylbCiy2zbzO2c+f27/P79zO1c0WzgMrs28Lq1pvbu/H69mjIl0u+g1Cvhy20cEyxhMLp1ajgxLTkzL/o08Hp1szt3E+/ibLjy7Pky7TjzSiybDS2c6ffw/L69f///zq4eP///yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozODIzRjNBNUE5QTRFRDExOTAyRjk1Mzc0NzQ2OTBFMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2NjEyRTcxOEE0QUYxMUVEQjc1OEY5MUMzOThDMUU4MSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2NjEyRTcxN0E0QUYxMUVEQjc1OEY5MUMzOThDMUU4MSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDRjQ5QzdENEFFQTRFRDExOTAyRjk1Mzc0NzQ2OTBFMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozODIzRjNBNUE5QTRFRDExOTAyRjk1Mzc0NzQ2OTBFMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAUAAH8ALAAAAADIAMgAAAf/gH+Cg4SFhoeIiYqLjIh9j5CRkpOTjZaXmJmam5ydlpSgoaKSnqWmp6ipiaOsra2qsLGysZB+trauubqPs72+v4eRt8N+u8a6wMnKpbXEzsfQucvT1Kt9zti40dus1d7LzdnY3OTd3+ewj+LrxeXuoejxnurs6+/3oPL6n9f17PgAK+0bWIiev38BE0IiONDgQYSjGikUxTBev4f+IDHok26jworeHGJkBy4hSGUiR4q7ICMkwJO+LqrMxnJfH4/lYNKSOXNYmRQw3+lExbOnnwtDCblLOs/osJZMDZGLmimlSqqKpmJdVHTkg62MuIF15PTrWInRzip1qvbStrZd/w9CbXsJ566zceuVocspLda868zy7QstqtV6bAabKjwUsDjBipkd0+k4G5PIqiaDrIwN8867DDkTQ+r5MzKCKi+XlmWMoOhbib3VSJDESAAJEEZQ2M27924XFaZsAaFBwAJqoOW9tlVtAYI9ExQAcGqLw4gpaJIEQXka3XI/0xLcmdCFOjsKUw4MYPAreciRylRswGDDPEYOEHAIiNkdOfxfNSQxAQX2GcXBFHF0MIt7y2AEmSwdGAFBgQWOgIUSrEnj30O+0ADCCBSG6AcAHgxgmjkoYdRLByBoIeKLI3rQQjoaArPcLDV4UQKMPPphAxbbpdJfLyrK4oAJPSbpx/8IcWTmio0cxvJEABwoaSUGJp4yZDoPAQVLEl8keQIBYVjpIxxE1RjLQ6qlksEPSrIgQQgV7FCEmRIkoOWTrB1EWiotqKEkGRU8kkEAdq6TQxgsmNfFG3u+suZBsMyxhn0f7LCDHjE4Q0APkXgABjYxaGoDBFqccCd1OEQaEZf+wOKDfTGcUIIEEihwhaad2kJAAJEYAMEJwxRBQBEYENFEH2NgEcaqTk1w3Dx8EnWQG6nU4IF9ReQAwgKP1KCEBRJcAUYOfhDggSQFxNArGWFEUMAkGBBrnhoqSCbpKQc96MkCERR4AgagKPEDAASoO0kAUqQ7QhWg2EFAgQrsRy3/isxQisoYU1D4qyhKSCDEEJPQYEMDEgQRSgg7UNhFFhdj3MlBsZnyhKAUxmCDEqM4wQMlaBxRQyhZ+NFrgWsUEDNFGdfjLydjICkiARGwYgAlC4ALCgNqtCziGjB3Ui0nGptiQMcvFkFGEgDxMCqMXVi8ydiacNamJzVM0OMJFWRwjwo2NMrjF/kSJjMmZZcyhJJgwHHPC2/3CMS0de9blT81e2KElSzYoII7M5ABbY8TiG35JYl3YkaVVkoBKjkLfGGvla0azjQmnJ2iQnlmdosAOTdEbiUHM9h+uyX+PJ1JDWib6YcOQNhlzABGO2+LC4VX/irq9ZwCgvW3EHDH/zZHeA0+Buxpf3xYTpuSxRXg2/KBC2lA48XE8duC5tyHJxJrKRmYUP78AAYZCaAFCEygAheIwAKsQXD5A8CM1AcPifzPE98boNF0UIIKKOCDIAyhCD2IMA3aYgrpq0r/CpG6TbRgOgOMAQe8kIYMGOCGOMyhDm04ADXMboAW4N/2EBElTwRMgzsAFjSUcIWj5a8LT6BgPhRRjwv4AVueSIIJ0xWHaNRgBBAcIBaEuD4WsiMF4MGbAJE4gWgUwA+jiyCGVDhEQ/jjT5wgwhbhmIMQtEAFYgikIAdJyEDOoAQf2KMftkDGKR6iimnsRAYqoMgi6IADAMikJjfJSU2yIP+RiryC3NyywnrIIJKcEIEiY5AwGLjylbCMJSzBQCZFLlIT0qMEEauoxj3moAgh2MMBhknMYhrzmBDA3xYBoCfclbIeXuLECvbIAhZ0cRsdMEHD9jhGOlbQjOuwYimOqMEcsMAC5VgABoQ3wC6MwZvfHIQp8agJJpqwmkR4RwYkwM78BdGZdfyDP+ayCRyY0JzovEfewBBH8B1BigIhxAU3UQMFlPMD18QHA5zAUA1yYJRoKSM7HoBKTUDhohkNiKga6rzakbKO7CgDPTOxuPzFIAwbmMgjAtDR/EGgBgA9HmIImokMWDR+tfqZTh8xhDawVEkcyNJL4zlRTbwRqSf/IMFSI/GDY+XvAPDUpTy714kMWq9UB9iqJEJAACeaaQphjahAR+qJ5vWOADhQ6yS6+lQeUSBIlsglKca6jr1wggsEcl4RwBACvVJiCD11XhKC+k12XCBzmaAD+KSwLsdSYgttAB8a4jrYuYrjbpqYlfMIgD7PUoIBGFDmlUgbCcJmg6iZIKeSTjAClbmWEkEYARmc1wUDUFasphVHJypqphiwgA6sYMAcfMCD6lZ3A3vQwGuJAIcNXNcIIJgBK+jAArfy6KPHjShZNwE4M4FBiazoIRWk0Ab6CqEISbhD/SShgTAIgQAwoMIHhkAHI3RgFDx1ngbSW1rLdgIBZvqA/xYOnAtR2YIFWsgCCd4g2Cx0gVhDaIEFnCCCoYkiDVoApZJAwODaCoIdqMWEHq1EAKXqIgKjOgEEMtAD31JCDXl4wwB6AAetsWIDsu1RD1q8kBevA7eXMKiSwqCAq+2CCy4oExiwIAD4SgIEVOjxFsSgiwx8oUxKgiuTOeJk5XZiW0qqMTRQcKwY6MABG/DCJAZABhs8IcTG4EGSYaQA2vKizdnwhATi5IIxROMFMPADGShAgwAIIBIBFMIZRKBnY4zBBWGEkRYMzebkdqYTOOvRx6IxhhEQCwwREEMP/PYINCxhAgkIgImNEYBBi4gCpLbtqTlByR4VgQVQ4AYdPv/QKRhsYA4geEQBTgAAFfygBdGAAgv6ah9gr1nYzvBEmHr0gS/QehtYiDS6BBCCZFdACCIQQUqNYWYVw8jbU0UuSTrBOx59qhw18KEfdlABMQwhAEKIgBKwQI4t+JpC+OZHZdfhiUupOqHQ2GgFTKCAXsEgBCiAQQwqUIISQGEBgnWFBcx372AjetibSCyMOjUAboBgCUJoAAESWQQOlEAHBGhAA5YgARGwDRrUMy/EXW7qcHdC5i9iQaO50YE94AAEBxiW0cAAAR6AAAQ4IEEBhpByVnw61CGKeEgduW9OWBxGOi5HB3ywBxIsrgg09/oe4ICDHzjB0dDQul+Zzg7/KFui3y/aQdW4UQAzrGAFZkCBDdxlAxFEwPFJ2O82IsDyXxN+HTG+xLhhpDBueIAKCSNAouBIgDERgAogUIGPj+GBh3f78yvpRLFJTzJuZKGDFfAgB4pwJ+BX4AsTEIAIttHVHqk9LLdbryakRnqGk4MPcpDDG+4AgBjkwHNQQIEcNCACDXjAyMbAgu3N83yuRL/tmtCbvxtLjgw4gA4OQEH3c0ABJfTADHQQgGYABedmDGzVIyOwZqUmfZkQAKrWe++QBpPHfwJgfe4wBOtHHRWggODmdJuwB6rmBPgggd7Xfz9wD06QgU4hARz4ctiAWZegAT2yAwRzDyDwS3jn/wNwcGnugAE60CMB0IJN5wyGpQkDwDovQgYKUHa70AQSQAUwAAZgAANCcAQe8DnloADDxSMkIITtswmIxSPfN3vbkARYcExoQAQHgH7QEAQ2gC48Mln5pm8MiAlrJCK+4w4Z8AbjpwF+6IcoMAQesGvQgAC/xCNX0EwS50gu6IGa0AOq5jjlkAF0kASPd4mP5wAEyA1WoIJGoQBAtYiMOITEYHiMwAMzKAG/dQwS0HkhEgGYwISl1oijwQlFwyMsQAFPsIq6kAYUgHYUsgdCSIvEwAkGgHgisgPLx4uugAI/2CMIMIykWIycoFvJqIrM2Aqchw3dUl5O0QWUs3ajOP9QnICKPCJDPJONIMMBblUEOxADa3ApBACHKlE6cyhXHViLm2BPPCIFJ6iOofAD23QLZHACE4AAaTAGA4AGAPBDD9Ek91haElWHlwAEPfJ9NACQlNAEb3gLMQAGWoACkyAAJbCFD1Ft0kiMwxBNmWBWMLIDToAAMjmTNFmTNnmTNlkAOrmTPKmTCDAAgCcJQzCQZEAGTkCGkHCESicOahaRLgZO4cQJAoCEMMICOXCVWJmVWrmVXNmVXnmVfrAGE5AFkZB0WzcCbzAKtYcRG5CS+UiNm0B9IsICO6ADmnKXeJmXerkDOOgHdLmXgImXBDCFIpdWj2ACLXMCH+ABFCb/CkngkOtgAzTglip5C53gBS/ykRQAAm/wh575mRogBygwmqSpAUAwXCcgAXNAmmeQBKJJmrAZmyjAAwGzAwRgBG+iAx/5BUcXX8R3EPbolE32SLwEhm9nHsbiBwGAhdHgAQ1Teo/ABb+jCw5AAdQ2LCeQA0PAhqIABR/AbcNgBgo4i1BJcZzggPZxAmQgAWRpDCSQT33QAXegAI2iMxHAA1zQARUgZ7pAB95HBgSgAA6wCzjQT9lQAaEYWAFVntmARUZIlTPxAQQAAeJ1DHGwAx9QXS5AJplyAicghV1QASdQKzdQgKzQitppZbnQAV0AjNjAA6RGnnZUVZhgjRjx/5FawAOEqAtEYJUx8AEFeSwKgAEYoAAc0HqgRABagJSiYAVgEAM8mAsZsI3+4E4xuggtdAknpRKsdAVYsIvNmQerEgYx0ANZYGIMMAAHAwY7cAJxswtxQCa92QpQAASuKA4sRpkMqo+dgAEjwZcTgG3cwABoEANFEAYUYAag0AS0eQVTYAwFygLTyQpp4AEsAJnisAaAJYrIRUX/4AkIAKHiEAY7oAYD6g4C4JdXMC+P8AZHVwM3wINcEAVcsAsmQAAAsCysoAFd8KQYkafCOZzuV0a5VQ8sAAZfAJ/v8AIJY5iPoAUQ8AgGwAFaBQ0aQJdHwApN8AIngGYPMQLvpP+nUrGgmCAAMJQNMbCZ3MkNGbAGJ6AFC1ADISAHCyCWj1Cvr7MLGXAHVyChcjAKRLAGkfUQdgBREgl9xIoJISAO3QJd78AAZkAEWMBKItgCKIMHQjAFBpAA03YFdjAEPRCyIjuyJNsDESA7YQAD+UoJCcB59vYQQJCgnIqPCBtPmzAGO8KNMVBz+uQCDdAyBOADfZABIxABN7ADE3AAMXAANkABHJBzQhe1Uju1UTsqIbCjkbABNuBVKsEB0Xil41kKcpANeNee7yCivmIFfTAHVyAB3mm0foADJUABRfoFdnu3eJu3X6AA2BGlk9ACseWi/hCEMSqjNTuKmyB/xFD/tvgAAXlgJx8zABXQAwiQBxPQAwCwByZQB5+TAZ77uaAbuhkgi1ZQQkbxBQoCtoVbCjSAjHAUA2brDj9gAhhwBSewhH3wAlHQLnYwByegBFMQs+8wALcquAexAgZ7sMFquJnwBs7AuAERWyegXQlgAAGkBAigAB0AAYsnrdGQASDAAXc6Ej/QSJ26uqUAJ8UCuwkxBzsQBiNQq4/AA1AgADllBzWHAD5gAtp1DAUAAediHkCQAcn7lOZ7vpqQAXIJvQERASewAxCgq5NQAw48hdWqCwaABe7YbXMUtkuDuJqQAP3GwPiABBJALDugBRagon1QA1GgAF5VK1ebC3Sg/wC+ah4cACkFLKzGA8KZ4ADw87qxq08REFpG46El8AJf5wFa6KGJAgMvgLWUMAYBcKkU4gMHTLNZrLybYAG2QMKsIMWUkAETAAPdUiW0lDC0NCYnEAEBoAMNMAGy+AhV8AU3bB8e0MMIrMdanFpCnAszsHEoYKKgEAJPWgVZ4AQjwDoxAAARUKFogAGEPAlB0AMF+Yoyu7zMu8VcrAkazL6skAATEAYPrAMKsAcZOQp7gHEGgCgDh426IAJacMf2cQThqMmbzMk83AlDAMqhkAEHgDDQQgZSQAEBwLOusAdCsANCEK25oAIToJ4iYgKpu8OH5iTkqglDMMSSsAIVAP8GwJgDoyIBMzDHfWCaEjABQusKcUABA2sfJhBFunzN2JzNmSDBkiAGL/ABmDoMpcI3RqB57hAyGPoiUxCu1kzP9WyzH1wDe2ADtLwORTAma3Bt7mAEWwueMzEBxsXHnewqCUtGdJBMxisOx8oBl7cNAjAFBFDSPTEEmTyeubwYpzMPTeAEVuwUrPQBQBAH6yoKNXAAuwIjHGAEH+zDC83QnZAGHVcgE70DI4AGCeAKWQAEAfwiXYC8prNCNFLTkqS+FPIBUgAALzCpY4wGA8cjGJA987zLC+LVnqABIBIirBQDJiACLPwICFABUrCU1HEFIBDThTvTXW3P7PUCafP/wF8AAgJwQy3wA7XCI0DwtUe9x+0B156AAqMXIhLKAV2wyO8IIzYAAgSsL4b91pjdCU8QAudK19Xk19QRASDl0X1sI3SDCgOguLZUD0BQPCAd0smgJqrgAIu22+IAAUQg2G2t0C6R2qXgABEgqrYEBERQ2r+t1M3N1acwAAHgArvtyEmQQteN1Nl92qUQBF5wBNLtPBWAAxOU1Nh9DlsiCwIAAmoQxGaiAEPgAMpt2tr9DQzSCy1Am3P9IugBAgVg3YXt3PI9372wAAXAA1sABFCnEjZQAepsBpuaIcIdGg4ODEEwABqwB0MwASZwfF2wBruxBl3wBRWgBhHgAThAzAQIoAL9veD/rQ8Bvhq0bdmb8eE8frgM7uEdHuRCnuM/DuRGPgitoRZNvuSOsONboRlQzuRPTheMseRZPhhbvhpdrhhfzuVU7uVhjhdljhlvARd+UeVi8RdpXuVW/uaU0eZwXhCDStjIYc7mDeVC4R1LUedHTue2fQ+Ajsu7sBEdERCFntB/PqxLtehbrZETAek0LekvQelpYuk5geknoulFzunw7enkDeo4LurMTeoloemo7hrMuOqNoVaubuabHuu0Xuu2fuu43haBAAAh+QQFHgB/ACwAAAAAAQABAAAHA4B/gQAh+QQFPAB/ACwGAAEAwACFAAAH/4B/goOEhYaHiImKi4yCfo+QkZKTk42Wl5iZmpucnYaUoKGikp6lpqeoqZ+jrK2UqrCxsrGutbaPs7m6u4u3vra8wcK0v8Wuw8jJmsbMrcrP0IfN06zR1srU2aLX3Lza36Dd4sTg5ZHj6Kbm6+fp7pmhF0xsbI30TBfsle/8vX4PZeqpYlPmAbt+CK3JyFcuoUNoC8E9nJgsRRltFDMiYzhNo0deMqh9HKmrI8mTsQwyQ8kylcpiLWOqMyazJqeQMG3qxHTx186fll7eAko0EZucRZMSElpLqVNBTHw+dSp1alKOTa0mjTpUa9EUXb0WDSsWKNmyO8+ital2rUymo//c/gQmN23Wumzv4pVJdy/fY35lggUcuCVXZ4VbYt2WuKXexiQJQybpRvLkj3DDXY6MePPHwdU8Y+4sWqPl0g8PM0ad8TRrhEdDv57oejY/0rYRZt6XOyHu3u92twOO8DdxdMaPj0uunBvz5tYqx4Xu7jn1Z4tfXUc+fbs4696HZecd3hroUOW7yU4fbTwp9tFwrob/bD39ZPbvi8+vHyT//rv8B2AuAg4oi3C4GChMT+gpGExs8zlIYHcSThhhheQ0iOEsBW5YinuQeDiLatqJCIt8mpkIC4UqosJiizNpCOMpL87YSY02boJjjvBcyOMyPv6IyY5CNkJkkf7IiORxkEEumWSKTl5yZJSrKEmlIiiWeOUiJJK3ZSIgJvilIh2OWeaXZ2455ZcQQjnmIQy6+WYhCPoxZyJpXplnlFl6eecgYdr5Z5VWDrqnk32+NyghgS5ayKFLnifnn406OgikS2JaZKWW/mEfK24gKV2EgQAAIfkEBVoAfwAskACGADAANgAAB8OAf4KDhIWGh4h+iouMioiPkI+Nk36RlpaUjZebkpmLnKCED56foaGkjqago6iqoKiVrpuspLKXbLC2l7Cxuo9Mub6QvMKPtJ7FiLjByYXEzYXHmdCFbs/UgtfYvL3U0tPYf8DM1Mvk0Nzhf+nh7Nvu0N/g3vDN8pTt9cnc3c38/cJS/KM2Tp+vCwPRJUxmbWGxe8iSCXQoDOI8YQX5KaQo7B/AjgaLhRR5jlordYNqoUyJbyWhSS4NaYrpLBVNZzcRBQIAIfkEBXgAfwAsVgCwADoAFgAAB3qAf4KDhIWGh4iJin9sfouPkJGFD36OkpeYhJSVlpmej5ucnZ+khaKnpal/Mqetqp8XrbKvkillsrijtIdMsbm5u4Zuob+/wW4XxMXLnBdMbGyQ0L3M1dbX2Nd/2dzZg93gy6bh5KKI5eWK6N2Q69aY7saf8aiq7sGDgQAh+QQFlgB/ACwHAIYATwA/AAAH/4B+goOEgn+HiImKi4yNjo+Qf4WTfpGWl5iXlIWZnZ6Zm4Sfo6SMoYMPpaqlp4arr52tfqmwtZaytrmPsrS6vomybL/DkrjEv7JMx76ylcu6shfPuc0p07bN19itvdqqzW7er9ni3+TlpM3S6OnJ7KPNftbvnvH0n/b3sef6t/n9/ngB1NSs20BH8Zwd3PVvYaOEDhFCjGgqoTCKihL6UYYRWMJ1HQ9pVBiyWLxwJU0WTKmyWsqRBimO3Fhypp+LGG3GdKgzpM1ZHX+6kilUBlGhIBcKHVRm3sGlgy5wBAi10IOp96pOenAB5TutlPSBFdVvLEmxWiNCzfmz5kiWIgr5wW3JaW5FQoEAADs=" >`;

	var f, b = {
        open: "{cwpdapp{",
        close: "}}"
    };

    
    var e = function(a) {
        this.tpl = a
    };
   
    var f = function(a) {
        return new e(a)
    };
    
    f.init = function(a) {
			console.log("组件加载-未来之窗-昭和");
        document.write(cyberwin_alert_style);
		document.write(cyberwin_dialog_style);
		document.write(cyberwin_dialog_style_动画);
    };
    
    f.initby2025 = function(a) {
			console.log("组件加载-未来之窗-昭和");
      //  document.write(cyberwin_alert_style);
	//	document.write(cyberwin_dialog_style);
	//	document.write(cyberwin_dialog_style_动画);
		// 分别添加各个样式
		//<style> </style>
	//	const result = str.replace(/<\/?style>/g, '');
        cyberwin_query_addStylebysafe(cyberwin_alert_style.replace(/<\/?style>/g, ''));
        cyberwin_query_addStylebysafe(cyberwin_dialog_style.replace(/<\/?style>/g, ''));
        cyberwin_query_addStylebysafe(cyberwin_dialog_style_动画.replace(/<\/?style>/g, ''));
        
        //cyberwin_dialog_style_动画
         cyberwin_query_addStylebysafe(cyberwin_dialog_style_sysdialog.replace(/<\/?style>/g, ''));
    };
    
    
	f.open = function(arg1, arg2, btnok, btncancel, callback) {
			var content = "<div id='alert-layer'>"+
			"<div id='alert-container'>"+
				"<div id='alert-text-container'>"+
					"<p id='cyberwin_alert-title'>"+arg1+"</p>"+
					"<p id='cyberwin_alert-detail'>"+arg2+"</p>"+
				"</div>"+
				"<div id='alert-btn'>"+
						"<div id='cyberwin_alert-confirm' class='cyberwin_alert-btn_child cwpd-btn-block-info'>"+btnok+"</div>"+
						"<div id='cyberwin_alert-cancel' class='cyberwin_alert-btn_child'>"+btncancel+"</div>"+
				"</div>"+
			"</div>"+
		"</div>";
		console.log("未来之窗昭和",content);

		//$cq(content).appendTo($cq('body'));
		$cq('body').append(content);
		$cq('#alert-layer').fadeIn();
		$cq('#alert-layer').show();
	 
		f.alert_confirm(callback);
	};

	f.ok = function(arg1, arg2, btnok, callback) {
			var content = "<div id='alert-layer' style='text-align: center;'>"+
			"<div id='alert-container' style='width:auto;display: inline-block;'>"+
				"<div id='alert-text-container'>"+
					"<p id='cyberwin_alert-title' style='width: 200px;'>"+arg1+"</p>"+
					"<p id='cyberwin_alert-detail'>"+arg2+"</p>"+
				"</div>"+
				"<div id='alert-btn'>"+
						"<div id='cyberwin_alert-confirm' class='cyberwin_alert-btn_child cwpd-btn-block-info' style='padding-top: 4px;padding-bottom: 4px; padding-left: 5px;padding-right: 5px;'>"+btnok+"</div>"+
						""+
				"</div>"+
			"</div>"+
		"</div>";

	//	$cq(content).appendTo($cq('body'));
		$cq('body').添加(content);
		$cq('#alert-layer').fadeIn();
		$cq('#alert-layer').show();
		f.alert_confirm(callback);
	};

	f.alert_confirm = function(callback) {
		console.log("加载按钮-确认");
			$cq("#cyberwin_alert-confirm").click(function(){
			$cq('#alert-layer').fadeOut();
			setTimeout(function(){$cq('#alert-layer').remove();},500);
			
			if(callback){
				if($cq("#cyberwin_arg_input_0D3EB0CDBBA6A535543A5E7714DA67E6").length>0) {
				   // alert("输入");
					callback($cq("#cyberwin_arg_input_0D3EB0CDBBA6A535543A5E7714DA67E6").val());
				} else {
					callback();
				}
			}
		});
		
		$cq("#cyberwin_alert-cancel").click(function(){
			$cq('#alert-layer').fadeOut();
			setTimeout(function(){$cq('#alert-layer').remove();},500);
		});
	};

	f.cyberwin_move = function(未来之窗_layer_id) {
		var _move = false;
		var _x, _y;
		
		$cq("#"+未来之窗_layer_id).mousedown(function(e) {
			_move = true;
		//	console.log("mousedown e",e);
			_x = e.pageX - parseInt($cq("#"+未来之窗_layer_id).css("left"));
			_y = e.pageY - parseInt($cq("#"+未来之窗_layer_id).css("top"));
		//	console.log("mousedown",_x);
		//	console.log("mousedown",_y);
			$cq("#"+未来之窗_layer_id).fadeTo(20, 0.7);
		});
		
		$cq("#"+未来之窗_layer_id).mousemove(function(e) {
			if(_move) {
			  //  	console.log("mousemove e",e);
				var x = e.pageX - _x;
				var y = e.pageY - _y;
				$cq("#"+未来之窗_layer_id).css({top: y, left: x});
				//	console.log("mousemove x y",x,y);
			         //console.log("mousemove y",y);
			}
		}).mouseup(function() {
			_move = false;
			$cq("#"+未来之窗_layer_id).fadeTo("fast", 1);
		});
		
		var startX, startY, moveX, moveY;
		var _movephone = false;
      
	//	$cq("#"+未来之窗_layer_id).bind("touchstart", function(e) {
	$cq("#"+未来之窗_layer_id).on("touchstart", function(e) {
			_movephone = true;
			var touch = e.touches[0];
			startX = touch.pageX;
			startY = touch.pageY;
		});
		
	//	$cq("#"+未来之窗_layer_id).bind("touchmove", function(e) {
	$cq("#"+未来之窗_layer_id).on("touchmove", function(e) {
			var touch = e.touches[0];
			moveX = touch.pageX;
			moveY = touch.pageY;
		});
		
	//	$cq("#"+未来之窗_layer_id).bind("touchend", function() {
	$cq("#"+未来之窗_layer_id).on("touchend", function() {
			var 原始_left = parseInt($cq("#"+未来之窗_layer_id).css("left"));
			var 原始_top = parseInt($cq("#"+未来之窗_layer_id).css("top"));
			var 偏移x = moveX - startX;
			var 偏移y = moveY - startY;
			var 最终_x = 原始_left + 偏移x;
			var 最终_y = 原始_top + 偏移y;
			
			$cq("#"+未来之窗_layer_id).css({top: 最终_y, left: 最终_x});
			_movephone = false;
			$cq("#"+未来之窗_layer_id).fadeTo("fast", 1);
		});
	};

	f.layer = function(content, cyberwin_obj) {
		if (!cyberwin_obj) {
			f.open('提示', content, "关闭", "取消");
			return;
		}

		var 未来之窗_layer_close_btn = true;
		var 未来之窗_layer_type = "confirm";
		var 未来之窗_layer_title = "提示";
		var 未来之窗_layer_id = "cyberwin_app_artdialog2023";
		var 未来之窗_layer_btncancel = "关闭";
		var 未来之窗_layer_can_movedialog = true;

		var 未来之窗_layer_width = "730px";
		var 未来之窗_layer_height = "400px";
		var 未来之窗_layer_body_height = "350px";
		var 未来之窗_layer_titlebar_closewidth = "198px;";
		var 未来之窗_layer_titlebar_captionstyle = "";
		var 未来之窗_layer_mask = false;

		var 未来之窗_layer_mask_style = "";
		var 未来之窗_layer_alignment = 5;
		var 未来之窗_layer_alignmentstyle = "";
		var 未来之窗_layer_hidetitle = false;
		var 未来之窗_layer_alpha = 1;
		var 未来之窗_layer_fold = "N";
		var 未来之窗_layer_canfold = "N";
		var 未来之窗_layer_自动关闭时间 = 0;
		
		//2025-09-20
		var 未来之窗_layer_titlebar样式key = "phone"; //pad  pc linux macos
		var 未来之窗_layer_titlebar样式 = ""; //pad  pc linux macos
		var 未来之窗_layer_titlebar_MinimizeBox  = "N";
		var 未来之窗_layer_titlebar_MaximizeBox  = "N";
		var 未来之窗_layer_titlebar_fullscreenBox  = "N";
		var 未来之窗_layer_titlebar_text_min = "_";
		var 未来之窗_layer_titlebar_text_max = "口";
		var 未来之窗_layer_titlebar_text_fullbar = "全";
		
		var 未来之窗_layer_titlebar_top_bgcolor = "#48a731";
		
		var 未来之窗_layer_那他非由于中书令_content='';
		var 未来之窗_layer_那他非由于中书令_中书令='';
		
		var 未来之窗_layer_box_bordershow = "Y";
		var 未来之窗_layer_box_borderforce = "";
		
		
		 

		var 未来之窗_layer_callback = function() {};

		if (cyberwin_obj.type) 未来之窗_layer_type = cyberwin_obj.type;
		if (cyberwin_obj.hideclose) 未来之窗_layer_close_btn = false;
		if (cyberwin_obj.title) 未来之窗_layer_title = cyberwin_obj.title;
		if (cyberwin_obj.id) 未来之窗_layer_id = cyberwin_obj.id;
		if (cyberwin_obj.cancel_caption) 未来之窗_layer_btncancel = cyberwin_obj.cancel_caption;
		if (cyberwin_obj.hidetitle) 未来之窗_layer_hidetitle = cyberwin_obj.hidetitle;
		if (cyberwin_obj.alpha) 未来之窗_layer_alpha = cyberwin_obj.alpha;
		
		try {
			未来之窗_layer_can_movedialog = cyberwin_obj.move;
		} catch(ex) {}
		
		try {
			未来之窗_layer_mask = cyberwin_obj.mask;
		} catch(ex) {}
		
		if (cyberwin_obj.width) 未来之窗_layer_width = cyberwin_obj.width;
		if (cyberwin_obj.height) 未来之窗_layer_height = cyberwin_obj.height;
		if (cyberwin_obj.callback) 未来之窗_layer_callback = cyberwin_obj.callback;
		if (cyberwin_obj.fold) 未来之窗_layer_fold = cyberwin_obj.fold;
		if (cyberwin_obj.canfold) 未来之窗_layer_canfold = cyberwin_obj.canfold;
		if (cyberwin_obj.time) 未来之窗_layer_自动关闭时间 = cyberwin_obj.time;
		
		
		//2025-09-20 未来之窗_layer_titlebar样式
		if (cyberwin_obj.skin) 未来之窗_layer_titlebar样式key = cyberwin_obj.skin;
		未来之窗_layer_titlebar样式 = "cyberwin_query_dialog_titlebarskin_" + 未来之窗_layer_titlebar样式key;
		
		//2025-09-20
	 
		if (cyberwin_obj.minbox) 未来之窗_layer_titlebar_MinimizeBox = cyberwin_obj.minbox;
		if (cyberwin_obj.maxbox) 未来之窗_layer_titlebar_MaximizeBox = cyberwin_obj.maxbox;
		if (cyberwin_obj.fullscreen) 未来之窗_layer_titlebar_fullscreenBox = cyberwin_obj.fullscreen;
		if (cyberwin_obj.barbg) 未来之窗_layer_titlebar_top_bgcolor = cyberwin_obj.barbg;
		
		//
		//2025-12-21
		//	var 未来之窗_layer_那他非由于中书令_content='';
	//	var 未来之窗_layer_那他非由于中书令_中书令='';
		if (cyberwin_obj.param1) 未来之窗_layer_那他非由于中书令_中书令 = cyberwin_obj.param1;
		
		//	var 未来之窗_layer_box_bordershow = "Y";
	//	var 未来之窗_layer_box_force = "";
		if (cyberwin_obj.param1) 未来之窗_layer_box_bordershow = cyberwin_obj.bordershow;
		
		if(未来之窗_layer_box_bordershow == "N"){
		    未来之窗_layer_box_borderforce =" !important;"
		}else{
		    未来之窗_layer_box_borderforce = "";
		}
		
		

		var height_layer = parseFloat(未来之窗_layer_height.replace("px", ""));
		var width_layer = parseFloat(未来之窗_layer_width.replace("px", ""));

		if (height_layer > 50) {
		//	未来之窗_layer_body_height = parseFloat(height_layer - 50) + "px";
		//2025-10-19 3像素滚动
			未来之窗_layer_body_height = parseFloat(height_layer - 47) + "px";
		}

		if (width_layer < 600) {
			未来之窗_layer_titlebar_closewidth = "60px;text-indent: 5px;";
			未来之窗_layer_titlebar_captionstyle = "width:" + parseFloat(width_layer - 60) + "px;";
		}

		if ($cq("#" + 未来之窗_layer_id).length > 0) {
			return;
		}

		if (cyberwin_obj.align) {
			未来之窗_layer_alignment = cyberwin_obj.align;
		}

		if (未来之窗_layer_type == "input") {
			var 新内容 = content + `<input type="txt" class="input" id="cyberwin_arg_input_0D3EB0CDBBA6A535543A5E7714DA67E6" name="cyberwin_arg_input_0D3EB0CDBBA6A535543A5E7714DA67E6"   tips="" >`;
			f.open(未来之窗_layer_title, 新内容, "确定", "取消", 未来之窗_layer_callback);
			return;
		}
		
			//2024-4-24
		if(未来之窗_layer_type == "inputdate"){
			var 新内容=content+`<input type="date" class="input" id="cyberwin_arg_input_0D3EB0CDBBA6A535543A5E7714DA67E6" name="cyberwin_arg_input_0D3EB0CDBBA6A535543A5E7714DA67E6"   tips="" >`;
			f.open(未来之窗_layer_title,新内容,"确定","取消",未来之窗_layer_callback);
			return;
		} 

		if (未来之窗_layer_type == "notice") {
			f.ok(未来之窗_layer_title, content, "确定", 未来之窗_layer_callback);
			return;
		}

		if (未来之窗_layer_type == "confirm") {
			f.open(未来之窗_layer_title, content, "确定", "取消", 未来之窗_layer_callback);
			return;
		}
	//2023-8-11 进程对话
		if (未来之窗_layer_type == "progress") {
			let 未来之窗任务服务名称 = "cyberwin_global_intent_applocal_Progress";
			window.localStorage.setItem(未来之窗任务服务名称, "");
			let 未来之窗任务服务 = JSON.stringify(content);
			window.localStorage.setItem(未来之窗任务服务名称, 未来之窗任务服务);

			width_layer = 350;
			height_layer = 350;
			let 进度窗口 = "./wlzc_runtime/dialog/applocal_Progress.html";
			content = `<iframe id='` + 未来之窗_layer_id + `_frame' name='` + 未来之窗_layer_id + `_frame' width="500" height="450" frameborder="0" scrolling="auto" hspace="0" src="` + 进度窗口 + `" style="border-radius: 20px;"></iframe>`;
		}
		
     	if(未来之窗_layer_titlebar样式key == "pc" || 未来之窗_layer_titlebar样式key == "macos"  ){
			    //|| 未来之窗_layer_titlebar样式key == "pad"
			    height_layer = height_layer + 20 ;
			    //未来之窗_layer_body_height = 未来之窗_layer_body_height + 30;
			    //未来之窗_layer_body_height
			    未来之窗_layer_body_height = parseFloat(未来之窗_layer_body_height) + 30;
			    未来之窗_layer_titlebar_closewidth = "35px;text-indent: 0px;";
		}

		if (未来之窗_layer_type == "url") {
			var url窗口宽度 = width_layer - 10;
			var url窗口高 = height_layer - 55;
			if (未来之窗_layer_hidetitle == true) {
				url窗口高 = height_layer - 20;
			}
			
			//未来之窗_layer_titlebar样式key phone
			if(未来之窗_layer_titlebar样式key == "pc" || 未来之窗_layer_titlebar样式key == "macos"  ){
			    //|| 未来之窗_layer_titlebar样式key == "pad"
			    url窗口高 = url窗口高 + 20 ;
			}
			content = `<iframe id='` + 未来之窗_layer_id + `_frame' name='` + 未来之窗_layer_id + `_frame' width="` + url窗口宽度 + `" height="` + url窗口高 + `" frameborder="0" scrolling="auto" hspace="0" src="` + content + `" style="border-radius: 20px;"></iframe>`;
		}
		//Quarantine 2025-12-21 那他非由于中书令 Independence
		//Independence
		if (未来之窗_layer_type == "framelikeurl" || 未来之窗_layer_type == "flu" || 未来之窗_layer_type == "frameQuarantine") {
			var url窗口宽度 = width_layer - 10;
			var url窗口高 = height_layer - 55;
			if (未来之窗_layer_hidetitle == true) {
				url窗口高 = height_layer - 20;
			}
			const 空白地址='about:blank?'+未来之窗_layer_那他非由于中书令_中书令;
			
			未来之窗_layer_那他非由于中书令_content=content;
	//	var 未来之窗_layer_那他非由于中书令_中书令='';
	 
			
			//未来之窗_layer_titlebar样式key phone
			if(未来之窗_layer_titlebar样式key == "pc" || 未来之窗_layer_titlebar样式key == "macos"  ){
			    //|| 未来之窗_layer_titlebar样式key == "pad"
			    url窗口高 = url窗口高 + 20 ;
			}
			content = `<iframe id='` + 未来之窗_layer_id + `_frame' name='` + 未来之窗_layer_id + `_frame' width="` + url窗口宽度 + `" height="` + url窗口高 + `" frameborder="0" scrolling="auto" hspace="0" src="` + 空白地址 + `" style="border-radius: 20px;"></iframe>`;
			//$cq().fairyalliance_webpage_PlaceContent("#"+未来之窗_layer_id,content);
		}
		

		if (未来之窗_layer_type == "load") {
			content = 未来之窗加载html;
			width_layer = 200;
			height_layer = 200;
		}

		try {
			CyberWin_Dialog_screen_height = document.body.clientHeight;
			CyberWin_Dialog_screen_width = document.body.offsetWidth;
		} catch(ex) {}

		switch (未来之窗_layer_alignment) {
			case 1:
				var right_ = parseFloat(CyberWin_Dialog_screen_width - width_layer) / 2;
				未来之窗_layer_alignmentstyle = "top:auto;bottom:0px;right:" + right_ + "px;";
				break;
			case 2:
				未来之窗_layer_alignmentstyle = "top: 0px;right: 0px;";
				break;
			case 3:
				var hight_ = parseFloat(CyberWin_Dialog_screen_height - height_layer) / 2;
				if (hight_ < 0) hight_ = 0;
				if (hight_ > window.screen.height - 20) hight_ = 100;
				未来之窗_layer_alignmentstyle = "top: " + hight_ + "px;left: 0px;";
				break;
			case 4:
				未来之窗_layer_alignmentstyle = "top: 0 px;left: 0px;";
				break;
			case 5:
				var right_ = parseFloat(CyberWin_Dialog_screen_width - width_layer) / 2;
				var hight_ = parseFloat(CyberWin_Dialog_screen_height - height_layer) / 2;
				var right可视化检验2025_ = parseFloat(window.screen.width - height_layer) / 2;
				var hight可视化检验2025_ = parseFloat(window.screen.height - height_layer) / 2;
				
				if (right_ > window.screen.width) right_ = 0;
				if (right_ > right可视化检验2025_) right_ = right可视化检验2025_;
				if (hight_ < 0) hight_ = 0;
				if (hight_ > window.screen.height - 20) hight_ = 100;
				if (hight_ > hight可视化检验2025_) hight_ = hight可视化检验2025_;
				
				未来之窗_layer_alignmentstyle = "top: " + hight_ + "px;right: " + right_ + "px;";
				break;
			case 6:
			//	未来之窗_layer_alignmentstyle = "bottom: 0 px;right: 0px;";
			//2026-03-20
				未来之窗_layer_alignmentstyle = "bottom: 0 px;right: 0px;top:auto;";
				break;
			case 7:
				var hight_ = parseFloat(CyberWin_Dialog_screen_height - height_layer) / 2;
				if (hight_ < 0) hight_ = 0;
				if (hight_ > window.screen.height) hight_ = 100;
				未来之窗_layer_alignmentstyle = "top: " + hight_ + "px;right: 0px;";
				break;
			case 8:
				未来之窗_layer_alignmentstyle = "top:auto;bottom:0px;right: auto;";
				break;
			case 9:
				var right_ = parseFloat(CyberWin_Dialog_screen_width - width_layer) / 2;
				未来之窗_layer_alignmentstyle = "top:0px; right: " + right_ + "px;";
				break;
			case 59:
				var right_ = parseFloat(CyberWin_Dialog_screen_width - width_layer) / 2;
				var hight_ = parseFloat(CyberWin_Dialog_screen_height - height_layer) / 2;
				var hight可视化检验2025_ = parseFloat(window.screen.height - height_layer) / 2;
				
				if (hight_ > 40) hight_ = hight_ - 35;
				if (hight_ < 0) hight_ = 0;
				if (hight_ > window.screen.height) hight_ = 100;
				if (hight_ > hight可视化检验2025_) hight_ = hight可视化检验2025_ - 35;
				
				未来之窗_layer_alignmentstyle = "top: " + hight_ + "px;right: " + right_ + "px;";
				break;
			default:
				break;
		}
		
		//2026-01-25 系统对话框
		if(未来之窗_layer_titlebar样式key == "sysdialog"){
		       const fasysdialog = document.createElement('dialog');
               fasysdialog.className = 'cyberwin_dialog_sysdhs-dynamic-dialog';
               fasysdialog.id = 未来之窗_layer_id;
                // 覆盖默认宽度（可选）
                  fasysdialog.style.width = width_layer="px";
                  //fasysdialog.style.maxWidth = width_layer;
                   fasysdialog.style.height = height_layer+"px";
                             // 步骤2：创建关闭按钮（已带前缀类名，复用修改后的逻辑）
                const fasysdcloseBtn = sysdialog_createCloseBtn();
        
                // 步骤3：创建内容容器（类名添加 cyberwin_dialog_sysdhs 前缀）
                const fasysdcontentContainer = document.createElement('div');
                fasysdcontentContainer.className = 'cyberwin_dialog_sysdhs-sysdialog-content';
        
            
                
                fasysdcontentContainer.innerHTML = content;
        
                // 步骤4：组装弹窗DOM结构
                fasysdialog.appendChild(fasysdcloseBtn);
                fasysdialog.appendChild(fasysdcontentContainer);
        
                // 步骤5：插入页面DOM树
                document.body.appendChild(fasysdialog);
        
                // 步骤6：绑定关闭事件（复用原有逻辑，关闭后移除DOM释放资源）
                const handleClose = () => {
                    fasysdialog.close();
                    document.body.removeChild(fasysdialog);
                    // 执行关闭回调
                    /*
                    if (typeof config.onClose === 'function') {
                        config.onClose();
                    }
                    */
                };
                fasysdcloseBtn.addEventListener('click', handleClose);
        
                // 可选：支持按 ESC 键关闭（原生dialog默认支持，此处保留可自定义）
                fasysdialog.addEventListener('cancel', handleClose);
        
                // 步骤7：打开模态弹窗
                fasysdialog.showModal();
                
                return;

		    
		}

		var wlzc_tool_bar_close_html = "<div class=\"return\" onClick=\"cyberwin_closeAndDeldlg('"+未来之窗_layer_id + "');\" style=\"width:" + 未来之窗_layer_titlebar_closewidth + ";\">"+未来之窗_layer_btncancel+"</div>";
		if (未来之窗_layer_close_btn == false) {
			wlzc_tool_bar_close_html = "";
		}
		
		//最小化
		//最大化
		//全屏
		// right:400px;
		var 当前按钮偏移 = 0;
		var wlzc_tool_bar_minbox_html ="";
		var wlzc_tool_bar_maxbox_html = "";
		var wlzc_tool_bar_fullscreenbox_html = "";
	
		if (未来之窗_layer_titlebar_MinimizeBox == "N") {
			wlzc_tool_bar_minbox_html = "";
		}else{
		    当前按钮偏移 = parseFloat(当前按钮偏移)+40;
		    var 未来之窗_layer_titlebar_通用按钮宽度 = 未来之窗_layer_titlebar_closewidth + ";right:"+当前按钮偏移+"px;";
		    wlzc_tool_bar_minbox_html = "<div class=\"minbox\" onClick=\"cyberwin_dialog_mindlg('"+未来之窗_layer_id + "',"+未来之窗_layer_mask+");\" style=\"width:" + 未来之窗_layer_titlebar_通用按钮宽度 + ";\">"+未来之窗_layer_titlebar_text_min+"</div>";
		}
		if (未来之窗_layer_titlebar_MaximizeBox == "N") {
			wlzc_tool_bar_maxbox_html = "";
		}else{
		     当前按钮偏移 = parseFloat(当前按钮偏移)+40;
		    var 未来之窗_layer_titlebar_通用按钮宽度 = 未来之窗_layer_titlebar_closewidth + ";right:"+当前按钮偏移+"px;";
		    wlzc_tool_bar_maxbox_html = "<div class=\"maxbox\" onClick=\"cyberwin_dialog_maxdlg('"+未来之窗_layer_id + "',"+未来之窗_layer_mask+",'"+未来之窗_layer_body_height+"');\" style=\"width:" + 未来之窗_layer_titlebar_通用按钮宽度 + ";\">"+未来之窗_layer_titlebar_text_max+"</div>";
		}
		if (未来之窗_layer_titlebar_fullscreenBox == "N") {
			wlzc_tool_bar_fullscreenbox_html = "";
		}else{
		     当前按钮偏移 = parseFloat(当前按钮偏移)+40;
		    var 未来之窗_layer_titlebar_通用按钮宽度 = 未来之窗_layer_titlebar_closewidth + ";right:"+当前按钮偏移+"px;";
		    wlzc_tool_bar_fullscreenbox_html = "<div class=\"fullbox\" onClick=\"cyberwin_dialog_fulldlg('"+未来之窗_layer_id + "',"+未来之窗_layer_mask+");\" style=\"width:" + 未来之窗_layer_titlebar_通用按钮宽度 + ";\">"+未来之窗_layer_titlebar_text_fullbar+"</div>";
		}
		 

	//	var 未来之窗元素_标题 = `<div class="set_top"><div class="set" style="cursor:move;`+未来之窗_layer_titlebar_captionstyle+`" onClick="cyberwin_query_wlzc_dialog_swithbody('`+未来之窗_layer_id+`','`+未来之窗_layer_canfold+`');" >`+未来之窗_layer_title+"</div>"
	//	    + wlzc_tool_bar_close_html
		//		+"</div>";
				
				//未来之窗_layer_titlebar样式
			var 未来之窗元素_标题作废 = `<div class=" ${未来之窗_layer_titlebar样式} set_top"><div class="set" style="cursor:move;`+未来之窗_layer_titlebar_captionstyle+`" onClick="cyberwin_query_wlzc_dialog_swithbody('`+未来之窗_layer_id+`','`+未来之窗_layer_canfold+`');" >`+未来之窗_layer_title+"</div>"
		    + wlzc_tool_bar_close_html +"</div>";
		    
		   	var 未来之窗元素_标题2025PC = `<div class=" ${未来之窗_layer_titlebar样式} set_top" style="background:${未来之窗_layer_titlebar_top_bgcolor};"><div class="set" style="cursor:move;`+未来之窗_layer_titlebar_captionstyle+`" onClick="cyberwin_query_wlzc_dialog_swithbody('`+未来之窗_layer_id+`','`+未来之窗_layer_canfold+`');" >`+未来之窗_layer_title+"</div>"
		    +wlzc_tool_bar_minbox_html+wlzc_tool_bar_maxbox_html + wlzc_tool_bar_fullscreenbox_html +  wlzc_tool_bar_close_html +"</div>";
		    
		   var 未来之窗元素_标题 = 未来之窗元素_标题2025PC;

		var 未来之窗_div_透明 = "background:rgba(243,245,247,"+未来之窗_layer_alpha+");";

		if (未来之窗_layer_hidetitle == true) {
			未来之窗元素_标题 = "";
			未来之窗_layer_body_height = height_layer + "px";
		}

		var content_html_mask作废20251221 = '<cyberdiv class="cyberwin_dialog_mask" id="'+未来之窗_layer_id+`" style="`+未来之窗_layer_mask_style+`"><div class="cyberwin_dialog_localapp_fix " id="`+未来之窗_layer_id+`_maskmove" style="dispaly:none1;width:`+未来之窗_layer_width+`;height:`+未来之窗_layer_height+`;min-height:`+未来之窗_layer_height+`;min-height:auto;border:1px solid ${未来之窗_layer_titlebar_top_bgcolor};`+未来之窗_layer_alignmentstyle+未来之窗_div_透明+`">
		`+未来之窗元素_标题+`
		<div class="set_end clr"  id="`+未来之窗_layer_id+`_body" style="height:`+未来之窗_layer_body_height+`;overflow-y:auto;">`+content+
			"</div>"+
		"</div></cyberdiv>";
		
		
		var content_html_mask = '<cyberdiv class="cyberwin_dialog_mask" id="'+未来之窗_layer_id+`" style="`+未来之窗_layer_mask_style+`"><div class="cyberwin_dialog_localapp_fix " id="`+未来之窗_layer_id+`_maskmove" style="dispaly:none1;width:`+未来之窗_layer_width+`;height:`+未来之窗_layer_height+`;min-height:`+未来之窗_layer_height+`;min-height:auto;border:1px solid ${未来之窗_layer_titlebar_top_bgcolor} ${未来之窗_layer_box_borderforce};`+未来之窗_layer_alignmentstyle+未来之窗_div_透明+`">
		`+未来之窗元素_标题+`
		<div class="set_end clr"  id="`+未来之窗_layer_id+`_body" style="height:`+未来之窗_layer_body_height+`;overflow-y:auto;">`+content+
			"</div>"+
		"</div></cyberdiv>";
		

		var content_html_nomast = ' <div class="cyberwin_dialog_localapp_fix " id="'+未来之窗_layer_id+`" style="dispaly:none1;width:`+未来之窗_layer_width+`;height:`+未来之窗_layer_height+`;min-height:`+未来之窗_layer_height+`;min-height:auto;border:1px solid ${未来之窗_layer_titlebar_top_bgcolor};`+未来之窗_layer_alignmentstyle+未来之窗_div_透明+`">
		`+未来之窗元素_标题+`
		    <div class="set_end clr" id="`+未来之窗_layer_id+`_body" style="height:`+未来之窗_layer_body_height+`;overflow-y:auto;">`+content+
			"</div>"+
		"</div> ";

		if (未来之窗_layer_mask) {
		//	$cq(content_html_mask).appendTo($cq('body'));
	  	   
	     	$cq('body').append(content_html_mask);
		} else {
			//$cq(content_html_nomast).appendTo($cq('body'));
			$cq('body').append(content_html_nomast);
		}

		$cq('#' + 未来之窗_layer_id).fadeIn();
		$cq('#' + 未来之窗_layer_id).show();
 

		if (未来之窗_layer_can_movedialog == true) {
			if (未来之窗_layer_mask) {
				f.cyberwin_move(未来之窗_layer_id + "_maskmove");
			} else {
				f.cyberwin_move(未来之窗_layer_id);
			}
		}

		if (未来之窗_layer_type == "load") {
			if (未来之窗_layer_mask) {
				document.getElementById(未来之窗_layer_id + "_maskmove").style.border = "0 solid #000000";
			} else {
				document.getElementById(未来之窗_layer_id).style.border = "0 solid #000000";
			}
		}

		if (未来之窗_layer_fold == "Y") {
			$cq("#" + 未来之窗_layer_id).addClass("cyberwin_dialog_hide_body_20230811");
			$cq("#" + 未来之窗_layer_id + "_body").hide();
		}

		if (未来之窗_layer_自动关闭时间 > 10) {
			let 东方仙盟_时间剩余总长 = 未来之窗_layer_自动关闭时间;
			let 东方仙盟_出台演示过 = false;
			let 东方仙盟_出台演示对象 = 未来之窗_layer_id;
			
			if (未来之窗_layer_mask) {
				东方仙盟_出台演示对象 = 未来之窗_layer_id + "_maskmove";
			}
			
			const 东方仙盟timer = setInterval(() => {
				东方仙盟_时间剩余总长 = 东方仙盟_时间剩余总长 - 300;
				
				if (东方仙盟_时间剩余总长 < 1200 && 东方仙盟_时间剩余总长 > 700 && 东方仙盟_出台演示过 == false) {
					$cq('#' + 东方仙盟_出台演示对象).addClass('东方仙盟_灵颜妙手_动画_从上往下');
					东方仙盟_出台演示过 = true;
				}
				
				if (东方仙盟_时间剩余总长 < 700 && 东方仙盟_时间剩余总长 > 300 && 东方仙盟_出台演示过 == true) {
					$cq('#' + 东方仙盟_出台演示对象).addClass('东方仙盟_灵颜妙手_动画_顶部80');
				}
				
				if (东方仙盟_时间剩余总长 < 0) {
					clearInterval(东方仙盟timer);
					cyberwin_closeAndDeldlg(未来之窗_layer_id);
				}
			}, 300);
		}
		
		//2025-12-21 Quarantine 2025-12-21 那他非由于中书令 Independence
		if (未来之窗_layer_type == "framelikeurl" || 未来之窗_layer_type == "flu" || 未来之窗_layer_type == "frameQuarantine") {
	      //未来之窗_layer_id + `_frame
	    
	        setTimeout(() => {
                   $cq().fairyalliance_webpage_PlaceContent("#"+未来之窗_layer_id+"_frame",未来之窗_layer_那他非由于中书令_content);
            }, 500);
	   }
	   
	   //2026-02-15
	   if (未来之窗_layer_type == "url" ) {
	       if(famsm26_enable_iframe == true){
	           //注入监控
	           const framem = $cq("#"+未来之窗_layer_id+"_frame").me;
	           injectMonitorToIframe(framem);
	       }
	       
	   }
	};

    f.v = "2023.1";
    
    return f;
})();

// 全局变量和初始化
var CyberWin_Dialog_screen_width = window.screen.width;
var CyberWin_Dialog_screen_height = window.screen.height;

try {
	CyberWin_Dialog_screen_width = window.screen.width;
	CyberWin_Dialog_screen_height = window.screen.height;
} catch(ex) {}

//
//2025-0922
function cyberwin_query_addStylebysafe(styleContent) {
  const style = document.createElement('style');
  style.type = 'text/css';
  style.textContent = styleContent;
  // 将样式添加到 head 中
  document.head.appendChild(style);
}

$cq.强制加载样式 = function(styleContent) {
    return cyberwin_query_addStylebysafe(styleContent);
}

//CyberWin_Dialog.init();
CyberWin_Dialog.initby2025();

function cyberwin_closeAndDeldlg(obj_id) {
	$cq("#" + obj_id).hide();
	$cq("#" + obj_id).remove();
}

function cyberwin_query_wlzc_dialog_swithbody(obj_id, 是否可收缩) {
	if (是否可收缩 == "N") {
		return "忽略切换";
	}
	
	var 已经隐藏 = $cq("#" + obj_id).hasClass("cyberwin_dialog_hide_body_20230811");
	
	if (已经隐藏 == true) {
		$cq("#" + obj_id).removeClass("cyberwin_dialog_hide_body_20230811");
		$cq("#" + obj_id + "_body").show();
	} else {
		$cq("#" + obj_id).addClass("cyberwin_dialog_hide_body_20230811");
		$cq("#" + obj_id + "_body").hide();
	}
}

//
function cyberwin_dialog_mindlg(obj_id,是否mask) {
       var	 new_灵体 = obj_id;
       if (是否mask == true) {
	     	 new_灵体 = obj_id +"_maskmove";
	   }
	    //  console.log("new_灵体",new_灵体);
        
	 
	//	$cq("#" + new_灵体).addClass("cyberwin_dialog_hide_body_20230811");
		$cq("#" + obj_id + "_body").hide();
		$cq("#" + new_灵体 + "").css({"overflow":"hidden","min-height":"45px","height":"45px"});
		
	 	$cq("#" + new_灵体 + "").css("height","45px");
	//	$cq("#" + new_灵体 + "").css("overflow","hidden");
 
}

function cyberwin_dialog_maxdlg(obj_id,是否mask,最高) {

       var	 new_灵体 = obj_id;
       if (是否mask == true) {
	     	 new_灵体 = obj_id +"_maskmove";
	   }
	    //console.log("new_灵体",new_灵体);
	 
	//	$cq("#" + new_灵体).删除样式("cyberwin_dialog_hide_body_20230811");
		$cq("#" + obj_id + "_body").show();
		
		$cq("#" + new_灵体 + "").css({"height":最高+"px","overflow":"auto","min-height":最高+"px"});
		
	 //	$cq("#" + new_灵体 + "").css("height","45px");
		$cq("#" + new_灵体 + "").css({"height":最高+"px"});
 
}

function cyberwin_dialog_fulldlg(obj_id,是否mask) {

      let bodyw = window.innerWidth;
      let bodyh = window.innerHeight;
       if (是否mask == true) {
	     	 new_灵体 = obj_id +"_maskmove";
	   }
	  // console.log("new_灵体",new_灵体);
	 
	//	$cq("#" + obj_id).addClass("cyberwin_dialog_hide_body_20230811");
	//	$cq("#" + obj_id + "_body").show();
	$cq("#" + new_灵体 + "").css({"height":bodyh+"px","top":0,"left":0,"width":bodyw+"px"});
	//$cq("#" + new_灵体 + "").css({"width":bodyw+"px"});
 
}

/*
// 简化调用方式
window.$cq = function(selector) {
    return new cyberwin_query(selector);
};
*/

//先知
/*未来之窗通用数据渲染
	 
	2025-5-26
	未来之窗先知

	东方仙盟显示渲染


	 
	cyberwin_fairyalliance_from_prophetrendering.js
*/
//function 未来之窗_人工智能_东方仙盟_仙君仙域先知(先知灵晶,前置参数){
$cq.未来之窗_人工智能_东方仙盟_仙君仙域先知 = function(先知灵晶,前置参数) {
    return $cq.未来之窗_人工智能_东方仙盟_仙君仙域先知高级(先知灵晶,前置参数,".东方仙盟先知仙域","默认");
}
//function 未来之窗_人工智能_东方仙盟_仙君仙域先知高级(先知灵晶,前置参数,东方仙盟先知仙域=".东方仙盟先知仙域",渲染模式="默认"){
$cq.未来之窗_人工智能_东方仙盟_仙君仙域先知高级 = function(先知灵晶,前置参数,东方仙盟先知仙域,渲染动作) {
	 console.group("未来之窗_人工智能_东方仙盟_仙君仙域先知");
	 var 未来之窗_渲染_前置参数 = "cl_handle_data_";
     前置参数 = "" + 前置参数 + "";
	 if(前置参数.length > 0){
		 未来之窗_渲染_前置参数 = 前置参数;
	 }


     for (var key in 先知灵晶) {
		// console.log("明细key= "+key+" v="+obj[key]);
		//2025-7-31
	//	console.log("明细key= "+key+" v="+先知灵晶[key]);
		 var 先知one = 先知灵晶[key];
		// console.log(先知one);

		 const 灵引仙索 = 先知one.spiritkey;
		 const 灵髓 = 先知one.spiritValue;
		 const 神通 = 先知one.spiritaction;
		 if(神通 == "执行"){
            //灵髓
			var 执法 = new Function(灵髓);
             执法();
		 }
		 if(渲染动作 == "替换名称"){
		     
		      var 未来之窗变量=未来之窗_渲染_前置参数 + 灵引仙索;
			  var 未来之窗数值 = 先知one.name;// 注意不同之处 灵髓;//obj[key];
		      $cq(东方仙盟先知仙域 +" ."+未来之窗变量).each(function(index){
				//var 未来之窗tag = $cq(this)[0].tagName;
				//未来之窗250921
				var 未来之窗tag = $cq(this).tagName;
			    未来之窗tag =""+未来之窗tag;
			    未来之窗tag = 未来之窗tag.toLowerCase();
			    // console.log("渲染动作 ->明细key= "+灵引仙索+" tagName="+ 未来之窗tag);
                  if(未来之窗tag == "input"){
						$cq(this).val(未来之窗数值);
						$cq(this).trigger('change');
					}else if(未来之窗tag == "select"){
						$cq(this).val(未来之窗数值);
						//selectElement.onchange();
						$cq(this).trigger('change');
						 
					}else if(未来之窗tag == "td"){
							$cq(this).text(未来之窗数值);
					}else{
							$cq(this).text(未来之窗数值);
					}

					});
					
		     
		    continue; 
		 }
		 if(渲染动作 == "替换key"){
		     
		       var 未来之窗变量=未来之窗_渲染_前置参数 + 灵引仙索;
			  var 未来之窗数值 = 灵引仙索;//先知one.name;// 注意不同之处 灵髓;//obj[key];
		      $cq(东方仙盟先知仙域 +" ."+未来之窗变量).each(function(index){
				var 未来之窗tag = $(this)[0].tagName;
			    未来之窗tag =""+未来之窗tag;
			    未来之窗tag = 未来之窗tag.toLowerCase();
			 //    console.log("渲染动作 ->明细key= "+灵引仙索+" tagName="+ 未来之窗tag);
                  if(未来之窗tag == "input"){
						$cq(this).val(未来之窗数值);
						$cq(this).trigger('change');
					}else if(未来之窗tag == "select"){
						$cq(this).val(未来之窗数值);
						//selectElement.onchange();
						$cq(this).trigger('change');
						 
					}else if(未来之窗tag == "td"){
						$cq(this).text(未来之窗数值);
					}else{
						$cq(this).text(未来之窗数值);
					}

					});
					
		    continue; 
		 }
		 
		 //2025-07-31 全球多国度语言
		 if(渲染动作 == "全球多国度语言"){
		     
		       var 未来之窗变量=未来之窗_渲染_前置参数 + 灵引仙索;
			  var 未来之窗数值 = 灵髓 ;//灵引仙索;//先知one.name;// 注意不同之处 灵髓;//obj[key];
		      $cq(东方仙盟先知仙域 +" ."+未来之窗变量).each(function(index){
			//	var 未来之窗tag = $cq(this)[0].tagName;
					//未来之窗250921
				var 未来之窗tag = $cq(this).tagName;
			    未来之窗tag =""+未来之窗tag;
			    未来之窗tag = 未来之窗tag.toLowerCase();
			  //   console.log("渲染动作 ->明细key= "+灵引仙索+" tagName="+ 未来之窗tag);
                  if(未来之窗tag == "input"){
						$cq(this).val(未来之窗数值);
						$cq(this).trigger('change');
					}else if(未来之窗tag == "select"){
				    	$cq(this).val(未来之窗数值);
						//selectElement.onchange();
						$cq(this).trigger('change');
						 
					}else if(未来之窗tag == "td"){
						$cq(this).text(未来之窗数值);
					}else{
						$cq(this).text(未来之窗数值);
					}

					});
					
		    continue; 
		 }
		 
		  if(神通 == "录入"){
			 
		 
			 var 未来之窗变量=未来之窗_渲染_前置参数 + 灵引仙索;
			 var 未来之窗数值 = 灵髓;//obj[key];
		     $cq(东方仙盟先知仙域 +" ."+未来之窗变量).each(function(index){
				 //var 未来之窗tag = $cq(this)[0].tagName;
					//未来之窗250921
				var 未来之窗tag = $cq(this).tagName;
			    未来之窗tag =""+未来之窗tag;
			    未来之窗tag = 未来之窗tag.toLowerCase();
			   //  console.log("明细key= "+灵引仙索+" tagName="+ 未来之窗tag);
                  if(未来之窗tag == "input"){
						$cq(this).val(未来之窗数值);
						$cq(this).trigger('change');
					}else if(未来之窗tag == "select"){
						$cq(this).val(未来之窗数值);
						//selectElement.onchange();
						$cq(this).trigger('change');
						 
					}else if(未来之窗tag == "td"){
						$cq(this).text(未来之窗数值);
					}else{
						$cq(this).text(未来之窗数值);
					}

					});
		  }
		  
		  //2025-07-20
		  //表单输入
		  if(神通 == "表单输入框"){
		     // console.log("仙域id=",东方仙盟先知仙域);
		     // const 表单html=`<cyberdiv class="fg"><label>${先知one.name}：</label><input id="${灵引仙索}" name="${灵引仙索}" value="${灵髓}" ></cyberdiv>`;
		     //cl_handle_data_
		     const 表单html=`<cyberdiv class="fg"><label>${先知one.name}：</label><input id="${灵引仙索}" name="${灵引仙索}" value="${灵髓}" class="cl_handle_data_${灵引仙索}" ></cyberdiv>`;
		     
		       //console.log("表单html=",表单html);
		      $cq(""+东方仙盟先知仙域).append(表单html);
		  }
		  
		  //2025-09-22
		  if(神通 == "删除"){
		     // console.log("仙域id=",东方仙盟先知仙域);
		     // $cq(this).remove();
		      var 未来之窗变量=未来之窗_渲染_前置参数 + 灵引仙索;
			 //var 未来之窗数值 = 灵髓;//obj[key];
		     $cq(东方仙盟先知仙域 +" ."+未来之窗变量).each(function(index){
		         $cq(this).remove();
		     });
		  }
		  if(神通 == "显示"){
		     // console.log("仙域id=",东方仙盟先知仙域);
		     // $cq(this).show();
		      var 未来之窗变量=未来之窗_渲染_前置参数 + 灵引仙索;
			 //var 未来之窗数值 = 灵髓;//obj[key];
		     $cq(东方仙盟先知仙域 +" ."+未来之窗变量).each(function(index){
		         $cq(this).show();
		     });
		  }
		  
		  if(神通 == "隐藏"){
		     // console.log("仙域id=",东方仙盟先知仙域);
		      //$cq(this).hide();
		        var 未来之窗变量=未来之窗_渲染_前置参数 + 灵引仙索;
			 //var 未来之窗数值 = 灵髓;//obj[key];
		     $cq(东方仙盟先知仙域 +" ."+未来之窗变量).each(function(index){
		         $cq(this).hide();
		     });
		  }
						  
	}

		console.groupEnd();
}

//简化路由
cyberwin_query.prototype.表单打包 = function() {
    return this.WLZC_serializeJson();
};

cyberwin_query.prototype.表单检测 = function(tiptype) {
     return this.未东方仙盟_通用技术_检测表单(tiptype);
};

//dataToDonetQueryFormat cyberWinAPPParse
$cq.未来之窗协议_数据打包 = function(options) {
    return dataToDonetQueryFormat(options);
}

$cq.未来之窗协议_数据解包 = function(options) {
    return cyberWinAPPParse(options);
}

//
$cq.仙君_先知 = function(先知灵晶,前置参数) {
    return $cq.未来之窗_人工智能_东方仙盟_仙君仙域先知(先知灵晶,前置参数);
}
 
$cq.仙君_仙域先知 = function(先知灵晶,前置参数,东方仙盟先知仙域,渲染动作) {
     return $cq.未来之窗_人工智能_东方仙盟_仙君仙域先知高级(先知灵晶,前置参数,东方仙盟先知仙域,渲染动作);
}

//CyberWin_Dialog
 
$cq.对话框 = function() {
     return CyberWin_Dialog;
}
 
 $cq.对话框_设置屏幕 = function(options) {
     CyberWin_Dialog_screen_width = options.width;
     CyberWin_Dialog_screen_height =options.height;
}
/*
Object.defineProperty($cq.prototype, '对话框', {
    get: function() {
          return CyberWin_Dialog;
    }
});
*/
//2025-09-21
//2023-8-7 未来之窗增加多段支持
//正式加入 架构模式
var intent_param="";

//2023-8-7
//默认技术互联网 online wlzcinnernet
//var HyperHybridClient_middleware_Page_version="online";

var cyberwin_query_HyperHybridClient_middleware_Page_version="online";
 
//保留2023-2月技术
$cq.未来之窗_中间件_运行 = function(options) {
	var 参数包名称 = $cq.未来之窗_网页库_获取当前网址参数("param_name");
	var 静态渲染模板 = $cq.未来之窗_网页库_获取当前网址参数("tpl_name");
    //2023-7-26 调整技术
	$cq.未来之窗_中间件_运行_call(参数包名称,静态渲染模板);
	
	if(options.version){
	    cyberwin_query_HyperHybridClient_middleware_Page_version = options.version;
	}
};

//2023-7-26 调整技术
$cq.未来之窗_中间件_运行_clear = function(options) {
	document.write("");
}
 
//读取参数
//打印
//2023-7-26 调整技术
//function  未来之窗_中间件_运行_call(参数包名称,静态渲染模板){
$cq.未来之窗_中间件_运行_call = function(参数包名称,静态渲染模板) {	 

	if(参数包名称==false){
		return;
	}

	var 参数包str ="";

	if( cyberwin_query_HyperHybridClient_middleware_Page_version == "online"){
		参数包str = window.localStorage.getItem(参数包名称);
	}

	if( cyberwin_query_HyperHybridClient_middleware_Page_version == "wlzcinnernet"){

		if(未来之窗客户端技术  == false){
		  //不支持未来之窗客户端技术
		  //配置错误
		  return ;
	     }
		
		参数包str = CyberWin_JsStandardPlug.locStorage_getVal("cyberwin_local_cache","local_cache",""+参数包名称);
	}

	
	


	var 参数包=eval("("+参数包str+")");


	var 变量转换="<script>";


	 for(var 参数i in 参数包){
	//	 console.log("参数包"+参数i);
	//	 console.log(参数包[参数i]);

		 变量转换 = 变量转换 + "var "+参数i +" = "+ '"'+参数包[参数i] +'"'+";"+' \n ';
		 
	}
	变量转换 = 变量转换 + "</script>";

	document.write(变量转换);

	//alert(current_order_idV2023);




	//intent_dish_foodorder

	if(静态渲染模板==false){
		return;
	}

	//var htmlc = decodeURIComponent(escape(window.atob(htmlcb)));

	 // console.log("静态渲染模板="+静态渲染模板);

	  var htmlcb = "";//window.localStorage.getItem(静态渲染模板);
		// htmlobj=eval("("+html+")");

	if( cyberwin_query_HyperHybridClient_middleware_Page_version == "online"){
		htmlcb = window.localStorage.getItem(静态渲染模板);
	}

	if( cyberwin_query_HyperHybridClient_middleware_Page_version == "wlzcinnernet"){

		if(未来之窗客户端技术 == false){
		  //不支持未来之窗客户端技术
		  //配置错误
		  return ;
	     }
		
		htmlcb = CyberWin_JsStandardPlug.locStorage_getVal("cyberwin_local_cache","local_cache",""+静态渲染模板);
	}


	//	console.log(htmlcb);
						//console.log("原来"+htmlcb);
	 var 未来之窗_代码_html = decodeURIComponent(escape(window.atob(htmlcb)));
	//  var 未来之窗_代码_html = decodeURIComponent(htmlcb);
     console.log("静态渲染模板=》开始渲染");

	//  console.log(未来之窗_代码_html);
	 document.write(未来之窗_代码_html);

	
	//var cwpd_render_data = window.localStorage.getItem(静态渲染模板);//$.parseJSON(window.localStorage.getItem(local_tpl_dish_tableorder));
	//var html = decodeURIComponent(cwpd_render_data);
	//document.write(html);

}



$cq.cyberwin_query_dialog_close = function(options) {
    $cq("#" + options).hide();
	$cq("#" + options).remove();
}

$cq.对话框关闭 = function(options) {
  return  $cq.cyberwin_query_dialog_close(options);
}

function cyberwin_closedlg(obj_id) {
return  $cq.cyberwin_query_dialog_close(obj_id);
}

//2025-09-25
/**
 * 处理单个select元素的选中数据（支持获取和设置）
 * @param {string|Object} [value] - 可选，要设置选中的值或包含value的对象
 * @returns {Object|cyberwin_query} - 选中项数据（获取时）或自身实例（设置时）
 */
 /*
cyberwin_query.prototype.selectdata = function(value) {
    // 只处理第一个select元素
    if (this.elements.length === 0 || this.elements[0].tagName !== 'SELECT') {
        console.warn('selectdata方法只能用于单个select元素');
        return this;
    }
    
    const selectElement = this.elements[0];
    
    // 无参数时，获取选中项数据
    if (arguments.length === 0) {
        const selectedOption = selectElement.options[selectElement.selectedIndex];
        if (!selectedOption) return null;
        
        // 收集所有data-*属性
        const data = {};
        for (const attr of selectedOption.attributes) {
            if (attr.name.startsWith('data-')) {
                // 将data-goods_id转换为goods_id格式
                const key = attr.name.replace(/^data-/, '');
                data[key] = attr.value;
            }
        }
        
        // 返回包含所有数据的对象
        return {
            ...data,
            value: selectedOption.value,
            text: selectedOption.textContent.trim()
        };
    }
    
    // 有参数时，设置选中项
    // 支持传入值或包含value属性的对象
    const targetValue = typeof value === 'object' && value.value !== undefined 
        ? value.value 
        : value;
    
    // 查找并选中对应选项
    for (let i = 0; i < selectElement.options.length; i++) {
        if (selectElement.options[i].value === targetValue) {
            selectElement.selectedIndex = i;
            break;
        }
    }
    
    return this; // 支持链式调用
};
*/

/**
 * 处理option元素的dataset数据（支持获取和修改）
 * @param {string} dataKey - 要操作的data属性键名（不含data-前缀）
 * @param {string} [value] - 可选，要设置的属性值。如果不提供则为获取操作
 * @returns {string|cyberwin_query} - 获取时返回属性值，设置时返回自身实例
 *  const goodsId = cyberwin_query('option:selected').selectdata('goods_id');
// console.log(goodsId); // 输出: "5C186935-3C90-4808-8EA9-308725B6CEF1"
 */
cyberwin_query.prototype.selectoptiondata = function(dataKey, value) {
    // 验证参数
    if (typeof dataKey !== 'string' || dataKey.trim() === '') {
        console.warn('selectdata方法需要有效的data属性键名作为第一个参数');
        return this;
    }
    
    // 只处理option元素
    const validElements = this.elements.filter(el => el.tagName === 'OPTION');
    if (validElements.length === 0) {
        console.warn('selectdata方法只能用于option元素');
        return this;
    }
    
    // 获取操作：返回第一个有效元素的data属性值
    if (arguments.length === 1) {
        return validElements[0].dataset[dataKey] || null;
    }
    
    // 设置操作：为所有匹配的option元素设置data属性
    validElements.forEach(element => {
        element.dataset[dataKey] = value;
    });
    
    return this; // 支持链式调用
};


/**
 * 处理select元素下option的dataset数据（支持获取和修改）
 * @param {string} dataKey - 要操作的data属性键名（不含data-前缀）
 * @param {string|undefined} value - 可选，要设置的属性值。如果不提供则为获取操作
 * @returns {string|Array|cyberwin_query} - 获取时返回属性值，设置时返回自身实例
 */
 // 示例用法：
// 1. 获取单个select元素选中option的data-goods_id
// const goodsId = cyberwin_query('#serviceSelectby_worker').selectdata('goods_id');
// console.log(goodsId); // 输出: "5C186935-3C90-4808-8EA9-308725B6CEF1"
cyberwin_query.prototype.selectdata = function(dataKey, value) {
    // 验证参数
    if (typeof dataKey !== 'string' || dataKey.trim() === '') {
        console.warn('selectdata方法需要有效的data属性键名作为第一个参数');
        return this;
    }
    
    // 只处理select元素
    const selectElements = this.elements.filter(el => el.tagName === 'SELECT');
    if (selectElements.length === 0) {
        console.warn('selectdata方法只能用于select元素');
        return this;
    }

    // 收集所有select元素下的option
    const allOptions = [];
    selectElements.forEach(select => {
        Array.from(select.options).forEach(option => {
            allOptions.push({
                select: select,
                option: option,
                index: Array.from(select.options).indexOf(option)
            });
        });
    });
 //console.warn('argumentsarguments',arguments);
    // 获取操作：返回所有option的指定data属性值
  //  if (arguments.length === 1) {
      if (value === undefined) {
               //console.log('第二个参数未传入');
   
        // 如果只有一个select元素，返回其选中option的data值
        if (selectElements.length === 1) {
            // console.warn('如果只有一个select元素，返回其选中option的data值');
            const selectedOption = selectElements[0].options[selectElements[0].selectedIndex];
            // console.warn('如果只有一个select元素selectedOption',selectedOption);
             
            return selectedOption ? selectedOption.dataset[dataKey] || null : null;
        }
        
        // 多个select元素时，返回包含所有选中项data值的数组
        // console.warn('多个select元素时，返回包含所有选中项data值的数组');
        return selectElements.map(select => {
            const selectedOption = select.options[select.selectedIndex];
            return selectedOption ? selectedOption.dataset[dataKey] || null : null;
        });
    }

    // 设置操作：为所有option设置指定data属性值
    // 或者只为选中的option设置（根据实际需求可调整）
    allOptions.forEach(item => {
        item.option.dataset[dataKey] = value;
    });

    return this; // 支持链式调用
};
/**
 * 获取所有选中的select元素数据（仅获取，不支持设置）
 * @returns {Array} - 包含所有select元素选中项数据的数组
 * 
 */
cyberwin_query.prototype.selectdatas = function() {
    const results = [];
    
    // 遍历所有选中的元素
    this.elements.forEach(element => {
        // 只处理select元素
        if (element.tagName !== 'SELECT') {
            console.warn('selectdatas方法跳过非select元素');
            return;
        }
        
        const selectedOption = element.options[element.selectedIndex];
        if (!selectedOption) {
            results.push(null);
            return;
        }
        
        // 收集所有data-*属性
        const data = {};
        for (const attr of selectedOption.attributes) {
            if (attr.name.startsWith('data-')) {
                const key = attr.name.replace(/^data-/, '');
                data[key] = attr.value;
            }
        }
        
        // 添加到结果数组
        //chrome 53 不支持
        /*
        results.push({
            ...data,
            value: selectedOption.value,
            text: selectedOption.textContent.trim(),
            // 增加select元素的id以便区分不同的选择框
            selectId: element.id
        });
        */
         // 使用Object.assign合并对象，替代扩展运算符
         //2025-10-14 
        results.push(Object.assign({}, data, {
            value: selectedOption.value,
            text: selectedOption.textContent.trim(),
            // 增加select元素的id以便区分不同的选择框
            selectId: element.id
        }));
        
    });
    
    return results;
};
 
//2025-09-25 简化
/*
$cq.下拉列表选中所有data = function() {
  return  $cq.selectdatas();
}


$cq.下拉列表选中data = function(options) {
  return  $cq.selectdata(options);
}
*/
//cyberwin_query.prototype.selectdatas = function() {
cyberwin_query.prototype.下拉列表选中所有data = function() {
    return  this.selectdatas();
};
cyberwin_query.prototype.下拉列表选中data = function(options, value) {
    return  this.selectdata(options, value);
};

//2025-09-25

/**
 * 获取与input关联的datalist中，匹配输入值的option的data属性
 * @param {string} dataKey - 要获取的data属性键名（不含data-前缀）
 * @returns {string|null} - 匹配项的data属性值，无匹配则返回null
 */
cyberwin_query.prototype.getDatalistData = function(dataKey) {
    // 只处理type为text且关联datalist的input
    if (this.elements.length === 0 || this.elements[0].tagName !== 'INPUT' || 
        this.elements[0].type !== 'text' || !this.elements[0].list) {
        console.warn('getDatalistData方法仅支持关联datalist的text类型input');
        return null;
    }

    const inputEl = this.elements[0];
    const datalistId = inputEl.list.id; // 获取关联的datalist的id
    const datalist = document.getElementById(datalistId);
    if (!datalist) {
        console.warn(`未找到id为${datalistId}的datalist`);
        return null;
    }

    // 获取input当前值，匹配datalist中的option
    const inputValue = inputEl.value.trim();
    const matchedOption = Array.from(datalist.options).find(option => {
        return option.value.trim() === inputValue;
    });

    // 返回匹配项的指定data属性
    return matchedOption ? matchedOption.dataset[dataKey] || null : null;
};


/**
 * 切换元素的类名（存在则移除，不存在则添加）
 * @param {string} className - 要切换的类名
 * @returns {cyberwin_query} - 自身实例，支持链式调用
 */
cyberwin_query.prototype.toggleClass = function(className) {
    if (typeof className !== 'string' || className.trim() === '') {
        console.warn('toggleClass方法需要有效的类名参数');
        return this;
    }

    this.elements.forEach(element => {
        element.classList.toggle(className.trim());
    });

    return this;
};

/**
 * 查找元素的最近祖先元素（包括自身）
 * @param {string} selector - CSS选择器
 * @returns {cyberwin_query} - 匹配的元素实例
 */
cyberwin_query.prototype.closest = function(selector) {
    const matched = [];

    this.elements.forEach(element => {
        let current = element;
        while (current && current !== document) {
            if (current.matches(selector)) {
                matched.push(current);
                break;
            }
            current = current.parentElement;
        }
    });
    
    this.elements = matched;
    
     return this;
/*
    // 返回新的cyberwin_query实例
    const newInstance = cyberwin_query();
    newInstance.elements = matched;
    newInstance.length = matched.length;
    return newInstance;
    */
};

/**
 * 获取元素的所有兄弟元素（不包括自身）
 * @param {string} [selector] - 可选，CSS选择器筛选
 * @returns {cyberwin_query} - 兄弟元素实例
 */
cyberwin_query.prototype.siblings = function(selector) {
    const siblings = [];

    this.elements.forEach(element => {
        const parent = element.parentElement;
        if (!parent) return;

        Array.from(parent.children).forEach(child => {
            if (child !== element) {
                if (!selector || child.matches(selector)) {
                    siblings.push(child);
                }
            }
        });
    });
    
     this.elements = siblings;
    
     return this;
/*
    const newInstance = cyberwin_query();
    newInstance.elements = siblings;
    newInstance.length = siblings.length;
    return newInstance;
    */
};

/**
 * 获取元素的下一个兄弟元素
 * @param {string} [selector] - 可选，CSS选择器筛选
 * @returns {cyberwin_query} - 下一个兄弟元素实例
 */
cyberwin_query.prototype.next = function(selector) {
    const nextElements = [];

    this.elements.forEach(element => {
        let next = element.nextElementSibling;
        while (next) {
            if (!selector || next.matches(selector)) {
                nextElements.push(next);
                break;
            }
            next = next.nextElementSibling;
        }
    });
    
     this.elements = nextElements;
    
     return this;
/*
    const newInstance = cyberwin_query();
    newInstance.elements = nextElements;
    newInstance.length = nextElements.length;
    return newInstance;
    */
};

/**
 * 获取元素之后的所有兄弟元素
 * @param {string} [selector] - 可选，CSS选择器筛选
 * @returns {cyberwin_query} - 所有后续兄弟元素实例
 */
cyberwin_query.prototype.nextAll = function(selector) {
    const nextAllElements = [];

    this.elements.forEach(element => {
        let next = element.nextElementSibling;
        while (next) {
            if (!selector || next.matches(selector)) {
                nextAllElements.push(next);
            }
            next = next.nextElementSibling;
        }
    });
    
     this.elements = nextAllElements;
    
     return this;
/*
    const newInstance = cyberwin_query();
    newInstance.elements = nextAllElements;
    newInstance.length = nextAllElements.length;
    return newInstance;
    */
};

/**
 * 获取元素之后到指定选择器之间的兄弟元素
 * @param {string} selector - 结束选择器
 * @param {string} [filter] - 可选，筛选选择器
 * @returns {cyberwin_query} - 范围内的兄弟元素实例
 */
cyberwin_query.prototype.nextUntil = function(selector, filter) {
    const untilElements = [];

    this.elements.forEach(element => {
        let next = element.nextElementSibling;
        while (next && !next.matches(selector)) {
            if (!filter || next.matches(filter)) {
                untilElements.push(next);
            }
            next = next.nextElementSibling;
        }
    });
    
     this.elements = untilElements;
    
     return this;
/*
    const newInstance = cyberwin_query();
    newInstance.elements = untilElements;
    newInstance.length = untilElements.length;
    return newInstance;
    */
};

/**
 * 获取元素的上一个兄弟元素
 * @param {string} [selector] - 可选，CSS选择器筛选
 * @returns {cyberwin_query} - 上一个兄弟元素实例
 */
cyberwin_query.prototype.prev = function(selector) {
    const prevElements = [];

    this.elements.forEach(element => {
        let prev = element.previousElementSibling;
        while (prev) {
            if (!selector || prev.matches(selector)) {
                prevElements.push(prev);
                break;
            }
            prev = prev.previousElementSibling;
        }
    });
      this.elements = untilElements;
    
     return this;
/*

    const newInstance = cyberwin_query();
    newInstance.elements = prevElements;
    newInstance.length = prevElements.length;
    return newInstance;
    */
};

/**
 * 获取元素之前的所有兄弟元素
 * @param {string} [selector] - 可选，CSS选择器筛选
 * @returns {cyberwin_query} - 所有前置兄弟元素实例
 */
cyberwin_query.prototype.prevAll = function(selector) {
    const prevAllElements = [];

    this.elements.forEach(element => {
        let prev = element.previousElementSibling;
        while (prev) {
            if (!selector || prev.matches(selector)) {
                prevAllElements.push(prev);
            }
            prev = prev.previousElementSibling;
        }
    });
     this.elements = prevAllElements;
    
    return this;
/*
    const newInstance = cyberwin_query();
    newInstance.elements = prevAllElements;
    newInstance.length = prevAllElements.length;
    return newInstance;
    */
};

/**
 * 获取元素之前到指定选择器之间的兄弟元素
 * @param {string} selector - 结束选择器
 * @param {string} [filter] - 可选，筛选选择器
 * @returns {cyberwin_query} - 范围内的兄弟元素实例
 */
cyberwin_query.prototype.prevUntil = function(selector, filter) {
    const untilElements = [];

    this.elements.forEach(element => {
        let prev = element.previousElementSibling;
        while (prev && !prev.matches(selector)) {
            if (!filter || prev.matches(filter)) {
                untilElements.push(prev);
            }
            prev = prev.previousElementSibling;
        }
    });
    
     this.elements = untilElements;
    
    return this;
/*

    const newInstance = cyberwin_query();
    newInstance.elements = untilElements;
    newInstance.length = untilElements.length;
    return newInstance;
    */
};

/**
 * 获取匹配元素集合中的第一个元素
 * @returns {cyberwin_query} - 第一个元素实例
 */
cyberwin_query.prototype.first = function() {
    const firstElement = this.elements.length > 0 ? [this.elements[0]] : [];
    
     this.elements = firstElement;
    
    return this;
    /*
    const newInstance = cyberwin_query();
    newInstance.elements = firstElement;
    newInstance.length = firstElement.length;
    return newInstance;
    */
};

/**
 * 获取匹配元素集合中的最后一个元素
 * @returns {cyberwin_query} - 最后一个元素实例
 */
cyberwin_query.prototype.last = function() {
    const lastElement = this.elements.length > 0 ? [this.elements[this.elements.length - 1]] : [];
    
     this.elements = lastElement;
    
    return this;
    
   // const newInstance = cyberwin_query();
  //  newInstance.elements = lastElement;
  //  newInstance.length = lastElement.length;
 //   return newInstance;
};

/**
 * 根据索引获取匹配元素集合中的指定元素
 * @param {number} index - 元素索引（支持负数，从末尾开始）
 * @returns {cyberwin_query} - 指定索引的元素实例
 */
 /*
cyberwin_query.prototype.eq = function(index) {
    let targetElement = [];
    if (this.elements.length > 0) {
        // 处理负数索引
        const realIndex = index < 0 ? this.elements.length + index : index;
        if (realIndex >= 0 && realIndex < this.elements.length) {
            targetElement = [this.elements[realIndex]];
        }
    }
    
    const newInstance = cyberwin_query();
    newInstance.elements = targetElement;
    newInstance.length = targetElement.length;
    return newInstance;
};
*/
/**
 * 获取元素的直接子元素
 * @param {string} [selector] - 可选，CSS选择器筛选
 * @returns {cyberwin_query} - 直接子元素实例
 */
cyberwin_query.prototype.children = function(selector) {
    const childElements = [];

    this.elements.forEach(element => {
        Array.from(element.children).forEach(child => {
            if (!selector || child.matches(selector)) {
                childElements.push(child);
            }
        });
    });
    
     this.elements = childElements;
    
    return this;
/*
    const newInstance = cyberwin_query();
    newInstance.elements = childElements;
    newInstance.length = childElements.length;
    return newInstance;
    */
};

//简化路由
/**
 * 切换元素的类名（存在则移除，不存在则添加）
 * @param {string} className - 要切换的类名
 * @returns {cyberwin_query} - 自身实例，支持链式调用
 */
cyberwin_query.prototype.样式切换 = function(className) {
    return this.toggleClass(className);
}
cyberwin_query.prototype.祖先 = function(selector) {
    return this.closest(selector);
}

cyberwin_query.prototype.兄弟 = function(selector) {
     return this.siblings(selector);
}
cyberwin_query.prototype.下一个兄弟 = function(selector) {
     return this.next(selector);
}
cyberwin_query.prototype.兄弟们 = function(selector) {
     return this.nextAll(selector);
}

cyberwin_query.prototype.兄弟亲密 = function(selector, filter) {
     return this.nextUntil(selector, filter);
}

cyberwin_query.prototype.大哥 = function(selector) {
     return this.prev(selector);
}
cyberwin_query.prototype.大哥们 = function(selector) {
     return this.prevAll(selector);
}
cyberwin_query.prototype.大哥亲密 = function(selector, filter) {
     return this.prevUntil(selector, filter);
}

cyberwin_query.prototype.第一个 = function() {
    return this.first();
}
cyberwin_query.prototype.最后一个 = function() {
    return this.last();
}
cyberwin_query.prototype.孩子 = function(selector) {
     return this.children(selector);
}
cyberwin_query.prototype.输入选择data = function(options) {
    return  this.getDatalistData(options);
};

//2025-09-28

/**
 * 获取与input关联的datalist中，匹配输入值的option的data属性
 * @param {string} dataKey - 要获取的data属性键名（不含data-前缀）
 * @returns {string|null} - 匹配项的data属性值，无匹配则返回null
 */

/**
 * 使元素获得焦点
 * @returns {cyberwin_query} - 自身实例，支持链式调用
 */
cyberwin_query.prototype.focus = function() {
    // 对每个元素尝试设置焦点
    this.elements.forEach(element => {
        // 检查元素是否可以获取焦点
        if (element.focus) {
            try {
                element.focus();
            } catch (e) {
                console.warn('无法为元素设置焦点:', element, e);
            }
        } else {
            console.warn('元素不支持focus方法:', element);
        }
    });
    
    return this; // 支持链式调用
};

cyberwin_query.prototype.聚焦 = function() {
    return  this.focus();
};

//2025-09-28
// 获取src属性
Object.defineProperty(cyberwin_query.prototype, 'childNodes', {
    get: function() {
        if (this.elements.length === 0) return '';
        return this.elements[0].childNodes || '';
    }
});

Object.defineProperty(cyberwin_query.prototype, '子节点', {
    get: function() {
        if (this.elements.length === 0) return '';
        return this.elements[0].childNodes || '';
    }
});

//2025-09-28
/**
     * 将文本输入元素的光标移动到末尾
     * @returns {cyberwin_query} - 自身实例，支持链式调用
     */
    cyberwin_query.prototype.moveCursorToEnd = function() {
        this.elements.forEach(element => {
            // 只处理支持selectionStart的文本输入元素
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                try {
                    const length = element.value.length;
                    element.selectionStart = length;
                    element.selectionEnd = length;
                    element.focus();
                } catch (e) {
                    console.warn('无法将光标移动到末尾:', element, e);
                }
            } else {
                console.warn('moveCursorToEnd方法仅支持input和textarea元素:', element);
            }
        });
        
        return this;
    };

    /**
     * 将文本输入元素的光标移动到指定位置
     * @param {number} position - 光标要移动到的位置索引
     * @returns {cyberwin_query} - 自身实例，支持链式调用
     */
    cyberwin_query.prototype.moveCursorToPosition = function(position) {
        // 验证位置参数
        if (typeof position !== 'number' || isNaN(position) || position < 0) {
            console.warn('moveCursorToPosition方法需要有效的非负数字位置参数');
            return this;
        }

        this.elements.forEach(element => {
            // 只处理支持selectionStart的文本输入元素
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                try {
                    // 确保位置不超过文本长度
                    const maxPosition = element.value.length;
                    const validPosition = Math.min(Math.max(0, position), maxPosition);
                    
                    element.selectionStart = validPosition;
                    element.selectionEnd = validPosition;
                    element.focus();
                } catch (e) {
                    console.warn('无法将光标移动到指定位置:', element, e);
                }
            } else {
                console.warn('moveCursorToPosition方法仅支持input和textarea元素:', element);
            }
        });
        
        return this;
    };

     

/**
     * 将富文本编辑器的光标移动到内容末尾
     * @returns {cyberwin_query} - 自身实例，支持链式调用
     */
    cyberwin_query.prototype.fairyrealmmoveCursorToEnd = function() {
        this.elements.forEach(editor => {
            try {
                // 创建范围对象
                const range = document.createRange();
                // 选中编辑器所有内容
                range.selectNodeContents(editor);
                // 折叠到末尾（false表示折叠到范围末尾）
                range.collapse(false);
                
                // 更新选区
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
                
                // 设置焦点
                editor.focus();
            } catch (e) {
                console.warn('无法将光标移动到编辑器末尾:', editor, e);
            }
        });
        
        return this;
    };

    /**
     * 移动富文本编辑器的光标到指定位置
     * @param {number} positionCode - 位置代码：1=第一个字符前，2=第二个子元素后
     * @returns {cyberwin_query} - 自身实例，支持链式调用
     */
    cyberwin_query.prototype.fairyrealmmoveCursor = function(positionCode) {
        // 验证位置代码参数
        if (typeof positionCode !== 'number' || ![1, 2].includes(positionCode)) {
            console.warn('moveCursor方法仅支持位置代码1或2');
            return this;
        }

        this.elements.forEach(editor => {
            try {
                const range = document.createRange();
                const selection = window.getSelection();
                
                if (positionCode === 1) {
                    // 移动到第一个字符前
                    if (editor.firstChild) {
                        range.setStart(editor.firstChild, 0);
                        range.collapse(true);
                    } else {
                        // 如果编辑器为空，直接在编辑器内设置光标
                        range.setStart(editor, 0);
                        range.collapse(true);
                    }
                } else if (positionCode === 2) {
                    // 移动到第二个子元素之后
                    const childNodes = editor.childNodes;
                    if (childNodes.length >= 2) {
                        range.setStartAfter(childNodes[1]);
                        range.collapse(true);
                    } else {
                        // 如果子元素不足2个，移动到末尾
                        range.selectNodeContents(editor);
                        range.collapse(false);
                        console.warn('编辑器子元素不足2个，已将光标移动到末尾');
                    }
                }
                
                // 更新选区并设置焦点
                selection.removeAllRanges();
                selection.addRange(range);
                editor.focus();
            } catch (e) {
                console.warn('无法移动光标到指定位置:', editor, e);
            }
        });
        
        return this;
};

//简短路由
cyberwin_query.prototype.文本光标移动到末尾 = function() {
    return  this.moveCursorToEnd();
};

cyberwin_query.prototype.文本光标移动 = function(options) {
    return  this.moveCursorToPosition(options);
};
cyberwin_query.prototype.编辑器光标移动到末尾 = function() {
    return  this.fairyrealmmoveCursorToEnd();
};

cyberwin_query.prototype.编辑器光标移动 = function(options) {
    return  this.fairyrealmmoveCursor(options);
};

/**
     * 未来之窗公式编辑器插入内容方法
     * @param {string} content - 要插入的内容（文本或HTML字符串）
     * @param {boolean} [isHtml=false] - 是否以HTML格式插入，默认false（文本格式）
     * @returns {cyberwin_query} - 自身实例，支持链式调用
     *  未来之窗公式编辑器_插入
     */
cyberwin_query.prototype.fairy_realm_block_insert_content = function(content, isHtml = false) {
        // 确保编辑器元素存在
        if (this.elements.length === 0) {
            console.warn('未找到编辑器元素');
            return this;
        }

        const editor = this.elements[0];
        const selection = window.getSelection();

        // 只有存在选区时才执行插入操作
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            range.deleteContents(); // 清除当前选中的内容

            let node;
            if (isHtml) {
                // HTML格式插入：创建临时容器解析HTML
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = content;
                
                // 处理解析后的所有节点
                while (tempDiv.firstChild) {
                    node = tempDiv.firstChild;
                    // 如果是元素节点，设置不可编辑属性
                    if (node.nodeType === 1) {
                        node.contentEditable = "false";
                        //node.classList.add('公式字段', '公式字段-value');
                    }
                    range.insertNode(node);
                    // 移动光标到插入内容后面
                    range.setStartAfter(node);
                    range.setEndAfter(node);
                }
            } else {
                // 文本格式插入
                node = document.createTextNode(content);
                range.insertNode(node);
                
                // 移动光标到文本后面
                range.setStartAfter(node);
                range.setEndAfter(node);
            }

            // 更新选区
            selection.removeAllRanges();
            selection.addRange(range);
        }

        // 聚焦编辑器
        this.focus();
        
        // 调用转换结果函数（假设已存在）
        /*
        if (window.未来之窗公式编辑器_转换结果) {
            window.未来之窗公式编辑器_转换结果("#formulas");
        } else {
            console.warn('未来之窗公式编辑器_转换结果函数未定义');
        }
        */

        return this;
    };

    // 示例用法：
    // 1. 插入普通文本
    // $cq('#editor').未来之窗公式编辑器_插入('123 + 456');
    //
    // 2. 插入HTML内容
    // const htmlContent = '<span data-field="price">单价</span> * <span data-field="quantity">数量</span>';
    // $cq('#editor').未来之窗公式编辑器_插入(htmlContent, true);
    //
    // 3. 插入运算符号（原"运算"类型）
    // $cq('#editor').未来之窗公式编辑器_插入('+');
    //
    // 4. 链式操作
    // $cq('#formulaEditor')
    //   .css('border', '1px solid #666')
    //   .未来之窗公式编辑器_插入('总计 = ', false)
    //   .未来之窗公式编辑器_插入('<span data-field="sum">金额总和</span>', true);

/**
     * 在文本框光标位置插入内容
     * @param {string} content - 要插入的内容
     * @returns {cyberwin_query} - 自身实例，支持链式调用
     */
    cyberwin_query.prototype.fairyinputinsertcontent = function(content) {
        this.elements.forEach(textbox => {
            // 只处理input和textarea元素
            if (textbox.tagName !== 'INPUT' && textbox.tagName !== 'TEXTAREA') {
                console.warn('未来之窗_光标技术_insert仅支持input和textarea元素');
                return;
            }

            const 当前文本内容 = textbox.value;
            const 光标开始位置 = textbox.selectionStart;
            const 光标结束位置 = textbox.selectionEnd;

            // 插入内容并更新文本框值
            textbox.value = 
                当前文本内容.substring(0, 光标开始位置) + 
                content + 
                当前文本内容.substring(光标结束位置);

            // 重新设置光标位置到插入内容后面
            const 新光标位置 = 光标开始位置 + content.length;
            textbox.selectionStart = 新光标位置;
            textbox.selectionEnd = 新光标位置;
            
            // 保持焦点
            textbox.focus();
        });

        return this;
    };

    /**
     * 通过ID获取元素并在光标位置插入内容
     * @param {string} eleid - 元素ID
     * @param {string} value - 要插入的内容
     */
 

    // 示例用法：
    // 1. 通过cyberwin_query实例调用
    // $cq('#username').未来之窗_光标技术_insert('插入的内容');
    //
    // 2. 通过ID直接调用
    // 未来之窗_前端技术_插入当前('message', '添加的文本');
    //
    // 3. 链式操作
    // $cq('#search')
    //   .css('color', 'blue')
    //   .未来之窗_光标技术_insert('关键词:')
    //   .focus();
//精简
    cyberwin_query.prototype.输入框_光标_插入内容 = function(options) {
        return this.fairyinputinsertcontent(options);
    };
    cyberwin_query.prototype.输入框_插入= function(options) {
        return this.fairyinputinsertcontent(options);
    };
    cyberwin_query.prototype.未来之窗公式编辑器_插入 = function(options, isHtml = false) {
         return this.fairy_realm_block_insert_content(options,isHtml);
    };   
    
    cyberwin_query.prototype.编辑器_插入 = function(options, isHtml = false) {
         return this.fairy_realm_block_insert_content(options,isHtml);
    };


cyberwin_query.prototype.getselectText = function() {
   
   
    // 只处理select元素
    const selectElements = this.elements.filter(el => el.tagName === 'SELECT');
    if (selectElements.length === 0) {
        console.warn('selectdata方法只能用于select元素');
        return this;
    }

    // 收集所有select元素下的option
    const allOptions = [];
    selectElements.forEach(select => {
        Array.from(select.options).forEach(option => {
            allOptions.push({
                select: select,
                option: option,
                index: Array.from(select.options).indexOf(option)
            });
        });
    });
 //console.warn('argumentsarguments',arguments);
    // 获取操作：返回所有option的指定data属性值
  //  if (arguments.length === 1) {
     
               //console.log('第二个参数未传入');
   
        // 如果只有一个select元素，返回其选中option的data值
        if (selectElements.length === 1) {
            // console.warn('如果只有一个select元素，返回其选中option的data值');
            const selectedOption = selectElements[0].options[selectElements[0].selectedIndex];
           
             
            return selectedOption ? selectedOption.text || null : null;
        }
        
        // 多个select元素时，返回包含所有选中项data值的数组
        // console.warn('多个select元素时，返回包含所有选中项data值的数组');
        return selectElements.map(select => {
            const selectedOption = select.options[select.selectedIndex];
            return selectedOption ? selectedOption.text || null : null;
        });
   

     

    return this; // 支持链式调用
};

cyberwin_query.prototype.下拉列表选中文本 = function() {
    return  this.getselectText();
};

//2025-10-12
$cq.未来之窗_智能IOT_吐卡机吐卡 = function(地址,波特率,指令) {
        try{
           
            
            
           //  var 地址   =$("#dev_addr").val();
           //  var 波特率    =$("#dev_btl").val();
            // var 指令    =$("#dev_command").val();
             
             var 灵魂 ="CyberPHP->Param:ty"+"CyberPHP->Value:000";
             灵魂 =灵魂+"CyberPHP->Param:device_address"+"CyberPHP->Value:"+地址;
             灵魂 =灵魂+"CyberPHP->Param:device_baudrate"+"CyberPHP->Value:"+波特率;
             灵魂 =灵魂+"CyberPHP->Param:device_command"+"CyberPHP->Value:"+指令;
              灵魂 =灵魂+"CyberPHP->Param:endn"+"CyberPHP->Value:090";
             
           //   alert("传送阵="+灵魂);
           var d=    CyberWin_JsStandardPlug.cyberWin_Device_AIOT_Monitor("spiritsssttclient",灵魂);
            
        }catch(e){
            alert(e);
        }
};

//2025-10-12
$cq.未来之窗_智能IOT_android串口指令 = function(地址,波特率,指令) {
        try{
           
            
            
           //  var 地址   =$("#dev_addr").val();
           //  var 波特率    =$("#dev_btl").val();
            // var 指令    =$("#dev_command").val();
             
             var 灵魂 ="CyberPHP->Param:ty"+"CyberPHP->Value:000";
             灵魂 =灵魂+"CyberPHP->Param:device_address"+"CyberPHP->Value:"+地址;
             灵魂 =灵魂+"CyberPHP->Param:device_baudrate"+"CyberPHP->Value:"+波特率;
             灵魂 =灵魂+"CyberPHP->Param:device_command"+"CyberPHP->Value:"+指令;
              灵魂 =灵魂+"CyberPHP->Param:endn"+"CyberPHP->Value:090";
             
           //   alert("传送阵="+灵魂);
           var d=    CyberWin_JsStandardPlug.cyberWin_Device_AIOT_Monitor("spiritsssttclient",灵魂);
            
        }catch(e){
            alert(e);
        }
};

//2025-10-13
/**
     * 数字增长动画效果
     * @param {number} targetValue - 目标数值
     * @param {number} [duration=5000] - 动画持续时间(毫秒)
     * @param {number} [decimalPlaces=2] - 保留小数位数
     * @returns {cyberwin_query} - 自身实例，支持链式调用
     */
 cyberwin_query.prototype.fairyalliance_animation_number = function(targetValue, duration = 5000, decimalPlaces = 2) {
        // 确保有匹配的元素
        if (this.elements.length < 1) {
            console.error('找不到指定的元素');
            return this;
        }
        
        let startTime = null;
        const startValue = 0;
        const elements = this.elements; // 保存元素引用
        
        // 缓动函数 - 使动画先快后慢，接近目标时减速
        function easeOutQuart(t) {
            return 1 - Math.pow(1 - t, 4);
        }
        
        // 动画更新函数
        function AnimationNumber_updateNumber(timestamp) {
            if (!startTime) startTime = timestamp;
            
            // 计算动画进度（0到1之间）
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            // 应用缓动效果
            const easedProgress = easeOutQuart(progress);
            
            // 计算当前值
            const currentValue = startValue + (targetValue - startValue) * easedProgress;
            
            // 格式化并显示当前值到所有匹配元素
            const displayValue = currentValue.toFixed(decimalPlaces);
            elements.forEach(element => {
                element.textContent = displayValue;
            });
            
            // 动画未完成则继续
            if (progress < 1) {
                requestAnimationFrame(AnimationNumber_updateNumber);
            }
        }
        
        // 开始动画
        requestAnimationFrame(AnimationNumber_updateNumber);
        return this;
    };

    /**
     * 检测是否为IE浏览器
     * @returns {boolean} - 如果是IE浏览器返回true，否则返回false
     */
$cq.isIE = function() {
    
        return !!window.ActiveXObject || "ActiveXObject" in window;
};

$cq.support = function() {
    
        return $cq.isIE;
};

//中文路由
cyberwin_query.prototype.未来之窗_交互动画_数字跳动 = function(targetValue, duration = 5000, decimalPlaces = 2) {
    return this.fairyalliance_animation_number(targetValue,duration,decimalPlaces);
}


//
/**
 * 屏幕录制功能模块 - 未来之窗昭和仙君
 * // 检测所有常见格式的支持情况
const formats = [
  'video/mp4; codecs=avc1.42E01E',
  'video/mp4; codecs=hev1.1.6.L93.B0',
  'video/webm; codecs=vp9',
  'video/webm; codecs=vp8',
  'video/quicktime',
  'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
  'video/webm; codecs="vp9, opus"'
];
 */
cyberwin_query.prototype.fairyalliance_screenRecorder = function(options) {
    // 录制相关变量
    let recorder = null;
    let stream = null;
    let chunks = [];
    
    let mediatype= "video/webm; codecs=vp8";//"video/mp4";
    let mediashowwidth="300px";
    let mediashowheight="152px";
    
    let mediafiletype="webm";
    
    
    
    //options
    try{
        //video/mp4; codecs=avc1.42E01E
        if(options.type == "mp4"){
            mediatype="video/mp4; codecs=avc1.42E01E";
            mediafiletype="mp4";
        }
        if(options.type == "apple"){
            mediatype="video/quicktime";
            mediafiletype="mov";
        }
         if(options.type == "webm"){
            mediatype="video/webm; codecs=vp8";
            mediafiletype="webm";
        }
        //video/mp4; codecs=avc1.42E01E
        //video/webm; codecs=vp9
        //mediatype
         if(options.width){
            mediashowwidth = options.width;
        }
         if(options.height){
            mediashowheight = options.height;
        }
        
    }catch(ex){
        
    }
    
    // 获取或创建录制所需的DOM元素
    const createRecorderElements = () => {
        // 检查是否已有录制控制元素
        let container = document.getElementById('fairyalliance_recorder_container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'fairyalliance_recorder_container';
            container.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 9999;
                background: #fff;
                padding: 10px;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            `;
            
            // 添加控制按钮
            container.innerHTML = ` 
            <h2   style="font-size: 14px;margin-bottom: 0px;color: #007bff;margin-top: 0px;">零安录屏，无需下载安装，点开即用，摒弃传统-未来之窗</h2>
            <div class="controls" style="  margin: 5px 0;display: flex;gap: 10px;">
                <button id="fairyalliance_startRec" style="margin-right:5px;padding:6px 12px;background-color: #007bff;color: white;border: none;border-radius: 4px;">开始录制</button>
                <button id="fairyalliance_stopRec" style="margin-right:5px;padding:6px 12px;" disabled>停止录制</button>
                <a id="fairyalliance_downloadRec" style="display:none1;margin-right:5px;padding:6px 12px;text-decoration:none;background:#007bff;color:white;border-radius:4px;" href="#">下载视频</a>
                
                 <button id="fairyalliance_startRec" style="margin-right:5px;padding:6px 12px;background-color: #F44336;color: white;border: none;border-radius: 4px;" onClick="$cq('#fairyalliance_recorder_container').remove();">关闭</button>
                 </div>
                <video id="fairyalliance_preview" style="margin-top:10px;height:${mediashowheight};width:${mediashowwidth};max-width:${mediashowwidth};border:1px solid #ccc;" controls></video>
            `;
            
            document.body.appendChild(container);
        }
        
        return {
            startBtn: document.getElementById('fairyalliance_startRec'),
            stopBtn: document.getElementById('fairyalliance_stopRec'),
            downloadBtn: document.getElementById('fairyalliance_downloadRec'),
            preview: document.getElementById('fairyalliance_preview')
        };
    };
    
    // 获取元素并绑定事件
    const elements = createRecorderElements();
    
    // 开始录制
    const startRec = async () => {
        try {
            // 获取屏幕流，包含视频和音频
            stream = await navigator.mediaDevices.getDisplayMedia({ 
                video: true,
                audio: { echoCancellation: true }
            });
            
            // 初始化录屏器
           // recorder = new MediaRecorder(stream);
           //2025-10-14
            recorder = new MediaRecorder(stream ,{  mimeType: mediatype });
            chunks = [];
            recorder.ondataavailable = e => chunks.push(e.data);
            
            // 开始录制
            recorder.start();
            
            // 更新按钮状态
            elements.startBtn.disabled = true;
            elements.stopBtn.disabled = false;
            elements.downloadBtn.style.display = 'none';
            
            console.log('未来之窗仙盟 - 开始屏幕录制');
        } catch (err) {
            console.error('录制启动失败:', err);
            alert('无法启动录制: ' + err.message);
        }
    };
    
    // 停止录制
    const stopRec = () => {
        if (!recorder) return;
        
        // 停止录制
        recorder.stop();
        
        // 关闭屏幕流
        stream.getTracks().forEach(t => t.stop());
        
        // 更新按钮状态
        elements.startBtn.disabled = false;
        elements.stopBtn.disabled = true;
        
        console.log('未来之窗仙盟 - 停止屏幕录制');
        
        // 处理录制结果
        recorder.onstop = () => {
            // 生成视频链接 mediatype
            const videoURL = URL.createObjectURL(new Blob(chunks, { type: mediatype }));//'video/webm'
            
            // 更新预览
            elements.preview.src = videoURL;
            
            // 更新下载按钮
            elements.downloadBtn.href = videoURL;
            elements.downloadBtn.download = '未来之窗仙盟录制.'+mediafiletype;
            elements.downloadBtn.style.display = 'inline-block';
        };
    };
    
    // 绑定事件
    elements.startBtn.addEventListener('click', startRec);
    elements.stopBtn.addEventListener('click', stopRec);
    
    // 支持链式调用
    return this;
};

cyberwin_query.prototype.未来之窗_智能IOT_屏幕录像 = function(options) {
    return this.fairyalliance_screenRecorder(options);
};

// 示例用法：
// 初始化屏幕录制功能
// $cq().fairyalliance_screenRecorder();
//
// 也可以绑定到特定按钮触发
// $cq('#initRecorder').on('click', function() {
//   $cq().fairyalliance_screenRecorder();
// });
//2025-10-14

cyberwin_query.prototype.仙盟创梦_数字键盘_打开 = function(options) {
    
     if (this.elements.length === 0) {
            //console.warn('未找到编辑器元素');
            return this;
      }
      
      if (this.elements.length >= 1) {
            //console.warn('未找到编辑器元素');
            return $cq.仙盟创梦_数字键盘_打开({obj:this.elements[0],title:options});
      }

   
   
};
$cq.仙盟创梦_数字键盘_打开 = function(options) {
   let fairyalliance_numpadtitle = "请输入数字";
   if(options.title){
       fairyalliance_numpadtitle = options.title;
   }
   
     const 仙盟样式 =`<style>.仙盟创梦_数字键盘对话框dlg{ border-radius: 10px; padding-left: 0px; padding-bottom: 0px;padding-right: 0px; padding-top: 0px;   z-index: 999999;border:0px;flex-direction:column;margin:0 !important;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);max-height:calc(100% - 2px);max-width:calc(100% - 2px)}.仙盟创梦_数字键盘容器{width:300px;border:1px solid #ccc;border-radius:10px;overflow:hidden}.keypad-header{background-color:#03a9f4;color:white;padding:4px;display:flex;justify-content:space-between;align-items:center}.keypad-header span{font-size:18px}.close-btn{background:none;border:none;color:white;font-size:20px;cursor:pointer}.input-display{display:flex;justify-content:space-between;align-items:center;padding:5px 10px;background-color:#f2f2f2}.input-display input{width:90%;padding:5px;border:1px solid #ccc;max-width: 260px; font-size: larger;}.keypad-body{display:grid;grid-template-columns:repeat(4,1fr);grid-gap:5px;padding:10px}.仙盟创梦-keypad{color: #000;padding:10px;font-size:18px;border:none;border-radius:5px;background-color:#f2f2f2;cursor:pointer;width: 65px;}.仙盟创梦_样式_键盘{padding:10px;font-size:18px;border:none;border-radius:5px;background-color:#03a9f4;cursor:pointer;color: #ffffff;}.仙盟创梦_小键盘_关闭,.仙盟创梦_小键盘_退格,.输入确定{background-color:#03a9f4; border:1px solid #fff;color: #ffffff;}</style>`;


	var 仙盟小键盘  = `<dialog id="仙盟创梦_数字键盘对话框dlg" class="仙盟创梦_数字键盘对话框dlg" open="">
						<div class="仙盟创梦_数字键盘容器">
						<div class="keypad-header">
						  <span>${fairyalliance_numpadtitle}</span>
						  <button class="仙盟创梦_小键盘_关闭">☓</button>
						</div>
						<div class="input-display">
						  <input type="text" id="仙盟创梦_数字键盘_输入数字" readonly="">
						  
						</div>
						<div class="keypad-body">
						  <button class="仙盟创梦-keypad" data-value="7">7</button>
						  <button class="仙盟创梦-keypad" data-value="8">8</button>
						  <button class="仙盟创梦-keypad" data-value="9">9</button>
						  <button class="仙盟创梦_样式_键盘 仙盟创梦_小键盘_退格" data-value="backspace">退格</button>
						  <button class="仙盟创梦-keypad" data-value="4">4</button>
						  <button class="仙盟创梦-keypad" data-value="5">5</button>
						  <button class="仙盟创梦-keypad" data-value="6">6</button>
						  <button class="仙盟创梦_样式_键盘  仙盟创梦_小键盘_清空">清空</button>
						  <button class="仙盟创梦-keypad" data-value="1">1</button>
						  <button class="仙盟创梦-keypad" data-value="2">2</button>
						  <button class="仙盟创梦-keypad" data-value="3">3</button>
						  <button class="仙盟创梦_样式_键盘 输入确定 ">确认</button>
						  <button class="仙盟创梦-keypad" data-value="00">00</button>
						  <button class="仙盟创梦-keypad" data-value="0">0</button>
						  <button class="仙盟创梦-keypad" data-value=".">.</button>
						</div>
					  </div></dialog>
					  `;
  var 未来之窗app_小键盘ID="wlzcapp_ai_all25114_numpadndlg";
  const 未来之窗app_小键盘body = 仙盟样式+仙盟小键盘;
  $cq.对话框().layer(未来之窗app_小键盘body,{type:"frame",hidetitle:true,width:"310px",height:"300px",id:未来之窗app_小键盘ID});
  $cq("#"+未来之窗app_小键盘ID).css("border","none");
  //1px solid #48a731;

  $cq(".仙盟创梦-keypad").事件("click", function() {
	  const 按键值 = $cq(this).data("value");
	  let  小键盘值 = $cq("#仙盟创梦_数字键盘_输入数字").val();

      if (按键值 === 'backspace') {
			 小键盘值 = 小键盘值.slice(0, -1);
	  } else if (按键值 === 'cancel') {
			 小键盘值 = '';
	   } else if (按键值 === 'confirm') {
		 // 这里可以添加确认后的处理逻辑，比如提交数据等
			console.log('确认输入的数字:', 小键盘值);
	   } else {
			  小键盘值 += 按键值;
	   }
	   $cq("#仙盟创梦_数字键盘_输入数字").val(小键盘值);
        
    });

	 $cq(".仙盟创梦_小键盘_关闭").事件("click", function() {
        
		  cyberwin_closeAndDeldlg(未来之窗app_小键盘ID);

	 });

	  $cq(".仙盟创梦_小键盘_清空").事件("click", function() {
        
		  $cq("#仙盟创梦_数字键盘_输入数字").val('');
				  // 这里可以添加关闭小键盘的逻辑，比如隐藏元素等
		 //  console.log('关闭小键盘');

	 });
	 //仙盟创梦_小键盘_退格
	   $cq(".仙盟创梦_小键盘_退格").事件("click", function() {

		   let  小键盘值 = $cq("#仙盟创梦_数字键盘_输入数字").val();
		   if (小键盘值 == "0" || 小键盘值 == "") {
			 
			  $cq("#仙盟创梦_数字键盘_输入数字").val('');
		   } else {
			 var last_value = 小键盘值.substr(-2, 1);
			 if (last_value == '.') {
				 $cq("#仙盟创梦_数字键盘_输入数字").val(小键盘值.substr(0, 小键盘值.length - 2));
			 } else {
				 $cq("#仙盟创梦_数字键盘_输入数字").val(小键盘值.substr(0, 小键盘值.length - 1));
			}
		  }

	 });




	 $cq(".输入确定").事件("click", function() {
          let  小键盘值 = $cq("#仙盟创梦_数字键盘_输入数字").val();

		  if(小键盘值 == ""){
                       alert("输入不能为空");
                       return;
           }

		  // $
		  options.obj.value=小键盘值;
		  cyberwin_closeAndDeldlg(未来之窗app_小键盘ID);

		  $cq(options.obj).事件触发("change");

	 });

	 $cq("#仙盟创梦_数字键盘_输入数字").val(options.obj.value);

	 //仙盟创梦_小键盘_关闭
	 //仙盟创梦_小键盘_清空
	 //仙盟创梦_小键盘_退格

   
};

/**
 * 未来之窗昭和仙君 - 免初始化提示框组件
 * 功能：调用时自动创建样式/DOM，支持自定义内容、标题和自动关闭时间
 * 使用：直接调用 cyberwin_fairyalliance_webquery.alert(消息内容) 即可
 */
 

    // 组件状态：标记是否已初始化（避免重复创建）
    let isComponentInited = false;
    // 自动关闭计时器
    let autoCloseTimer = null;

    /**
     * 初始化组件（仅首次调用时执行）
     */
    function initComponent_alertsmall() {
        if (isComponentInited) return;

        // 1. 创建样式（内联CSS，无需外部文件）
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            /* 提示框容器 */
            .cyberwin-alert-container {
                width: 290px;
                position: fixed;
                display: none;
                bottom: 120px;
                left: 50%;
                z-index: 999999;
                margin: -50px auto 0 -145px;
                padding: 2px;
                border-radius: 0.6em;
                background-color: #ffffff;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                font: 14px/1.5 Microsoft YaHei, Helvitica, Verdana, Arial, sans-serif;
            }

            /* 提示框标题栏 */
            .cyberwin-alert-title {
                background: linear-gradient(#585858, #565656);
                line-height: 26px;
                padding: 5px 5px 5px 10px;
                color: #ffffff;
                font-size: 16px;
                border-radius: 0.5em 0.5em 0 0;
            }

            /* 提示框关闭按钮 */
            .cyberwin-alert-close {
                float: right;
                background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACTSURBVEhL7dNtCoAgDAZgb60nsGN1tPLVCVNHmg76kQ8E1mwv+GG27cestQ4PvTZ69SFocBGpWa8+zHt/Up+IN+MhgLlUmnIE1CpBQB2COZibfpnXhHFaIZkYph0SOeeK/QJ8o7KOek84fkCWSBtfL+Ny2MPpCkPFMH6PWEhWhKncIyEk69VfiUuVhqJefds+YcwNbEwxGqGIFWYAAAAASUVORK5CYII=");
                width: 26px;
                height: 26px;
                display: block;
                cursor: pointer;
            }

            /* 提示框内容区 */
            .cyberwin-alert-content {
                overflow: auto;
                padding: 10px;
                background: linear-gradient(#FBFBFB, #EEEEEE);
                color: #222222;
                text-shadow: 0 1px 0 #FFFFFF;
                border-radius: 0 0 0.6em 0.6em;
            }

            /* 提示文本区域 */
            .cyberwin-alert-txt {
                min-height: 30px;
                font-size: 16px;
                line-height: 22px;
            }

            /* 确认按钮 */
            .cyberwin-alert-btn {
                background: linear-gradient(#ffffff, #DCDCDC);
                border: 1px solid #CCCCCC;
                border-bottom: 1px solid #B4B4B4;
                color: #555555;
                font-weight: bold;
                text-shadow: 0 1px 0 #FFFFFF;
                border-radius: 0.6em;
                display: block;
                width: 100%;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
                cursor: pointer;
                text-align: center;
                font-size: 18px;
                padding: 6px;
                margin: 10px 0 0 0;
            }

            .cyberwin-alert-btn:hover {
                background: linear-gradient(#ffffff, #cccccc);
            }

            .cyberwin-alert-btn:active {
                background: linear-gradient(#cccccc, #ffffff);
                box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3) inset;
            }
        `;
        document.head.appendChild(styleElement);

        // 2. 创建提示框DOM结构
        const alertDom = document.createElement('div');
        alertDom.className = 'cyberwin-alert-container';
        alertDom.id = 'cyberwin-alert-main';
        alertDom.innerHTML = `
            <div class="cyberwin-alert-title">
                消息提示
                <span class="cyberwin-alert-close" id="cyberwin-alert-close-btn"></span>
            </div>
            <div class="cyberwin-alert-content">
                <div class="cyberwin-alert-txt" id="cyberwin-alert-txt"></div>
                <input type="button" value="确定" class="cyberwin-alert-btn" id="cyberwin-alert-confirm-btn">
            </div>
        `;
        document.body.appendChild(alertDom);

        // 3. 绑定关闭事件
        const closeBtn = document.getElementById('cyberwin-alert-close-btn');
        const confirmBtn = document.getElementById('cyberwin-alert-confirm-btn');
        const alertMain = document.getElementById('cyberwin-alert-main');

        // 关闭提示框的统一方法
        function closeAlert() {
             
            
            $cq("#cyberwin-alert-main").slideUp(500);
            
             
               setTimeout(() => {
                  $cq("#cyberwin-alert-main").hide();
            }, 500);
            
        }

        // 绑定按钮事件
        closeBtn.addEventListener('click', closeAlert);
        confirmBtn.addEventListener('click', closeAlert);

        // 暴露关闭方法到全局
        //cyberwin_fairyalliance_webquery.closeAlert = closeAlert;
        cyberwin_query.prototype.closeAlert = closeAlert;

        // 标记组件已初始化
        isComponentInited = true;
    }

    /**
     * 核心提示框调用方法
     * @param {string} message - 提示显示的内容（支持HTML）
     * @param {number} [duration=8000] - 自动关闭时间（毫秒，默认8秒）
     * @param {string} [title=消息提示] - 提示框标题
     */
cyberwin_query.prototype.alert = function(message, duration = 8000, title = '消息提示') {
        // 首次调用自动初始化组件
        if (!isComponentInited) {
            initComponent_alertsmall();
        }

        // 获取DOM元素
        const alertMain = document.getElementById('cyberwin-alert-main');
        const alertTxt = document.getElementById('cyberwin-alert-txt');
        const alertTitle = alertMain.querySelector('.cyberwin-alert-title');

        // 设置提示内容和标题
        alertTxt.innerHTML = message;
        alertTitle.firstChild.textContent = title;

        // 显示提示框
        alertMain.style.display = 'block';
        
        alertMain.style.top="500px";
        
        // $cq("#cyberwin-alert-main").slideUp(500);
        //slideToggle
        //$cq("#cyberwin-alert-main").slideToggle(500);
        $cq('#cyberwin-alert-main').animate({
            width: 300,
            height: 80,
            top:220,
            opacity:1,
          
        }, 1000, 'swing', function() {
            //console.log('动画完成');
        });

        

        // 自动关闭逻辑
        if (autoCloseTimer) {
            clearTimeout(autoCloseTimer);
        }
        autoCloseTimer = setTimeout(() => {
            //alertMain.style.display = 'none';
            $cq("#cyberwin-alert-main").slideUp(500);
             $cq("#cyberwin-alert-main").hide();
        }, duration);
    };
/*
    // 集成到cyberwin_query（支持链式调用）
    if (window.cyberwin_query && window.cyberwin_query.prototype) {
        window.cyberwin_query.prototype.alert = function(message, duration, title) {
            window.cyberwin_fairyalliance_webquery.alert(message, duration, title);
            return this; // 保持链式调用特性
        };
    }
    */

    // 控制台提示加载完成
    //console.log('未来之窗昭和仙君 - 提示框组件（免init版）已加载');
    
    //2025-10-15
     /**
     * 滑入动画 (slideDown)
     * @param {number} [duration=500] - 动画持续时间(毫秒)
     * @param {function} [callback] - 动画完成后的回调函数
     * @returns {object} 自身实例，支持链式调用
     */
     /*
    cyberwin_query.prototype.slideDown = function(duration = 500, callback) {
        // 遍历所有选中的元素
       // this.each(element => {
       for(i=0;i<this.elements.length;i++){
            // 保存原始样式
            const element = this.elements[i];
            // 保存原始样式
            const originalDisplay = element.style.display;
            const originalHeight = element.style.height;
            
            // 先隐藏元素并获取实际高度
            element.style.display = 'none';
            element.style.height = 'auto';
            const autoHeight = element.offsetHeight + 'px';
            
            // 重置样式准备动画
            element.style.display = originalDisplay || 'block';
            element.style.height = '0px';
            element.style.overflow = 'hidden';
            element.style.transition = `height ${duration}ms ease`;
            
            // 触发重排
            element.offsetHeight;
            
            // 开始动画
            element.style.height = autoHeight;
            
            // 动画结束处理
            setTimeout(() => {
                // 清除内联样式，恢复自然状态
                element.style.height = originalHeight;
                element.style.overflow = '';
                element.style.transition = '';
                
                // 执行回调（只执行一次）
                if (callback && typeof callback === 'function' && this.index(element) === this.length - 1) {
                    callback.call(element);
                }
            }, duration);
       }
        
        return this; // 支持链式调用
    };
*/
    /**
     * 滑出动画 (slideUp)
     * @param {number} [duration=500] - 动画持续时间(毫秒)
     * @param {function} [callback] - 动画完成后的回调函数
     * @returns {object} 自身实例，支持链式调用
     */
     /*
    cyberwin_query.prototype.slideUp = function(duration = 500, callback) {
        // 遍历所有选中的元素
      //  this.each(element => {
        const Negativeduration = -duration;
        for(i=0;i<this.elements.length;i++){
            // 保存原始样式
            const element = this.elements[i];
            const originalDisplay = element.style.display;
            const originalHeight = element.offsetHeight + 'px';
            const originaltop = element.top + 'px';
            const originaltop2 = (element.top-50) + 'px';
            
            // 准备动画
            element.style.height = originalHeight;
            element.style.overflow = 'hidden';
            element.style.transition = `height ${duration}ms ease`;
            
            
            
            // 触发重排
            element.offsetHeight;
            
            // 开始动画
            element.style.height = '0px';
            //element.style.top = originaltop2;;
            
            // 动画结束处理
            setTimeout(() => {
                // 隐藏元素并清除内联样式
                element.style.display = 'none';
                element.style.height = '';
                element.style.overflow = '';
                element.style.transition = '';
                
                // 执行回调（只执行一次）
                if (callback && typeof callback === 'function' && this.index(element) === this.length - 1) {
                    callback.call(element);
                }
            }, duration);
       // });
        }
        
        return this; // 支持链式调用
    };
*/
    /**
     * 切换滑入滑出状态 (slideToggle)
     * @param {number} [duration=500] - 动画持续时间(毫秒)
     * @param {function} [callback] - 动画完成后的回调函数
     * @returns {object} 自身实例，支持链式调用
     */
     /*
    cyberwin_query.prototype.slideToggle = function(duration = 500, callback) {
        for(i=0;i<this.elements.length;i++){
            // 保存原始样式
            const element = this.elements[i];
            // 判断当前是否可见
            const isVisible = element.style.display !== 'none' && 
                             getComputedStyle(element).display !== 'none';
            
            // 根据状态执行对应动画
            if (isVisible) {
                this.slideUp(duration, callback);
            } else {
                this.slideDown(duration, callback);
            }
        }
        
        return this; // 支持链式调用
    };
*/
//高阶函数
// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth? 1 : 0;
	for( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}


/*
/ Generate shortcuts for custom animations
未来之窗昭和仙君.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});
*/
/*
animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );
				doAnimation.finish = function() {
					anim.stop( true );
				};
				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	}
	*/
	
	/**
 * 基于jQuery原版speed和easing逻辑的animate方法实现
 * 完全遵循提供的jQuery.speed和jQuery.easing逻辑
 */
//(function() {
 

    // 模拟jQuery.fx相关配置
    cyberwin_query.prototype.fx = {
        off: false, // 是否关闭动画
        speeds: {
            _default: 400,
            fast: 200,
            slow: 600
        }
    };

    /** cyberwin_query.prototype
     * 实现jQuery.speed逻辑
     * @param {number|string|object} speed - 速度参数
     * @param {string|function} easing - 缓动函数
     * @param {function} fn - 回调函数
     * @returns {object} 规范化的动画配置
     */
    cyberwin_query.prototype.speed = function(speed, easing, fn) {
        // 处理参数重载，支持配置对象形式
        const cyberthat = this;
        var opt = speed && typeof speed === "object" 
            ? this.extend({}, speed) 
            : {
                complete: fn || (!fn && easing) || 
                          (this.isFunction(speed) && speed),
                duration: speed,
                easing: (fn && easing) || (easing && !this.isFunction(easing) && easing)
            };

        // 处理动画时长（如果关闭动画则时长为0）
        opt.duration = this.fx.off ? 0 
            : typeof opt.duration === "number" ? opt.duration
            : opt.duration in this.fx.speeds ? this.fx.speeds[opt.duration]
            : this.fx.speeds._default;

        // 规范化队列配置，默认使用"fx"队列
        if (opt.queue == null || opt.queue === true) {
            opt.queue = "fx";
        }

        // 处理队列回调，保存原始complete
        opt.old = opt.complete;

        // 重写complete方法，确保执行后处理队列
        opt.complete = function() {
            // 执行原始回调
            if (cyberthat.isFunction(opt.old)) {
                opt.old.call(this);
            }

            // 如果有队列，执行下一个队列项
            if (opt.queue) {
                cyberthat.dequeue(this, opt.queue);
            }
        };

        return opt;
    };

    /**
     * 实现jQuery.easing逻辑
     */
    cyberwin_query.prototype.easing = {
        linear: function(p) {
            return p;
        },
        swing: function(p) {
            return 0.5 - Math.cos(p * Math.PI) / 2;
        }
    };

    /**
     * 空对象检查
     */
    cyberwin_query.prototype.isEmptyObject = function(obj) {
        for (var name in obj) {
            return false;
        }
        return true;
    };

    /**
     * 队列处理：出队
     */
    cyberwin_query.prototype.dequeue = function(element, queueName) {
        var queue = this._data(element, queueName) || [];
        var fn = queue.shift(); // 移除第一个队列项

        // 如果队列中还有项，继续执行
        if (fn) {
            // 为函数添加队列方法
            fn.queue = function(next) {
                if (next === false) {
                    queue.length = 0; // 清空队列
                } else {
                    if (next) queue.unshift(next); // 插入到队列开头
                    this.dequeue(element, queueName);
                }
            };
            fn.call(element);
        }

        // 更新数据存储
        if (queue.length) {
            this._data(element, queueName, queue);
        } else {
            // 队列为空时移除数据
            this.removeData(element, queueName);
        }
    };

    /**
     * 数据存储管理
     */
    cyberwin_query.prototype._data = function(element, key, value) {
        if (!element.__cyberData) {
            element.__cyberData = {};
        }
        if (arguments.length === 3) {
            element.__cyberData[key] = value;
        }
        return element.__cyberData[key];
    };

    cyberwin_query.prototype.removeData = function(element, key) {
        if (element.__cyberData && key in element.__cyberData) {
            delete element.__cyberData[key];
        }
    };

    /**
     * 工具方法：判断是否为函数
     */
    cyberwin_query.prototype.isFunction = function(obj) {
        return typeof obj === 'function';
    };

    /**
     * 工具方法：对象扩展
     */
    cyberwin_query.prototype.extend = function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var prop in source) {
                if (source.hasOwnProperty(prop)) {
                    target[prop] = source[prop];
                }
            }
        }
        return target;
    };

    /**
     * 动画核心类
     */
    function Animation(element, properties, options) {
        this.element = element;
        this.properties = properties;
        this.options = options;
        this.startTime = Date.now();
        this.startValues = {};
        this.endValues = {};
        this.duration = options.duration;
        this.easingFn = $cq().easing[options.easing] || $cq().easing.swing;
        
        this.init();
        this.run();
    }

    Animation.prototype = {
        init: function() {
            var computed = getComputedStyle(this.element);
            for (var prop in this.properties) {
                this.startValues[prop] = this.parseValue(prop, computed[prop]);
                this.endValues[prop] = this.parseValue(prop, this.properties[prop]);
            }
        },

        parseValue: function(prop, value) {
            if (prop === 'opacity') {
                return parseFloat(value) || 0;
            }
            return parseInt(value, 10) || 0;
        },

        run: function() {
            var self = this;
            var element = this.element;
            var startTime = this.startTime;
            var duration = this.duration;

            function update() {
                var now = Date.now();
                var elapsed = now - startTime;
                var progress = duration ? Math.min(elapsed / duration, 1) : 1;
                var easedProgress = self.easingFn(progress);

                // 更新所有动画属性
                for (var prop in self.startValues) {
                    var start = self.startValues[prop];
                    var end = self.endValues[prop];
                    var value = start + (end - start) * easedProgress;
                    
                    if (prop === 'opacity') {
                        element.style.opacity = value;
                    } else {
                        element.style[prop] = value + 'px';
                    }
                }

                // 动画未完成继续执行
                if (progress < 1) {
                    self.animationId = requestAnimationFrame(update);
                } else {
                    // 动画完成执行回调
                    self.options.complete.call(element);
                }
            }

            // 启动动画
            this.animationId = requestAnimationFrame(update);
        },

        stop: function(finish) {
            cancelAnimationFrame(this.animationId);
            if (finish) {
                // 直接跳到动画结束状态
                for (var prop in this.endValues) {
                    if (prop === 'opacity') {
                        this.element.style.opacity = this.endValues[prop];
                    } else {
                        this.element.style[prop] = this.endValues[prop] + 'px';
                    }
                }
                this.options.complete.call(this.element);
            }
        }
    };

    /**
     * 为cyberwin_query添加animate方法
     */
    cyberwin_query.prototype.animate = function(prop, speed, easing, callback) {
        var empty = this.isEmptyObject(prop);
        var optall = this.speed(speed, easing, callback);
        const cyberthat = this;
        var doAnimation = function() {
            var anim = new Animation(this, cyberthat.extend({}, prop), optall);
            
            doAnimation.finish = function() {
                anim.stop(true);
            };

            if (empty || cyberthat._data(this, "finish")) {
                anim.stop(true);
            }
        };
        
        doAnimation.finish = doAnimation;

        return empty || optall.queue === false ?
            cyberthat.each(doAnimation) :
            cyberthat.queue(optall.queue, doAnimation);
    };

    /**
     * 队列管理方法
     */
    cyberwin_query.prototype.queue = function(queueName, callback) {
        var self = this;
        queueName = queueName || 'fx';
        
        const cyberthat= this;
        
        return this.each(function() {
            var queue = cyberthat._data(this, queueName) || [];
            
            if (callback) {
                queue.push(function(next) {
                    var done = function() {
                        cyberthat.dequeue(self[0], queueName);
                    };
                    callback.call(this, done);
                });
                
                cyberthat._data(this, queueName, queue);
                
                // 如果是第一个任务，立即执行
                if (queue.length === 1) {
                    cyberthat.dequeue(this, queueName);
                }
            }
        });
    };

   // console.log('cyberwin_query 动画模块（兼容jQuery speed/easing逻辑）已加载');
   
   /**
     * 生成slide动画的属性配置
     * @param {string} type - 动画类型：show/hide/toggle
     * @returns {Object} 动画属性配置
     */
    function getSlideProps(type) {
        var props = {
            height: type
        };
        
        // 对于show/toggle，需要处理padding和margin
        if (type !== 'hide') {
            props.paddingTop = type;
            props.paddingBottom = type;
            props.marginTop = type;
            props.marginBottom = type;
        }
        
        return props;
    }

    /**
     * slideDown动画方法
     * 元素向下滑动显示
     * @param {number|string} speed - 动画速度
     * @param {string} easing - 缓动函数
     * @param {function} callback - 回调函数
     * @returns {Object} 实例本身，支持链式调用
     */
    cyberwin_query.prototype.slideDown = function(speed, easing, callback) {
        // 获取slideDown的动画属性配置
        var props = getSlideProps('show');
        // 调用animate方法执行动画
        return this.animate(props, speed, easing, callback);
    };

    /**
     * slideUp动画方法
     * 元素向上滑动隐藏
     * @param {number|string} speed - 动画速度
     * @param {string} easing - 缓动函数
     * @param {function} callback - 回调函数
     * @returns {Object} 实例本身，支持链式调用
     */
    cyberwin_query.prototype.slideUp = function(speed, easing, callback) {
        // 获取slideUp的动画属性配置
        var props = getSlideProps('hide');
        // 调用animate方法执行动画
        return this.animate(props, speed, easing, callback);
    };

    /**
     * slideToggle动画方法
     * 元素滑动切换显示/隐藏状态
     * @param {number|string} speed - 动画速度
     * @param {string} easing - 缓动函数
     * @param {function} callback - 回调函数
     * @returns {Object} 实例本身，支持链式调用
     */
    cyberwin_query.prototype.slideToggle = function(speed, easing, callback) {
        // 获取slideToggle的动画属性配置
        var props = getSlideProps('toggle');
        // 调用animate方法执行动画
        return this.animate(props, speed, easing, callback);
    };

    /**
     * fadeIn动画方法
     * 元素淡入显示
     * @param {number|string} speed - 动画速度
     * @param {string} easing - 缓动函数
     * @param {function} callback - 回调函数
     * @returns {Object} 实例本身，支持链式调用
     */
    cyberwin_query.prototype.fadeInV2025 = function(speed, easing, callback) {
        // 淡入动画：透明度从0到1，同时显示元素
        return this.animate({ opacity: 'show' }, speed, easing, callback);
    };

    /**
     * fadeOut动画方法
     * 元素淡出隐藏
     * @param {number|string} speed - 动画速度
     * @param {string} easing - 缓动函数
     * @param {function} callback - 回调函数
     * @returns {Object} 实例本身，支持链式调用
     */
    cyberwin_query.prototype.fadeOutV2025 = function(speed, easing, callback) {
        // 淡出动画：透明度从1到0，同时隐藏元素
        return this.animate({ opacity: 'hide' }, speed, easing, callback);
    };

    /**
     * fadeToggle动画方法
     * 元素淡入淡出切换显示/隐藏状态
     * @param {number|string} speed - 动画速度
     * @param {string} easing - 缓动函数
     * @param {function} callback - 回调函数
     * @returns {Object} 实例本身，支持链式调用
     */
    cyberwin_query.prototype.fadeToggle = function(speed, easing, callback) {
        // 淡入淡出切换：透明度随状态切换
        return this.animate({ opacity: 'toggle' }, speed, easing, callback);
    };
 
 
 $cq.未来之窗_智慧数据交互_数据通知提醒 = function(灵舟,灵体,timeint,callback) {

 
   
       $cq.ajax({
        type: "POST",
        url: 灵舟,
        data: 灵体,
        dataType: "JSON",
        success: function(response) {
           callback(response);
        },
        error: function(xhr, error) {
           // console.log("请求错误：", error);
            callback(error,"错误");
        }
    });
    
    setTimeout(function(){
		//无时差bug	$cq.未来之窗_智慧数据交互_数据通知提醒(灵舟,灵体,callback);
				$cq.未来之窗_智慧数据交互_数据通知提醒(灵舟,灵体,timeint,callback);
	},timeint);
 };
 
 //2025-10-19
 /**
 * 为cyberwin_query添加复制功能
 * 支持隐藏元素复制：通过临时创建元素实现
 */
 
    /**
     * 复制指定元素内容到剪贴板
     * 支持隐藏元素（通过临时创建元素实现）
     * @param {string|HTMLElement} target - 目标元素ID或DOM对象
     * @param {function} [callback] - 复制完成后的回调函数
     * @returns {Object} 实例本身，支持链式调用
     */
    cyberwin_query.prototype.copy = function(target, callback) {
        // 处理目标元素
        let targetElement;
        let 要复制的内容= "";
        console.log("instanceof" ,target instanceof HTMLElement);
        if (typeof target === 'string') {
           // targetElement = document.getElementById(target);
           要复制的内容 = target;
        } else if (target instanceof HTMLElement) {
            targetElement = target;
            const tagName = targetElement.tagName.toLowerCase();
           // if(tagName === 'td'){
              //  要复制的内容 = targetElement.innerText;
           // }else{
            
              
           // }
             const targetElementistd = targetElement.closest('td');
             if (targetElementistd){
                 //2026-04-14 反向上层
                 targetElement = targetElementistd;
             } 
             要复制的内容 = targetElement.innerHTML;
             
        } else {
            // 如果未指定目标，默认使用当前选择的第一个元素
           // targetElement = this.element[0];
            要复制的内容 = this.elements[0].innerHTML;
        }
/*
        if (!targetElement) {
            console.error('复制目标元素不存在');
            if (typeof callback === 'function') callback(false, '目标元素不存在');
            return this;
        }
        */
        
         if (要复制的内容 == "" ) {
            console.error('复制目标元素不存在');
            //if (typeof callback === 'function') callback(false, '目标元素不存在');
            return this;
        }

        // 创建临时元素用于复制隐藏内容
        let tempElement = null;
        let isTempCreated = false;
        const selection = window.getSelection();
        
        try {
            // 检查元素是否可见
           // const computedStyle = getComputedStyle(targetElement);
          //  const isVisible = computedStyle.display !== 'none' && 
         //                    computedStyle.visibility !== 'hidden' &&
            //                 computedStyle.opacity !== '0';

            // 如果元素不可见，创建临时元素
           // if (!isVisible) {
                tempElement = document.createElement('div');
                // 设置临时元素样式（确保不可见但可选中）
                tempElement.style.position = 'absolute';
                tempElement.style.left = '-9999px';
                tempElement.style.top = '-9999px';
                tempElement.style.opacity = '0';
                tempElement.style.pointerEvents = 'none';
                tempElement.id = 'fairyalliancecopy2025';
                
                // 复制目标元素内容（包括所有子节点）
                tempElement.innerHTML = 要复制的内容;//targetElement.innerHTML;
                
                // 添加到文档中
                document.body.appendChild(tempElement);
                isTempCreated = true;
         //   }

            // 选择要复制的元素（优先使用临时元素）
            const copyElement =tempElement;// tempElement || targetElement;
            
            // 执行复制
            selection.removeAllRanges();
            const range = document.createRange();
            range.selectNodeContents(copyElement);
            selection.addRange(range);
            
            // 执行复制命令
            const copySuccess = document.execCommand('copy');
            
            // 复制成功提示（默认）
            if (copySuccess) {
                if (typeof callback === 'function') {
                    callback(true, '复制成功');
                } else {
                    // 调用之前实现的alert方法
                    /*
                    if (typeof cyberwin_query.prototype.alert === 'function') {
                        cyberwin_query().alert('复制成功');
                    } else {
                        alert('复制成功');
                    }
                    */
                    $cq().alert('复制成功');
                }
            } else {
                throw new Error('复制命令执行失败');
            }
        } catch (error) {
            /*
            console.error('复制失败:', error);
            if (typeof callback === 'function') {
                callback(false, '复制失败: ' + error.message);
            } else {
                alert('复制失败: ' + error.message);
            }
            */
             $cq().alert('复制失败');
        } finally {
            // 清理临时元素和选中状态
            selection.removeAllRanges();
           // if (isTempCreated && tempElement && tempElement.parentNode) {
          //      document.body.removeChild(tempElement);
           // }
            if (tempElement) {
                document.body.removeChild(tempElement);
            }
        }

        return this; // 支持链式调用
    };

    // 全局快捷方法：通过ID复制
    /*
    cyberwin_query.copyById = function(id, callback) {
        return cyberwin_query().copy(id, callback);
    };
    */

    //console.log('cyberwin_query 复制功能模块已加载');
     cyberwin_query.prototype.未来之窗_AI_操作系统_复制 = function(target, callback) {
          return this.copy(target, callback);
    }
    
//  2026-04-15
    $cq.未来之窗_AI_操作系统_复制 = function(target, callback) {
          return $cq().copy(target, callback);
    }
    
    
    //2025-10-22
$cq.未来之窗_下载_render_dataV2023 = function(灵舟,tpl_name , 本地模板) {
   
	$cq.ajax({
        type: "GET",
        url: 灵舟,
        data: {tpl:tpl_name},
        dataType: "JSON",
        success: function(response) {
           //callback(response);
           	if(response.err_code == 0){
					//	clearInterval(checkPayStatus);
						//g_sale_way
						//alert('支付成功');
						//JSON.stringify(
						//console.log("模板加载完成，名称："+本地模板);
						  window.localStorage.setItem(本地模板, response.data);
						// $("#cyberwin_progress_status_text").html("模板加载完成，名称："+本地模板);
			}
						
						
        },
        error: function(xhr, error) {
           // console.log("请求错误：", error);
            callback(error,"错误");
        }
    });
    
};

$cq.未来之窗_下载_render_dataV2025 = function(灵舟,tpl_name ,数据sn, 本地模板) {
   
	$cq.ajax({
        type: "GET",
        url: 灵舟,
        data: {tpl:tpl_name,data_sn:数据sn,data_id:"",action:"CCRCDV2025"},
        dataType: "JSON",
        success: function(response) {
           //callback(response);
           	if(response.status == 9){
				 
						  window.localStorage.setItem(本地模板, response.data);
						   $cq().alert('下载成功');
					 
			}else{
			    $cq().alert('下载失败');
			}
						
						
        },
        error: function(xhr, error) {
           // console.log("请求错误：", error);
           // callback(error,"错误");
        }
    });
    
};
//
$cq.未来之窗_虚拟渲染器_下载 = function(灵舟,tpl_name ,数据sn, 本地模板) {
    return $cq.未来之窗_下载_render_dataV2025(灵舟,tpl_name ,数据sn, 本地模板);
};

$cq.未来之窗_虚拟渲染器_读取 = function( 本地模板) {
      htmlcb = window.localStorage.getItem(本地模板);
      var 未来之窗_代码_html = decodeURIComponent(escape(window.atob(htmlcb)));
     return 未来之窗_代码_html;
};


$cq.未来之窗_幻境渲染器_下载 = function(灵舟,灵体名称 ,数据sn, 本地模板) {
    return $cq.未来之窗_虚拟渲染器_下载(灵舟,灵体名称 ,数据sn, 本地模板);
};

$cq.未来之窗_幻境渲染器_读取 = function( 本地模板) {
      return $cq.未来之窗_虚拟渲染器_读取(本地模板);
};

//2025-10-22
// 存储时间监听事件，便于后续移除 
 let fairyalliance_globalAudioInstance = null;
// 存储时间监听事件，便于后续移除
 let fairyalliance_timeUpdateHandler = null;
/**
音频播放核心方法
@param {string} url - 音频文件 URL（必填）
@param {number} [startTime=0] - 播放起始时间（秒，默认 0）
@param {number|null} [endTime=null] - 播放终止时间（秒，null 表示播放至结束）
@returns {Object} cyberwin_query 实例，支持链式调用
*/
//未来之窗_语音交互_播放收款
cyberwin_query.prototype.fairyalliance_playAudio = function (url, startTime = 0, endTime = null) {
    // 校验必填参数
    if (!url || typeof url !== 'string') {
        //console.error (' 音频播放失败：请传入有效的音频 URL');
         return this;
        
    }
    const cyberthat =this;
// 停止已有音频，避免多音频同时播放
  if (fairyalliance_globalAudioInstance) {
      cyberthat.fairyalliance_stopAudio();
      
  }
  
 
  // 创建新音频实例
  fairyalliance_globalAudioInstance = new Audio (url);
// 设置起始时间（确保不小于 0）
   if (typeof startTime === 'number' && startTime>= 0)
   {
       fairyalliance_globalAudioInstance.currentTime = startTime;
       
   }
   // 处理终止时间逻辑
    if (endTime !== null && typeof endTime === 'number' && endTime> startTime) {
        fairyalliance_timeUpdateHandler = function () {
            if (fairyalliance_globalAudioInstance.currentTime >= endTime) {
                cyberthat.fairyalliance_stopAudio();
                
            }
            
        };
        // 绑定时间监听事件
        fairyalliance_globalAudioInstance.addEventListener ('timeupdate', fairyalliance_timeUpdateHandler);
        
    }
    // 播放音频（处理浏览器自动播放限制）
     fairyalliance_globalAudioInstance.play().catch (err => {
      //  console.warn (' 音频自动播放被浏览器限制，需用户交互后触发：', err);
      // 提示用户手动触发（可选：可结合 alert 方法提示）
      
          $cq().alert(' 请点击页面后重新触发音频播放（浏览器自动播放限制）');
          
      
        
    });
      return this; // 支持链式调用
    
 };
/**
音频停止方法
停止当前播放的音频，清除监听事件
@returns {Object} cyberwin_query 实例，支持链式调用
*/
//音频停止
cyberwin_query.prototype.fairyalliance_stopAudio = function () {
    if (fairyalliance_globalAudioInstance) {
        // 停止播放
        fairyalliance_globalAudioInstance.pause ();
        // 重置播放位置（可选，根据需求决定是否保留）
        fairyalliance_globalAudioInstance.currentTime = 0;
      // 移除时间监听事件
      if (fairyalliance_timeUpdateHandler && fairyalliance_globalAudioInstance.removeEventListener) {
          fairyalliance_globalAudioInstance.removeEventListener ('timeupdate', fairyalliance_timeUpdateHandler);
          fairyalliance_timeUpdateHandler = null;
          
      }
    // 释放音频实例
    fairyalliance_globalAudioInstance = null;
        
    }return this;
    
};
/**
音频暂停方法（保留播放进度）
@returns {Object} cyberwin_query 实例，支持链式调用
*/
//  音频暂停
cyberwin_query.prototype.fairyalliance_pauseAudio = function () {
    if (fairyalliance_globalAudioInstance && !fairyalliance_globalAudioInstance.paused) {
      fairyalliance_globalAudioInstance.pause ();
    }
    return this;
};
/**
音频继续播放方法（从暂停位置恢复）
@returns {Object} cyberwin_query 实例，支持链式调用
*/
//  音频继续
cyberwin_query.prototype.fairyalliance_continueAudio = function () {
   if (fairyalliance_globalAudioInstance && fairyalliance_globalAudioInstance.paused) {
       fairyalliance_globalAudioInstance.play ().catch (err => {
        //console.warn (' 音频继续播放失败：', err);
           
       });
       
   }
   return this;
};

//未来之窗_语音交互_播放收款     音频播放
cyberwin_query.prototype.未来之窗_语音交互_音频播放 = function (url, startTime = 0, endTime = null) {
    return this.fairyalliance_playAudio(url,startTime,endTime);
}
//
cyberwin_query.prototype.未来之窗_语音交互_音频停止 = function () {
    return this.fairyalliance_stopAudio();
}
cyberwin_query.prototype.未来之窗_语音交互_音频继续 = function () {
    return this.fairyalliance_continueAudio();
}

cyberwin_query.prototype.未来之窗_语音交互_音频暂停 = function () {
    return this.fairyalliance_pauseAudio();
}
 
 //2025-10-23 sn 随机
 $cq.generateCyberSn=function(options) {
     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

 var fairyalliance_public_未来之窗当前分页_渲染器 = 1;
 var fairyalliance_public_渲染器_网关 = "";
 var fairyalliance_public_渲染器download_网关 = "";
 
 var fairyalliance_public_渲染器面板字段 = {};
  
  //2025-11-10
  
   

 $cq.未来之窗_东方仙盟_渲染器自定义=function(options) {
     var tpl渲染器模板 = `
		<style>
		  .contact-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #d4c2a0;
            margin-right: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #8b2323;
            font-weight: bold;
            border: 2px solid #c8a37e;
             width: 36px;
            height: 36px;
            display: inline-block;
            line-height: 32px;
    text-align: center;
        }

		.table_修仙列表 {
    overflow-x: auto;
    border: 1px solid #8B4513;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.5);
      height:100%; /* 表格可视高度，可自己改 */
      overflow-y: auto; /* 垂直滚动条 */
}
.table_修仙列表 table {
    width: 100%;
    border-collapse: collapse;
}
 .table_修仙列表 th, td {
            padding: 0.8rem 1rem;
            text-align: left;
            border-bottom: 1px solid #D2B48C;
            padding: 10px 5px;
        }

        .table_修仙列表 th {
            background-color: #8B4513;
            color: white;
            font-weight: bold;
            position: sticky;
            top: 0;
        }

        .table_修仙列表 tr:nth-child(even) {
            background-color: rgba(210, 180, 140, 0.1);
        }

       .table_修仙列表 tr:hover {
            background-color: rgba(210, 180, 140, 0.3);
        }
</style>
		<div class="list-header" style="background:#D2B48C;">
                <cyberdiv id="current_当前类目"></cyberdiv><span>搜索</span>
                <input type="text" class="search-box" placeholder="搜索..." id="searchInput_渲染器" style="border:1px solid #8B4513;">
                
                	<button class="btn  " onclick="$cq.未来之窗_通用搜索_渲染器();" style="padding-top: 0px;
    padding-bottom: 0px;background-color: #8B4513 !important;
    color: white;border-radius: 4px;border: 1px solid #8B4513;height: 30px;
    width: 61px;">搜索</button>
    
            </div>
			<div class="table_修仙列表">
               
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>名称</th>
                        <th>下载次数</th>
                        
                        <th>描述</th>
                        <th>ip</th>
                        <th>时间</th>
                        
                        
                        <th>操作</th>
                       
                    </tr>
                </thead>
                <tbody id="未来之窗_修仙_listtable"></tbody>
            </table>
             
        </div>
		 
        
        
    <div id="paginationContainer_渲染器" style="margin: 20px 0;">22222</div>
    
    
        </div>
			`;
			var 未来之窗app_通用ID ="东方仙盟渲染器_通用ID";
		     $cq.对话框().layer(tpl渲染器模板,{type:"frame",title:options.title,move:false,width:"880px",height:"520px",id:未来之窗app_通用ID,mask:true,align:59,hideclose:false});
		     
		  fairyalliance_public_渲染器_网关 =   options.api;
		  fairyalliance_public_渲染器download_网关 =   options.downloadapi;

		  $cq.分页_初始化();
		  $cq.分页设置({callback:$cq.分页世界_渲染器});
		  
		   
         

         fairyalliance_public_未来之窗当前分页_渲染器 = 0;
		 $cq.未来之窗_渲染当前数据_渲染器("0",fairyalliance_public_未来之窗当前分页_渲染器,"");



 };
  $cq.未来之窗_渲染当前数据_渲染器=function(search_group_id,page,keyword) {
			 var api=fairyalliance_public_渲染器_网关;//


   var tpl_数据模板_tablelsit  =`
	  {cwpdapp{# for(var i in d){   }}
        
         
                
                <tr>
                       
                        <td >
                            <div class="contact-avatar">{cwpdapp{d[i].apptitle.charAt(0)}}</div>
                            
                       
                        
                        
                  
                        </td>
                        <td>{cwpdapp{d[i].apptitle}}</td>
                           <td>{cwpdapp{d[i].app_salescount}}</td>
                         
                        <td>{cwpdapp{d[i].app_descript}}</td>
                        <td>{cwpdapp{d[i].sys_worker_ip}}</td>
                     
                            <td>{cwpdapp{d[i].create_timestr}}</td>
                            
                        
                        <td>
                            <button class="btn operation-btn" style="padding-top: 0px;
    padding-bottom: 0px;background-color: #8B4513 !important;
    color: white;border-radius: 4px;border: 1px solid #8B4513;height: 30px;
    width: 61px;"
	onClick="$cq.未来之窗_虚拟独立页_下载模板('{cwpdapp{d[i].cyber_sn}}','{cwpdapp{d[i].voslocal_sn}}','{cwpdapp{d[i].apptitle}}')"
	>下载</button>
                            
                        </td>
                       
                    </tr>
                    
                     
                    
            
         {cwpdapp{# } }}
	`;

		 
		var 仙盟中转="系统自动化_全球_渲染器列表";   
		const lang="cn";
		const 仙盟先知 = {集团:"77",企业:"72",仙盟六界:"全球",仙界:"全球",仙域:"全球",国度:lang,app_key:"开源通用押金系统",app_sn:"",app_id:""
	  ,东郭仙域:"gjjhjgj",search_group_id: search_group_id, keyword:keyword,searchtype:"alias",page:page };
	  东方仙盟_通用请求_common(api,仙盟中转,JSON.stringify(仙盟先知),function(response) {
		 console.log("返回",response);
			if(response.status==9){
			 
						$cq.未来之窗_通用技术_模板渲染(tpl_数据模板_tablelsit).render(response.data.data_default, function(html) {
                             console.log(html);
                          $cq("#未来之窗_修仙_listtable").html(html);
                        });
                        
                        const page_count= response.page.page_count;
                         $cq("#paginationContainer_渲染器").分页({
                				id:"#paginationContainer_渲染器",
                                maxPage:page_count,          // 总页数
                                currentPage: fairyalliance_public_未来之窗当前分页_渲染器,       // 初始页码（默认1）
                                
                            });

				 
			}else{
					alert(response.message);
			}
	});

	};
$cq.未来之窗_虚拟独立页_下载模板=function(灵体代号,虚拟系统代号) {
	  const 灵舟 =fairyalliance_public_渲染器download_网关;
	  if(虚拟系统代号 == ""){
		  return;
	   }
	  $cq.未来之窗_虚拟渲染器_下载(灵舟,'',灵体代号,虚拟系统代号);
  };
  
 $cq.分页世界_渲染器=function(page) {  
	//	console.log("分页世界_渲染器: " + page);
		if(fairyalliance_public_未来之窗当前分页_渲染器 == page){
		    	console.log("当前翻页相同禁止: " + page);
		    return;
		}
		fairyalliance_public_未来之窗当前分页_渲染器 = page;
		 const 关键字=$cq("#searchInput_渲染器").val();		
		  $cq.未来之窗_渲染当前数据_渲染器("分类",fairyalliance_public_未来之窗当前分页_渲染器,关键字);
	}
	
  $cq.未来之窗_通用搜索_渲染器=function() {   
	        const 关键字=$cq("#searchInput_渲染器").val();		
		    $cq.未来之窗_渲染当前数据_渲染器("分类",1,关键字);
	}
	
//国际化 2025-12023
// 初始化主题
  var fairyalliance_public_currentThemeCssId = 'theme-default';
  var fairyalliance_public_东方仙盟_国家语言 ="";
  var fairyalliance_public_东方仙盟_Theme ="";
  
  
 $cq.东方仙盟_灵颜妙手_初始化主题=function(魔域) { 
 
    // 从本地存储获取保存的主题，默认使用default
      fairyalliance_public_东方仙盟_Theme = localStorage.getItem(魔域+'selected-theme') || 'default';
    
    // 设置主题选择器的值
    const fairyalli_themeSelector = document.getElementById('fairyalli_themeSelector');
    if (fairyalli_themeSelector) {
        fairyalli_themeSelector.value = fairyalliance_public_东方仙盟_Theme;
        // 绑定切换事件
        fairyalli_themeSelector.addEventListener('change', function() {
            $cq.东方仙盟_灵颜妙手_动态切换主题(魔域,this.value);
        });
    }
    
    // 加载默认主题
    if (fairyalliance_public_东方仙盟_Theme!== 'default') {
        $cq.东方仙盟_灵颜妙手_动态切换主题(魔域,fairyalliance_public_东方仙盟_Theme);
    }else{
		 
    }

	//console.log("加载主题savedTheme=",东方仙盟_Theme);
    $cq.东方仙盟_灵颜妙手_动态切换主题(魔域,fairyalliance_public_东方仙盟_Theme);
};
 $cq.东方仙盟_灵颜妙手_动态切换主题=function(魔域 , themeName) { 
 
    // 移除当前主题CSS
    const currentLink = document.getElementById(fairyalliance_public_currentThemeCssId);
    if (currentLink) {
        currentLink.remove();
    }
    
    // 创建新的link元素加载主题CSS
    const newLink = document.createElement('link');
    newLink.id = `theme-${themeName}`;
    newLink.rel = 'stylesheet';
    // 根据主题名称设置CSS文件路径，根据实际情况修改
    newLink.href = "http://51.onelink.ynwlzc.net//o2o/static/cyberwin_CVFW/stylecss/%E4%B8%9C%E6%96%B9%E4%BB%99%E7%9B%9F_%E7%81%B5%E9%A2%9C%E5%A6%99%E6%89%8B_%E9%80%9A%E7%94%A8_theme-"+themeName+".css";  
	newLink.type = 'text/css';
    
    // 添加到head中
    document.head.appendChild(newLink);
    
    // 更新当前主题ID
    fairyalliance_public_currentThemeCssId = newLink.id;
    
    // 保存用户选择的主题
    localStorage.setItem(魔域+'selected-theme', themeName);
}

 $cq.东方仙盟_灵颜妙手_初始化界面国度=function(魔域 ,系统key) { 
	 fairyalliance_public_东方仙盟_国家语言 = localStorage.getItem(魔域 + 'language') || 'zh';
     document.getElementById('fairyalli_languageSelector').value = fairyalliance_public_东方仙盟_国家语言;

	  const fairyalli_languageSelector = document.getElementById('fairyalli_languageSelector');
      if (fairyalli_languageSelector) {
         fairyalli_languageSelector.value = fairyalliance_public_东方仙盟_国家语言;
        // 绑定切换事件
        fairyalli_languageSelector.addEventListener('change', function() {
            $cq.东方仙盟_灵颜妙手_动态切换语言(魔域,this.value);
        });
    }

};


// 语言切换函数
 $cq.东方仙盟_灵颜妙手_动态切换语言=function(魔域 ,系统key , lang ) { 
//	console.log("动态切换语言",lang);
  // 获取所有需要翻译的元素
  

  var api="http://51.onelink.ynwlzc.net/fairyalliancecdp?interface=FairyallianceOpenSource&action=FairyallianceWWDHCAPOF";
  
    var 仙盟中转="系统自动化_全球_先知_语言";   
  	const 仙盟先知 = {集团:"77",企业:"72",仙盟六界:"全球",仙界:"全球",仙域:"全球",国度:lang,app_key:系统key,app_sn:"",app_id:""
  ,东郭仙域:"gjjhjgj"  };
  东方仙盟_通用请求_common(api,仙盟中转,JSON.stringify(仙盟先知),function(response) {
     //console.log("返回",response);
	 	if(response.status==9){
								//alert(response.message);
								//parent.location.reload();   
								var 仙盟仙君先知 = response.data;
						 
								  for (var key in 仙盟仙君先知) {

							 // console.log("明细key= "+key+" v="+仙盟仙君先知[key]);
														//	  console.log(仙盟仙君先知[key]);
									}
									$cq.未来之窗_人工智能_东方仙盟_仙君仙域先知高级(仙盟仙君先知,"","","全球多国度语言");
							}else{
								alert(response.message);
							}
});

  
  // 保存用户语言偏好
  localStorage.setItem(魔域 + 'language', lang);
}

//底部tot
/**
 * 底部提示toast模块（div创建逻辑完全封装在showToast方法内部）
 * 无需预先定义DOM，调用时动态创建并销毁冗余元素
 */

    // 存储当前toast元素和定时器
    let fairyalliance_public_currentToast = null;
    let fairyalliance_public_toastTimer = null;

    /**
     * 显示底部提示toast
     * @param {string} message - 提示内容
     * @param {string} [type='success'] - 提示类型：success/error/info/warn
     * @param {number} [duration=3000] - 显示时长（毫秒）
     * @returns {Object} cyberwin_query实例，支持链式调用
     */
    cyberwin_query.prototype.showToast = function(message, type = 'success', duration = 3000) {
        // 清除已有的toast和定时器
        if (fairyalliance_public_currentToast) {
            clearTimeout(fairyalliance_public_toastTimer);
            document.body.removeChild(fairyalliance_public_currentToast);
            fairyalliance_public_currentToast = null;
        }

        // ====== 在showToast内部直接创建div元素 ======
        const toast = document.createElement('div');
        
        // 设置ID和基础类名
        toast.id = '东方仙盟_底部提示toast';
        toast.className = `东方仙盟_底部提示toast ${type}`;
        
        // 设置提示内容
        toast.textContent = message;
        
        // 直接在方法内定义并应用样式
        Object.assign(toast.style, {
            position: 'fixed',
            left: '50%',
            bottom: '-100px', // 初始隐藏
            transform: 'translateX(-50%)',
            padding: '12px 20px',
            borderRadius: '8px',
            color: '#fff',
            fontSize: '14px',
            zIndex: '9999',
            transition: 'bottom 0.3s ease-out',
            maxWidth: '80%',
            textAlign: 'center',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
        });
        
        // 根据类型设置背景色
        const typeStyles = {
            success: '#4CAF50',
            error: '#F44336',
            info: '#2196F3',
            warn: '#FF9800'
        };
        toast.style.backgroundColor = typeStyles[type] || '#333';

        // 添加到页面
        document.body.appendChild(toast);
        
        // 触发显示动画（强制重绘）
        setTimeout(() => {
            toast.style.bottom = '30px';
        }, 10);

        // 存储当前toast引用
        fairyalliance_public_currentToast = toast;

        // 定时隐藏并移除元素
        fairyalliance_public_toastTimer = setTimeout(() => {
            toast.style.bottom = '-100px';
            // 等待动画结束后移除DOM
            setTimeout(() => {
                if (fairyalliance_public_currentToast && fairyalliance_public_currentToast.parentNode) {
                    document.body.removeChild(fairyalliance_public_currentToast);
                    fairyalliance_public_currentToast = null;
                }
            }, 300); // 与过渡动画时长一致
        }, duration);

        return this;
    };

    // 静态调用方法
 //   cyberwin_query.showToast = function(message, type = 'success', duration = 3000) {
   //     return cyberwin_query().showToast(message, type, duration);
  //  };

   // console.log('cyberwin_query 内联创建toast模块已加载');
 
/**
 * 付款码输入对话框模块（变量带统一前缀）
 * 所有全局变量添加fairyalliance_public_前缀，避免命名冲突
 */
 
 // 带前缀的变量定义
 
    // 带前缀的变量定义
    /*
    let fairyalliance_public_dialogId, 
        fairyalliance_public_inputId, 
        fairyalliance_public_dialogElement, 
        fairyalliance_public_inputElement, 
        fairyalliance_public_styleElement;
    let fairyalliance_public_isInitialized = false;
    // 新增：用于实时保存输入值的变量
    let fairyalliance_public_inputValue = '';
*/
    /**
     * 付款码输入对话框方法（最终修复版）
     * @param {string} title - 对话框标题
     * @param {string} description - 输入框说明文字
     * @param {function} closeCallback - 关闭回调
     * @param {function} confirmCallback - 确认回调（接收输入值）
     * @returns {Object} cyberwin_query实例，支持链式调用
     */
     
  //   var fairyalliance_public_dialogElement;
    // var fairyalliance_public_inputId;
   //  var fairyalliance_public_isInitialized = false;
   //  var fairyalliance_public_inputElement;
    cyberwin_query.prototype.paysacan_2024inner = function(title, description,inputtype, confirmCallback,closeCallback) {
          let fairyalliance_public_dialogId, 
      //  fairyalliance_public_inputId, 
      //  fairyalliance_public_dialogElement, 
      //  fairyalliance_public_inputElement, 
        fairyalliance_public_styleElement;
    //let fairyalliance_public_isInitialized = false;
    // 新增：用于实时保存输入值的变量
    //2026-01-28
    let fairyalliance_public_inputId;
   let fairyalliance_public_inputElement;
   let fairyalliance_public_dialogElement;
   let fairyalliance_public_isInitialized = false;
    
      
    let fairyalliance_public_inputValue = '';


        // 初始化：创建唯一ID和样式（仅执行一次）
        if (!fairyalliance_public_isInitialized) {
            fairyalliance_public_dialogId = '东方仙盟_开源_输入窗_' + Date.now();
            fairyalliance_public_inputId = '东方仙盟_开源_输入框_' + Date.now();
            
            // 创建样式
            fairyalliance_public_styleElement = document.createElement('style');
            fairyalliance_public_styleElement.textContent = `
                #${fairyalliance_public_dialogId} {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    justify-content: center;
                    align-items: center;
                    z-index: 999999;
                }
                #${fairyalliance_public_dialogId}.active { display: flex; }
                #${fairyalliance_public_dialogId} .仙盟_输入dialog-backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    z-index: 999998;
                }
                #${fairyalliance_public_dialogId} .仙盟_输入dialog-content {
                    background-color: white;
                    border-radius: 8px;
                    width: 90%;
                    max-width: 400px;
                    z-index: 999999;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                    transform: translateY(-20px);
                    opacity: 0;
                    transition: all 0.3s ease-out;
                }
                #${fairyalliance_public_dialogId}.active .仙盟_输入dialog-content {
                    transform: translateY(0);
                    opacity: 1;
                }
                #${fairyalliance_public_inputId} {
                    width: 100%;
                    padding: 10px 12px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 16px;
                    box-sizing: border-box;
                    pointer-events: auto;
                    user-select: text;
                }
                #${fairyalliance_public_inputId}:focus {
                    outline: none;
                    border-color: #4CAF50;
                    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
                }
                #${fairyalliance_public_dialogId} .仙盟_输入dialog-header {
                    padding: 16px 20px;
                    border-bottom: 1px solid #eee;
                }
                #${fairyalliance_public_dialogId} .仙盟_输入dialog-title {
                    margin: 0;
                    font-size: 18px;
                    color: #333;
                }
                #${fairyalliance_public_dialogId} .仙盟_输入dialog-body { padding: 20px; }
                #${fairyalliance_public_dialogId} .fg { width: 100%; }
                #${fairyalliance_public_dialogId} label {
                    display: block;
                    margin-bottom: 8px;
                    font-weight: 500;
                    color:#000;
                    
                }
                #${fairyalliance_public_dialogId} .text-sm { font-size: 12px; }
                #${fairyalliance_public_dialogId} .mt-2 { margin-top: 8px; }
                #${fairyalliance_public_dialogId} .text-gray-500 { color: #666; }
                #${fairyalliance_public_dialogId} .仙盟_输入dialog-footer {
                    padding: 12px 20px;
                    border-top: 1px solid #eee;
                    display: flex;
                    justify-content: flex-end;
                    gap: 10px;
                }
                #${fairyalliance_public_dialogId} .按钮 {
                    padding: 8px 16px;
                    border-radius: 4px;
                    font-size: 14px;
                    cursor: pointer;
                    border: none;
                    transition: background-color 0.2s;
                }
                #${fairyalliance_public_dialogId} .btn-secondary {
                    background-color: #f5f5f5;
                    color: #333;
                }
                #${fairyalliance_public_dialogId} .btn-secondary:hover { background-color: #e0e0e0; }
                #${fairyalliance_public_dialogId} .btn-primary {
                    background-color: #4CAF50  !important;
                    color: white;
                }
                #${fairyalliance_public_dialogId} .btn-primary:hover { background-color: #45a049; }
            `;
            document.head.appendChild(fairyalliance_public_styleElement);
            fairyalliance_public_isInitialized = true;
        }

        // 创建对话框DOM（首次调用时）
        if (!fairyalliance_public_dialogElement) {
            fairyalliance_public_dialogElement = document.createElement('div');
            fairyalliance_public_dialogElement.id = fairyalliance_public_dialogId;
            fairyalliance_public_dialogElement.className = '仙盟_输入dialog 东方仙盟_灵颜妙手';
            fairyalliance_public_dialogElement.innerHTML = `
                <div class="仙盟_输入dialog-backdrop"></div>
                <div class="仙盟_输入dialog-content">
                    <div class="仙盟_输入dialog-header">
                        <h3 class="仙盟_输入dialog-title"></h3>
                    </div>
                    <div class="仙盟_输入dialog-body">
                        <div class="fg">
                            <label for="${fairyalliance_public_inputId}"></label>
                            <input type="${inputtype}" class="auth_code" id="${fairyalliance_public_inputId}" placeholder="在这里输入...">
                            <p class="mt-2 text-sm text-gray-500">按回车键或点击"确认"提交</p>
                        </div>
                    </div>
                    <div class="仙盟_输入dialog-footer">
                        <button id="东方仙盟_开源_取消" class="btn btn-secondary 按钮">取消</button>
                        <button id="东方仙盟_开源_确认" class="btn btn-primary 按钮">确认</button>
                    </div>
                </div>
            `;
            document.body.appendChild(fairyalliance_public_dialogElement);
            fairyalliance_public_inputElement = document.getElementById(fairyalliance_public_inputId);
            fairyalliance_public_inputElement.disabled = false;
        }
        //2026-01-28
        /*
        if (fairyalliance_public_dialogElement) {
            fairyalliance_public_dialogElement.style.display = 'flex';
            fairyalliance_public_dialogElement.classList.add('active');
            $cq("#"+fairyalliance_public_inputId).val('');
             fairyalliance_public_inputElement = document.getElementById(fairyalliance_public_inputId);
            fairyalliance_public_inputElement.disabled = false;
             
        }
        */

        // 重置输入值变量
        fairyalliance_public_inputValue = '';
        
        // 更新内容
        fairyalliance_public_dialogElement.querySelector('.仙盟_输入dialog-title').textContent = title || '微信/支付宝/花呗/信用卡 付款码';
        fairyalliance_public_dialogElement.querySelector(`label[for="${fairyalliance_public_inputId}"]`).textContent = description || '请扫描微信/支付宝 付款码：';
        fairyalliance_public_inputElement.value = '';

        // 显示对话框
        fairyalliance_public_dialogElement.style.display = 'flex';
        setTimeout(() => fairyalliance_public_dialogElement.classList.add('active'), 10);
        
        // 聚焦输入框
        const focusInput = () => {
            try {
                fairyalliance_public_inputElement.focus();
                if (document.activeElement !== fairyalliance_public_inputElement) {
                    setTimeout(() => fairyalliance_public_inputElement.focus(), 100);
                }
            } catch (e) {
                console.warn('聚焦输入框失败:', e);
            }
        };
        setTimeout(focusInput, 300);

        // 清理之前的事件监听
        const confirmBtn = fairyalliance_public_dialogElement.querySelector('#东方仙盟_开源_确认');
        const cancelBtn = fairyalliance_public_dialogElement.querySelector('#东方仙盟_开源_取消');
        
        // 移除所有旧事件监听
        confirmBtn.removeEventListener('click', handleConfirm);
        cancelBtn.removeEventListener('click', closeDialog);
        fairyalliance_public_inputElement.removeEventListener('keydown', handleKeydown);
        // 新增：移除旧的input事件监听
        fairyalliance_public_inputElement.removeEventListener('input', handleInput);

        // 新增：实时保存输入值的处理函数
        function handleInput(e) {
            // 实时更新保存的输入值
            fairyalliance_public_inputValue = e.target.value.trim();
            console.log('实时保存输入值:', fairyalliance_public_inputValue); // 调试用
        }

        // 确认处理（使用保存的输入值）
        function handleConfirm() {
            console.log('确认时获取的值:', fairyalliance_public_inputValue); // 调试用
            
            // 优先使用实时保存的变量值，避免直接读取DOM可能出现的问题
            if (typeof confirmCallback === 'function') {
                try {
                    confirmCallback(fairyalliance_public_inputValue);
                } catch (e) {
                    console.error('确认回调执行错误:', e);
                }
            }
            //closeDialog();
            fairyalliance_public_dialogElement.classList.remove('active');
            fairyalliance_public_dialogElement.style.display = 'none';
            
             fairyalliance_public_dialogElement.remove();
                delete fairyalliance_public_dialogElement;
        }

        // 关闭处理
        function closeDialog() {
            fairyalliance_public_dialogElement.classList.remove('active');
            setTimeout(() => {
                fairyalliance_public_dialogElement.style.display = 'none';
                if (typeof closeCallback === 'function') {
                    try {
                        closeCallback();
                    } catch (e) {
                        console.error('关闭回调执行错误:', e);
                    }
                }
                fairyalliance_public_dialogElement.remove();
                delete fairyalliance_public_dialogElement;
            }, 300);
        }

        // 回车处理
        function handleKeydown(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleConfirm();
            }
        }

        // 绑定事件监听
        confirmBtn.addEventListener('click', handleConfirm);
        cancelBtn.addEventListener('click', closeDialog);
        fairyalliance_public_inputElement.addEventListener('keydown', handleKeydown);
        // 新增：绑定input事件，实时保存输入值
        fairyalliance_public_inputElement.addEventListener('input', handleInput);

        return this;
    };

    // 静态调用入口
    cyberwin_query.paysacan = function(title, description, closeCallback, confirmCallback) {
        return cyberwin_query().paysacan(title, description, closeCallback, confirmCallback);
    };

  //  console.log('cyberwin_query 带前缀的付款码输入模块已加载');
  //2025-10-25 灵枢数列随机
    // 抽奖动画函数封装
        function fairyalliance_lottery_animation_ShakeNum(options) {
            // 默认配置
            const defaults = {
                container: null,          // 容器元素
                type: "num",              // 类型："array"数字数组, "num"数字范围, "innerarray"字符数组, "grouparray"组合数组
                numberArray: [0,1,2,3,4,5,6,7,8,9],  // 数字数组（当type为"array"时）
                innerArray: ['0','1','2','3','4','5','6','7','8','9'],  // 字符数组（当type为"innerarray"时）
                groupArray: ['8888', '东方仙盟', '一等奖', '0000', '1234', '仙盟必胜'],  // 组合数组（当type为"grouparray"时）
                startNum: 0,              // 起始数字（当type为"num"时）
                endNum: 9,                // 结束数字（当type为"num"时）
                speed: 80,                // 滚动速度，数值越小越快
                displayLength: 4,         // 显示长度，每个字符一个方块
                initialValues: [],        // 初始显示值
                autoStopSeconds: 0        // 自动停止秒数，0表示不自动停止
            };
            
            // 合并配置
           // this.config = { ...defaults, ...options };
           // 合并配置（兼容低版本浏览器）
           //（...）的问题，需要将对象合并方式改为兼容写法。低版本浏览器（如 IE）不支持 ES6 的扩展运算符，可使用Object.assign或手动遍历属性的方式合并配置：
            this.config = Object.assign({}, defaults, options);
            
            // 验证必要配置
            if (!this.config.container) {
                throw new Error("必须指定容器元素(container)");
            }
            
            // 初始化状态
            this.isRolling = false;
            this.timers = [];
            this.autoStopTimer = null;
            this.valueElements = [];
            
            // 初始化DOM
            this.init();
}
        
        // 初始化方法
        fairyalliance_lottery_animation_ShakeNum.prototype.init = function() {
            const container = this.config.container;
            const displayLength = this.config.displayLength;
            
            // 清空容器
            container.innerHTML = '';
            this.valueElements = [];
            
            // 创建显示框 - 每个字符一个方块
            for (let i = 0; i < displayLength; i++) {
                const valueBox = document.createElement('div');
                valueBox.className = 'number-box';
                
                const valueElement = document.createElement('div');
                valueElement.className = 'number';
                //2025-10-21
               // valueElement.id = `num${i+1}`;
                // valueElement.id = `num${i+1}`;
                 valueElement.id = `num${i+1}`;
                
                // 设置初始值，未提供则使用0
                let initialValue = this.config.initialValues[i] !== undefined ? this.config.initialValues[i] : '0';
                valueElement.textContent = initialValue;
                
                valueBox.appendChild(valueElement);
                container.appendChild(valueBox);
                
                this.valueElements.push(valueElement);
            }
        };
        
        // 根据类型获取随机值
    fairyalliance_lottery_animation_ShakeNum.prototype.getRandomValue = function() {
            switch (this.config.type) {
                case "array":
                    // 从数字数组中随机选择
                    const numArr = this.config.numberArray;
                    return numArr[Math.floor(Math.random() * numArr.length)];
                case "innerarray":
                    // 从字符数组中随机选择
                    const strArr = this.config.innerArray;
                    return strArr[Math.floor(Math.random() * strArr.length)];
                case "grouparray":
                    // 从组合数组中随机选择一个完整组合
                    const groupArr = this.config.groupArray;
                    return groupArr[Math.floor(Math.random() * groupArr.length)];
                case "num":
                default:
                    // 从起始到结束数字范围中随机选择
                   // return Math.floor(Math.random() * (this.config.endNum - this.config.startNum + 1)) + this.config.startNum;
                   //2025-10-21
                    return Math.floor(Math.random() * (this.config.endNum - this.config.startNum )) + this.config.startNum;
            }
        };
        
        // 单个值滚动 (用于非组合类型)
      fairyalliance_lottery_animation_ShakeNum.prototype.rollSingleValue = function(element) {
            const self = this;
            return setInterval(() => {
                element.textContent = self.getRandomValue();
            }, this.config.speed);
        };
        
        // 组合滚动 (用于组合类型)
      fairyalliance_lottery_animation_ShakeNum.prototype.rollGroupValue = function() {
            const self = this;
            return setInterval(() => {
                // 获取一个随机组合
                const groupValue = self.getRandomValue();
                // 将组合分割为字符数组
                const chars = groupValue.split('');
                
                // 为每个位置设置对应字符，不足补0，超过截断
                self.valueElements.forEach((element, index) => {
                    element.textContent = chars[index] !== undefined ? chars[index] : '0';
                   //  element.textContent = chars[index] !== undefined ? chars[index] : '0';
                });
            }, this.config.speed);
        };
        
        // 开始滚动
fairyalliance_lottery_animation_ShakeNum.prototype.start = function(autoStopSeconds) {
            if (this.isRolling) return;
            
            this.isRolling = true;
            this.timers = [];
            
            // 清除任何可能存在的自动停止计时器
            if (this.autoStopTimer) {
                clearTimeout(this.autoStopTimer);
                this.autoStopTimer = null;
            }
            
            // 根据类型使用不同的滚动方式
            if (this.config.type === "grouparray") {
                // 组合类型 - 所有位置一起滚动
                this.timers.push(this.rollGroupValue());
            } else {
                // 其他类型 - 每个位置独立滚动
                this.valueElements.forEach(element => {
                    this.timers.push(this.rollSingleValue(element));
                });
            }
            
            // 处理自动停止 - 优先使用方法参数，其次使用配置
            const stopSeconds = autoStopSeconds !== undefined ? autoStopSeconds : this.config.autoStopSeconds;
            if (stopSeconds > 0) {
                this.autoStopTimer = setTimeout(() => {
                    this.stop();
                }, stopSeconds * 1000);
            }
        };
        
        // 停止滚动
        fairyalliance_lottery_animation_ShakeNum.prototype.stop = function() {
            if (!this.isRolling) return;
            
            this.isRolling = false;
            // 清除所有滚动计时器
            this.timers.forEach(timer => clearInterval(timer));
            
            // 清除自动停止计时器
            if (this.autoStopTimer) {
                clearTimeout(this.autoStopTimer);
                this.autoStopTimer = null;
            }
        };
        
        // 切换类型
        fairyalliance_lottery_animation_ShakeNum.prototype.changeType = function(type) {
            this.stop();
            this.config.type = type;
            this.init(); // 重新初始化显示
        };
        
        // 指定显示内容
        fairyalliance_lottery_animation_ShakeNum.prototype.setDisplayValues = function(values) {
            // 先停止滚动
            this.stop();
            
            // 处理输入值：分割为单个字符
            let chars = [];
            if (typeof values === 'string') {
                chars = values.split('');
            } else if (Array.isArray(values)) {
                // 如果是数组，将每个元素转为字符串并分割
                values.forEach(item => {
                    chars = chars.concat(item.toString().split(''));
                });
            }
            
            // 确保值数量与显示长度匹配：不足补0，超过截断
            const displayValues = [];
            for (let i = 0; i < this.config.displayLength; i++) {
                displayValues[i] = chars[i] !== undefined ? chars[i] : '0';
            }
            
            // 设置每个位置的值
            this.valueElements.forEach((element, index) => {
                element.textContent = displayValues[index];
            });
        };
        
        // 获取当前显示的值
        fairyalliance_lottery_animation_ShakeNum.prototype.getCurrentValues = function() {
            return this.valueElements.map(element => element.textContent);
        };
        
$cq.灵枢数列随机 = function(options){
    return new fairyalliance_lottery_animation_ShakeNum(options);
}; 

//2025-10-30
/**
 * 时间显示模块 - formatNumber内置版本
 * 实时显示当前时间并每秒更新，格式化函数内置
 */

    // 存储定时器ID
    let fairyalliance_public_clockTimer = null;

    /**
     * 实时运行的时钟功能
     * @param {string|HTMLElement} selector - 显示时间的元素选择器或DOM元素
     * @returns {Object} cyberwin_query实例，支持链式调用
     * selector = '#nowTime'
     */
    cyberwin_query.prototype.RunClock = function() {
        // 清除已有的定时器
        let cyberthat=this;
        if (fairyalliance_public_clockTimer) {
            clearTimeout(fairyalliance_public_clockTimer);
            fairyalliance_public_clockTimer = null;
        }

        /**
         * 时钟更新函数（内部包含格式化逻辑）
         */
        function updateClock() {
            // 格式化数字函数（内置）
            function formatNumber(num) {
                return num < 10 ? '0' + num : num.toString();
            }

            const now = new Date();
            
            // 获取时间各部分并格式化
            const year = now.getFullYear();
            const month = formatNumber(now.getMonth() + 1);
            const day = formatNumber(now.getDate());
            const hours = formatNumber(now.getHours());
            const minutes = formatNumber(now.getMinutes());
            const seconds = formatNumber(now.getSeconds());

            // 组合完整时间字符串
            const showTime = `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;

            // 更新目标元素内容
            /*
            if (typeof selector === 'string') {
                const element = document.querySelector(selector);
                if (element) {
                    element.innerHTML = showTime;
                }
            } else if (selector instanceof HTMLElement) {
                selector.innerHTML = showTime;
            }
            */
             for(i=0;i<cyberthat.elements.length;i++){
			//console.log("元素赋值",this.elements[i]);
               //this.elements[i].value=value;
               cyberthat.elements[i].innerHTML = showTime;
            }

            // 每秒更新一次
            fairyalliance_public_clockTimer = setTimeout(updateClock, 1000);
        }

        // 立即执行一次
        updateClock();

        return this; // 支持链式调用
    };

    /**
     * 停止时钟的方法
     * @returns {Object} cyberwin_query实例，支持链式调用
     */
    cyberwin_query.prototype.StopClock = function() {
        if (fairyalliance_public_clockTimer) {
            clearTimeout(fairyalliance_public_clockTimer);
            fairyalliance_public_clockTimer = null;
        }
        return this;
    };
 

    cyberwin_query.StopClock = function() {
        return this.StopClock();
    };

  
    $cq.时钟停止 = function() {
        return this.StopClock();
    };
    
     cyberwin_query.prototype.时钟运行 = function() {
          return this.RunClock();
     };
     
      cyberwin_query.prototype.时钟停止 = function() {
          return this.StopClock();
     };
     
     
 
//2025-11-03 是否
/**
 * 元素折叠/展开模块（优化版）
 * 精简内部逻辑，提升稳定性和可维护性
 */
  

    // 存储元素状态的映射表
    const fairyalliance_public_collapseStates = new Map();

    /**
     * 折叠/展开切换核心方法
     * @param {string|HTMLElement} containerSelector - 容器选择器或元素
     * @param {string|HTMLElement} headerSelector - 触发头选择器
     * @param {string|HTMLElement} contentSelector - 内容选择器
     * @param {string} [direction='up'] - 方向：up/down/left/right
     * @returns {Object} cyberwin_query实例，支持链式调用
     */
    $cq.fairyalliance_toggleCollapse = function(containerSelector, headerSelector, contentSelector, direction = 'up') {
        // 初始化样式（仅执行一次）
        if (!document.getElementById('fairyalliance-collapse-styles')) {
            const style = document.createElement('style');
            style.id = 'fairyalliance-collapse-styles';
            style.textContent = `
                .fairyalliance-collapse-container { overflow: hidden; transition: all 0.3s ease; }
                .fairyalliance-collapse-header { cursor: pointer; user-select: none; }
                .fairyalliance-collapse-content { transition: all 0.3s ease; }
            `;
            document.head.appendChild(style);
        }

        // 获取DOM元素（统一处理选择器和DOM元素）
        const getElement = (selector, parent) => {
            if (typeof selector === 'string') {
                return parent ? parent.querySelector(selector) : document.querySelector(selector);
            }
            return selector instanceof HTMLElement ? selector : null;
        };

        // 获取核心元素
        const container = getElement(containerSelector);
        const header = getElement(headerSelector, container);
        const content = getElement(contentSelector, container);

        // 验证元素有效性
        if (!container || !header || !content) {
            console.error('折叠功能所需元素不存在', {
                container: !!container,
                header: !!header,
                content: !!content
            });
            return this;
        }

        // 添加基础样式类
        container.classList.add('fairyalliance-collapse-container');
        content.classList.add('fairyalliance-collapse-content');
        header.classList.add('fairyalliance-collapse-header');

        // 获取或初始化状态对象
        let state = fairyalliance_public_collapseStates.get(container);
        if (!state) {
            // 初始化状态：记录初始尺寸和方向
            state = {
                isCollapsed: false,
                direction: direction,
                initialSize: 0,
                originalHeaderText: header.innerHTML.trim() // 保存原始标题文本
            };
            fairyalliance_public_collapseStates.set(container, state);
        }

        // 计算初始尺寸（考虑方向变化）
        const calculateInitialSize = (elem, dir) => {
            const styles = window.getComputedStyle(elem);
            switch(dir) {
                case 'up':
                case 'down':
                    return Math.max(elem.offsetHeight, parseInt(styles.height) || 0);
                case 'left':
                case 'right':
                    return Math.max(elem.offsetWidth, parseInt(styles.width) || 0);
                default:
                    return 0;
            }
        };

        // 方向变更处理
        if (state.direction !== direction) {
            state.direction = direction;
            state.initialSize = 0; // 重置尺寸，触发重新计算
        }

        // 确保初始尺寸已设置
        if (state.initialSize === 0) {
            state.initialSize = calculateInitialSize(content, state.direction);
            // 应用初始样式
            if (state.direction === 'up' || state.direction === 'down') {
                content.style.height = state.initialSize + 'px';
            } else {
                content.style.width = state.initialSize + 'px';
            }
        }

        // 折叠/展开样式应用
        const applyCollapseStyle = (isCollapsed) => {
            if (state.direction === 'up' || state.direction === 'down') {
                content.style.height = isCollapsed ? '0px' : state.initialSize + 'px';
                content.style.overflow = isCollapsed ? 'hidden' : '';
            } else {
                content.style.width = isCollapsed ? '0px' : state.initialSize + 'px';
                content.style.overflow = isCollapsed ? 'hidden' : '';
            }
        };
        
        //2025-11-03
         const directionText = {
            'up': '向下展开',
            'down': '向上展开',
            'left': '向右展开',
            'right': '向左展开'
        };
        const collapseText = {
            'up': '向上折叠',
            'down': '向下折叠',
            'left': '向左折叠',
            'right': '向右折叠'
        };

        // 更新标题文本
        const updateHeaderText = (isCollapsed) => {
            const actionText = isCollapsed 
                ? `展开（${directionText[state.direction]}方向）` 
                : `折叠（${collapseText[state.direction]}方向）`;
            header.innerHTML = `${state.originalHeaderText}（点击${actionText}）`;
        };

        // 绑定点击事件（先移除旧事件避免重复绑定）
        header.onclick = null;
        header.onclick = () => {
            state.isCollapsed = !state.isCollapsed;
            applyCollapseStyle(state.isCollapsed);
            updateHeaderText(state.isCollapsed);
        };

        // 初始化标题文本
        updateHeaderText(state.isCollapsed);

        return this;
    };

    // 静态调用方法
    /*
    cyberwin_query.toggleCollapse = function(containerSelector, headerSelector, contentSelector, direction) {
        return cyberwin_query().toggleCollapse(containerSelector, headerSelector, contentSelector, direction);
    };
    */

 //   console.log('cyberwin_query 优化版折叠展开模块已加载');
  $cq.工作台收缩 = function(containerSelector, headerSelector, contentSelector, direction = 'up') {
      return  $cq.fairyalliance_toggleCollapse(containerSelector, headerSelector, contentSelector, direction) ;
  };
 
//2025-11-04 打印技术


 $cq.未来之窗_东方仙盟_灵纹模板自定义=function(options) {
     var tpl渲染器模板 = `
		<style>
		  .contact-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #d4c2a0;
            margin-right: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #8b2323;
            font-weight: bold;
            border: 2px solid #c8a37e;
             width: 36px;
            height: 36px;
            display: inline-block;
            line-height: 32px;
    text-align: center;
        }

		.table_修仙列表 {
    overflow-x: auto;
    border: 1px solid #8B4513;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.5);
     height: 100%; /* 表格可视高度，可自己改 */
    overflow-y: auto; /* 垂直滚动条 */
}
.table_修仙列表 table {
    width: 100%;
    border-collapse: collapse;
}
 .table_修仙列表 th, td {
            padding: 0.8rem 1rem;
            text-align: left;
            border-bottom: 1px solid #D2B48C;
            padding: 10px 5px;
        }

        .table_修仙列表 th {
            background-color: #8B4513;
            color: white;
            font-weight: bold;
            position: sticky;
            top: 0;
        }

        .table_修仙列表 tr:nth-child(even) {
            background-color: rgba(210, 180, 140, 0.1);
        }

       .table_修仙列表 tr:hover {
            background-color: rgba(210, 180, 140, 0.3);
        }
</style>
		<div class="list-header" style="background:#D2B48C;">
                <cyberdiv id="current_当前类目"></cyberdiv><span>搜索</span>
                <input type="text" class="search-box" placeholder="搜索..." id="searchInput_渲染器" style="border:1px solid #8B4513;">
                
                	<button class="btn  " onclick="$cq.未来之窗_通用搜索_灵纹模板();" style="padding-top: 0px;
    padding-bottom: 0px;background-color: #8B4513 !important;
    color: white;border-radius: 4px;border: 1px solid #8B4513;height: 30px;
    width: 61px;">搜索</button>
    
            </div>
			<div class="table_修仙列表">
            	 										    
            <table>
                <thead>
                    <tr>
                        <th></th>
                        
                        <th>模板名称</th>
                        <th>下载次数</th>
                        <th>操作</th>
                        <th>行业</th>
                        <th>类型</th>
                        <th>宽度</th>
                        <th>高度</th>
                        
                        
                        
                        
                        <th>描述</th>
                        <th>ip</th>
                        <th>时间</th>
                        
                        
                        
                        
                        
                        <th>客户端标识</th>
                        <th>编号</th>
                        <th>示例</th>
                        <th>创始人</th>
                        
                       
                    </tr>
                </thead>
                <tbody id="未来之窗_修仙_listtable"></tbody>
            </table>
             
        </div>
		 
        
        
    <div id="paginationContainer_渲染器" style="margin: 20px 0;">22222</div>
    
    
        </div>
			`;
			var 未来之窗app_通用ID ="东方仙盟灵纹模板_通用ID";
		     $cq.对话框().layer(tpl渲染器模板,{type:"frame",title:options.title,move:false,width:"1180px",height:"520px",id:未来之窗app_通用ID,mask:true,align:59,hideclose:false,barbg:'#8b4513'});
		     
		  fairyalliance_public_渲染器_网关 =   options.api;
		  fairyalliance_public_渲染器download_网关 =   options.downloadapi;

		  $cq.分页_初始化();
		  $cq.分页设置({callback:$cq.分页世界_灵纹模板});
		  
		   
         

         fairyalliance_public_未来之窗当前分页_渲染器 = 0;
		 $cq.未来之窗_渲染当前数据_灵纹模板("0",fairyalliance_public_未来之窗当前分页_渲染器,"");



 };
  $cq.未来之窗_渲染当前数据_灵纹模板=function(search_group_id,page,keyword) {
			 var api=fairyalliance_public_渲染器_网关;//


   var tpl_数据模板_tablelsit  =`
	  {cwpdapp{# for(var i in d){   }}
        
         
                
                <tr>
                       
                        <td >
                            <div class="contact-avatar">{cwpdapp{d[i].apptitle.charAt(0)}}</div>
                            
                       
                        
                        
                  
                        </td>
                        <td>{cwpdapp{d[i].apptitle}}</td>
                           <td>{cwpdapp{d[i].app_salescount}}</td>
                           
                             <td>
                            <button class="btn operation-btn" style="padding-top: 0px;
    padding-bottom: 0px;background-color: #8B4513 !important;
    color: white;border-radius: 4px;border: 1px solid #8B4513;height: 30px;
    width: 61px;"
	onClick="$cq.未来之窗_灵纹模板_下载模板('{cwpdapp{d[i].cyber_sn}}','{cwpdapp{d[i].voslocal_sn}}','{cwpdapp{d[i].apptitle}}')"
	>下载</button>
                            
                        </td>
                         <td>{cwpdapp{d[i].report_trade}}</td>
                          <td>{cwpdapp{d[i].report_type}}</td>
                          <td>{cwpdapp{d[i].report_width}}</td>
                          <td>{cwpdapp{d[i].report_height}}</td>
                         
                        <td>{cwpdapp{d[i].app_descript}}</td>
                        <td>{cwpdapp{d[i].sys_worker_ip}}</td>
                     
                            <td>{cwpdapp{d[i].create_timestr}}</td>
                            
                            <td>{cwpdapp{d[i].report_sn}}</td>
                            <td>{cwpdapp{d[i].cyber_id}}</td>
                            <td>  <button class="btn operation-btn" style="padding-top: 0px;
    padding-bottom: 0px;background-color: #8B4513 !important;
    color: white;border-radius: 4px;border: 1px solid #8B4513;height: 30px;
    width: 61px;"
	onClick="$cq.对话框().layer('{cwpdapp{d[i].report_case}}',{type:'url',title:'{cwpdapp{d[i].apptitle}}',mask:true,barbg:'#8b4513'})"
	>查看</button></td>
                            
                        
                       <td>{cwpdapp{d[i].report_author}}</td>
                       
                    </tr>
                    
                     
                    
            
         {cwpdapp{# } }}
	`;

		 
		var 仙盟中转="系统自动化_全球_灵纹打印云模板列表";   
		const lang="cn";
		const 仙盟先知 = {集团:"77",企业:"72",仙盟六界:"全球",仙界:"全球",仙域:"全球",国度:lang,app_key:"开源通用押金系统",app_sn:"",app_id:""
	  ,东郭仙域:"gjjhjgj",search_group_id: search_group_id, keyword:keyword,searchtype:"alias",page:page };
	  东方仙盟_通用请求_common(api,仙盟中转,JSON.stringify(仙盟先知),function(response) {
		 console.log("返回",response);
			if(response.status==9){
			 
						$cq.未来之窗_通用技术_模板渲染(tpl_数据模板_tablelsit).render(response.data.data_default, function(html) {
                             console.log(html);
                          $cq("#未来之窗_修仙_listtable").html(html);
                        });
                        
                        const page_count= response.page.page_count;
                         $cq("#paginationContainer_渲染器").分页({
                				id:"#paginationContainer_渲染器",
                                maxPage:page_count,          // 总页数
                                currentPage: fairyalliance_public_未来之窗当前分页_渲染器,       // 初始页码（默认1）
                                
                            });

				 
			}else{
					alert(response.message);
			}
	});

	};
$cq.未来之窗_灵纹模板_下载模板=function(灵体代号,虚拟系统代号) {
	  const 灵舟 =fairyalliance_public_渲染器download_网关;
	  if(虚拟系统代号 == ""){
		  return;
	   }
	  //$cq.未来之窗_虚拟渲染器_下载(灵舟,'',灵体代号,虚拟系统代号);
	  	$cq.ajax({
        type: "GET",
        url: 灵舟,
        data: {tpl:"",data_sn:"",data_id:灵体代号,action:"CRDRv2025"},
        dataType: "JSON",
        success: function(response) {
           //callback(response);
           	if(response.status == 9){
				 var print_tmp_data=response.data.report_content_windows;
						  //window.localStorage.setItem(本地模板, response.data);
			 try{
			  	var ret=CyberWin_JsStandardPlug.cwpd_system_config_report_set("commonreport",虚拟系统代号,print_tmp_data,"20225578-2019");
						   $cq().alert('下载成功'+ret);
			 }catch(ex){
			      $cq().alert('当前环境不支持');
			 }
					 
			}else{
			    $cq().alert('下载失败');
			}
						
						
        },
        error: function(xhr, error) {
           // console.log("请求错误：", error);
           // callback(error,"错误");
        }
    });
    
  };
  
  
  
 $cq.分页世界_灵纹模板=function(page) {  
	//	console.log("分页世界_渲染器: " + page);
		if(fairyalliance_public_未来之窗当前分页_渲染器 == page){
		    	console.log("当前翻页相同禁止: " + page);
		    return;
		}
		fairyalliance_public_未来之窗当前分页_渲染器 = page;
		 const 关键字=$cq("#searchInput_渲染器").val();		
		  $cq.未来之窗_渲染当前数据_灵纹模板("分类",fairyalliance_public_未来之窗当前分页_渲染器,关键字);
	}
	
  $cq.未来之窗_通用搜索_灵纹模板=function() {   
	        const 关键字=$cq("#searchInput_渲染器").val();		
		    $cq.未来之窗_渲染当前数据_灵纹模板("分类",1,关键字);
	}

//2025-11-04
$cq.系统_时间_当前 = function(options) {
     let 格式化当前时间="yyyy-MM-dd h:m:s";
     if(options == "cn"){
         格式化当前时间="yyyy年MM月dd日h:m:s";
     }
      const now = new Date();
      const options_new = {date:now,str:格式化当前时间};
    return $cq.cyberwinformat_date(options_new); 
};
/**
 * 将字符串首字母大写，其余字符保持原样
 * @param {string} str - 需要处理的字符串
 * @returns {string} 首字母大写后的字符串
 */
 $cq.String_capitalizeFirstLetter = function(options) {
  // 检查字符串是否为空或非字符串类型
  if (!options || typeof options !== 'string') {
    return options; // 非字符串或空字符串直接返回
  }
  // 首字母转为大写 + 剩余字符（从索引1开始截取）
  return options.charAt(0).toUpperCase() + options.slice(1);
}
$cq.字符串_首字母大写 = function(options) {
     
    return $cq.String_capitalizeFirstLetter(options); 
};


/**
 * 像素(options)转换为厘米(cm)
 * @param {number} options - 像素值
 * @returns {number} 转换后的厘米值（保留2位小数）
 */
 $cq.measures_px2cm = function(options) {
  // 获取设备像素比（DPR），默认1
  const dpr = window.devicePixelRatio || 1;
  // 1英寸 = 2.54厘米，假设屏幕PPI基准为96（浏览器默认参考值）
  // 实际物理像素 = CSS像素 × DPR，再通过PPI转换为厘米
  const cm = (options * dpr * 2.54) / 96;
  return Math.round(cm * 100) / 100; // 保留2位小数
};

/**
 * 厘米(options)转换为像素(px)
 * @param {number} options - 厘米值
 * @returns {number} 转换后的像素值（四舍五入取整）
 */
 $cq.measures_cm2px = function(options) {
  // 获取设备像素比（DPR），默认1
  const dpr = window.devicePixelRatio || 1;
  // 先将厘米转英寸，再通过PPI和DPR转换为CSS像素
  const px = (options * 96) / (2.54 * dpr);
  return Math.round(px); // 像素值取整
};

$cq.东方仙盟_算法_文字压缩 = function(options) {
    return $cq.东方仙盟_文字压缩算法(options);
};

/**
 * 生成随机数字 token
 * @param {number} length - token 的长度（默认 6 位）
 * @returns {string} 随机数字组成的 token
 * fairyallian
 */
$cq.fairyallian_Algorithm_Randomtoken = function(options,length = 6) {
  // 校验长度合法性
  if (typeof length !== 'number' || length < 1) {
    throw new Error('token 长度必须是大于 0 的数字');
  }
  
  let token = '';
  for (let i = 0; i < length; i++) {
    // 生成 0-9 的随机整数并拼接到结果中
    token += Math.floor(Math.random() * 10);
  }
  
  const timestamp = Date.now().toString().slice(-6); // 取时间戳后 4 位
  const timestamp2 = timestamp.slice(-3); // 取时间戳后 4 位
  const timestamp3 = timestamp.slice(3); // 取时间戳后 4 位
    
  return options+timestamp2+token+timestamp3;
};
 
$cq.东方仙盟_算法_随机token = function(options,length = 6) {
    return $cq.fairyallian_Algorithm_Randomtoken(options,length);
};


//2025-11-05
//Prophet _
$cq.fairyallianProphet_Automation_TabDlg = function(options) {
    //function(先知,前世, callback,skincolor,width,height,title,mask  = true,move = true) {
    
         let title="";
         let 先知="";
         let 前世="";
         let callback=null;
         let skincolor="";
         let width="";
         let height="";
         let mask=true;
         let move=true;
         
         if(options.title){
             title = options.title;
         }
         
         if(options.先知){
             先知 = options.先知;
         }
          if(options.前世){
             前世 = options.前世;
         }
          if(options.callback){
             callback = options.callback;
         }
         
          if(options.skincolor){
             skincolor = options.skincolor;
         }
         
           if(options.width){
             width = options.width;
          }
           if(options.height){
             height = options.height;
          }
           if(options.mask){
             mask = options.mask;
          }else{
              mask = false;
             
          }
           if(options.move){
             move = options.move;
          }else{
              move = false;
             
          }
       
         
		const 先知灵舟id = "fairyalliancedlg"+$cq.东方仙盟_算法_随机token("pr", 6);
		const 全局回调名 = `仙盟先知_callback_${先知灵舟id}`; // 全局回调的唯一标识
		const 表单ID = `仙盟先知form${先知灵舟id}`; // 表单元素的ID

		// 1. 包装原始回调：执行后自动销毁资源
		//仙盟先知_自动化_尚书省  
		const 仙盟先知_自动化_尚书省 = (数据response) => {
			try {
				// 先执行原始回调逻辑
			
				 if(options.callback){
                     	callback(数据response);
                 }else{
                     for (var key in 数据response) {
                			 $cq("#"+key).val(数据response[key]);
                      }
                 }
                 
			} finally {
				// 回调执行后，强制销毁资源
				仙盟先知_表单自动化_工部清扫();
			}
		};

		// 2. 绑定到全局（供按钮点击调用）
		window[全局回调名] = 仙盟先知_自动化_尚书省;

		// 3. 内部处理函数（保持不变）
		function 仙盟先知_表单自动化_内阁(response) {
			const 灵体数据 = $cq(`#${表单ID}`).表单打包();
			仙盟先知_自动化_尚书省(灵体数据); // 调用带销毁的回调
		}

		// 4. 销毁资源的核心函数：清除全局变量 + 移除DOM元素
		function 仙盟先知_表单自动化_工部清扫() {
			// 清除全局绑定的回调函数（避免内存泄漏）
			if (window[全局回调名]) {
				delete window[全局回调名];
			}
			// 移除页面中的表单元素（避免DOM冗余）
			 cyberwin_closeAndDeldlg(先知灵舟id);
		}

		// 5. 模板定义（按钮点击调用全局回调）
		var tpl仙盟先知_万能表单 = `<form id="${表单ID}" onsubmit="return false;">
			<style>
			.东方仙盟_灵颜妙手 .表单 .fg
			{
			    text-align:left;
			}
				.东方仙盟_灵颜妙手 .表单 input, select {
					width: 100px;
				}
				.东方仙盟_灵颜妙手 .表单 .fg label {
					 
					color: #03A9F4;
					font-weight: 700;
				}
			</style>
			<cyberdiv class="东方仙盟_灵颜妙手" style="padding-left: 0px;padding-right: 0px;">
				<cyberdiv class="表单" id="${先知灵舟id}BODY" style="padding-left: 0px;padding-right: 0px;"></cyberdiv>
				<button  class="按钮" onClick="
					console.log('按钮被点击了');
					//alert('执行匿名代码');
					// 调用全局回调（会触发后续销毁）
					if (window['${全局回调名}']) {
						window['${全局回调名}']($cq('#${表单ID}').表单打包());
					}
				">OK（确认）</button>
			</cyberdiv>
		</form>`;


		
		$cq.对话框().layer(tpl仙盟先知_万能表单,{type:"frame",id:先知灵舟id,barbg:skincolor,title:title,move:move,mask:mask,width:width,height:height,align:59});

		var 东方仙盟先知仙域 = "#"+先知灵舟id+"BODY";

		//$cq.未来之窗_人工智能_东方仙盟_仙君仙域先知高级(先知,"",东方仙盟先知仙域);
		//width,height,title,mask,move

		$cq.未来之窗_人工智能_东方仙盟_仙君仙域先知高级(先知,"",东方仙盟先知仙域);

		//前世

		 
		$cq.未来之窗_人工智能_前端口_数据渲染到界面(前世, "");

		// 假设的渲染逻辑（将模板插入页面）
		// document.body.innerHTML += tpl仙盟先知_万能表单;
	};
$cq.仙盟先知_自动化_选项卡_old = function(先知,前世, callback,skincolor,width,height,title,mask  = true,move = true) {
    return $cq.fairyallianProphet_Automation_TabDlg(先知,前世, callback,skincolor,width,height,title,mask,move);
}
$cq.仙盟先知_自动化_选项卡 = function(options) {
    return $cq.fairyallianProphet_Automation_TabDlg(options);
}

$cq.fairyallian_dataconterver_json2xml = function(json, rootName = 'root') {
    
    // 辅助函数：转义XML特殊字符
    function escapeXml(unsafe) {
        if (typeof unsafe !== 'string') {
            return String(unsafe);
        }
        return unsafe.replace(/[&<>"']/g, char => {
            switch (char) {
                case '&': return '&amp;';
                case '<': return '&lt;';
                case '>': return '&gt;';
                case '"': return '&quot;';
                case "'": return '&#39;';
                default: return char;
            }
        });
    }

    // 递归处理转换
    function convert(data, parentNode = rootName) {
        let xml = '';

        // 处理数组
        if (Array.isArray(data)) {
            data.forEach(item => {
                xml += `<${parentNode}>`;
                xml += convert(item, parentNode);
                xml += `</${parentNode}>`;
            });
            return xml;
        }

        // 处理对象
        if (typeof data === 'object' && data !== null) {
            Object.entries(data).forEach(([key, value]) => {
                // 处理空值
                if (value === null || value === undefined) {
                    xml += `<${key}/>`;
                    return;
                }

                // 处理嵌套对象或数组
                if (typeof value === 'object' || Array.isArray(value)) {
                    xml += `<${key}>`;
                    xml += convert(value, key);
                    xml += `</${key}>`;
                } else {
                    // 处理基本数据类型
                    xml += `<${key}>${escapeXml(value)}</${key}>`;
                }
            });
            return xml;
        }

        // 处理基本数据类型（非对象/数组）
        return escapeXml(data);
    }

    // 生成完整XML
    return `<?xml version="1.0" encoding="UTF-8"?>
            <${rootName}>
             ${convert(json).split('><').join('>\n<')}
             </${rootName}>`;
};

$cq.未来之窗_数据转换化_JSON转XML = function(json, rootName = 'root') {
    return $cq.fairyallian_dataconterver_json2xml(json,rootName);
}


//2025-11-10 通用列表


 $cq.未来之窗_智慧显示_灵榜列表 = function(options) {
     	 fairyalliance_public_渲染器_网关 =   options.api;
		     fairyalliance_public_渲染器download_网关 =   options.downloadapi;
		     fairyalliance_public_渲染器面板字段 =   options.灵体;
		     
     var tpl通用列表模板_1 = `
		<style>
		  .contact-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #d4c2a0;
            margin-right: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #8b2323;
            font-weight: bold;
            border: 2px solid #c8a37e;
             width: 36px;
            height: 36px;
            display: inline-block;
            line-height: 32px;
    text-align: center;
        }

		.table_修仙列表 {
    overflow-x: auto;
    border: 1px solid #8B4513;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.5);
     height: 100%; /* 表格可视高度，可自己改 */
    overflow-y: auto; /* 垂直滚动条 */
}
.table_修仙列表 table {
    width: 100%;
    border-collapse: collapse;
}
 .table_修仙列表 th, td {
            padding: 0.8rem 1rem;
            text-align: left;
            border-bottom: 1px solid #D2B48C;
            padding: 10px 5px;
        }

        .table_修仙列表 th {
            background-color: #8B4513;
            color: white;
            font-weight: bold;
            position: sticky;
            top: 0;
        }

        .table_修仙列表 tr:nth-child(even) {
            background-color: rgba(210, 180, 140, 0.1);
        }

       .table_修仙列表 tr:hover {
            background-color: rgba(210, 180, 140, 0.3);
        }
</style>
		<div class="list-header" style="background:#D2B48C;">
                <cyberdiv id="current_当前类目"></cyberdiv><span>搜索</span>
                <input type="text" class="search-box" placeholder="搜索..." id="searchInput_灵榜列表" style="border:1px solid #8B4513;">
                
                	<button class="btn  " onclick="$cq.未来之窗_通用搜索_灵榜列表();" style="padding-top: 0px;
    padding-bottom: 0px;background-color: #8B4513 !important;
    color: white;border-radius: 4px;border: 1px solid #8B4513;height: 30px;
    width: 61px;">搜索</button>
    
            </div>
			<div class="table_修仙列表">
            	 										    
            <table>
                <thead>
                    <tr>
                    `;
                    
                    let  tpl通用列表模板_2 ='';     
                    
                    for (let key in fairyalliance_public_渲染器面板字段) {
                      // 关键：过滤原型链上的属性（推荐）
                      if (fairyalliance_public_渲染器面板字段.hasOwnProperty(key)) {
                          //console.log("key:", key, "value:", obj[key]);
                          tpl通用列表模板_2 = tpl通用列表模板_2 +`<th>${fairyalliance_public_渲染器面板字段[key]}</th>`;
                      }
                    }
                        
                        
                       
                        
              const tpl通用列表模板_3 =`         
                    </tr>
                </thead>
                <tbody id="未来之窗_修仙灵榜列表_listtable"></tbody>
            </table>
             
        </div>
		 
        
        
    <div id="paginationContainer_灵榜列表" style="margin: 20px 0;">22222</div>
    
    
        </div>
			`;
			
		
		  
			var 未来之窗app_通用ID ="东方仙盟灵纹模板_通用ID";
			const 模板 = tpl通用列表模板_1+tpl通用列表模板_2+tpl通用列表模板_3;
			
		     $cq.对话框().layer(模板,{type:"frame",title:options.title,move:false,width:"1180px",height:"520px",id:未来之窗app_通用ID,mask:true,align:59,hideclose:false,barbg:'#8b4513'});
		     
		 

		  $cq.分页_初始化();
		  $cq.分页设置({callback:$cq.分页世界_灵榜列表});
		  
		   
         

         fairyalliance_public_未来之窗当前分页_渲染器 = 0;
		 $cq.未来之窗_渲染当前数据_智慧显示_灵榜列表("0",fairyalliance_public_未来之窗当前分页_渲染器,"");



 };
  $cq.未来之窗_渲染当前数据_智慧显示_灵榜列表=function(search_group_id,page,keyword) {
			 var api=fairyalliance_public_渲染器_网关;//


   var tpl_数据模板_tablelsit_1  =`
	  {cwpdapp{# for(var i in d){   }}
        <tr>`;
                       
                         let  tpl_数据模板_tablelsit_2 ='';     
                    
                    for (let key in fairyalliance_public_渲染器面板字段) {
                      // 关键：过滤原型链上的属性（推荐）
                      if (fairyalliance_public_渲染器面板字段.hasOwnProperty(key)) {
                           
                          tpl_数据模板_tablelsit_2 = tpl_数据模板_tablelsit_2 +` <td>{cwpdapp{d[i].${key}}}</td>`;
                      }
                    }
                        
                         
                           
                        
                     
           const    tpl_数据模板_tablelsit_3 = `          </tr> {cwpdapp{# } }}`;
        
        const tpl_数据模板_tablelsit = tpl_数据模板_tablelsit_1 + tpl_数据模板_tablelsit_2 + tpl_数据模板_tablelsit_3;
		 
		var 仙盟中转="系统自动化_通用列表";   
		const lang="cn";
		const 仙盟先知 = {集团:"77",企业:"72",仙盟六界:"全球",仙界:"全球",仙域:"全球",国度:lang,app_key:"开源通用押金系统",app_sn:"",app_id:""
	  ,东郭仙域:"gjjhjgj",search_group_id: search_group_id, keyword:keyword,searchtype:"alias",page:page };
	  
	  /*
	  	  $cq.ajax({
                    						url: 灵体,
                    						type: "POST",
                    						dataType: "JSON",
                    						data: {hca_transmit:HCA中转, common_data:数据
                    						,client_sn:clientSn,serial_sn:FairyallianceToken,reg_from:"仙盟开源",software:"'.$data_app['appname'].'"},
                    						success:function(response){
                    							console.log(response);
                    							funcallback(response);
                    						 
                    						}
                    			});
                    			*/
                    			const clientSn="";
                    			const FairyallianceToken="";
                  $cq.ajax({
                      	url: api,
                      	type: "POST",
                      	dataType: "JSON",
                      	data:{hca_transmit:仙盟中转, common_data:JSON.stringify(仙盟先知),client_sn:clientSn,serial_sn:FairyallianceToken,reg_from:"仙盟开源",software:""}
                    						
                      ,success:function(response){
	 // 东方仙盟_通用请求_common(api,仙盟中转,JSON.stringify(仙盟先知),function(response) {
		 console.log("返回",response);
			if(response.status==9){
			 
						$cq.未来之窗_通用技术_模板渲染(tpl_数据模板_tablelsit).render(response.data.data_default, function(html) {
                             console.log(html);
                            $cq("#未来之窗_修仙灵榜列表_listtable").html(html);
                        });
                        
                        const page_count= response.page.page_count;
                         $cq("#paginationContainer_灵榜列表").分页({
                				id:"#paginationContainer_灵榜列表",
                                maxPage:page_count,          // 总页数
                                currentPage: fairyalliance_public_未来之窗当前分页_渲染器,       // 初始页码（默认1）
                                
                            });

				 
			}else{
					alert(response.message);
			}
	}
	});

	};
 
  
  
 $cq.分页世界_灵榜列表=function(page) {  
	//	console.log("分页世界_渲染器: " + page);
		if(fairyalliance_public_未来之窗当前分页_渲染器 == page){
		    	console.log("当前翻页相同禁止: " + page);
		    return;
		}
		fairyalliance_public_未来之窗当前分页_渲染器 = page;
		 const 关键字=$cq("#searchInput_灵榜列表").val();		
		  $cq.未来之窗_渲染当前数据_智慧显示_灵榜列表("分类",fairyalliance_public_未来之窗当前分页_渲染器,关键字);
	}
	
  $cq.未来之窗_通用搜索_灵榜列表=function() {   
	        const 关键字=$cq("#searchInput_灵榜列表").val();		
		    $cq.未来之窗_渲染当前数据_智慧显示_灵榜列表("分类",1,关键字);
	}

 cyberwin_query.prototype.fairyalliance_AI_System_File_TextSaveToFile = function(text, fileName,filetype = "text/plain") {
           // 1. 将文本转换为 Blob 对象（指定 MIME 类型为纯文本）
      const blob = new Blob([text], { type: filetype+';charset=utf-8' });
      
      // 2. 创建临时 a 标签
      const a = document.createElement('a');
      
      // 3. 为 a 标签设置下载链接（利用 URL.createObjectURL 生成 Blob 对应的临时 URL）
      a.href = URL.createObjectURL(blob);
      
      // 4. 指定下载文件的名称
      a.download = fileName;
      
      // 5. 触发点击事件（模拟用户点击下载）
      document.body.appendChild(a);
      a.click();
      
      // 6. 清理临时资源（可选，建议添加）
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
}

 cyberwin_query.prototype.未来之窗_AI_操作系统_文件系统_文本保存到本地 = function(text, fileName,filetype = "text/plain") {
          return this.fairyalliance_AI_System_File_TextSaveToFile(text, fileName,filetype);
}

//2025-11-04
$cq.系统_时间_文件名当前 = function(options) {
     let 格式化当前时间="yyyy-MM-dd h_m_s";
     if(options == "cn"){
         格式化当前时间="yyyy年MM月dd日h_m_s";
     }
      const now = new Date();
      const options_new = {date:now,str:格式化当前时间};
    return $cq.cyberwinformat_date(options_new); 
};
    
//2025-12-120
// 为cyberwin_query原型添加仙盟_页面_只读方法
// 方法名：fairyalliance_Page_ReadOnly
// 参数说明：
// - structure：结构参数（可传递选择器/配置对象，支持第一层已选择的逻辑）
// - inputTypes：输入框类型数组，默认["text", "date"]（兼容Chrome 53的ES5写法）
cyberwin_query.prototype.fairyalliance_Page_viewonly = function( inputTypes) {
    // 1. 处理输入框类型默认值（ES5兼容写法）
    inputTypes = inputTypes || ["text", "date","number"];

    // 2. 处理结构参数，结合「第一层已经选择」的逻辑
    // 若当前$cq实例已有选中元素（第一层已选择），则基于这些元素查找；否则使用传入的structure选择器
     
    var i=0;
    var that =this;
    //对于返回器数组的内容
    for(iins=0;iins<that.elements.length;iins++){
        //this.elements[i].style.display='none';
         // 存储原始的 display 属性值
         //2025-10-25 保留原始信息
        
              // console.log(this)
              // var value = $cq(this).val();
              //  $cq(this).replaceWith($cq("<span>").text(value));
               //  $cq(this).html(value);
             //  $cq(this).elements[0].outerHTML=value;
              for (var ity = 0; ity < inputTypes.length; ity++) {
                    var type = inputTypes[ity];
                    // 过滤空值，避免无效选择器
                    if (type) {
                        //typeSelectors.push("input[type='" + type + "']");
                        const nowselc="input[type='" + type + "']";
                        $cq(that.elements[i]).find(nowselc).each(function(){
                            var value = $cq(this).val();
                            $cq(this).elements[0].outerHTML=value;
                        });
                        
                    }
                }
                
                
       
    }

    // 
};
 cyberwin_query.prototype.页面_预览模式 = function(inputTypes) {
          return this.fairyalliance_Page_viewonly(inputTypes);
}
// 调用示例（覆盖两种核心场景）
// 示例1：第一层已经选择（先选列表容器，再调用方法）- 你的核心需求
//$cq(".list-container").fairyalliance_Page_ReadOnly(null, ["text"]); // 仅text类型

// 示例2：直接传结构选择器（无第一层选择）
//$cq().fairyalliance_Page_ReadOnly(".list-container", ["text", "date"]); // text+date类型

// 示例3：全局生效（无结构参数，默认body）
//$cq().fairyalliance_Page_ReadOnly(null, ["text"]);
//那他非由于中书令
cyberwin_query.prototype.fairyalliance_webpage_PlaceContent = function(Selector, content) {
     const 灵体主体 = document.querySelector(Selector);
      const 灵体主体Doc = 灵体主体.contentDocument || 灵体主体.contentWindow.document;

        // 3. 清空iframe原有内容（可选，避免旧内容残留）
        灵体主体Doc.open(); // 打开文档流（写入前建议执行）
        灵体主体Doc.write(''); // 清空内容
        灵体主体Doc.close(); // 关闭文档流

      //  console.log(content);

        // 5. 写入HTML内容到iframe
        灵体主体Doc.open();
        灵体主体Doc.write(content);
        灵体主体Doc.close(); // 必须关闭文档流，确保内容渲染
};
cyberwin_query.prototype.页面_放置内容 = function(Selector, content) {
          return this.fairyalliance_webpage_PlaceContent(Selector, content);
}
//2025-12-21
$cq.页面_获取当前参数 = function(options) {
    return $cq.CMP_browser_getQueryVariable(options); 
};

//2025-01-09
// ===================== 未来之窗 仙盟创梦 多场景可编程虚拟键盘 (最终终极定稿版：双录入模式+4主题+全控件兼容+原版逻辑完整保留+【遥控/鼠标双模式自由切换】+电视遥控器完美适配) - Chrome53全兼容版 =====================
cyberwin_query.prototype.仙盟创梦_可编程键盘_打开 = function(options) {
    if (this.elements.length === 0) {
        return this;
    }
    if (this.elements.length >= 1) {
        // 默认配置：编程场景 + 暗黑主题 + 宿主录入模式 + 【新增】默认开启遥控模式 remote:true
        var opt = options || {type:"编程",theme:"暗黑",mode:"宿主",remote:true};
        return $cq.仙盟创梦_可编程键盘_打开({
            obj:this.elements[0],
            title:opt.title||opt.type+"键盘",
            type:opt.type||"编程",
            theme:opt.theme||"暗黑",
            mode:opt.mode||"宿主",
            remote:opt.remote===undefined ? true : opt.remote // ★【核心新增】遥控模式开关，默认开启true
        });
    }
};
//内置选择转换数组
cyberwin_query.prototype.toArray= function(){
     
    return this.elements;
};

$cq.仙盟创梦_可编程键盘_打开 = function(options) {
    // ★★★ 核心1：数组定义 多场景按键行，按需切换，可无限扩展 - Chrome53兼容：const→var
    var 仙盟多场景按键库 = {
        编程: [
            ["{", "}", "[", "]", "<", ">", "*", "/", "\\", "|"],
            ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
            ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";"],
            ["z", "x", "c", "v", "b", "n", "m", ":", "\"", "'"],
            ["=", "+", "-", "_", "(", ")", "&", "%", "#", "@"],
			["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
            ["清空", "退格", "确认", "", "", ""]
        ],
        数字: [
            ["7", "8", "9", ".", "(", ")", "%", "*", "/", "-"],
            ["4", "5", "6", "+", "00", "0", "1", "2", "3", "="],
            ["清空", "退格", "确认", "", "", ""]
        ],
        手机号: [
            ["1", "2", "3"],
            ["4", "5", "6"],
            ["7", "8", "9"],
            ["清空", "0", "退格"],
            ["确认", "", ""]
        ],
        数学: [
            ["7", "8", "9", "+", "-", "×", "÷", "(", ")", "√"],
            ["4", "5", "6", "=", ">", "<", "≠", "∞", "π", "%"],
            ["1", "2", "3", "清空", "退格", "", "", ""],
            ["0", ".", "00", "确认", "", "", "", "", ""]
        ]
    };

    // ★★★ 核心2：4套主题配色库，传参 theme 即可切换 - Chrome53兼容：const→var
    var 仙盟主题配色库 = {
        暗黑: {main:"#1E1E1E",sub:"#333333",btn:"#444444",hover:"#555555",text:"#FFFFFF",accent:"#03a9f4",border:"#555"},
        科技蓝: {main:"#0A1929",sub:"#112240",btn:"#1A365D",hover:"#2D4A75",text:"#FFFFFF",accent:"#64FFDA",border:"#2D4A75"},
        生态绿: {main:"#0F2E20",sub:"#1A402E",btn:"#24553C",hover:"#2F6A4A",text:"#FFFFFF",accent:"#4ADE80",border:"#2F6A4A"},
        新加坡: {main:"#121212",sub:"#1F1F1F",btn:"#2C2C2C",hover:"#3A3A3A",text:"#FFFFFF",accent:"#E63946",border:"#3A3A3A"}
    };
    
    // 变量初始化 - Chrome53兼容：全部 const/let → var
    var 当前主题 = 仙盟主题配色库[options.theme] || 仙盟主题配色库["暗黑"];
    var 当前场景 = options.type || "编程";
    var 当前按键组 = 仙盟多场景按键库[当前场景];
    var 录入模式 = options.mode || "宿主";
    var 遥控模式开关 = options.remote; // ★【核心新增】接收遥控模式开关参数 true=遥控模式 false=鼠标模式
    var fairyalliance_keyboardtitle = "请输入内容";
    if(options.title) fairyalliance_keyboardtitle = options.title;

    // ★★★ 仙盟标准样式 - Chrome53兼容：模板字符串→字符串拼接 + const→var
    var 仙盟样式 ='<style>'+
        '.仙盟创梦_可编程键盘对话框dlg{ border-radius: 10px; padding:0;margin:0 !important;z-index: 999999;border:0px;flex-direction:column;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);max-height:calc(100% - 2px);max-width:calc(100% - 2px)}'+
        '.仙盟创梦_可编程键盘容器{width:390px;border:1px solid '+当前主题.border+';border-radius:10px;overflow:hidden;background:'+当前主题.main+';}'+
        '.keypad-header{background-color:'+当前主题.accent+';color:'+当前主题.text+';padding:4px;display:flex;justify-content:space-between;align-items:center}.keypad-header span{font-size:18px}'+
        '.input-display{display:flex;justify-content:space-between;align-items:center;padding:5px 10px;background-color:'+当前主题.sub+';'+(录入模式=="宿主"?"display:none;":"")+'}'+
        '.input-display input{width:90%;padding:5px;border:1px solid '+当前主题.border+';max-width: 350px; font-size: larger;background:#fff;color:#000;}'+
        '.keypad-body{display:grid;grid-template-columns:repeat(10,1fr);grid-gap:3px;padding:8px;}'+
        '.仙盟创梦-keypad{color:'+当前主题.text+';padding:8px;font-size:16px;border:none;border-radius:5px;background-color:'+当前主题.btn+';cursor:pointer;min-height:40px;}'+
        '.仙盟创梦-keypad:hover{background-color:'+当前主题.hover+';}'+
        '.仙盟创梦_样式_键盘{padding:8px;font-size:16px;border:none;border-radius:5px;background-color:'+当前主题.accent+';cursor:pointer;color: '+当前主题.text+';min-height:40px;}'+
        '.仙盟创梦_键盘_关闭,.仙盟创梦_键盘_退格,.仙盟创梦_键盘_清空,.输入确定{background-color:'+当前主题.accent+'; border:1px solid '+当前主题.text+';color: '+当前主题.text+';}'+
        '@media screen and (max-width:768px) {.仙盟创梦_可编程键盘容器{width:98%!important;}.keypad-body{grid-template-columns:repeat(10,1fr);}.仙盟创梦-keypad{padding:6px;font-size:14px;min-height:36px;}}'+
        '/* ★【核心新增】仅遥控模式生效：选中高亮样式 - 3px加粗主题色边框，优先级最高，鼠标模式下无此样式 */'+
        '.仙盟创梦-keypad.key-selected, .仙盟创梦_样式_键盘.key-selected {border: 3px solid '+当前主题.accent+' !important; box-sizing: border-box;}'+
        '.仙盟创梦-keypad:disabled.key-selected {border:3px solid '+当前主题.border+' !important;}'+
		'.仙盟创梦_键盘_操作按钮{grid-column: span 2;}'+
    '</style>';

    // ★★★ 动态生成键盘按键HTML，原版逻辑完整保留 - Chrome53兼容：let→var + 箭头forEach→标准forEach
    var 动态按键HTML = "";
    当前按键组.forEach(function(rowBtns,rowIdx) {
        rowBtns.forEach(function(btnVal,colIdx) {
            if(btnVal == "退格"){
                动态按键HTML += '<button class="仙盟创梦_样式_键盘 仙盟创梦_键盘_退格 仙盟创梦_键盘_操作按钮">'+btnVal+'</button>';
            }else if(btnVal == "清空"){
                动态按键HTML += '<button class="仙盟创梦_样式_键盘 仙盟创梦_键盘_清空 仙盟创梦_键盘_操作按钮" >'+btnVal+'</button>';
            }else if(btnVal == "确认"){
                动态按键HTML += '<button class="仙盟创梦_样式_键盘 输入确定 仙盟创梦_键盘_操作按钮">'+btnVal+'</button>';
            }else if(btnVal == ""){
                动态按键HTML += '<button class="仙盟创梦-keypad" disabled style="background:'+当前主题.sub+';"></button>';
            }else{
                动态按键HTML += '<button class="仙盟创梦-keypad" data-key="'+btnVal+'">'+btnVal+'</button>';
            }
        });
    });

    // 键盘主体HTML - 完整保留 #仙盟创梦_可编程键盘_输入框 虚拟输入框 - Chrome53兼容：模板字符串→字符串拼接
	var 仙盟可编程键盘  = '<dialog id="仙盟创梦_可编程键盘对话框dlg" class="仙盟创梦_可编程键盘对话框dlg" open="">'+
        '<div class="仙盟创梦_可编程键盘容器">'+
            '<div class="keypad-header">'+
                '<span>'+fairyalliance_keyboardtitle+'</span>'+
                '<button class="仙盟创梦_键盘_关闭">☓</button>'+
            '</div>'+
            '<div class="input-display">'+
                '<input type="text" id="仙盟创梦_可编程键盘_输入框" readonly="">'+
            '</div>'+
            '<div class="keypad-body">'+动态按键HTML+'</div>'+
        '</div>'+
    '</dialog>';

    // 未来之窗原生弹窗加载，原版写法不变
    var 未来之窗app_键盘ID="wlzcapp_ai_all25114_prokeyndlg";
    var 未来之窗app_键盘body = 仙盟样式+仙盟可编程键盘;
    $cq.对话框().layer(未来之窗app_键盘body,{type:"frame",hidetitle:true,width:"400px",height:"auto",id:未来之窗app_键盘ID});
    $cq("#"+未来之窗app_键盘ID).css("border","none");

    // ===================== 核心判断：控件类型自动识别 =====================
	var isInput = false;
	var isAllianceEditor = false;
	if(options.editor){
		isAllianceEditor=true;
	}else{
		isInput = options.obj.tagName === "INPUT" || options.obj.tagName === "TEXTAREA";
	}
    var FairyAllianceEditor = null;
    if(isAllianceEditor) FairyAllianceEditor = options.editor;
    var 键盘值 = $cq("#仙盟创梦_可编程键盘_输入框").val();
    $cq("#仙盟创梦_可编程键盘_输入框").val(isInput ? options.obj.value : (isAllianceEditor ? FairyAllianceEditor.session.getValue() : ""));

    // ===================== ✨【核心新增+优化】遥控/鼠标双模式核心逻辑 开始✨ - 全量Chrome53兼容修复 ✨ =====================
    var 所有键盘按键 = [];
    var 当前选中索引 = 0;
    var 选中样式类 = "key-selected";
    var 遥控按键处理 = null; // 遥控事件函数，用于解绑
    
    // ★★★ 核心分支：只有【遥控模式开关=true】时，才初始化所有遥控相关逻辑
    if(遥控模式开关 === true){
        // 1. 获取所有可操作的键盘按钮，包含所有类型
        所有键盘按键 = $cq(".仙盟创梦-keypad, .仙盟创梦_样式_键盘").toArray();
        // 2. 初始化选中第一个按键，添加高亮边框
        $cq(所有键盘按键[当前选中索引]).addClass(选中样式类);

        // 核心：遥控按键处理函数 - 上下左右+确定+返回 全支持 - 【重点修复】Chrome53不支持数组find()，重写上下键核心逻辑
        遥控按键处理 = function(e) {
            var keyCode = e.keyCode;
            // 移除当前选中的样式
            $cq(所有键盘按键[当前选中索引]).removeClass(选中样式类);
            switch(keyCode) {
                case 37: // ← 左方向键 - 上一个按键
                    当前选中索引--;
                    break;
                case 39: // → 右方向键 - 下一个按键
                    当前选中索引++;
                    break;
                case 38: // ↑ 上方向键 - 向上切换（【兼容修复】替换ES6的find()，改用for循环实现，功能完全一致）
                    var 当前行长度 = 10;
                    var lenSum = 0;
                    for(var i=0;i<当前按键组.length;i++){
                        lenSum += 当前按键组[i].length;
                        if(lenSum > 当前选中索引){
                            当前行长度 = 当前按键组[i].length;
                            break;
                        }
                    }
                    当前选中索引 -= 当前行长度;
                    break;
                case 40: // ↓ 下方向键 - 向下切换（【兼容修复】替换ES6的find()，改用for循环实现，功能完全一致）
                    var 当前行长度2 = 10;
                    var lenSum2 = 0;
                    for(var j=0;j<当前按键组.length;j++){
                        lenSum2 += 当前按键组[j].length;
                        if(lenSum2 > 当前选中索引){
                            当前行长度2 = 当前按键组[j].length;
                            break;
                        }
                    }
                    当前选中索引 += 当前行长度2;
                    break;
                case 13: // ✅ 确定键(OK/回车) - 触发当前选中按键的点击事件
                    if(!$cq(所有键盘按键[当前选中索引]).prop("disabled")){
                        $cq(所有键盘按键[当前选中索引]).trigger("click");
                    }
                    break;
                case 27: // ❌ 返回键(Esc) - 关闭键盘弹窗+解绑事件
                    cyberwin_closeAndDeldlg(未来之窗app_键盘ID);
                    document.removeEventListener("keydown", 遥控按键处理);
                    break;
            }
            // 边界循环处理：索引超出范围时自动循环，永不卡死
            if(当前选中索引 < 0) 当前选中索引 = 所有键盘按键.length - 1;
            if(当前选中索引 >= 所有键盘按键.length) 当前选中索引 = 0;
            // 给新选中的按键添加高亮边框
            $cq(所有键盘按键[当前选中索引]).addClass(选中样式类);
            e.preventDefault();
        };
        // 绑定遥控按键事件到document，电视端必绑这里
        document.addEventListener("keydown", 遥控按键处理);
    }
    // ===================== ✨【核心新增+优化】遥控/鼠标双模式核心逻辑 结束✨ =====================

    // ===================== ✨ 核心核心：双录入模式 分支逻辑 ✨ - Chrome53兼容修复 =====================
    if(录入模式 == "宿主"){
        // ★★★ 模式1：宿主模式 - 直写原控件，光标精准插入，无中转 - 箭头函数→标准函数
        $cq(".仙盟创梦-keypad[data-key]").事件("click", function() {
            var 按键值 = $cq(this).attr("data-key");
            if(!按键值) return;
            if(isInput){
                var domObj = options.obj;
                domObj.focus();
                var start = domObj.selectionStart;
                var end = domObj.selectionEnd;
                domObj.value = domObj.value.substring(0, start) + 按键值 + domObj.value.substring(end);
                domObj.selectionStart = domObj.selectionEnd = start + 按键值.length;
            }else if(isAllianceEditor && FairyAllianceEditor){
                FairyAllianceEditor.focus();
                //FairyAllianceEditor.session.insert(FairyAllianceEditor.getCursorPosition(), 按键值);
				// 1. 你的原有插入逻辑（保留不变）
				//const cursorPos = FairyAllianceEditor.getCursorPosition();
				//FairyAllianceEditor.session.insert(cursorPos, 按键值);

				// 2. 插入后，手动触发「自动补全」核心代码 - 关键补全
				//FairyAllianceEditor.execCommand("startAutocomplete");
				FairyAllianceEditor.execCommand("insertstring", 按键值);

            }
        });
        $cq(".仙盟创梦_键盘_清空").事件("click", function() {
            if(isInput) options.obj.value = "";
            else if(isAllianceEditor && FairyAllianceEditor) FairyAllianceEditor.session.setValue("");
            if(isInput) options.obj.focus();
            else if(isAllianceEditor) FairyAllianceEditor.focus();
        });
        $cq(".仙盟创梦_键盘_退格").事件("click", function() {
            if(isInput){
                var domObj = options.obj;
                domObj.focus();
                var val = domObj.value;
                if (val == "0" || val == "") {
                    domObj.value = '';
                } else {
                    var last_value = val.substr(-2, 1);
                    if (last_value == '.') {
                        domObj.value = val.substr(0, val.length - 2);
                    } else {
                        var start = domObj.selectionStart;
                        if(start > 0){
                            domObj.value = val.substring(0, start - 1) + val.substring(domObj.selectionEnd);
                            domObj.selectionStart = domObj.selectionEnd = start - 1;
                        }
                    }
                }
            }else if(isAllianceEditor && FairyAllianceEditor){
                FairyAllianceEditor.focus();
                FairyAllianceEditor.execCommand("backspace");
            }
        });
    }else{
        // ★★★ 模式2：虚拟框模式 - 原版逻辑完整保留，先写入弹窗输入框，确认后回写宿主 - 箭头函数→标准函数
        $cq(".仙盟创梦-keypad[data-key]").事件("click", function() {
            var 按键值 = $cq(this).attr("data-key");
            if(!按键值) return;
            键盘值 = $cq("#仙盟创梦_可编程键盘_输入框").val();
            键盘值 += 按键值;
            $cq("#仙盟创梦_可编程键盘_输入框").val(键盘值);
        });
        $cq(".仙盟创梦_键盘_清空").事件("click", function() {
            键盘值 = "";
            $cq("#仙盟创梦_可编程键盘_输入框").val('');
        });
        $cq(".仙盟创梦_键盘_退格").事件("click", function() {
            键盘值 = $cq("#仙盟创梦_可编程键盘_输入框").val();
            if (键盘值 == "0" || 键盘值 == "") {
                $cq("#仙盟创梦_可编程键盘_输入框").val('');
            } else {
                var last_value = 键盘值.substr(-2, 1);
                if (last_value == '.') {
                    $cq("#仙盟创梦_可编程键盘_输入框").val(键盘值.substr(0, 键盘值.length - 2));
                } else {
                    $cq("#仙盟创梦_可编程键盘_输入框").val(键盘值.substr(0, 键盘值.length - 1));
                }
            }
        });
    }

    // ===================== 公共事件：关闭+确认 双模式通用 + 【新增】遥控事件解绑 =====================
    // 关闭按钮 - 原生关闭方法+【新增】遥控模式下解绑按键监听，防止内存泄漏
    $cq(".仙盟创梦_键盘_关闭").事件("click", function() {
        cyberwin_closeAndDeldlg(未来之窗app_键盘ID);
        if(遥控模式开关 === true && 遥控按键处理){
            document.removeEventListener("keydown", 遥控按键处理);
        }
    });

    // 确认按钮 - 双模式适配，完整保留原版逻辑
    $cq(".输入确定").事件("click", function() {
        var 最终值 = "";
        if(录入模式 == "虚拟框"){
            最终值 = $cq("#仙盟创梦_可编程键盘_输入框").val();
        }else{
            最终值 = isInput ? options.obj.value : (isAllianceEditor ? FairyAllianceEditor.session.getValue() : "");
        }
        if(最终值 == ""){
            alert("输入不能为空");
            return;
        }
        if(isInput) options.obj.value = 最终值;
        else if(isAllianceEditor && FairyAllianceEditor) FairyAllianceEditor.session.setValue(最终值);
        cyberwin_closeAndDeldlg(未来之窗app_键盘ID);
        $cq(options.obj).事件触发("change");
        // 确认后解绑遥控事件
        if(遥控模式开关 === true && 遥控按键处理){
            document.removeEventListener("keydown", 遥控按键处理);
        }
    });
};
//2026-01-10
//增加select元素的id以便区分不同的选择框
cyberwin_query.prototype.tradedata_table_render_header= function(headers){
      const that=this;
      let fa_content = '';
      headers.forEach(item => {
        // 严格匹配你的格式：40/90/100用style，60/100用原生width
        
          fa_content += `<th id="shopList_c1" style="width:${item.width}px;">${item.displayname}</th>\n\t\t`;
       
      });
       for(i=0;i<that.elements.length;i++){
                that.elements[i].innerHTML=fa_content;
        }
};

cyberwin_query.prototype.tradedata_table_render_body= function(headers,data){
     const that=this;
      
      // 2. 核心：拼接表格主体的多行<tr><td>数据 (新增核心逻辑)
    let fa_content = '';
    // 遍历二维json的每一行数据 data[i]
    if(data && data.length > 0){
        data.forEach(row => {
            // 每一行都生成一个<tr>
            let tdHtml = '';
            // 按headers的列顺序，遍历匹配当前行的对应字段值
            headers.forEach(item => {
                // 关键：row[item.fieldname] 用表头的fieldname匹配数据字段，值为空时显示空字符串防止undefind
                const cellValue = row[item.fieldname] || '';
                // 给每个<td>也加上和<th>一样的宽度，保证列对齐，样式统一
                tdHtml += `<td style="width:${item.width}px;">${cellValue}</td>\n\t\t\t`;
            });
            // 拼接当前行的完整<tr>
            fa_content += `<tr>\n\t\t\t${tdHtml}\n\t\t</tr>\n\t\t`;
        });
    }
      
       for(i=0;i<that.elements.length;i++){
                that.elements[i].innerHTML=fa_content;
        }
};
//仙盟追加刻印日志
/*
 let 日志卷轴 = document.getElementById("wlzc_sync_log");
        // 修仙主题配色：成功=道韵翠绿 失败=妖异赤红 提示=仙府青金
        let 字体颜色 = 刻印成功 ? "#79e696" : "#e67979"; 
        let 日志节点 = `<li style="padding:6px 12px;color:${字体颜色};border-bottom:1px dashed #2a3540;">${获取天地时辰()} ${日志内容}</li>`;
        // 核心：前置插入 - 新日志永远在最顶部，如宗门符箓卷宗排布一致
        日志卷轴.insertAdjacentHTML('afterbegin', 日志节点);
        // 自动滚动到顶部，保证最新日志可见，符箓卷宗置顶
        日志卷轴.scrollTop = 0;
        */
cyberwin_query.prototype.tradedata_task_putlog= function(prefix,message,success = true){
    const that=this;
   for(i=0;i<that.elements.length;i++){
          
        let taskloginstance = that.elements[i];
        let fontcolor = ""; 
        if(success == true){
            fontcolor ="#79e696";
        }else{
           fontcolor ="#e67979"; 
        }
        if(prefix == ""){
           prefix= $cq.系统_时间_当前("cn");
        }
        let tasklogone = `<li style="padding:6px 12px;color:${fontcolor};border-bottom:1px dashed #2a3540;">${prefix} ${message}</li>`;
        // 核心：前置插入 - 新日志永远在最顶部，如宗门符箓卷宗排布一致
        taskloginstance.insertAdjacentHTML('afterbegin', tasklogone);
        // 自动滚动到顶部，保证最新日志可见，符箓卷宗置顶
        taskloginstance.scrollTop = 0;
    }
};
//路由
cyberwin_query.prototype.数据_展示_头 = function(headers) {
    return this.tradedata_table_render_header(headers); 
};

cyberwin_query.prototype.数据_展示_数据 = function(headers,data) {
    return this.tradedata_table_render_body(headers,data); 
};
cyberwin_query.prototype.任务管理_进程明细 = function(prefix,message,success = true) {
    return this.tradedata_task_putlog(prefix,message,success); 
};

/**
 * 2026-01-25
 * contents() 方法：获取元素所有子节点（含文本节点、注释节点、iframe 内容文档）
 * @returns {cyberwin_query} 包含子节点的新 cyberwin_query 实例
 */
cyberwin_query.prototype.contents = function() {
    const childNodes = [];
    this.elements.forEach(element => {
        // 处理 iframe 元素：获取内部 document 子节点（同域限制）
        if (element.tagName === 'IFRAME') {
            try {
                const iframeDoc = element.contentDocument || element.contentWindow.document;
                if (iframeDoc) {
                    // 收集 iframe 内部所有子节点（html、head、body 等）
                    Array.from(iframeDoc.childNodes).forEach(node => {
                        childNodes.push(node);
                    });
                }
            } catch (e) {
                // 跨域时捕获异常，返回空节点集合
                console.warn('iframe 跨域无法访问内部内容:', e.message);
            }
        } else {
            // 普通元素：收集所有子节点（含文本、注释节点）
            Array.from(element.childNodes).forEach(node => {
                childNodes.push(node);
            });
        }
    });

    // 创建并返回新的 cyberwin_query 实例（保持链式调用）
    const newQuery = new cyberwin_query();
    newQuery.elements = childNodes;
    return newQuery;
};
cyberwin_query.prototype.childwindow = function() {
    return this.contents();
};
// 中文路由（可选，保持与其他方法命名风格一致）
cyberwin_query.prototype.子窗口集合 = function() {
    return this.contents();
};

cyberwin_query.prototype.childwindowinstance  = function() {
    //contentWindow
    const that=this;
    return  that.elements[0].contentWindow;
};

cyberwin_query.prototype.子窗口接口 = function() {
   const that=this;
    return  that.elements[0].contentWindow;
};

$cq.renderscript = function(Selector) {
    $cq(Selector).each(function() {
		  // 新建一个script标签，复制原脚本内容
		  const newScript = document.createElement("script");
		  // 复制原脚本的内容（确保函数定义完整）
		  newScript.textContent = this.textContent;
		  // 把新脚本插入body，触发同步执行（模拟document.write的执行逻辑）
		  document.body.appendChild(newScript);
		  // 执行后移除临时脚本标签（避免重复执行）
		  document.body.removeChild(newScript);
		});
}

$cq.渲染脚本 = function(Selector) {
    
 return $cq.renderscript(Selector);
}

//2026-01-28
 cyberwin_query.prototype.paysacan = function(title, description, confirmCallback,closeCallback) {
      return this.paysacan_2024inner(title, description,"text", confirmCallback,closeCallback);
 }
 
  cyberwin_query.prototype.paysacan_pwd = function(title, description, confirmCallback,closeCallback) {
      return this.paysacan_2024inner(title, description,"password", confirmCallback,closeCallback);
 }
 
  cyberwin_query.prototype.paysacan_date = function(title, description, confirmCallback,closeCallback) {
      return this.paysacan_2024inner(title, description,"date", confirmCallback,closeCallback);
 }
 
  cyberwin_query.prototype.paysacan_num = function(title, description, confirmCallback,closeCallback) {
      return this.paysacan_2024inner(title, description,"number", confirmCallback,closeCallback);
 }

//2025-01-31
//2025-10-23 sn 随机
 $cq.g_sn=function(options) {
     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < options; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};
//system_date_g_orderno
$cq.system_date_g_orderno = function(prefix,rndlength =0) {
     let 格式化当前时间="yyyyMMdd-hms";
      
      const now = new Date();
      const options_new = {date:now,str:格式化当前时间};
     var datastr = $cq.cyberwinformat_date(options_new); 
     var returnret="";
     
     if(rndlength > 0){
        returnret = prefix + datastr + $cq.g_sn(rndlength); 
     }else{
       returnret = prefix + datastr; 
     }
     
     return returnret;
};

cyberwin_query.prototype.system_date_g_orderno = function(prefix,rndlength =0) {
    const system_date_g_ordernoii = $cq.system_date_g_orderno(prefix,rndlength);
     for(i=0;i<this.elements.length;i++){
			//console.log("元素赋值",this.elements[i]);
           // this.elements[i].value=value;
            const targetElement = this.elements[i];
            const tagName = targetElement.tagName.toLowerCase(); // 统一转为小写，避免大小写问题
            if (tagName === 'input' || tagName === 'textarea') {
                // 对于表单输入框，直接设置value
                targetElement.value = system_date_g_ordernoii;
            } else {
                // 对于其他元素（如div、span、p等），设置文本内容
                // 使用textContent（推荐）而非innerText，兼容性和性能更好
                targetElement.textContent = system_date_g_ordernoii;
                // 如果需要支持HTML内容（慎用，有XSS风险），可改用：
                // targetElement.innerHTML = value;
            }
     }
}


cyberwin_query.prototype.system_date_now = function() {
    let 格式化当前时间="yyyy-MM-dd h:m";
      
      const now = new Date();
      const options_new = {date:now,str:格式化当前时间};
     var datastr = $cq.cyberwinformat_date(options_new); 
     
    
     for(i=0;i<this.elements.length;i++){
			//console.log("元素赋值",this.elements[i]);
           // this.elements[i].value=value;
            const targetElement = this.elements[i];
            const tagName = targetElement.tagName.toLowerCase(); // 统一转为小写，避免大小写问题
            if (tagName === 'input' || tagName === 'textarea') {
                // 对于表单输入框，直接设置value
                targetElement.value = datastr;
            } else {
                // 对于其他元素（如div、span、p等），设置文本内容
                // 使用textContent（推荐）而非innerText，兼容性和性能更好
                targetElement.textContent = datastr;
                // 如果需要支持HTML内容（慎用，有XSS风险），可改用：
                // targetElement.innerHTML = value;
            }
     }
}

//2026-02-05
//13. length
//常规属性 length
// 扩展获取常用属性的方法
//  获取元素
Object.defineProperty(cyberwin_query.prototype, 'me', {
    get: function() {
        if (this.elements.length === 0) return 0;
        return this.elements[0];
    }
});

  // 2. 改造后的占位符替换核心函数（支持指定选择器）
        /**
         * 替换指定区域内的占位符
         * @param {Object} data - 替换的数据源
         * @param {string} selector - CSS选择器（如#contractArea、.contract），默认document.body
         */
         
cyberwin_query.prototype.未来之窗_文档_模板渲染 = function(先知灵晶) {
     for(i=0;i<this.elements.length;i++){
		 
           const targetNode = this.elements[i];
             // 核心修改：把document.body改成targetNode（指定区域）
            const walker = document.createTreeWalker(
                targetNode,          // 关键修改：遍历指定区域的根节点
                NodeFilter.SHOW_TEXT,
                null,
                false
            );

            let currentNode;
            while (currentNode = walker.nextNode()) {
                let text = currentNode.textContent;
                for (const key in 先知灵晶) {
                    if (先知灵晶.hasOwnProperty(key)) {
                        const regex = new RegExp(`\\$${key}\\$`, 'g');
                        text = text.replace(regex, 先知灵晶[key]);
                    }
                }
                currentNode.textContent = text;
            }
           
       }
}



$cq.未来之窗_文档_模板渲染 = function(selector,先知灵晶) {
   
            // 根据选择器获取根节点
            const rootNode = document.querySelector(selector);
            // 如果没找到节点，默认用body，同时提示
            const targetNode = rootNode || document.body;
            if (!rootNode) {
                console.warn(`未找到选择器${selector}对应的节点，默认使用document.body`);
            }

            // 核心修改：把document.body改成targetNode（指定区域）
            const walker = document.createTreeWalker(
                targetNode,          // 关键修改：遍历指定区域的根节点
                NodeFilter.SHOW_TEXT,
                null,
                false
            );

            let currentNode;
            while (currentNode = walker.nextNode()) {
                let text = currentNode.textContent;
                for (const key in 先知灵晶) {
                    if (先知灵晶.hasOwnProperty(key)) {
                        const regex = new RegExp(`\\$${key}\\$`, 'g');
                        text = text.replace(regex, 先知灵晶[key]);
                    }
                }
                currentNode.textContent = text;
            }
}


//2026-02-06

     // 先定义外部依赖的变量（保持和原代码一致）
var 千丝冥缘_打印_counter = 0;
var 千丝冥缘_打印_modes = { iframe: "iframe", popup: "popup" };
var 千丝冥缘_打印_standards = { strict: "strict", loose: "loose", html5: "html5" };

var 千丝冥缘_打印_settings = {mode : "popup",popClose:false,extraCss:"",retainAttr:[],extraHead: '', popWd: 400,popHt:500}; // 全局配置，需和原代码保持一致

var 未来之窗_东方仙盟_千丝冥缘_打印 = {
    print: function (PAWindow) {
        var paWindow = PAWindow.win;

        // 原生JS替代$(document).ready
        function ready(callback) {
            if (PAWindow.doc.readyState === "complete" || PAWindow.doc.readyState === "interactive") {
                callback();
            } else {
                PAWindow.doc.addEventListener("DOMContentLoaded", callback);
            }
        }

        ready(function () {
            paWindow.focus();
            paWindow.print();

            if (千丝冥缘_打印_settings.mode == 千丝冥缘_打印_modes.popup && 千丝冥缘_打印_settings.popClose) {
                setTimeout(function () { paWindow.close(); }, 2000);
            }
        });
    },

    write: function (PADocument, ele) {
        PADocument.open();
        PADocument.write(
            未来之窗_东方仙盟_千丝冥缘_打印.docType() +
            "<html>" +
            未来之窗_东方仙盟_千丝冥缘_打印.getHead() +
            未来之窗_东方仙盟_千丝冥缘_打印.getBody(ele) +
            "</html>"
        );
        PADocument.close();
    },

    docType: function () {
        if (千丝冥缘_打印_settings.mode == 千丝冥缘_打印_modes.iframe) return "";

        if (千丝冥缘_打印_settings.standard == 千丝冥缘_打印_standards.html5) return "<!DOCTYPE html>";

        var transitional = 千丝冥缘_打印_settings.standard == 千丝冥缘_打印_standards.loose ? " Transitional" : "";
        var dtd = 千丝冥缘_打印_settings.standard == 千丝冥缘_打印_standards.loose ? "loose" : "strict";

        return '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01' + transitional + '//EN" "http://www.w3.org/TR/html4/' + dtd + '.dtd">';
    },

    getHead: function () {
        var extraHead = "";
        var links = "";

        // 处理额外头部元素
        if (千丝冥缘_打印_settings.extraHead) {
            千丝冥缘_打印_settings.extraHead.replace(/([^,]+)/g, function (m) { extraHead += m; });
        }

        // 原生JS替代jQuery查找link标签
        var linkElements = document.getElementsByTagName("link");
        for (var i = 0; i < linkElements.length; i++) {
            var link = linkElements[i];
            // 过滤rel="stylesheet"的标签
            var relAttr = link.getAttribute("rel");
            if (relAttr === null || relAttr.toLowerCase() !== "stylesheet") continue;

            // 过滤media属性
            var mediaAttr = link.getAttribute("media");
            if (mediaAttr !== null && mediaAttr !== "" && mediaAttr.toLowerCase() !== "print" && mediaAttr.toLowerCase() !== "all") continue;

            // 拼接样式链接
            links += '<link type="text/css" rel="stylesheet" href="' + link.getAttribute("href") + '" >';
        }

        // 处理额外CSS
        if (千丝冥缘_打印_settings.extraCss) {
            千丝冥缘_打印_settings.extraCss.replace(/([^,\s]+)/g, function (m) {
                links += '<link type="text/css" rel="stylesheet" href="' + m + '">';
            });
        }

        return "<head><title>" + 千丝冥缘_打印_settings.popTitle + "</title>" + extraHead + links + "</head>";
    },

    getBody: function (element) {
        var htm = "";
        var attrs = 千丝冥缘_打印_settings.retainAttr;
        
        // 处理单个元素（原jQuery each 针对调用的元素）
        var ele = 未来之窗_东方仙盟_千丝冥缘_打印.getFormData(element);
        var attributes = "";
        
        // 拼接保留的属性
        for (var x = 0; x < attrs.length; x++) {
            var eleAttr = ele.getAttribute(attrs[x]);
            if (eleAttr) {
                attributes += (attributes.length > 0 ? " " : "") + attrs[x] + "='" + eleAttr + "'";
            }
        }

        // 拼接元素内容
        htm += '<div ' + attributes + '>' + ele.innerHTML + '</div>';

        return "<body>" + htm + "</body>";
    },

    getFormData: function (ele) {
        // 原生JS克隆元素
        var copy = ele.cloneNode(true);
        var originalInputs = ele.querySelectorAll("input,select,textarea");
        var copiedInputs = copy.querySelectorAll("input,select,textarea");

        // 遍历表单元素同步值
        for (var i = 0; i < originalInputs.length; i++) {
            var original = originalInputs[i];
            var copied = copiedInputs[i];
            var typeInput = original.getAttribute("type");

            // 处理类型判断
            if (typeInput === null) {
                if (original.tagName.toLowerCase() === "select") {
                    typeInput = "select";
                } else if (original.tagName.toLowerCase() === "textarea") {
                    typeInput = "textarea";
                } else {
                    typeInput = "";
                }
            }

            // 同步表单值
            if (typeInput == "radio" || typeInput == "checkbox") {
                copied.checked = original.checked;
            } else if (typeInput == "text" || typeInput == "password" || typeInput == "hidden") {
                copied.value = original.value;
            } else if (typeInput == "select") {
                var originalOptions = original.options;
                var copiedOptions = copied.options;
                for (var j = 0; j < originalOptions.length; j++) {
                    if (originalOptions[j].selected) {
                        copiedOptions[j].selected = true;
                    }
                }
            } else if (typeInput == "textarea") {
                copied.textContent = original.value;
            }
        }

        return copy;
    },

    getPrintWindow: function () {
        switch (千丝冥缘_打印_settings.mode) {
            case 千丝冥缘_打印_modes.iframe:
                var f = new 未来之窗_东方仙盟_千丝冥缘_打印.Iframe();
                return { win: f.contentWindow || f, doc: f.doc };
            case 千丝冥缘_打印_modes.popup:
                var p = new 未来之窗_东方仙盟_千丝冥缘_打印.Popup();
                return { win: p, doc: p.doc };
        }
    },

    Iframe: function () {
        var frameId = 千丝冥缘_打印_settings.id;
        var iframeStyle = 'border:0;position:absolute;width:0px;height:0px;right:0px;top:0px;';
        var iframe;

        try {
            iframe = document.createElement('iframe');
            document.body.appendChild(iframe);
            
            // 原生JS设置属性
            iframe.style.cssText = iframeStyle;
            iframe.id = frameId;
            iframe.src = "#" + new Date().getTime();
            
            iframe.doc = null;
            iframe.doc = iframe.contentDocument ? iframe.contentDocument : (iframe.contentWindow ? iframe.contentWindow.document : iframe.document);
        } catch (e) {
            throw e + ". iframes may not be supported in this browser.";
        }

        if (iframe.doc == null) throw "Cannot find document.";

        return iframe;
    },

    Popup: function () {
        var windowAttr = "location=yes,statusbar=no,directories=no,menubar=no,titlebar=no,toolbar=no,dependent=no";
        windowAttr += ",width=" + 千丝冥缘_打印_settings.popWd + ",height=" + 千丝冥缘_打印_settings.popHt;
        windowAttr += ",resizable=yes,screenX=" + 千丝冥缘_打印_settings.popX + ",screenY=" + 千丝冥缘_打印_settings.popY + ",personalbar=no,scrollbars=yes";

        var newWin = window.open("", "_blank", windowAttr);
        newWin.doc = newWin.document;

        return newWin;
    }

 };

$cq.东方仙盟_千丝冥缘_打印 = function(selector , options )
    {
      
         
    
     /*
    var defaults = { mode       : 千丝冥缘_打印_modes.iframe,
                     standard   : 千丝冥缘_打印_standards.html5,
                     popHt      : 500,
                     popWd      : 400,
                     popX       : 200,
                     popY       : 200,
                     popTitle   : '',
                     popClose   : false,
                     extraCss   : '',
                     extraHead  : '',
                     retainAttr : ["id","class","style"] };
           */          
      //  $.extend( settings, defaults, options );

        千丝冥缘_打印_counter++;
        var idPrefix = "printArea_";
        $cq( "[id^=" + idPrefix + "]" ).remove();

        千丝冥缘_打印_settings.id = idPrefix + 千丝冥缘_打印_counter;

      //  var $printSource = $(this);

      //  var 东方仙盟_传送 = 未来之窗_东方仙盟_千丝冥缘_打印.getPrintWindow();

       // 未来之窗_东方仙盟_千丝冥缘_打印.write( 东方仙盟_传送.doc, $printSource );

        //setTimeout( function () { 未来之窗_东方仙盟_千丝冥缘_打印.print( 东方仙盟_传送 ); }, 1000 );
        
        
        if (options.mode) 千丝冥缘_打印_settings.mode=options.mode;
        
        
        if (options.popClose) 千丝冥缘_打印_settings.popClose=options.popClose;
        if (options.retainAttr) 千丝冥缘_打印_settings.retainAttr=options.retainAttr;
        if (options.popHt) 千丝冥缘_打印_settings.popHt=options.popHt;
        if (options.popWd) 千丝冥缘_打印_settings.popWd=options.popWd;
        if (options.extraCss) 千丝冥缘_打印_settings.extraCss=options.extraCss;
        if (options.extraHead) 千丝冥缘_打印_settings.extraHead=options.extraHead;
    
        
       
    
   
   
        // 2. 获取要打印的元素
        
            var printSource = document.querySelector(selector);
            
            // 3. 调用打印逻辑
            var 东方仙盟_传送 = 未来之窗_东方仙盟_千丝冥缘_打印.getPrintWindow();
            未来之窗_东方仙盟_千丝冥缘_打印.write(东方仙盟_传送.doc, printSource);
            setTimeout(function () {
                未来之窗_东方仙盟_千丝冥缘_打印.print(东方仙盟_传送);
            }, 1000);
    };

cyberwin_query.prototype.东方仙盟_千丝冥缘_打印 = function(options) {
    // for(i=0;i<this.elements.length;i++){
	 
           
       千丝冥缘_打印_counter++;
        var idPrefix = "printArea_";
        $cq( "[id^=" + idPrefix + "]" ).remove();

        千丝冥缘_打印_settings.id = idPrefix + 千丝冥缘_打印_counter;

     
        
        if (options.mode) 千丝冥缘_打印_settings.mode=options.mode;
        
        
        if (options.popClose) 千丝冥缘_打印_settings.popClose=options.popClose;
        if (options.retainAttr) 千丝冥缘_打印_settings.retainAttr=options.retainAttr;
        if (options.popHt) 千丝冥缘_打印_settings.popHt=options.popHt;
        if (options.popWd) 千丝冥缘_打印_settings.popWd=options.popWd;
        if (options.extraCss) 千丝冥缘_打印_settings.extraCss=options.extraCss;
        if (options.extraHead) 千丝冥缘_打印_settings.extraHead=options.extraHead;
    
        
       
    
   
   
        // 2. 获取要打印的元素
        
            var printSource = this.elements[0];
            
            // 3. 调用打印逻辑
            var 东方仙盟_传送 = 未来之窗_东方仙盟_千丝冥缘_打印.getPrintWindow();
            未来之窗_东方仙盟_千丝冥缘_打印.write(东方仙盟_传送.doc, printSource);
            setTimeout(function () {
                未来之窗_东方仙盟_千丝冥缘_打印.print(东方仙盟_传送);
            }, 1000);
}

//2026-02-07
cyberwin_query.prototype.未来之窗_文档_模板渲染高级 = function(先知灵晶, mode = "one", prefix = '') {
    // 正则特殊字符转义函数（处理 . * + ? ^ $ [ ] ( ) { } | \ 等）
    function escapeRegExp(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    for(let i = 0; i < this.elements.length; i++) { // 修复：i 声明为 let 避免全局污染
        const targetNode = this.elements[i];
        // 核心修改：把document.body改成targetNode（指定区域）
        const walker = document.createTreeWalker(
            targetNode,          // 关键修改：遍历指定区域的根节点
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        let currentNode;
        while (currentNode = walker.nextNode()) {
            let text = currentNode.textContent;

            if (mode === "one") {
                // one模式：支持prefix参数，prefix为空则匹配$key$，不为空则匹配$prefix.key$
                for (const key in 先知灵晶) {
                    if (先知灵晶.hasOwnProperty(key)) {
                        let regex;
                        const escapedKey = escapeRegExp(key);
                        if (prefix) {
                            // 有prefix时：匹配 $前缀.key$ 格式
                            const escapedPrefix = escapeRegExp(prefix);
                            regex = new RegExp(`\\$${escapedPrefix}\\.${escapedKey}\\$`, 'g');
                        } else {
                            // 无prefix时：兼容原有逻辑，匹配 $key$ 格式
                            regex = new RegExp(`\\$${escapedKey}\\$`, 'g');
                        }
                        text = text.replace(regex, 先知灵晶[key]);
                    }
                }
            } else if (mode === "com") {
                // com模式：忽略prefix参数，保持原有多层级替换逻辑
                for (const prefix in 先知灵晶) { // 此处变量名不冲突，仅作为遍历外层key
                    if (先知灵晶.hasOwnProperty(prefix) && typeof 先知灵晶[prefix] === 'object') {
                        const subObj = 先知灵晶[prefix];
                        for (const key in subObj) {
                            if (subObj.hasOwnProperty(key)) {
                                // 转义前缀和key中的特殊字符
                                const escapedPrefix = escapeRegExp(prefix);
                                const escapedKey = escapeRegExp(key);
                                // 匹配 $前缀.key$ 格式
                                const regex = new RegExp(`\\$${escapedPrefix}\\.${escapedKey}\\$`, 'g');
                                text = text.replace(regex, subObj[key]);
                            }
                        }
                    }
                }
            }

            currentNode.textContent = text;
        }
    }
};
$cq.未来之窗_文档_模板渲染高级 = function(selector,先知灵晶, mode = "one", prefix = '') {
    return $cq(selector).未来之窗_文档_模板渲染高级(先知灵晶,mode,prefix);
}


//2025-09-06
//2026-02-10
//读取电子秤数据
$cq.未来之窗_智能IOT_读取电子秤高级 = function(options,versiontype) {
    if(versiontype == "iot"){
          const 端口 = options;
          const param1="CyberPHP->Param:actionCyberPHP->Value:electronicscale_ReverseGetweightv2025CyberPHP->Param:portNameCyberPHP->Value:"+端口+"CyberPHP->Param:baudRateCyberPHP->Value:9600CyberPHP->Param:titleCyberPHP->Value:未来之窗IOT";
               // alert(param1);
                const electronicvalue = CyberWin_JsStandardPlug.cyberwinapp_aiot("ectronicscale_ReverseGetweightv2025",param1,"");
          return electronicvalue;
    } 
    if(versiontype == "2015"){
        return CyberWin_JsStandardPlug.cwpd_communicationelectronicscale_getweight(options);
    }
                
    return CyberWin_JsStandardPlug.cwpd_communicationelectronicscale_getweight(options);
};

// 第一步：扩展String原型，兼容padStart方法（适配Chrome 53）
if (!String.prototype.padStart) {
  String.prototype.padStart = function(targetLength, padChar) {
    // 处理参数：targetLength默认0，padChar默认' '（和原生行为一致）
    targetLength = targetLength >> 0; // 转为整数
    padChar = (typeof padChar !== 'undefined') ? String(padChar) : ' ';
    
    // 如果当前字符串长度 >= 目标长度，直接返回原字符串
    if (this.length >= targetLength) {
      return String(this);
    }
    
    // 计算需要补充的字符数，拼接后返回
    targetLength = targetLength - this.length;
    if (targetLength > padChar.length) {
      // 如果补全字符长度不够，重复拼接（比如padChar是'0'，需要补5个就变成'00000'）
      padChar += padChar.repeat(targetLength / padChar.length);
    }
    return padChar.slice(0, targetLength) + String(this);
  };
}

//2026-02-13 前台行为日志
var FAMS_BehaviorMonitor_LogViewer = (function() {
    
    // // 内部私有变量，全部带 famsm26_ 前缀
	var famsm26_selector_contentbody = '#未来之窗_修仙_listtable';
    var famsm26_selector_appnameFilter = '#fams_bml_appnameFilter';
    var famsm26_selector_storeIdFilter = '#fams_bml_storeIdFilter';
    var famsm26_selector_startTime = '#fams_bml_startTime'; 
    var famsm26_selector_endTime = '#fams_bml_endTime';
    
    var famsm26_selector_search = '#fams_bml_search';
    var famsm26_selector_refresh = '#fams_bml_refresh';
    var famsm26_selector_clear = '#fams_bml_clear';

    

  // 格式化时间戳为易读格式
  function formatTime(ts) {
    if (!ts) return '-';
    var d = new Date(ts);
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, '0');
    var d_ = String(d.getDate()).padStart(2, '0');
    var h = String(d.getHours()).padStart(2, '0');
    var i = String(d.getMinutes()).padStart(2, '0');
    var s = String(d.getSeconds()).padStart(2, '0');
    var ms = String(d.getMilliseconds()).padStart(3, '0');
    return y + '-' + m + '-' + d_ + ' ' + h + ':' + i + ':' + s + '.' + ms;
  }

  // 从LocalStorage获取日志
  /**
 * 从本地存储读取行为日志
 * @returns {Array} 日志数组（解析失败/无数据时返回空数组）
 */
    function getLogs() {
      // 定义常量存储localStorage的key，便于维护和修改
      const LOG_STORAGE_KEY = 'famsm26_behavior_logs';
      
      try {
        // 1. 先检查localStorage是否可用（避免隐私模式/禁用场景报错）
        if (typeof localStorage === 'undefined') {
          console.warn('本地存储(localStorage)不可用，无法读取日志');
          return [];
        }
    
        // 2. 读取存储值
        const logStr = localStorage.getItem(LOG_STORAGE_KEY);
        
        // 3. 空值判断（null/空字符串都返回空数组）
        if (!logStr) {
          return [];
        }
    
        // 4. 解析JSON，增加更细致的异常提示
        const logData = JSON.parse(logStr);
        
        // 5. 校验解析结果是否为数组，非数组则返回空数组
        if (!Array.isArray(logData)) {
          console.warn('日志数据格式异常：预期是数组，实际是', typeof logData);
          return [];
        }
    
        return logData;
      } catch (e) {
        // 分类打印异常，便于定位问题
        if (e instanceof SyntaxError) {
          console.error('日志JSON解析失败（格式错误）：', e);
        } else {
          console.error('读取日志时发生未知错误：', e);
        }
        return [];
      }
    }
  // 清空日志
  function clearLogs() {
    try {
      localStorage.removeItem('famsm26_behavior_logs');
      return true;
    } catch (e) {
      console.error('清空日志失败：', e);
      return false;
    }
  }
  
   function escapeHtml(unsafe) {
      // 兼容null/undefined/-等特殊值，避免转义出错
      if (unsafe === undefined || unsafe === null || unsafe === '-') {
        return unsafe;
      }
      // 转义HTML特殊字符，防止XSS攻击
      return String(unsafe)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

  // 渲染日志表格
  function render() {
    // 获取筛选条件
    
    
    
           
   var appnameKeyword = $cq(famsm26_selector_appnameFilter).val().trim().toLowerCase();
   var storeIdKeyword = $cq(famsm26_selector_storeIdFilter).val().trim().toLowerCase();
   var startTimeStr = $cq(famsm26_selector_startTime).val();
   var endTimeStr = $cq(famsm26_selector_endTime).val();
           
    
    // 转换时间筛选条件为时间戳
    
    
    // 优化后的兼容写法（适配 Chrome 53 及更低版本）
        var minTs = 0;
        if (startTimeStr) {
          var startDate = new Date(startTimeStr);
          // 避免无效日期字符串导致 getTime() 返回 NaN
           minTs = !isNaN(startDate.getTime()) ? startDate.getTime() : 0;
        }
        
        var maxTs = Infinity;
        if (endTimeStr) {
          var endDate = new Date(endTimeStr);
          maxTs = !isNaN(endDate.getTime()) ? endDate.getTime() : Infinity;
        }
    
    // 获取并排序日志（时间倒序）
        var logs = getLogs();
        var sortedLogs = logs.sort(function(a, b) {
          return b.ts - a.ts;
        });
    
    // 多条件筛选
    var filteredLogs = sortedLogs.filter(function(item) {
      // 时间筛选
      if (item.ts < minTs || item.ts > maxTs) return false;
      
      // App名称筛选（忽略大小写）
      var appname = (item.appname || '').toLowerCase();
      if (appnameKeyword && !appname.includes(appnameKeyword)) return false;
      
      // 店铺ID筛选（忽略大小写）
      var storeId = (item.store_id || '').toLowerCase();
      if (storeIdKeyword && !storeId.includes(storeIdKeyword)) return false;
      
      return true;
    });
    
    // 生成表格HTML
    
    
    // 1. 封装XSS转义函数（解决安全风险，兼容所有场景）
   

// 2. 初始化HTML变量（用let替代var，符合现代规范）
    let html = '';

// 3. 空数据判断 + 日志拼接逻辑
        if (filteredLogs.length === 0) {
          html = '<tr><td colspan="7" class="empty">暂无符合条件的日志数据</td></tr>';
        } else {
          filteredLogs.forEach(function(item, index) {
            // 外层try-catch：避免单条日志处理失败导致整体中断
            try {
              // 基础字段处理 + XSS转义
              var time = escapeHtml(formatTime(item.ts));
              var appname = escapeHtml(item.appname || '-');
              var storeId = escapeHtml(item.store_id || '-');
              var type = escapeHtml(item.type || '-');
              var code = escapeHtml(item.code || '-');
              var message = escapeHtml(item.message || '-');
              
              // 处理JSON数据：单独捕获序列化异常
              var dataStr = '{}';
              if (item.data) {
                try {
                  dataStr = JSON.stringify(item.data, null, 2);
                } catch (e) {
                  console.warn('第' + (index + 1) + '条日志数据序列化失败', e);
                  dataStr = '数据格式异常：' + String(item.data);
                }
              }
              // 对JSON结果也做XSS转义
              dataStr = escapeHtml(dataStr);
        
              // 拼接行HTML（Chrome 53支持模板字符串，若不放心可换回+拼接）
              /*
              html += `
                <tr>
                  <td>${time}</td>
                  <td class="appname">${appname}</td>
                  <td class="store-id">${storeId}</td>
                  <td>${type}</td>
                  <td class="code">${code}</td>
                  <td class="msg">${message}</td>
                  <td class="data">${dataStr}</td>
                </tr>
              `;
              */
                // 【关键修复】替换模板字符串为传统拼接，适配Chrome 53
                  html += '<tr>' +
                    '<td>' + time + '</td>' +
                    '<td class="appname">' + appname + '</td>' +
                    '<td class="store-id">' + storeId + '</td>' +
                    '<td>' + type + '</td>' +
                    '<td class="code">' + code + '</td>' +
                    '<td class="msg">' + message + '</td>' +
                    '<td class="data" style="cursor: pointer;" onclick="$cq.未来之窗_AI_操作系统_复制(this);" >' + dataStr + '</td>' +
                  '</tr>';
            } catch (error) {
              // 单条日志处理失败时，渲染错误提示行，不影响其他日志
                // 【优化】增强错误信息，打印完整错误对象（包括堆栈）
                    var errorMsg = '处理第' + (index + 1) + '条日志失败: ' + (error.message || error.toString());
                      console.error(errorMsg, error.stack || error);
              html += '<tr><td colspan="7" class="error">第' + (index + 1) + '条日志解析失败</td></tr>';
            }
          });
        }
    
    
      $cq(famsm26_selector_contentbody).html(html);
    
  }

  // 初始化事件绑定
  function init(options) {
      
      if(options.body){
          famsm26_selector_contentbody = options.body;
      }
      if(options.appname){
          famsm26_selector_appnameFilter = options.appname;
      }
      if(options.storeid){
          famsm26_selector_storeIdFilter = options.storeid;
      }
      if(options.start){
          famsm26_selector_startTime = options.start;
      }
      if(options.end){
          famsm26_selector_endTime = options.end;
      }
       if(options.search){
          famsm26_selector_search = options.search;
      }
       if(options.refresh){
          famsm26_selector_refresh = options.refresh;
      }
       if(options.clear){
          famsm26_selector_clear = options.clear;
      }
      
      //未来之窗赋值
       // 筛选按钮
       
      	$cq(famsm26_selector_search).click(function(){
      	    render();
      	});
      	
      	// 刷新按钮
      	$cq(famsm26_selector_refresh).click(function(){
      	    
      // 清空筛选条件
           $cq(famsm26_selector_appnameFilter).val('');
           $cq(famsm26_selector_storeIdFilter).val('');
           $cq(famsm26_selector_startTime).val('');
           render();
    
      	});
        // 清空按钮（带确认）	
      	$cq(famsm26_selector_clear).click(function(){
      	   
              if (confirm(' 确定要清空所有行为日志吗？此操作不可恢复！')) {
                var success = clearLogs();
                if (success) {
                  alert('日志已成功清空');
                  render();
                } else {
                  alert('清空日志失败，请检查浏览器权限');
                }
              }
    
      	});
       
   
    
    // 支持按Enter键触发筛选
    
    
    // 初始渲染
    render();
  }

  return { init: init };
})();


//2026-02-13
// 兼容低版本，严格 ES5

//2026-02-13
// 兼容低版本，严格 ES5，收银台行为监控最终版
 var famsm26_enable_iframe = false;      // 是否监听iframe
 var famsm26_globalConfig ={}; 
 
var FAMS_BehaviorMonitor = (function() {
  // ======================== 核心私有变量 ========================
  var famsm26_appname = '';
  var famsm26_store_id = '';
  var famsm26_last_click_time = 0;
  var famsm26_click_count = 0;
  var famsm26_click_timer = null;
  var famsm26_last_key = '';
  var famsm26_key_repeat_count = 0;
  var famsm26_key_start_time = 0;
  var famsm26_log_max_count = 100; // 日志最大条数

  // ======================== 配置相关变量 ========================
  // 1. 内置强制排除选择器（底线，永远生效）  
  var famsm26_builtin_exclude = '#auth_code, .auth_code, .wechat-pay-input, .password-input, [type=password]';
  // 2. 可配置变量
  var famsm26_watch_input = false;        // 是否监控输入框
  var famsm26_input_max_length = 10;      // 输入框超长阈值
  var famsm26_exclude_selectors = '';     // 外部自定义排除
  //var famsm26_enable_iframe = false;      // 是否监听iframe

  // ======================== 静态全局配置（供iframe继承） ========================
  var globalConfig = {
    storeId: '',
    appname: '',
    watchInput: false,
    inputMaxLength: 10,
    excludeSelectors: '',
    enableIframe: false
  };

  // ======================== 工具函数 ========================
  // 兼容获取时间戳（替代Date.now()）
  function getNowTimestamp() {
    return new Date().getTime();
  }

  // 检查localStorage是否可用
  function isLocalStorageAvailable() {
    try {
      var testKey = 'famsm26_test';
      if (typeof localStorage === 'undefined') return false;
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  // 判断元素是否在排除列表（内置+外部叠加）
  function isExcludedElement(target) {
    if (!target) return false;
    // 合并排除列表：内置 + 外部
    var allExclude = (famsm26_builtin_exclude + ',' + famsm26_exclude_selectors).replace(/,,/g, ',').trim();
    if (!allExclude) return false;

    try {
      var list = allExclude.split(',');
      for (var i = 0; i < list.length; i++) {
        var sel = list[i].trim();
        if (!sel) continue;
        if (target.matches(sel)) {
          return true;
        }
      }
    } catch (e) {}
    return false;
  }

  // 检查输入框长度（排除的不检测）
  function checkInputLength(target) {
    if (!target || !famsm26_watch_input || isExcludedElement(target)) return false;
    var value = target.value || '';
    return value.length > famsm26_input_max_length;
  }

  // 判断iframe是否同域（核心：try/catch）
  function isSameDomainIframe(iframe) {
    try {
      var doc = iframe.contentWindow.document;
      return !!doc;
    } catch (e) {
      return false;
    }
  }

  // 注入监控到iframe（架构级调用）
  function injectMonitorToIframe_waste(iframe) {
    // 开关关闭/非iframe/跨域 → 直接退出
    if (!famsm26_enable_iframe || !iframe || !isSameDomainIframe(iframe)) return;

    try {
      var win = iframe.contentWindow;
      // 把类和全局配置传给iframe
      win.FAMS_BehaviorMonitor = FAMS_BehaviorMonitor;
      win.famsm_global_config = globalConfig;
      // 在iframe内启动监控（自动继承全局配置）
      win.eval(`
        var monitor = new FAMS_BehaviorMonitor();
        monitor.start();
      `);
      console.log('[FAMS] iframe监控已自动注入');
    } catch (e) {
      console.error('[FAMS] iframe监控注入失败：', e);
    }
  }
  
  function injectMonitorToIframe(iframe) {
    // 开关关闭/非iframe/跨域 → 直接退出
    if (!famsm26_enable_iframe || !iframe || !isSameDomainIframe(iframe)) return;

    try {
      var win = iframe.contentWindow;
      // 把类和全局配置传给iframe
      win.FAMS_BehaviorMonitor = FAMS_BehaviorMonitor;
      win.famsm_global_config = globalConfig;

      // 替代eval的安全写法：直接在iframe的window上定义并执行初始化逻辑
      // 定义初始化函数
      win.initFAMSMonitor = function() {
        var monitor = new win.FAMS_BehaviorMonitor();
        monitor.start();
        return monitor; // 可选：返回monitor实例，方便后续操作
      };
      // 执行初始化函数
      win.initFAMSMonitor();
      // 可选：执行完后删除临时函数，避免污染iframe的window对象
      delete win.initFAMSMonitor;

      console.log('[FAMS] iframe监控已自动注入');
    } catch (e) {
      console.error('[FAMS] iframe监控注入失败：', e);
    }
}

  // ======================== 构造函数（支持双格式传参） ========================
  function FAMS_BehaviorMonitor() {
    // 解析参数：支持 无参/对象/旧格式(storeId,appname,config)
    var args = arguments;
    var cfg = {};

    // 情况1：传对象参数（新格式）
    if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null) {
      cfg = args[0];
      famsm26_globalConfig = cfg ;
    }
    // 情况2：旧格式参数（storeId,appname,config）
    else if (args.length >= 1) {
      cfg.storeId = args[0] || '';
      cfg.appname = args[1] || '';
      cfg = args[2] ? extend(cfg, args[2]) : cfg;
    }
    // 情况3：无参 → 用全局配置
    else {
      cfg = extend({}, globalConfig);
    }

    // 更新实例变量 + 全局配置
    famsm26_store_id = cfg.storeId || globalConfig.storeId;
    famsm26_appname = cfg.appname || globalConfig.appname;
    famsm26_watch_input = typeof cfg.watchInput === 'boolean' ? cfg.watchInput : globalConfig.watchInput;
    famsm26_input_max_length = typeof cfg.inputMaxLength === 'number' ? cfg.inputMaxLength : globalConfig.inputMaxLength;
    famsm26_exclude_selectors = cfg.excludeSelectors || globalConfig.excludeSelectors;
    famsm26_enable_iframe = typeof cfg.enableIframe === 'boolean' ? cfg.enableIframe : globalConfig.enableIframe;

    // 同步更新全局配置（传参则覆盖全局）
    if (args.length > 0) {
      globalConfig = extend(globalConfig, {
        storeId: famsm26_store_id,
        appname: famsm26_appname,
        watchInput: famsm26_watch_input,
        inputMaxLength: famsm26_input_max_length,
        excludeSelectors: famsm26_exclude_selectors,
        enableIframe: famsm26_enable_iframe
      });
    }
  }

  // ES5兼容的对象合并（浅拷贝）
  function extend(target, source) {
    target = target || {};
    if (source) {
      for (var key in source) {
        if (source.hasOwnProperty(key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  }

  // ======================== 核心方法：启动监控 ========================
  FAMS_BehaviorMonitor.prototype.start = function() {
    var self = this;

    // 1. 监听点击事件（连击/双击/狂点）
    if (document.addEventListener) {
      document.addEventListener('click', function(e) {
        self._famsm26_handleClick(e);
      }, true);

      // 2. 监听键盘事件（异常按键/长按）
      document.addEventListener('keydown', function(e) {
        self._famsm26_handleKeyDown(e);
      });

      // 3. 监听输入框（超长检测，仅开启时）
      if (famsm26_watch_input) {
        document.addEventListener('input', function(e) {
          self._famsm26_handleInput(e);
        });
      }

      // 4. 暴露iframe注入方法（供架构调用）
      //window.injectFamsMonitorToIframe = injectMonitorToIframe;
    }

    console.log('[FAMS] 行为监控已启动 | 店铺：%s | 应用：%s', famsm26_store_id, famsm26_appname);
    console.log('[FAMS] 配置：输入框监控=%s | 超长阈值=%s位 | iframe监控=%s', 
      famsm26_watch_input, famsm26_input_max_length, famsm26_enable_iframe);
  };

  // ======================== 事件处理：点击 ========================
  FAMS_BehaviorMonitor.prototype._famsm26_handleClick = function(e) {
    var now = getNowTimestamp();
    var interval = now - famsm26_last_click_time;
    var that = this;

    if (interval < 300) {
      famsm26_click_count++;
    } else {
      famsm26_click_count = 1;
    }

    famsm26_last_click_time = now;
    clearTimeout(famsm26_click_timer);

    famsm26_click_timer = setTimeout(function() {
      var type = 'click';
      var code = '1001';
      var message = '单击';

      if (famsm26_click_count === 2) {
        code = '2001';
        message = '双击';
      } else if (famsm26_click_count >= 3) {
        code = '2002';
        message = '连续点击（异常狂点）';
      }

      that._famsm26_addLog({
        type: type,
        code: code,
        message: message,
        data: {
          count: famsm26_click_count,
          interval: interval,
          target: e.target ? (e.target.innerText || e.target.id || e.target.tagName) : ''
        }
      });
    }, 250);
  };

  // ======================== 事件处理：键盘 ========================
  FAMS_BehaviorMonitor.prototype._famsm26_handleKeyDown = function(e) {
    var key = e.key;
    var now = getNowTimestamp();

    // 排除列表优先级最高
    if (isExcludedElement(e.target)) return;

    // 未开启输入框监控 → 过滤输入框内操作
    if (!famsm26_watch_input) {
      var tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) {
        return;
      }
    }

    var isControlKey = key === 'Control' || key === 'Shift' || key === 'Alt' || key === 'Meta';

    if (key === famsm26_last_key) {
      famsm26_key_repeat_count++;
    } else {
      famsm26_last_key = key;
      famsm26_key_repeat_count = 1;
      famsm26_key_start_time = now;
    }

    var duration = now - famsm26_key_start_time;

    // 异常判定：长按控制键 或 同一字符连续输出
    if ((isControlKey && duration > 800) || famsm26_key_repeat_count > 8) {
      this._famsm26_addLog({
        type: 'keyboard',
        code: '3001',
        message: '检测到异常按键（疑似异物压住）',
        data: {
          key: key,
          repeat: famsm26_key_repeat_count,
          duration: duration,
          isInput: (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')
        }
      });
    }
  };

  // ======================== 事件处理：输入框超长 ========================
  FAMS_BehaviorMonitor.prototype._famsm26_handleInput = function(e) {
    if (isExcludedElement(e.target)) return;

    var tag = e.target.tagName;
    if (tag !== 'INPUT' && tag !== 'TEXTAREA') return;

    var isOverLength = checkInputLength(e.target);
    if (isOverLength) {
      this._famsm26_addLog({
        type: 'input',
        code: '4001',
        message: '输入框内容超长（疑似扫码枪误扫）',
        data: {
          inputId: e.target.id || '无ID',
          inputClass: e.target.className || '',
          currentLength: e.target.value.length,
          maxLength: famsm26_input_max_length,
          content: e.target.value.substring(0, 20) + '...' // 仅存前20位，避免日志过大
        }
      });
    }
  };

  // ======================== 日志操作：新增 ========================
  FAMS_BehaviorMonitor.prototype._famsm26_addLog = function(item) {
    if (!isLocalStorageAvailable()) return;

    var log = {
      appname: famsm26_appname,
      store_id: famsm26_store_id,
      ts: getNowTimestamp(),
      type: item.type,
      code: item.code,
      message: item.message,
      data: item.data || {}
    };

    var logs = this.getLogs();
    if (Object.prototype.toString.call(logs) !== '[object Array]') {
      logs = [];
    }
    logs.push(log);

    // 限制日志数量，只保留最新的
    if (logs.length > famsm26_log_max_count) {
      logs = logs.slice(-famsm26_log_max_count);
    }

    try {
      localStorage.setItem('famsm26_behavior_logs', JSON.stringify(logs));
    } catch (e) {
      console.error('[FAMS] 写入日志失败：', e);
    }
  };

  // ======================== 外部方法：自定义日志 ========================
  FAMS_BehaviorMonitor.prototype.log = function(type, code, message, data) {
    this._famsm26_addLog({
      type: type,
      code: code,
      message: message,
      data: data || {}
    });
  };

  // ======================== 外部方法：获取所有日志 ========================
  FAMS_BehaviorMonitor.prototype.getLogs = function() {
    if (!isLocalStorageAvailable()) return [];
    try {
      var str = localStorage.getItem('famsm26_behavior_logs');
      if (!str) return [];
      var logs = JSON.parse(str);
      if (Object.prototype.toString.call(logs) !== '[object Array]') {
        return [];
      }
      return logs;
    } catch (e) {
      console.error('[FAMS] 读取日志失败：', e);
      return [];
    }
  };

  // ======================== 外部方法：清空日志 ========================
  FAMS_BehaviorMonitor.prototype.clearLogs = function() {
    if (!isLocalStorageAvailable()) return;
    try {
      localStorage.removeItem('famsm26_behavior_logs');
    } catch (e) {
      console.error('[FAMS] 清空日志失败：', e);
    }
  };

  // ======================== 暴露静态方法：设置全局配置 ========================
  FAMS_BehaviorMonitor.setGlobalConfig = function(cfg) {
    if (typeof cfg === 'object' && cfg !== null) {
      globalConfig = extend(globalConfig, cfg);
      // 同步到实例变量
      famsm26_store_id = globalConfig.storeId;
      famsm26_appname = globalConfig.appname;
      famsm26_watch_input = globalConfig.watchInput;
      famsm26_input_max_length = globalConfig.inputMaxLength;
      famsm26_exclude_selectors = globalConfig.excludeSelectors;
      famsm26_enable_iframe = globalConfig.enableIframe;
    }
  };

  return FAMS_BehaviorMonitor;
})();

/*
$cq.司天鉴_前台行为_日志服务 = function(storeId, appname) {
    
     return  new FAMS_BehaviorMonitor(storeId, appname);
}

*/
$cq.司天鉴_前台行为_日志服务old = function(storeId, appname) {
    
     return  new FAMS_BehaviorMonitor(storeId, appname);
}

// 仅修改这个函数，适配所有参数情况
$cq.司天鉴_前台行为_日志服务 = function() {
    var args = arguments;
    var monitorInstance;

    // 适配 FAMS_BehaviorMonitor 的三种参数场景
    if (args.length === 0) {
      // 场景1：无参调用 → 转发无参给 FAMS_BehaviorMonitor
      monitorInstance = new FAMS_BehaviorMonitor();
    } 
    else if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null) {
      // 场景2：传对象参数（含 storeId/appname + 扩展配置）→ 转发对象参数
      monitorInstance = new FAMS_BehaviorMonitor(args[0]);
    } 
    else {
      // 场景3：旧格式参数（支持 1个/2个/3个参数）→ 按顺序转发
      // 支持：(storeId)、(storeId,appname)、(storeId,appname,config)
      monitorInstance = new FAMS_BehaviorMonitor(args[0], args[1], args[2]);
    }

    return monitorInstance;
};


//
$cq.sjt_frontdesk_logserver = function(storeId, appname) {
     var args = arguments;
    var monitorInstance;

    // 适配 FAMS_BehaviorMonitor 的三种参数场景
    if (args.length === 0) {
      // 场景1：无参调用 → 转发无参给 FAMS_BehaviorMonitor
      monitorInstance = new FAMS_BehaviorMonitor();
    } 
    else if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null) {
      // 场景2：传对象参数（含 storeId/appname + 扩展配置）→ 转发对象参数
      monitorInstance = new FAMS_BehaviorMonitor(args[0]);
    } 
    else {
      // 场景3：旧格式参数（支持 1个/2个/3个参数）→ 按顺序转发
      // 支持：(storeId)、(storeId,appname)、(storeId,appname,config)
      monitorInstance = new FAMS_BehaviorMonitor(args[0], args[1], args[2]);
    }

    return monitorInstance;
}


$cq.sjt_frontdesk_loganalysis = function() {
      var tpl司天鉴前台日志模板 = `
		<style>
		  

		.table_修仙列表 {
    overflow-x: auto;
    border: 1px solid #8B4513;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.5);
	background: rgba(10, 10, 30, 0.8);
	background: rgba(10, 10, 30, 0.8);
	 height: calc(100% - 70px); /* 表格可视高度，可自己改 */
    overflow-y: auto; /* 垂直滚动条 */
}
.table_修仙列表 table {
    width: 100%;
    border-collapse: collapse;
	background: rgba(10, 10, 30);
}
 .table_修仙列表 th, td {
            padding: 0.8rem 1rem;
            text-align: left;
            border-bottom: 1px solid #D2B48C;
            padding: 10px 5px;
        }

        .table_修仙列表 th {
            background-color: #8B4513;
            color: white;
            font-weight: bold;
            position: sticky;
            top: 0;
			background: rgba(0, 153, 102, 1);
    color: #00ffcc;
    padding: 12px;
    text-align: left;
    white-space: nowrap;
        }

        .table_修仙列表 tr:nth-child(even) {
            background-color: rgba(210, 180, 140, 0.1);
        }

       .table_修仙列表 tr:hover {
            background-color: rgba(210, 180, 140, 0.3);
        }


		
    .修仙列表_toolbar{display:flex;gap:10px;margin-bottom:20px;flex-wrap:wrap;align-items:center;margin-bottom:0px;}
.修仙列表_toolbar input,.修仙列表_toolbar select,.修仙列表_toolbar button{padding:10px 12px;border:1px solid #009966;border-radius:4px;background:#111827;color:#00ffcc;font-size:14px}
.修仙列表_toolbar button{background:#007f55;color:#fff;cursor:pointer;transition:all 0.3s}
.修仙列表_toolbar button:hover{background:#009f66;box-shadow:0 0 8px rgba(0,255,157,0.3)}
.修仙列表_toolbar .danger{background:#7f0d0d}
.修仙列表_toolbar .danger:hover{background:#9f1111}
.修仙列表_toolbar .primary{background:#0d5f7f}
.修仙列表_toolbar .primary:hover{background:#117f9f}  
 .search-group{display:flex;gap:8px;align-items:center}
.search-group label{color:#00cc99;font-size:14px}

 
.table-wrap{overflow-x:auto;border:1px solid #006644;border-radius:6px;background:rgba(10,15,25,.8);box-shadow:0 0 15px rgba(0,153,102,0.1)}
table{width:100%;border-collapse:collapse}
th{background:rgba(0,153,102,.2);color:#00ffcc;padding:12px;text-align:left;white-space:nowrap}
td{padding:10px 12px;border-top:1px solid #003328;color:#ccfcee;vertical-align:top;text-align: left;  }
tr:hover{background:rgba(0,153,102,.1)}
.text-center{text-align:center}
.code{color:#ff9d00;font-weight:bold}
.msg{color:#00ffcc}
.data{color:#99ffdd;font-size:12px;word-break:break-all}
.empty{text-align:center;padding:60px;color:#779}
.appname{color:#ff66cc;font-weight:bold}
.store-id{color:#66ccff;font-weight:bold}
.filter-input{max-width:200px}
 

</style>

 <div class="修仙列表_toolbar" style="background:#111827;padding-bottom: 10px;padding-top: 8px;">
    <div class="search-group">
      <label>App名称：</label>
      <input type="text" id="fams_appnameFilter" class="filter-input" placeholder="输入appname关键词" style="width:100px;">
    </div>
    <div class="search-group">
      <label>店铺ID：</label>
      <input type="text" id="fams_storeidFilter" class="filter-input" placeholder="输入store_id关键词" style="width:80px;">
    </div>
    <div class="search-group">
      <label>开始时间：</label>
      <input type="datetime-local" id="fams_startTime" class="filter-input">
    </div>
    <div class="search-group">
      <label>结束时间：</label>
      <input type="datetime-local" id="fams_endTime" class="filter-input">
    </div>
    <button id="fams_search">筛选</button>
    <button id="fams_refresh">刷新</button>
    <button id="fams_clear" class="danger">清空</button>

	 

  </div>


		 
			<div class="table_修仙列表">
               
            <table>
                <thead>
                    <tr>
                         <th style="width:100px;">时间</th>
          <th style="width:80px;">应用名称</th>
          <th style="width:80px;">店铺ID</th>
          <th style="width:80px;">行为类型</th>
          <th style="width:80px;">状态编码</th>
          <th style="width:200px;">行为描述</th>
          <th style="width:400px;">数据详情</th>
                       
                    </tr>
                </thead>
                <tbody id="未来之窗_修仙_listtable"></tbody>
            </table>
             
        </div>
		 
        
        
  
    
        </div>
			`;
     const title="未来之窗 · 行为监控日志分析";
     const 未来之窗app_ID="wlzcapp_appid_behavior_dlg";
     
	 $cq.对话框().layer(tpl司天鉴前台日志模板,{type:"frame",width:"1200px",height:"600px;",barbg:"#0b0f1a",title:title,mask:true,align:59,hideclose:false,id:未来之窗app_ID });
	 
	 // 获取当前 right 值（例如 '-323.5px'）
    let rightVal = $cq("#"+未来之窗app_ID+"_maskmove").css("right");
    
    // 把字符串转成数字（去掉 px 单位）
    let rightNum = parseFloat(rightVal);
    
    // 判断：如果 小于 -90（也就是超过 -90），就设置为 100px
    if (rightNum < -50) {
       $cq("#"+未来之窗app_ID+"_maskmove").css("right", "20px");
    }
     
     FAMS_BehaviorMonitor_LogViewer.init({body:"#未来之窗_修仙_listtable"
	 ,appname:"#fams_appnameFilter",storeid:"#fams_storeidFilter"
	 ,start:"#fams_startTime",end:"#fams_endTime"
	 ,search:"#fams_search",refresh:"#fams_refresh",clear:"#fams_clear"});
     
}

$cq.司天鉴_前台行为_日志分析 = function() {
     return $cq.sjt_frontdesk_loganalysis();
}

//2026-02-19
// ==============================================
// 1）扫码核心：纯独立，无DOM依赖
// ==============================================
//paysacan
const FAMS_payScanIndifferent = {
  code: '',
  handler: null,
  onComplete: null,
  fams_zhselector:'',
  start(selector , cb) {
    this.stop();
    this.code = '';
    this.onComplete = cb;
    this.handler = e => this._onKey(e);
    fams_zhselector=selector;
  //  const fams_cpu_maintance = $cq(fams_zhselector).me;
    document.addEventListener('keydown', this.handler);
  },
  stop() {
    if (this.handler) {
      //  const fams_cpu_maintance = $cq(fams_zhselector).me;
      document.removeEventListener('keydown', this.handler);
      this.handler = null;
    }
  },
  _onKey(e) {
     // console.log("ddd"+e.key);
    if (e.key == 'Enter') {
      e.preventDefault();
      const c = this.code.trim();
      if (c && this.onComplete) this.onComplete(c);
      this.code = '';
    } else if (e.key && e.key.length == 1) {
      this.code += e.key;
    }
  }
};

// ==============================================
// 2）PayDialog：纯JS创建，不依赖任何HTML
// ==============================================
const FAMS_WaitingDialog = (function() {
  let mask, dialog, titleEl, tipsEl, centerTextEl, resultEl;
  let isCreated = false;
  
  let interruptcallback = function(result) {
            console.log('i will go by interrupt and you:', result);
   };
  
  let cpu_maintance_id = "fams_waitDialogid20260219"; 

  // 🔥 全部JS创建，页面不用写任何结构
  function create() {
    if (isCreated) return;

    // 遮罩
    mask = document.createElement('div');
    mask.style.cssText = `
      position: fixed; top:0; left:0; right:0; bottom:0;
      background: rgba(0,0,0,0.6); z-index:999; display:none;
    `;
    
    mask.id = cpu_maintance_id;

    // 弹窗
    dialog = document.createElement('div');
    dialog.style.cssText = `
      position: fixed; top:50%; left:50%; width:380px;
      padding:30px; margin-left:-190px; margin-top:-180px;
      background:#111; border:2px solid #0ff; border-radius:14px;
      text-align:center; z-index:1000; display:none;
    `;
    
    dialog.id = cpu_maintance_id+"_dlg"; 

    // 标题
    titleEl = document.createElement('h3');
    titleEl.style.margin = '0 0 6px';
    titleEl.style.fontSize = '20px';
    titleEl.style.color = '#fff';

    // 提示
    tipsEl = document.createElement('div');
    tipsEl.style.cssText = 'color:#ccc; margin-bottom:20px; font-size:14px;';

    // 扫描圈容器
    const scanBox = document.createElement('div');
    scanBox.style.cssText = `
      position:relative; width:150px; height:150px;
      margin:0 auto 20px;
    `;

    // 外环发光
    const outer = document.createElement('div');
    outer.style.cssText = `
      position:absolute; width:100%; height:100%; border-radius:50%;
      border:2px solid #0ff; box-shadow:0 0 18px #0ff,0 0 36px #0ff;
      box-sizing:border-box; animation:pulse 2s infinite alternate;
    `;

    // 旋转流光（你要的好看效果）
    const rotator = document.createElement('div');
    rotator.style.cssText = `
      position:absolute; width:100%; height:100%; border-radius:50%;
      border:3px solid transparent; border-top-color:#0ff;
      box-sizing:border-box; animation:rotate 2s linear infinite;
    `;

    // 中间圆
    const middle = document.createElement('div');
    middle.style.cssText = `
      position:absolute; top:50%; left:50%; width:130px; height:130px;
      background:#111; border-radius:50%;
      transform:translate(-50%,-50%); z-index:1;
    `;
    //2026-03-01
     middle.id = cpu_maintance_id+"_middle";

    // 中间文字
    centerTextEl = document.createElement('div');
    centerTextEl.style.cssText = `
      position:absolute; top:50%; left:50%; color:#0ff;
      font-size:20px; font-weight:bold; z-index:2;
      transform:translate(-50%,-50%);
    `;

    // 结果文字
    resultEl = document.createElement('div');
    resultEl.style.cssText = 'color:#0ff; font-size:15px; min-height:20px;';

    // 组合结构
    scanBox.append(outer, rotator, middle, centerTextEl);
    dialog.append(titleEl, tipsEl, scanBox, resultEl);
    document.body.append(mask, dialog);

    // 动画
    const style = document.createElement('style');
    style.textContent = `
      @keyframes rotate{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      @keyframes pulse{from{opacity:.6}to{opacity:1}}
    `;
    document.head.append(style);
    
    //2026-02-28 添加中断
    tipsEl.addEventListener('click', function(event) {
          // 阻止事件默认行为（比如按钮是a标签时阻止跳转）
          event.preventDefault();
          // 阻止事件冒泡
          event.stopPropagation();
          
         // console.log('按钮被点击了（原生事件）');
          // 这里可以执行查询支付状态、提交表单等逻辑
          interruptcallback(); // 调用你之前提到的轮询查询支付状态函数
          mask.style.display = 'none';//隐藏
          dialog.style.display = 'none';//隐藏
        });


    isCreated = true;
  }

  return {
    show(opt) {
      create();
      opt = opt || {};
      titleEl.textContent = opt.title || '扫码支付';
      tipsEl.textContent = opt.tips || '请扫描支付码';
      centerTextEl.textContent = opt.centerText || '支付中';
      resultEl.textContent = opt.result || '';
      mask.style.display = 'block';
      dialog.style.display = 'block';
      
      return cpu_maintance_id;
    },
    setResult(text) {
      resultEl.textContent = text;
      return cpu_maintance_id;
    },
     update(text) {
      if (resultEl) resultEl.textContent = text;
      return cpu_maintance_id;
    },
    title(text) {
      if (titleEl) titleEl.textContent = text;
      return cpu_maintance_id;
    },
    msg(text) {
      if (resultEl) resultEl.textContent = text;
      return cpu_maintance_id;
    },
    //2026-02-28
    center(text) {
      if (centerTextEl) centerTextEl.textContent = text;
      return cpu_maintance_id;
    },
    interrupt(callback) {
        //配置退出
      interruptcallback=callback;
      return cpu_maintance_id;
    },
    hide() {
      mask.style.display = 'none';
      dialog.style.display = 'none';
      interruptcallback();
      return cpu_maintance_id;
      
    }
  };
})();

//2026-02-19
CyberWin_Dialog.等待进程 = function() {
     return FAMS_WaitingDialog;
}

CyberWin_Dialog.WaitingDialog = function() {
     return FAMS_WaitingDialog;
}

$cq.等待进程 = function() {
     return FAMS_WaitingDialog;
}

$cq.WaitingDialog = function() {
     return FAMS_WaitingDialog;
}


$cq.payScannoui = function() {
      FAMS_payScanIndifferent.start("#mm333",code => {
          FAMS_payScanIndifferent.stop();
         //FAMS_WaitingDialog.msg('已扫描：' + code);
          // alert("111");
          callback(code);
    });
}
$cq.硬件交互_无感扫码 = function(callback) {
     //return FAMS_WaitingDialog;
     FAMS_payScanIndifferent.start("#mm333",code => {
          FAMS_payScanIndifferent.stop();
         //FAMS_WaitingDialog.msg('已扫描：' + code);
          // alert("111");
          callback(code);
 });
}

//2026-02-28 支付轮询
/**
 * 通用的支付状态查询函数（兼容Chrome 53，ES5语法）
 * @param {Object} options 配置参数
 * @param {string} [options.apiUrl] 自定义查询接口地址（默认使用原地址）
 * @param {Function} options.onSuccess 支付成功回调 (result) => {}
 * @param {Function} options.onFail 支付失败回调 (result) => {} （状态码9417等终止性失败）
 * @param {Function} options.onError 其他错误回调 (result) => {} （非终止性错误/循环等待）
 * @param {boolean} [options.allowClose=true] 是否允许支付成功后关闭窗口
 * @param {string} [options.themeColor='#1890ff'] 主题色（用于提示框等）
 * @param {number} [options.interval=1000] 查询间隔（避免高频递归）
 * @param {number} [options.maxRetries=30] 最大重试次数（防止无限递归）
 * @param {number} [options.retryCount=0] 已重试次数（内部参数，无需手动传）
 */
// 未来之窗_语音交互_支付失败
//wppp
$cq.wlzc_pay_polling_payment  = function(options) {

    // 默认配置（ES5 对象字面量，无解构）
    var defaultOptions = {
        apiUrl: "http://yourquery.com/",
        allowClose: "N",
        themeColor: 'rgb(17, 17, 17)',
        interval: 1000,
        maxRetries: 30,
        retryCount: 0,
        skin:"maskwait",
        wait_title:"等待完成支付",
        wait_tips:"请勿关闭等待完成",
        wait_centerText:"查询中",
        wait_result:"正在查询状态........",
        //success
        onSuccess: function(result) {
            console.log('支付成功:', result);
        },
        onFail: function(result) {
            console.log('支付失败:', result);
        },
        onError: function(result) {
            console.log('查询异常:', result);
        }
        ,onPoll: function(result) {
            console.log('正在查询:', result);
        }
    };

    // 合并配置（ES5 方式，无扩展运算符）
    var opts = {};
    for (var key in defaultOptions) {
        opts[key] = defaultOptions[key];
    }
    if (options) {
        for (var k in options) {
            opts[k] = options[k];
        }
    }
    
    

    // 提取配置参数（无解构，ES5 变量赋值）
    
    var apiUrl = opts.apiUrl;
    var retryCount = opts.retryCount;
    var maxRetries = opts.maxRetries;
    var interval = opts.interval;
    var allowClose = opts.close;
    var themeColor = opts.barbg;
    
    //interruptcallback

    // 边界校验：订单ID必传
    if(opts.skin=="maskwait" && opts.retryCount == 0){
        $cq.对话框().等待进程().show({
            title: opts.wait_title,
            tips: opts.wait_tips,
            centerText:opts.wait_centerText,
            result: opts.wait_result
        });
        
        //配置 fams_waitDialogid20260219_dlg
        $cq("#fams_waitDialogid20260219_dlg").css("background",opts.barbg);
        $cq("#fams_waitDialogid20260219_middle").css("background",opts.barbg);
        //cpu_maintance_id+"_middle";
    }
    
    if( opts.close == "Y"){
        $cq.对话框().等待进程().interrupt(function(result){
           // console.log("i reciver user interrupt",result);
             opts.retryCount = 999999;//全部结束了
             retryCount=999999;
        });
    }
   

    // 超过最大重试次数，终止查询
    if (retryCount >= maxRetries) {
        //console.log('查询次数超限，终止查询');
         $cq.对话框().等待进程().hide();
        opts.onError({ status: -2, info: '查询超时，请手动检查支付状态' });
        return;
    }

    console.log('查询中....（第' + (retryCount + 1) + '次）');
    
    $cq.对话框().等待进程().update('查询中....（第' + (retryCount + 1) + '次）');

    // 使用$cq.ajax（ES5 函数，无箭头函数）
    $cq.ajax({
        type: "POST",
        url: apiUrl,
        data: { famsversion: "fams1.0" },
        dataType: "JSON",
        success: function(result_ch) {
           // console.log("查询结果:", result_ch);

            // 支付成功逻辑
            if (result_ch.status == 1 || result_ch.status == 9) {
               // console.log("支付成功");
                // 调用成功回调
                 $cq.对话框().等待进程().hide();
                opts.onSuccess(result_ch);

                // 主题色自定义提示框（移除可选链，ES5 字符串拼接）
                
                // 可配置关闭窗口（ES5 条件判断，移除可选链）
                /*
                if (allowClose) {
                    alert("支付成功，关闭小窗口");
                    if (parent && parent.cyberwin_closeAndDeldlg) {
                        parent.cyberwin_closeAndDeldlg('wlzcapp_ai_all346_commondlg');
                    }
                    if (window.art && art.dialog && art.dialog.close) {
                        art.dialog.close();
                    }
                }
                */

                
               
                return;
            }

            // 支付失败/异常逻辑（ES5 switch，无箭头函数）
            switch (result_ch.status) {
                case 9005: // 等待输入密码
                  //  console.log("等待用户输入密码...");
                    /*
                    $cq.未来之窗_语音交互_等待用互操作();
                    */
                     $cq.对话框().等待进程().center("等待密码");
                    opts.onPoll(result_ch);
                    // 延迟递归查询（ES5 setTimeout，无箭头函数）
                    setTimeout(function() {
                        var newOpts = {};
                        for (var key in opts) {
                            newOpts[key] = opts[key];
                        }
                        newOpts.retryCount = retryCount + 1;
                        $cq.wlzc_pay_polling_payment(newOpts);
                    }, interval);
                    break;

                case 8005: // 支付宝检测中
                    //console.log("支付宝检测中...");
                   $cq.对话框().等待进程().center("等待密码");
                    opts.onPoll(result_ch);
                    setTimeout(function() {
                        var newOpts = {};
                        for (var key in opts) {
                            newOpts[key] = opts[key];
                        }
                        newOpts.retryCount = retryCount + 1;
                         $cq.wlzc_pay_polling_payment(newOpts);
                    }, interval);
                    break;

                case 9417: // 交易失败（终止）
                   // console.log("交易失败，终止查询");
                    //$cq.未来之窗_语音交互_支付失败();
                    $cq.对话框().等待进程().hide();
                    opts.onFail(result_ch);
                   
                    break;

                // 其他错误
                default:
                    var errorMsg = (result_ch.info || '查询异常') + result_ch.status + ' V2020-';
                    $cq.对话框().等待进程().hide();
                    opts.onError(result_ch);
                    break;
            }
        },
        error: function(xhr, error) {
            // AJAX请求失败（ES5 处理，无箭头函数）
          //  console.error('查询请求失败:', error);
           // $cq.对话框().等待进程().hide();
           $cq.对话框().等待进程().center("网络异常");
            opts.onError({ status: -3, info: '网络异常，查询失败', error: error });
            // 重试逻辑
            if (retryCount < maxRetries) {
                 
                setTimeout(function() {
                    var newOpts = {};
                    for (var key in opts) {
                        newOpts[key] = opts[key];
                    }
                    newOpts.retryCount = retryCount + 1;
                     $cq.wlzc_pay_polling_payment(newOpts);
                }, interval);
                
            }
        }
    });
}

   //未来之窗客户端技术

  function check_Support_CwpdClient(){
	  if( typeof CyberWin_JsStandardPlug == "undefined"){
		   return false;
	  }

	   if(CyberWin_JsStandardPlug){
		   return true;
	   }
	   return false;
   }
   //未来之窗_语音交互_支付失败
//wppp
$cq.未来之窗_支付交互_收银台查询结果 = function(options) {
     return $cq.wlzc_pay_polling_payment(options);
}

$cq.fams_paystatusquery = function(options) {
     return $cq.wlzc_pay_polling_payment(options);
}
$cq.fams_wppp = function(options) {
     return $cq.wlzc_pay_polling_payment(options);
}

//2026-03-02
// 全局变量保持不变
let fairyalliance_public_currentTip = null;
let fairyalliance_public_tipTimer = null;
let fairyalliance_public_tipMask = null;

// 函数名改为showTip，参数改为option对象模式
cyberwin_query.prototype.showTip = function(option = {}) {
    // 解构option参数，设置默认值
    let sys_option = {
        message : '',          // 提示文本（必填）
        type : 'success',      // 类型：success/error/info/warn
        duration : 3000,       // 显示时长
        align : 8,             // 对齐方式：1-9/59
        mask : false           // 是否显示遮罩
    };
    
      if(option.align){
          sys_option.align=option.align;
      }
      if(option.mask){
          sys_option.mask=option.mask;
      }
      if(option.duration){
          sys_option.duration=option.duration;
      }
      if(option.type){
          sys_option.type=option.type;
      }
      if(option.message){
          sys_option.message=option.message;
      }

    // 校验必填参数
    if (!sys_option.message) {
        console.warn('showTip: message参数不能为空');
        return this;
    }

    // 清除已有的tip和定时器
    if (fairyalliance_public_currentTip) {
        clearTimeout(fairyalliance_public_toastTimer);
        document.body.removeChild(fairyalliance_public_currentTip);
        fairyalliance_public_currentTip = null;
    }

    // 清除已有的遮罩层
    if (fairyalliance_public_tipMask) {
        document.body.removeChild(fairyalliance_public_tipMask);
        fairyalliance_public_tipMask = null;
    }

    // 创建tip元素
    const tip = document.createElement('div');
    tip.id = '东方仙盟_底部提示tip';
    tip.className = `东方仙盟_底部提示tip ${sys_option.type}`;
    tip.textContent = sys_option.message;

    // 先临时添加到文档流获取实际宽高
    document.body.appendChild(tip);
    const width_layer = tip.offsetWidth;
    const height_layer = tip.offsetHeight;
    document.body.removeChild(tip);

    // 屏幕尺寸相关变量
    const CyberWin_Dialog_screen_width = window.innerWidth || document.documentElement.clientWidth;
    const CyberWin_Dialog_screen_height = window.innerHeight || document.documentElement.clientHeight;

    // 计算对齐样式
    let 未来之窗_layer_alignmentstyle = '';
    switch (sys_option.align) {
        case 1:
           
            未来之窗_layer_alignmentstyle = "top:auto;bottom:50px;right:50%;left:auto;";
            break;
        case 2:
            未来之窗_layer_alignmentstyle = "top: 50px;right: 50px;bottom:auto;left:auto;";
            break;
        case 3:
            
            未来之窗_layer_alignmentstyle = "top: 50%;left: 50px;bottom:auto;right:auto;";
            break;
        case 4:
            未来之窗_layer_alignmentstyle = "top: 50px;left: 50px;bottom:auto;right:auto;";
            break;
        case 5:
           
           
            
            未来之窗_layer_alignmentstyle = "top:50%;bottom:auto;left:50%;";
            break;
        case 6:
            未来之窗_layer_alignmentstyle = "bottom: 50px;right: 50px;top:auto;left:auto;";
            break;
        case 7:
          
            未来之窗_layer_alignmentstyle = "top: 50%;right: 50px;bottom:auto;left:auto;";
            break;
        case 8:
            //底部100
            未来之窗_layer_alignmentstyle = "top:auto;bottom:100px;right: auto;left:50%;transform: translateX(-50%);";
            break;
        case 9:
            
            未来之窗_layer_alignmentstyle = "top:50px; right:50%;bottom:auto;left:auto;";
            break;
        case 59:
            未来之窗_layer_alignmentstyle = "top:50%;bottom:auto;left:50%;transform: translate(-50%, -50%) translateY(-100px);";
            break;
        default:
            未来之窗_layer_alignmentstyle = "top:auto;bottom:-100px;left:50%;transform: translateX(-50%);";
            break;
    }

    // 解析对齐样式为对象
    const alignStyles = {};
    未来之窗_layer_alignmentstyle.split(';').forEach(style => {
        if (style.trim()) {
            const [key, value] = style.split(':');
            alignStyles[key.trim()] = value.trim();
        }
    });

    // 基础样式
    const baseStyles = {
        position: 'fixed',
        padding: '12px 20px',
        borderRadius: '8px',
        color: '#fff',
        fontSize: '14px',
        zIndex: '9999',
        maxWidth: '80%',
        textAlign: 'center',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        opacity: '0',
        transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
    };

    // 合并样式
    Object.assign(tip.style, baseStyles, alignStyles);

    // 根据类型设置背景色
    const typeStyles = {
        success: '#4CAF50',
        error: '#F44336',
        info: '#2196F3',
        warn: '#FF9800'
    }; 
    tip.style.backgroundColor = typeStyles[sys_option.type] || '#333';

    // 创建遮罩层（如果mask为true）
    if (sys_option.mask) {
        fairyalliance_public_tipMask = document.createElement('div');
        Object.assign(fairyalliance_public_tipMask.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: '9998',
            opacity: '0',
            transition: 'opacity 0.3s ease-out'
        });
        document.body.appendChild(fairyalliance_public_tipMask);
        setTimeout(() => {
            fairyalliance_public_tipMask.style.opacity = '1';
        }, 10);
    }

    // 添加tip到页面
    document.body.appendChild(tip);

    // 触发显示动画
    setTimeout(() => {
        tip.style.opacity = '1';
        if (sys_option.align === 8) {
            tip.style.transform = 'translateX(-50%)';
        }
    }, 10);

    // 存储当前tip引用
    fairyalliance_public_currentToast = tip;

    // 定时隐藏并移除
    fairyalliance_public_tipTimer = setTimeout(() => {
        tip.style.opacity = '0';
        if (sys_option.align === 8) {
            tip.style.transform = 'translateX(-50%) translateY(20px)';
        }
        
        // 隐藏遮罩
        if (fairyalliance_public_tipMask) {
            fairyalliance_public_tipMask.style.opacity = '0';
        }

        // 动画结束后移除DOM
        setTimeout(() => {
            if (fairyalliance_public_currentToast && fairyalliance_public_currentToast.parentNode) {
                document.body.removeChild(fairyalliance_public_currentToast);
                fairyalliance_public_currentToast = null;
            }
            if (fairyalliance_public_tipMask && fairyalliance_public_tipMask.parentNode) {
                document.body.removeChild(fairyalliance_public_tipMask);
                fairyalliance_public_tipMask = null;
            }
        }, 300);
    }, sys_option.duration);

    return this;
};

$cq.showTip = function(options) {
     return $cq().showTip(options);
}

// ====== 调用示例 ======
// 1. 最简调用（仅传提示文本）
// cyberwin_query.prototype.showTip({ message: '操作成功' });

// 2. 完整参数调用（错误提示+居中显示+带遮罩+5秒时长）
// cyberwin_query.prototype.showTip({
//     message: '操作失败，请重试',
//     type: 'error',
//     duration: 5000,
//     align: 5,
//     mask: true
// });

// 3. 右上角提示（无遮罩）
// cyberwin_query.prototype.showTip({
//     message: '这是一个提示信息',
//     type: 'info',
//     align: 2
// });
 //2026-03-07 未来之窗_AI_操作系统_文件系统_文本保存到
 
   /**
         * 核心替换函数
         * @param {string} str 原始字符串
         * @param {object} data 替换数据源
         * @returns {string} 替换后的字符串
         */
$cq.Text_replace_bydata = function(先知灵晶, data) {
       
    if (!先知灵晶) return '';
     var placeholderReg = /@(\w+)@/g;
        return 先知灵晶.replace(placeholderReg, function(match, key) {
                return data.hasOwnProperty(key) ? data[key] : match;
     });
}

 cyberwin_query.prototype.文本模板_替换 = function(data) {
    // 正则特殊字符转义函数（处理 . * + ? ^ $ [ ] ( ) { } | \ 等）
    

    for(let i = 0; i < this.elements.length; i++) { 
        const targetNode = this.elements[i];
        // 核心修改：把document.body改成targetNode（指定区域）
        var 未来之窗tag = targetNode.tagName;
			 未来之窗tag =""+未来之窗tag;
			 未来之窗tag = 未来之窗tag.toLowerCase();
		var 未来之窗数值="";
		if(未来之窗tag == "input"){
		    未来之窗数值 = targetNode.value;
		    未来之窗数值 =$cq.文本模板_替换(未来之窗数值,data);
			targetNode.value=未来之窗数值;
         }else if(未来之窗tag == "select"){
		 }else if(未来之窗tag == "td"){
		    
		    未来之窗数值 = targetNode.innerText;
		    未来之窗数值 =$cq.文本模板_替换(未来之窗数值,data);
			targetNode.innerText=未来之窗数值;
									 
		 }else if(未来之窗tag == "cyberdiv"){
		     未来之窗数值 = targetNode.innerText;
		     未来之窗数值 =$cq.文本模板_替换(未来之窗数值,data);
			 targetNode.innerText=未来之窗数值;
		 }else if(未来之窗tag == "img"){
		 }else{
		     未来之窗数值 = targetNode.innerText;
		     未来之窗数值 =$cq.文本模板_替换(未来之窗数值,data);
			 targetNode.innerText=未来之窗数值;
		 }
    }
 }
$cq.文本模板_替换 = function(先知灵晶, data) {
    return $cq.Text_replace_bydata(先知灵晶, data);
 }
 //2026-03-08 transformPersons
 /**
 * 处理JSON数据，读取指定字段并映射字段名
 * @param {string} jsonStr - 原始JSON字符串
 * @param {string} targetField - 要读取的目标字段名，默认是"persons"
 * @param {Object} fieldMapping - 字段名映射关系，如{"id": "card_id", "name": "card_name"}
 * @returns {Array} 处理后的persons数据列表
 */
 

 $cq.data_converter_jsontransform = function(jsonStr, targetField = "persons", fieldMapping = null) {
       
    // 默认字段映射规则
    const defaultMapping = { "id": "card_id", "name": "card_name" };
    // 如果用户没传映射规则，使用默认规则
    const mapping = fieldMapping || defaultMapping;

    try {
        // 解析JSON字符串为JavaScript对象（Chrome 53完全支持JSON.parse）
        const data = JSON.parse(jsonStr);

        // 检查目标字段是否存在
        if (!data.hasOwnProperty(targetField)) {
            throw new Error(`JSON数据中不存在字段: ${targetField}`);
        }
        const personsList = data[targetField];

        // 处理每个person对象的字段名映射
        const processedList = [];
        // 遍历数组（for循环兼容所有版本，比forEach更稳妥）
        for (let i = 0; i < personsList.length; i++) {
            const person = personsList[i];
            const newPerson = {};
            // 遍历对象的所有属性（Chrome 53支持Object.keys）
            const keys = Object.keys(person);
            for (let j = 0; j < keys.length; j++) {
                const key = keys[j];
                const value = person[key];
                // 字段名映射：存在映射则替换，否则保留原字段名
                const newKey = mapping[key] || key;
                newPerson[newKey] = value;
            }
            processedList.push(newPerson);
        }

        return processedList;

    } catch (e) {
        if (e instanceof SyntaxError) {
            console.error("JSON解析错误:", e);
        } else {
            console.error("处理数据时出错:", e);
        }
        return [];
    }
}
 
  cyberwin_query.prototype.数据_转换_json转换提取 = function( targetField = "persons", fieldMapping = null) {
    // 正则特殊字符转义函数（处理 . * + ? ^ $ [ ] ( ) { } | \ 等）
    

    for(let i = 0; i < this.elements.length; i++) { 
        const targetNode = this.elements[i];
        // 核心修改：把document.body改成targetNode（指定区域）
        var 未来之窗tag = targetNode.tagName;
			 未来之窗tag =""+未来之窗tag;
			 未来之窗tag = 未来之窗tag.toLowerCase();
		var 未来之窗数值="";
		if(未来之窗tag == "input"){
		    未来之窗数值 = targetNode.value;
		    未来之窗数值 =$cq.data_converter_jsontransform(未来之窗数值,targetField,fieldMapping);
			targetNode.value=未来之窗数值;
         }else if(未来之窗tag == "select"){
		 }else if(未来之窗tag == "td"){
		    
		    未来之窗数值 = targetNode.innerText;
		    未来之窗数值 =$cq.data_converter_jsontransform(未来之窗数值,targetField,fieldMapping);
			targetNode.innerText=未来之窗数值;
									 
		 }else if(未来之窗tag == "cyberdiv"){
		     未来之窗数值 = targetNode.innerText;
		     未来之窗数值 =$cq.data_converter_jsontransform(未来之窗数值,targetField,fieldMapping);
			 targetNode.innerText=未来之窗数值;
		 }else if(未来之窗tag == "img"){
		 }else{
		     未来之窗数值 = targetNode.innerText;
		     未来之窗数值 =$cq.data_converter_jsontransform(未来之窗数值,targetField,fieldMapping);
			 targetNode.innerText=未来之窗数值;
		 }
    }
 }
$cq.数据_转换_json转换提取 = function(jsonStr, targetField = "persons", fieldMapping = null) {
    return $cq.data_converter_jsontransform(jsonStr, targetField, fieldMapping );
 }
 
 //2026-03-11
 
//未来之窗反向隐射
$cq.system_web_reflection_getSelector = function(element) {
     // 终止条件：如果是document或html根节点，返回对应标识
      if (element === document) return '';
      if (element.tagName === 'HTML') return 'html';
    
      // 核心：获取当前元素的标签名（转小写）
      let selector = element.tagName.toLowerCase();
    
      // 获取父元素下的所有同级子元素
      const parent = element.parentNode;
      const siblings = Array.from(parent.children);
      // 计算当前元素在同级中的位置（nth-child从1开始计数）
      const index = siblings.indexOf(element) + 1;
      // 拼接nth-child，确保层级唯一性
      selector += `:nth-child(${index})`;
    
      // 递归拼接父元素的选择器（核心：靠层级向上追溯）
      const parentSelector = $cq.system_web_reflection_getSelector(parent);
      return parentSelector ? `${parentSelector} > ${selector}` : selector;
 }
 
 class 未来之窗_系统_拍照 {
  constructor(标题, 预览选择器, 数据选择器) {
    this.title = 标题;
    this.previewSelector = 预览选择器;
    this.dataSelector = 数据选择器;

    this.styleEl = null;
    this.dialogEl = null;
    this.videoEl = null;
    this.canvasEl = null;
    this.stream = null;

    this.cropping = false;
    this.cropX = 0;
    this.cropY = 0;
    this.cropSize = 200;
  }

  // 移除 # 改为 _，兼容 Chrome 53
  _createStyle() {
    const css = `
      .future-camera-dialog {
        width:90%; max-width:500px; border:none; border-radius:8px;
        box-shadow:0 0 20px rgba(0,0,0,0.3); padding:0; margin:20px auto 0;
      }
      .future-camera-dialog::backdrop { background:rgba(0,0,0,0.5); }
      .future-camera-container { padding:20px; }
      .future-camera-preview {
        width:100%; aspect-ratio:4/3; background:#000; margin-bottom:15px;
        display:flex; align-items:center; justify-content:center; color:#fff; position:relative;
      }
      .future-camera-preview video,
      .future-camera-preview canvas { max-width:100%; max-height:300px; }
      .future-camera-hide { display:none !important; }
      .future-camera-controls { display:flex; gap:10px; justify-content:center; margin-top:10px; }
      .future-camera-btn {
        padding:8px 14px; border:none; border-radius:4px; background:#409eff; color:#fff; cursor:pointer;
      }
      .future-camera-btn:disabled { background:#ccc; }
      .crop-mask {
        position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6);
      }
      .crop-frame {
        position:absolute; border:2px solid #fff;
        box-shadow:0 0 0 100vmax rgba(0,0,0,0.6); cursor:move;
      }
      .crop-bar {
        position:absolute; bottom:10px; left:0; width:100%;
        display:flex; justify-content:center; gap:10px;
      }
    `;
    this.styleEl = document.createElement('style');
    this.styleEl.textContent = css;
    document.head.appendChild(this.styleEl);
  }

  _createDialog() {
    const d = document.createElement('dialog');
    d.className = 'future-camera-dialog';
    d.innerHTML = `
      <div class="future-camera-container">
        <h4 style="margin-top: 0px; margin-bottom: 5px;">${this.title}</h4>
        <div class="future-camera-preview">
          <video autoplay></video>
          <canvas class="future-camera-hide"></canvas>
        </div>
        <div class="future-camera-controls">
          <button class="future-camera-btn capture">拍照</button>
          <button class="future-camera-btn retake" disabled>重拍</button>
          <button class="future-camera-btn use" disabled>使用照片</button>
          <button class="future-camera-btn crop" disabled>裁剪</button>
          <button class="future-camera-btn close">关闭</button>
        </div>
      </div>
    `;
    document.body.appendChild(d);
    this.dialogEl = d;
    this.videoEl = d.querySelector('video');
    this.canvasEl = d.querySelector('canvas');
  }

  _bind() {
    const cap = this.dialogEl.querySelector('.capture');
    const retake = this.dialogEl.querySelector('.retake');
    const use = this.dialogEl.querySelector('.use'); // 新增：使用照片按钮
    const crop = this.dialogEl.querySelector('.crop');
    const close = this.dialogEl.querySelector('.close');
    
    cap.onclick = () => this._capture();
    retake.onclick = () => this._retake();
    use.onclick = () => this._usePhoto(); // 新增：绑定使用照片事件
    crop.onclick = () => this._startCrop();
    close.onclick = () => this.destroy();
  }

  open() {
    this._createStyle();
    this._createDialog();
    this._bind();
    this._openCamera();
    // 特性检测：避免 Chrome 53 调用不存在的 showModal 报错
    if (this.dialogEl.showModal) {
      this.dialogEl.showModal();
    } else {
      alert('当前浏览器版本过低，暂不支持拍照功能，请升级浏览器后重试');
      this.destroy();
    }
  }

  _openCamera() {
   // if (!navigator.mediaDevices?.getUserMedia) { alert('不支持摄像头'); return; }
   if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
        alert('不支持摄像头');
        return;
    }
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
      .then(s => { this.stream = s; this.videoEl.srcObject = s; })
      .catch(e => { alert('摄像头权限失败'); this.destroy(); });
  }

  _capture() {
    const v = this.videoEl;
    const c = this.canvasEl;
    c.width = v.videoWidth;
    c.height = v.videoHeight;
    c.getContext('2d').drawImage(v, 0,0);
    v.classList.add('future-camera-hide');
    c.classList.remove('future-camera-hide');
    
    // 修改：拍照后启用【使用照片】+【裁剪】+【重拍】
    this.dialogEl.querySelector('.capture').disabled = true;
    this.dialogEl.querySelector('.retake').disabled = false;
    this.dialogEl.querySelector('.use').disabled = false; // 启用使用照片
    this.dialogEl.querySelector('.crop').disabled = false;
  }

  _retake() {
    this.videoEl.classList.remove('future-camera-hide');
    this.canvasEl.classList.add('future-camera-hide');
    this.dialogEl.querySelector('.capture').disabled = false;
    this.dialogEl.querySelector('.retake').disabled = true;
    this.dialogEl.querySelector('.use').disabled = true; // 禁用使用照片
    this.dialogEl.querySelector('.crop').disabled = true;
    this._openCamera();
  }

  // 新增：直接使用原图（不裁剪）
  _usePhoto() {
    const c = this.canvasEl;
    // 直接将原图转为200x200的base64
    const can = document.createElement('canvas');
    can.width = 200;
    can.height = 200;
    const ctx = can.getContext('2d');
    // 等比例缩放原图到200x200
    ctx.drawImage(c, 0, 0, c.width, c.height, 0, 0, 200, 200);
    const b64 = can.toDataURL('image/jpeg',0.9);

    const img = document.querySelector(this.previewSelector);
    const inp = document.querySelector(this.dataSelector);
    if(img) img.src = b64;
    if(inp) inp.value = b64;
    
    this.destroy(); // 完成后关闭弹窗
  }

  _startCrop() {
    this.cropping = true;
    const box = this.canvasEl.getBoundingClientRect();
    this.cropSize = Math.min(box.width, box.height) * 0.7;
    this.cropX = (box.width - this.cropSize)/2;
    this.cropY = (box.height - this.cropSize)/2;
    this._drawCropUI();
  }

  _drawCropUI() {
    const wrap = this.dialogEl.querySelector('.future-camera-preview');
    let old = wrap.querySelector('.crop-mask');
    if(old) old.remove();
    const mask = document.createElement('div');
    mask.className = 'crop-mask';
    wrap.appendChild(mask);

    const frame = document.createElement('div');
    frame.className = 'crop-frame';
    frame.style.width = this.cropSize + 'px';
    frame.style.height = this.cropSize + 'px';
    frame.style.left = this.cropX + 'px';
    frame.style.top = this.cropY + 'px';
    mask.appendChild(frame);

    const bar = document.createElement('div');
    bar.className = 'crop-bar';
    bar.innerHTML = `
      <button class="future-camera-btn cancel">取消</button>
      <button class="future-camera-btn ok">确定裁剪</button>
    `;
    mask.appendChild(bar);

    frame.onmousedown = e=>this._dragStart(e);
    frame.ontouchstart = e=>this._dragStart(e.touches[0]);
    bar.querySelector('.cancel').onclick = ()=>this._cropCancel();
    bar.querySelector('.ok').onclick = ()=>this._cropOk();
  }

  _dragStart(e) {
    const startX = e.clientX - this.cropX;
    const startY = e.clientY - this.cropY;
    const move = e=>{
      const t = e.touches ? e.touches[0] : e;
      this.cropX = t.clientX - startX;
      this.cropY = t.clientY - startY;
      const f = document.querySelector('.crop-frame');
      f.style.left = this.cropX + 'px';
      f.style.top = this.cropY + 'px';
    };
    const end = ()=>{
      document.removeEventListener('mousemove',move);
      document.removeEventListener('touchmove',move);
      document.removeEventListener('mouseup',end);
      document.removeEventListener('touchend',end);
    };
    document.addEventListener('mousemove',move);
    document.addEventListener('touchmove',move);
    document.addEventListener('mouseup',end);
    document.addEventListener('touchend',end);
  }

  _cropCancel() {
    const m = this.dialogEl.querySelector('.crop-mask');
    if(m) m.remove();
    this.cropping = false;
  }

  _cropOk() {
    const c = this.canvasEl;
    const w = c.width;
    const h = c.height;
    const nw = this.cropSize / c.clientWidth * w;
    const nh = this.cropSize / c.clientHeight * h;
    const nx = this.cropX / c.clientWidth * w;
    const ny = this.cropY / c.clientHeight * h;

    const can = document.createElement('canvas');
    can.width = 200;
    can.height = 200;
    const ctx = can.getContext('2d');
    ctx.drawImage(c, nx,ny,nw,nh, 0,0,200,200);
    const b64 = can.toDataURL('image/jpeg',0.9);

    const img = document.querySelector(this.previewSelector);
    const inp = document.querySelector(this.dataSelector);
    if(img) img.src = b64;
    if(inp) inp.value = b64;
    this._cropCancel();
    this.destroy();
  }

  destroy() {
    if(this.stream) this.stream.getTracks().forEach(t=>t.stop());
    if(this.dialogEl) { 
      // 兼容：低版本可能没有 close 方法
      if (this.dialogEl.close) this.dialogEl.close();
      this.dialogEl.remove(); 
    }
    if(this.styleEl) this.styleEl.remove();
  }
}

$cq.system_media_takephotoAndFillImage= function(title, previewSelector,dataSelector) {
    
   return  new 未来之窗_系统_拍照(title,previewSelector,dataSelector).open();
 }
 
 $cq.系统_媒体_拍照= function(title, previewSelector,dataSelector) {
    
   return  new 未来之窗_系统_拍照(title,previewSelector,dataSelector).open();
 }
 
 cyberwin_query.prototype.system_media_takephoto = function(dataSelector) {
    //return this.fairyalliance_screenRecorder(options);
     if(this.elements.length<1){
         return;
     }
       const title="takephoto";
       const targetNode = this.elements[0];
       const previewSelector = $cq.system_web_reflection_getSelector(targetNode);
       
        return  new 未来之窗_系统_拍照(title,previewSelector,dataSelector).open();
    
};
 
 cyberwin_query.prototype.未来之窗_智能IOT_拍照 = function(dataSelector) {
    //return this.fairyalliance_screenRecorder(options);
     if(this.elements.length<1){
         return;
     }
       const title="拍照";
       const targetNode = this.elements[0];
       const previewSelector = $cq.system_web_reflection_getSelector(targetNode);
       
        return  new 未来之窗_系统_拍照(title,previewSelector,dataSelector).open();
    
};

$cq.系统_媒体_图片上传= function(人间通道Selector,检验关卡img,仙界指引Selector) {
   
 
    const 人间通道 = document.querySelector(人间通道Selector);
    const 检验关卡 = document.querySelector(检验关卡img);
    const 仙界指引 = document.querySelector(仙界指引Selector);
    人间通道.addEventListener('change', (event) => {
            const 人间信息 = event.target.files[0];
            if (人间信息) {
                if (!人间信息.type.match('image.*')) {
                    alert('请选择图片文件！');
                    return;
                }
                const reader = new FileReader();
                reader.onload = (e) => {
                    检验关卡.src = e.target.result;
                    仙界指引.value = e.target.result;
                };
                reader.readAsDataURL(人间信息);
            }
        });
     人间通道.click();
}

$cq.系统_神识_start= function(options){
    
    const 未来之窗app_神识ID = "未来之窗app_神识ID20260221";
    if( $cq("#"+未来之窗app_神识ID).length >0){
        return;
    }
    if(options){
        if(options.length>1){
            $cq.system_intent_loadskill(options);
        }
    }
    
const tpl_fams_intent_bot =`<style>
/* 核心容器 - 加前缀 fams_intent_chat */
.fams_intent_chat_container {
/*
  position:absolute;
  top:50%;left:50%;
  */
  transform:translate(-50%,-50%);
  width:300px;
  z-index:9999;
  position: absolute;
    transform: translate(-10px, -100px);
    box-shadow: -7px -9px 35px rgba(230, 160, 190, 0.6);
}

/* 外阴影 - 加前缀 */
.fams_intent_chat_float_shadow {
  position:absolute;inset:-8px;
  border-radius:20px;
  backdrop-filter:blur(10px);
  box-shadow:0 0 25px rgba(230,160,190,0.2);
  z-index:-1;
}

/* 输入框容器 - 加前缀 */
.fams_intent_chat_input_box {
  position:relative;
  background:rgba(30,34,46,0.8);
  border:1px solid rgba(120,140,255,0.25);
  border-radius:16px;
  padding:6px 8px;
  display:flex;align-items:center;gap:6px;
  z-index:1;
}

/* 模式标签 - 加前缀 */
.fams_intent_chat_mode_tag {
  padding:4px 6px;min-width:24px;
  background:rgba(255,255,255,0.08);
  border:1px solid rgba(255,255,255,0.15);
  border-radius:8px;
  font-size:12px;
  color:#ccc;
  text-align:center;
}

/* 输入框 - 加前缀 */
.fams_intent_chat_input {
  flex:1;
  background:rgba(0,0,0,0.2);
  border:none;outline:0;
  padding:6px 8px;
  border-radius:8px;
  color:#eef;
  font-size:13px;
}
.fams_intent_chat_input::placeholder {color:#999}

/* 按钮通用 - 加前缀 */
.fams_intent_chat_btn {
  border:none;border-radius:8px;
  display:grid;place-items:center;
  width:28px;height:28px;
}
/* 发送按钮 - 加前缀 */
.fams_intent_chat_send_btn {background:#1a1c23;color:#fff}
/* 详情按钮 - 加前缀 */
.fams_intent_chat_detail_btn {background:rgba(255,255,255,0.08);color:#ccc;font-size:12px}

/* 聊天面板 - 加前缀 */
.fams_intent_chat_panel {
  position:absolute;bottom:100%;left:0;right:0;
  margin-bottom:8px;
  border-radius:16px;
  overflow:hidden;
  display:none;
}
.fams_intent_chat_panel.show {display:block;animation:fams_intent_chat_up .3s forwards}
@keyframes fams_intent_chat_up {from{opacity:0;translate:0 6px}to{opacity:1;translate:0 0}}

/* 聊天内容区 - 加前缀 + 滚动关键：overflow-y: auto */
.fams_intent_chat_content {
  background:rgba(30,34,46,0.8);
  border:1px solid rgba(120,140,255,0.25);
  border-radius:16px;
  padding:10px 10px 16px 10px;
  display:flex;
  flex-direction:column;
  gap:8px;
  max-height:220px;
  overflow-y: auto; /* 关键：开启垂直滚动 */
  /* 滚动条美化（可选） */
  scrollbar-width: thin;
  scrollbar-color: rgba(120,140,255,0.2) transparent;
    
}
/* 滚动条美化 - 兼容Chrome */
.fams_intent_chat_content::-webkit-scrollbar {
  width: 4px;
}
.fams_intent_chat_content::-webkit-scrollbar-thumb {
  background: rgba(120,140,255,0.2);
  border-radius: 2px;
}
.fams_intent_chat_content::-webkit-scrollbar-track {
  background: transparent;
}

/* 聊天项 - 加前缀 */
.fams_intent_chat_item {display:flex;gap:6px;align-items:flex-end}
.fams_intent_chat_item.you {flex-direction:row-reverse}

/* 头像 - 加前缀 */
.fams_intent_chat_avatar {
  width:24px;height:24px;
  border-radius:50%;
  background:#4488ff;
  color:#fff;
  font-size:10px;
  display:grid;place-items:center;
  flex-shrink:0;
}
.fams_intent_chat_item.you .fams_intent_chat_avatar {background:#55bb99}
/* AI头像改为「神识」 */
.fams_intent_chat_item.ai .fams_intent_chat_avatar {content:'神识'; text-content: '神识';}

/* 气泡 - 加前缀 */
.fams_intent_chat_bubble {
  padding:6px 10px;
  border-radius:12px;
  font-size:12px;
  max-width:70%;
  background:rgba(255,255,255,0.1);
  color: #4488ff;
}
.fams_intent_chat_item.you .fams_intent_chat_bubble {background:#55bb99;color:#fff}

/* 时间/参数文本 - 加前缀 */
.fams_intent_chat_info {
  font-size:10px;
  color:#999;
  text-align:center;
  margin:2px 0;
}
</style>

<!-- HTML结构 - 全部替换为类名，去掉ID -->
<div class="fams_intent_chat_container">
  <div class="fams_intent_chat_panel">
    <div class="fams_intent_chat_content">
      <!-- 初始聊天记录 -->
      <div class="fams_intent_chat_item you">
        <div class="fams_intent_chat_avatar">我</div>
        <div class="fams_intent_chat_bubble">你好</div>
      </div>
      <div class="fams_intent_chat_info">2026-03-20 15:30:00 | param: init</div>
      <div class="fams_intent_chat_item ai">
        <div class="fams_intent_chat_avatar">神识</div>
        <div class="fams_intent_chat_bubble">执行完毕</div>
      </div>
    </div>
  </div>

  <div class="fams_intent_chat_input_box">
    <div class="fams_intent_chat_float_shadow"></div>
    <div class="fams_intent_chat_mode_tag">令</div>
    <input class="fams_intent_chat_input" placeholder="输入指令...">
    <button class="fams_intent_chat_btn fams_intent_chat_send_btn">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path>
      </svg>
    </button>
    <button class="fams_intent_chat_btn fams_intent_chat_detail_btn">详</button>
  </div>
</div>`;

$cq.对话框().layer(tpl_fams_intent_bot,{type:"frame",width:"320px",height:"70px;",hidetitle:true,barbg:"transparent",alpha:"0.1",move:false,id:未来之窗app_神识ID,align:6});

$cq('.fams_intent_chat_detail_btn').事件('click',function(er){
         const chatPanel = document.querySelector('.fams_intent_chat_panel');
	 const chatContent = document.querySelector('.fams_intent_chat_content');
	     chatPanel.classList.toggle('show');
	  // 显示时自动滚动到底部
	  if (chatPanel.classList.contains('show')) {
	    chatContent.scrollTop = chatContent.scrollHeight;
	  }
});

$cq('.fams_intent_chat_send_btn').事件('click',function(er){
 fams_intent_embed_sendMsg();
})

$cq('.fams_intent_chat_input').事件('keydown',function(e){
 if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault(); // 阻止换行
    fams_intent_embed_sendMsg();
  }
 
})


};
     
     


// 发送消息逻辑
function fams_intent_embed_sendMsg() {
  const msg = $cq('.fams_intent_chat_input').val();
  if (!msg) return;
  
  // 调用自定义函数添加「我」的消息
  fams_intent_embed_add_msg(msg, 'user_cmd', true);
  $cq('.fams_intent_chat_input').val('');
  
  if(fams_nlu){
       fams_intent_embed_add_msg('神识收到指令', 'ai_response', false);
       const intent_say = fams_nlu.convertChineseToDigit(msg);
       const intentcallret = fams_nlu.start(intent_say);
      for (const intentitem of intentcallret) {
          
         // 兼容 Chrome 53 过滤 null
        var filter_intentitemparam = {};
       
        
        for (var key in intentitem.param) {
            if (intentitem.param.hasOwnProperty(key)) {
                var val = intentitem.param[key];
                // 只过滤 null，保留 0、空字符串、false
                if (val !== null) {
                    filter_intentitemparam[key] = val;
                }
            }
        }

           fams_intent_embed_add_msg("发送指令："+JSON.stringify(filter_intentitemparam), 'ai_response', false);
           
          if (typeof window.cyberWin_Device_AIOT_Monitor === 'function') {
                // 是函数
                const skillexecutorret = cyberWin_Device_AIOT_Monitor(intentitem.intent,JSON.stringify(intentitem.param));
                
                 fams_intent_embed_add_msg('神识返回：'+skillexecutorret, 'ai_response', false);  
                 
           }else{
               console.log("no intent skill exect");
           }
      }
  }else{
     fams_intent_embed_add_msg('神识没有启动', 'ai_response', false);  
  }

  // 模拟AI回复
  setTimeout(() => {
    // 调用自定义函数添加「神识」的消息
   // fams_intent_embed_add_msg('执行完毕', 'ai_response', false);
  }, 500);
}

/**
 * 添加聊天消息
 * @param {string} msg - 消息内容
 * @param {string} param - 参数（自定义）
 * @param {boolean} isme - true=我发送，false=AI/神识发送
 */
function fams_intent_embed_add_msg(msg, param, isme) {
   const chatContent = document.querySelector('.fams_intent_chat_content');
  // 获取当前时间（格式：YYYY-MM-DD HH:MM:SS）
  const now = new Date();
  const timeStr = $cq.未来之窗_时间_格式化({date:new Date(),str:"yyyy-MM-dd hh:mm:ss"});
  
  // 1. 创建时间/参数行
   
  // 1. 创建时间/参数行
    var infoLine = document.createElement('div');
    infoLine.className = 'fams_intent_chat_info';
    
    // 用 if 语句判断 param 值，替代三元表达式/空值合并
    var paramText;
    if (param !== undefined && param !== null) {
        paramText = param; // param 有有效值时使用
    } else {
        paramText = 'default'; // param 为空时使用默认值
    }
    // 传统字符串拼接（兼容 Chrome 53）
    infoLine.textContent = timeStr + ' | param: ' + paramText;
    
    // 2. 创建消息项
    var msgItem = document.createElement('div');
    
    // 用 if 语句判断 isme，替代三元表达式
    var msgClass;
    if (isme) {
        msgClass = 'fams_intent_chat_item you'; // 自己发送的消息
    } else {
        msgClass = 'fams_intent_chat_item ai'; // AI 回复的消息
    }
    msgItem.className = msgClass;
  
  // 3. 创建头像和气泡
  const avatar = document.createElement('div');
  avatar.className = 'fams_intent_chat_avatar';
  avatar.textContent = isme ? '我' : '神识'; // AI头像改为神识

  const bubble = document.createElement('div');
  bubble.className = 'fams_intent_chat_bubble';
  bubble.textContent = msg;

  // 4. 组装消息项
  msgItem.appendChild(avatar);
  msgItem.appendChild(bubble);

  // 5. 添加到聊天区
  chatContent.appendChild(infoLine);
  chatContent.appendChild(msgItem);

  // 6. 强制滚动到底部（关键修复：确保滚动生效）
  setTimeout(() => {
    chatContent.scrollTop = chatContent.scrollHeight;
  }, 0);
}
  
  
 //2026-03-28
 //////////////
// 原有对外函数名【完全不动】兼容所有旧业务
$cq.东方仙盟_文字压缩算法_fixed32 = function(input) {
      // 1. 保留你原创的加权计算逻辑
    let arr = Array.from(input || '').map(function(char, idx) {
        return char.charCodeAt(0) * 20 * (idx + 1);
    });

    // 2. 强化哈希：超长文本也不重复
    let hash = 0x7F2A9C;
    for (let i = 0; i < arr.length; i++) {
        let num = arr[i];
        hash ^= num;
        hash = (hash << 5) - hash + (i & 0xFF); // 加入位置扰动，彻底防重复
        hash = hash & 0xFFFFFFFF;
    }

    // 3. 转无符号正数
    hash = hash >>> 0;

    // 4. 生成8位基础哈希
    let hex = hash.toString(16).padStart(8, '0');

    // 5. 关键：循环混淆填满32位，不重复、无前导0
    let result = '';
    let temp = hex;
    while (result.length < 32) {
        let mix = parseInt(temp.slice(-8), 16) + 0x7A5B3C;
        temp = mix.toString(16);
        result += temp;
    }

    // 6. 固定输出 32 位十六进制（小写）
    return result.slice(0, 32);
};

$cq.系统_算法_文本压缩md5 = function(input){
    return $cq.东方仙盟_文字压缩算法_fixed32(input);
};

$cq.system_algorithm_textmd5 = function(input){
    return $cq.东方仙盟_文字压缩算法_fixed32(input);
};

//2026-04-05
$cq.system_intent_loadskill= function(microhybirdappsn){
    
	 
        const lftsssnconvert = $cq.系统_算法_文本压缩md5(microhybirdappsn);
                	 //cyberwin_仙盟创梦_appstart
         var 仙盟创梦_神识_思维 = "";
         const 仙盟2026神识_标识="famscommonintent";  
         var 本地模板 ="仙盟创梦_神识_"+lftsssnconvert;
          if (localStorage.getItem(本地模板) === null) {
                console.log("本地神识不存在"+本地模板);
                const 灵舟="http://51.onelink.ynwlzc.net/o2o/index.php/fams_lftss/LFTSS_IntentBundle" 
                $cq.ajax({
                       type: "POST",
                       url: 灵舟,
                       data: { lftsssn: microhybirdappsn,sysmenu:"bankill",internal_datafrom:"famside",internal_app_sn:"",open_webpreview:"Y",mphwc:"|33|no_fams_export|close_user_noselect|divine_exterminate_fams_sysmenu|disappear_famermaidchart|44|",sacn_showqr:"N",show_detail:"N",show_type_wikidoc:"N" },
                       dataType: "JSON",
                       success: function(response) {
                             console.log(response);
                             if (response.status === 9) {
                                 $cq.showTip({message:response.message,mask:false,duration:800});
                                 仙盟创梦_神识_思维 = response.fams_LFTSS_IntentBundle;
                                 const 仙盟创梦_神识_思维obj = JSON.parse(仙盟创梦_神识_思维);
                                  console.log(仙盟创梦_神识_思维obj);
                                 window.localStorage.setItem(本地模板, 仙盟创梦_神识_思维);
                                 fams_nlu.injectIndustryRules(仙盟2026神识_标识, 仙盟创梦_神识_思维obj);
                                 fams_nlu.setCurrentIndustry(仙盟2026神识_标识);
                                 
                             } else {
                                 $cq.showTip({message:response.message,mask:false,duration:800});
                             }
                           },
                           error: function(xhr, error) {
                                 console.log("请求错误：", error);
                           }
                           });
                                                                                                    
                                                
                                                                                           
                } else {
                    console.log("本地神识已存在"+本地模板);
                    const 仙盟创梦_神识_思维ex = localStorage.getItem(本地模板)
                     const 仙盟创梦_神识_思维obj = JSON.parse(仙盟创梦_神识_思维ex);
                     console.log(仙盟创梦_神识_思维obj);
                     fams_nlu.injectIndustryRules(仙盟2026神识_标识, 仙盟创梦_神识_思维obj);
                                 fams_nlu.setCurrentIndustry(仙盟2026神识_标识);
                                  
                    const 灵舟="http://51.onelink.ynwlzc.net/o2o/index.php/fams_lftss/LFTSS_StatCounter" 
                    $cq.ajax({
                        type: "POST",
                        url: 灵舟,
                        data: { lftsssn: microhybirdappsn,sysmenu:"bankill",internal_datafrom:"famside",internal_app_sn:"",open_webpreview:"Y",mphwc:"|33|no_fams_export|close_user_noselect|divine_exterminate_fams_sysmenu|disappear_famermaidchart|44|",sacn_showqr:"N",show_detail:"N",show_type_wikidoc:"N" },
                        dataType: "JSON",
                        success: function(response) {
                            console.log(response);
                            if (response.status === 9) {
                                $cq.showTip({message:response.message,mask:false,duration:800});
                            } else {
                                $cq.showTip({message:response.message,mask:false,duration:800});
                            }
                        },
                        error: function(xhr, error) {
                            console.log("请求错误：", error);
                        }
                       });
                                                    
                                             
                }

}
$cq.系统_神识_加载= function(microhybirdappsn){
    return $cq.system_intent_loadskill(microhybirdappsn);
}


$cq.File_convertFileSize  = function(currentNum, currentUnit, targetUnit) {
    //contentWindow
    const that=this;
    // 存储单位优先级列表 & 对应2的幂次数值（核心映射表）
            const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            // 核心：计算当前单位和目标单位的层级差，1层级=2^10
            const currIndex = units.indexOf(currentUnit);
            const targetIndex = units.indexOf(targetUnit);
            const levelDiff = currIndex - targetIndex;
            // 核心换算公式：所有单位先转B，再转目标单位，保证精度统一
            const result = currentNum * Math.pow(2, 10 * levelDiff);
            return result;
};
