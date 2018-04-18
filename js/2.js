window.onload=function(){
	var show=document.getElementById("show");
	var span=document.querySelector("#buttons span");
	var as=span.querySelectorAll('a');
	var toolbox=document.getElementById("toolbox");
	var spans=toolbox.querySelectorAll("span");
	var close=document.getElementById("close");
	var inputs=toolbox.querySelectorAll("input");
	var p=document.querySelector("#wrap p");
	
	//右侧点击展开
	show.onclick=function(){
		span.style.display='block';
	};
	
	//右侧查找点击功能
	as[0].onclick=spans[0].onclick=function(){
		toolbox.style.display='block';
		toolbox.className='search';
		
		removeSpan();
	};
	
	//右侧替换点击功能
	as[1].onclick=spans[1].onclick=function(){
		toolbox.style.display='block';
		toolbox.className='replace';
		
		removeSpan();
	};
	
	//关闭
	close.onclick=function(){
		toolbox.style.display=span.style.display='none';
	};
	
	
	//下面查找功能
	inputs[1].onclick=function(){
		var val=inputs[0].value;
		
		//用户没有输入内容
		if(!val){
			//这个条件成立说明用户什么都没有输入
			alert('请输入内容');
			return;		//用户什么东西都没有输入的时候，只用弹个框提示一下就行了，后面的代码就不用走了
		}
		
		/*
		 * 以下是用户输入内容的时候
		 * 	1、用户输入的内容没找到，弹一下
		 * 	2、用户输入的内容找到了，标个黄
		 * 
		 */
		
		//用户输入的内容没找到
		if(p.innerHTML.indexOf(val)==-1){
			//这个条件成立，说明用户输入的内容没有找到
			alert('你输入的内容没有找到');
			inputs[0].value='';
			return;		//用户输入的内容没有找到的时候，也只用弹一个框提示一下就行了，下面的代码也不用走了
		}
		
		//用户输入的内容找到了，标个黄
		removeSpan();
		var result=p.innerHTML.split(val);
		p.innerHTML=result.join('<span>'+val+'</span>');
		inputs[0].value='';
	};
	
	
	
	//下面替换的功能
	inputs[4].onclick=function(){
		var val1=inputs[2].value;
		var val2=inputs[3].value;
		
		//第一个框里没有输入内容
		if(!val1){
			alert('请输入要替换的内容');
			return;
		}
		
		//第一个框里有输入的内容了，但是没有找到
		if(p.innerHTML.indexOf(val1)==-1){
			alert('你输入的内容没有找到');
			inputs[2].value='';
			return;
		}
		
		//第一个框里的内容找到了，但是第二个框里没有输入内容，要做一个删除的功能
		if(!val2){
			var result=confirm('你确定要删除么');
			
			if(!result){
				//这个条件成立了说明用户点击了取消按钮
				inputs[2].value='';
				return;
			}
		}
		
		var text=p.innerHTML.split(val1);
		p.innerHTML=text.join(val2);
		inputs[2].value=inputs[3].value='';
	};
	
	
	//去除span标签
	function removeSpan(){
		//清除掉所有的input里的内容
		var inputs=document.querySelectorAll("#toolbox input[type=text]");
		for(var i=0;i<inputs.length;i++){
			inputs[i].value='';
		}
		
		//去除span标签
		var strArr=p.innerHTML.split('<span>');
		strArr=strArr.join('');
		
		strArr=strArr.split('</span>');
		strArr=strArr.join('');
		
		p.innerHTML=strArr;
		
		/*
		 * 用来给<span>HTML</span>网页增加动态功能
		 * ["用来给","HTML</span>网页增加动态功能"]
		 * 用来给HTML</span>网页增加动态功
		 * ["用来给HTML","网页增加动态功"]
		 * 用来给HTML网页增加动态功
		 */
	}
};