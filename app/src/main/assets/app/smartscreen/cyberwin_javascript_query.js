/*
 未来之窗库
 javascript query design by cyberwin
 2022-7-8 
*/

function $cq(cyberobjname){
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
    switch(typeof cyberobjname){
        //如果参数是函数
        case 'function':
            myAddEvent(window,'load',cyberobjname);
            break;
        //如果参数是字符串
        case 'string':
            switch(cyberobjname.charAt(0)){
                case '#'://id选择器参数应该为#号之后的字符段
                    var obj=document.getElementById(cyberobjname.substring(1));
                    this.elements.push(obj);
                break;

                case '.'://class
                    this.elements=getByClass(document,cyberobjname.substring(1));
                    break;

                default://标签
                    this.elements=document.getElementsByTagName(cyberobjname);
            }
            break;
        //如果参数是对象。
        case 'object':
            this.elements.push(cyberobjname);
            
    }

}


//取值方法
cyberwin_query.prototype.val=function(value){
    if(arguments.length==1){//当参数个数为2时，使用设置css的方法
        var i=0;
        for(i=0;i<this.elements.length;i++){
            this.elements[i].value=value;
        }
    }else{//只有一个参数时获取样式
        return this.elements[0].value;;
    }
};



//2022-7-8 样式
//css方法
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



//eq选择器
cyberwin_query.prototype.eq=function(n){
    return new cyberwin_query(this.elements[n]);
}

// 
//对选择器函数绑定click事件
cyberwin_query.prototype.click=function(fn){
    var i=0;
    //对于返回器数组的内容
    for(i=0;i<this.elements.length;i++){
        myAddEvent(this.elements[i],'click',fn);
    }
}

cyberwin_query.prototype.find=function(str){
    var i=0;
    var aResult=[];//存放临时数据

    for(i=0;i<this.elements.length;i++){
        switch(str.charAt(0)){

            case '.'://class类
                var aEle=getByClass(this.elements[i],str.substring(1));
            aResult.concat(aEle);//桥接到aResult内。但是
            break;

            default://其它标签名(TagName)
                var aEle=this.elements[i].getElementsByTagName(str);
                appendArr(aResult,aEle);
        }
    }
    var newdQuery=new cyberwin_query();
    newdQuery.elements=aResult;
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
        this.elements[i].style.display='block';
    }
}

cyberwin_query.prototype.hide=function(){
    var i=0;
    //对于返回器数组的内容
    for(i=0;i<this.elements.length;i++){
        this.elements[i].style.display='none';
    }
};


  