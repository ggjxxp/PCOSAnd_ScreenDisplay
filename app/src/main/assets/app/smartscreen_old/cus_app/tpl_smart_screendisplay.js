var tpl_未来之窗_东方仙盟_布局 = `
  {cwpdapp{# for(var i in d){ }}
   <cyberdiv id="{cwpdapp{ d[i].plus_id}}" class="cyberwin_screen_item"   style="background-color: {cwpdapp{ d[i].backgroundcolor}}; width: {cwpdapp{ d[i].width}}px; height: {cwpdapp{ d[i].height}}px;left:{cwpdapp{ d[i].left}}px;top:{cwpdapp{ d[i].top}}px;z-index: {cwpdapp{ d[i].zindex}};">{cwpdapp{ d[i].layoutbody}}</cyberdiv>
  	 
{cwpdapp{# } }}
`;

var 临时=`

<script type= "text/html" id="cyber_cyberwinapp_tpl" style="display:none;" >
 <div id="sb-slider" class="sb-slider" style="margin-top: 0px;">
{cwpdapp{# for(var i in d){ }}

  	 <img src="{cwpdapp{ d[i].image}}" title="{cwpdapp{ d[i].name}}" style=""/>
{cwpdapp{# } }}
</div>
</script>


<script type= "text/html" id="cyber_cyberwinapp_tpl_max_w_1000" style="display:none;" >
 <div id="sb-slider" class="sb-slider" style="margin-top: 0px;">
{cwpdapp{# for(var i in d){ }}

  	 <img src="{cwpdapp{ d[i].image}}" title="{cwpdapp{ d[i].name}}" style="width:560px;height:399px !important;object-fit: cover;"/>
{cwpdapp{# } }}
</div>
</script>

<!--2024-01-27----->

<script type= "text/html" id="cyber_cyberwinapp_tpl_hotel_roomimg_width_752" style="display:none;" >
 <div id="sb-slider" class="sb-slider">
{cwpdapp{# for(var i in d){ }}

  	 <img src="{cwpdapp{ d[i].image}}" title="{cwpdapp{ d[i].name}}" style="width:752px;height:480px;"/>
{cwpdapp{# } }}
</div>
</script>

<script type= "text/html" id="cyber_cyberwinapp_tpl_hotel_roomimg_width_700" style="display:none;" >
 <div id="sb-slider" class="sb-slider">
{cwpdapp{# for(var i in d){ }}

  	 <img src="{cwpdapp{ d[i].image}}" title="{cwpdapp{ d[i].name}}" style="width:700px;height:480px;"/>
{cwpdapp{# } }}
</div>
</script>


<script type= "text/html" id="cyber_cyberwinapp_hotelprice_tpl_market_now_member" style="display:none;"  alt="未来之窗酒店房价牌">
 
{cwpdapp{# for(var i in d){ }}

  	 <tr><td colspan=4 >

					{cwpdapp{# if( i%2 == 0){ }}
							<cyberdiv class="colorline yellow">
					  {cwpdapp{#  }else{ }}
						
						   <cyberdiv class="colorline white">
					  {cwpdapp{# } }}
					   
                        <cyberdiv class="colorline_one "> {cwpdapp{ d[i].name}} </cyberdiv>
					    <cyberdiv class="colorline_one ">{cwpdapp{ d[i].market_price}} </cyberdiv>
					    <cyberdiv class="colorline_one ">{cwpdapp{ d[i].price}} </cyberdiv>
						 <cyberdiv class="colorline_one ">{cwpdapp{ d[i].vip_price}} </cyberdiv>
				  
				  
			 </td></tr>
{cwpdapp{# } }}

</script>




<script type= "text/html" id="cyber_cyberwinapp_hotelprice_tpl_market_now" style="display:none;"  alt="未来之窗酒店房价牌">
 
{cwpdapp{# for(var i in d){ }}

  	 <tr><td colspan=4 >

					{cwpdapp{# if( i%2 == 0){ }}
							<cyberdiv class="colorline yellow">
					  {cwpdapp{#  }else{ }}
						
						   <cyberdiv class="colorline white">
					  {cwpdapp{# } }}
					   
                        <cyberdiv class="colorline_one "> {cwpdapp{ d[i].name}} </cyberdiv>
					    <cyberdiv class="colorline_one ">{cwpdapp{ d[i].market_price}} </cyberdiv>
					    <cyberdiv class="colorline_one ">{cwpdapp{ d[i].price}} </cyberdiv>
						 
				  
				  
			 </td></tr>
{cwpdapp{# } }}

</script>
`;