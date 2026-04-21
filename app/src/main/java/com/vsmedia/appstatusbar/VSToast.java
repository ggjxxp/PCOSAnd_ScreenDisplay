package com.vsmedia.appstatusbar;

import android.content.Context;
import android.os.Handler;
import android.os.Message;
import android.widget.Toast;

public class VSToast {
  private static final int MSG_VSTOAST_SHOW = 1;
  
  private Context ctx = null;
  
  private Handler mHandler = new Handler() {
      public void handleMessage(Message param1Message) {
        switch (param1Message.what) {
          default:
            return;
          case 1:
            break;
        } 
        VSToast.this.do_showToast((VSToast.VSToastData)param1Message.obj);
      }
    };
  
  public VSToast(Context paramContext) {
    this.ctx = paramContext;
  }
  
  private void do_showToast(VSToastData paramVSToastData) {
    if (paramVSToastData.wait) {
      Toast.makeText(this.ctx, paramVSToastData.text, paramVSToastData.duration).show();
      return;
    } 
    VSToastUtil.showMessage(this.ctx, paramVSToastData.text, paramVSToastData.duration);
  }
  
  public void addToast(String paramString, int paramInt) {
    VSToastData vSToastData = new VSToastData();
    vSToastData.text = paramString;
    vSToastData.duration = paramInt;
    vSToastData.wait = false;
    Message message = this.mHandler.obtainMessage(1);
    message.obj = vSToastData;
    this.mHandler.sendMessage(message);
  }
  
  public void addToast(String paramString, int paramInt, boolean paramBoolean) {
    VSToastData vSToastData = new VSToastData();
    vSToastData.text = paramString;
    vSToastData.duration = paramInt;
    vSToastData.wait = true;
    Message message = this.mHandler.obtainMessage(1);
    message.obj = vSToastData;
    this.mHandler.sendMessage(message);
  }
  
  public class VSToastData {
    public int duration;
    
    public String text;
    
    public boolean wait;
  }
}


/* Location:              D:\wlzc_institute\wlzc\wlzc1-dex2jar.jar!\com\vsmedia\appstatusbar\VSToast.class
 * Java compiler version: 6 (50.0)
 * JD-Core Version:       1.1.3
 */