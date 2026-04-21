package david.demos;

import CyberWinPHP.Cyber_Plus.LogToFile;
import david.support.ext.net.IpScanner;

/**
 * Created by chendingwei on 16/11/17.
 */

public class SimpleLogger implements IpScanner.ScannerLogger {
    @Override
    public void onScanLogPrint(String msg) {
        LogToFile.d_windows("设备管理","自寻", ""+msg);
       // Log.v("cdw",">>>"+msg);
    }
}
