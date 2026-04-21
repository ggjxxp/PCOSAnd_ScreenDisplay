package com.vsmedia.appstatusbar;

import android.content.Context;
import android.os.Handler;
import android.os.Looper;
import android.widget.Toast;

public class VSToastUtil {
  private static Handler handler = new Handler(Looper.getMainLooper());
  
  private static Object synObj;
  
  private static Toast toast = null;
  
  static {
    synObj = new Object();
  }
  
  public static void showMessage(Context paramContext, String paramString) {
    showMessage(paramContext, paramString, 0);
  }
  
  public static void showMessage(final Context act, final String msg, final int len) {
    (new Thread(new Runnable() {
          public void run() {
            VSToastUtil.handler.post(new Runnable() {
                  public void run() {
                    synchronized (VSToastUtil.synObj) {
                      if (VSToastUtil.toast != null) {
                        VSToastUtil.toast.cancel();
                        VSToastUtil.toast.setText(msg);
                        VSToastUtil.toast.setDuration(len);
                      } else {
                       // VSToastUtil.access$102(Toast.makeText(act, msg, len));
                      } 
                      VSToastUtil.toast.show();
                      return;
                    } 
                  }
                });
          }
        })).start();
  }
}


/* Location:              D:\wlzc_institute\wlzc\wlzc1-dex2jar.jar!\com\vsmedia\appstatusbar\VSToastUtil.class
 * Java compiler version: 6 (50.0)
 * JD-Core Version:       1.1.3
 */