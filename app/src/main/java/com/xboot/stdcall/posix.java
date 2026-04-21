package com.xboot.stdcall;

public class posix {
  public static final int O_APPEND = 8192;
  
  public static final int O_CREAT = 256;
  
  public static final int O_EXCL = 512;
  
  public static final int O_NOCTTY = 1024;
  
  public static final int O_NONBLOCK = 16384;
  
  public static final int O_RDONLY = 1;
  
  public static final int O_RDWR = 3;
  
  public static final int O_SYNC = 65536;
  
  public static final int O_TRUNC = 4096;
  
  public static final int O_WRONLY = 2;
  
  public static final int SEEK_CUR = 1;
  
  public static final int SEEK_END = 2;
  
  public static final int SEEK_SET = 0;
  
  static {
    System.loadLibrary("posix");
  }
  
  public static final native boolean access(String paramString, int paramInt);
  
  public static final native boolean chdir(String paramString);
  
  public static final native boolean chmod(String paramString, int paramInt);
  
  public static final native boolean chown(String paramString, int paramInt1, int paramInt2);
  
  public static final native boolean close(int paramInt);
  
  public static final native int dup(int paramInt);
  
  public static final native void dup2(int paramInt1, int paramInt2);
  
  public static final native void exit(int paramInt);
  
  public static final native int fork();
  
  public static final native boolean fsync(int paramInt);
  
  public static final native boolean ftruncate(int paramInt, long paramLong);
  
  public static final native String getcwd();
  
  public static final native int getegid();
  
  public static final native int geterrno();
  
  public static final native int geteuid();
  
  public static final native char getfwver(int paramInt);
  
  public static final native int getgid();
  
  public static final native int getpgrp();
  
  public static final native int getpid();
  
  public static final native int getppid();
  
  public static final native int getuid();
  
  public static final native boolean kill(int paramInt1, int paramInt2);
  
  public static final native boolean link(String paramString1, String paramString2);
  
  public static final native long lseek(int paramInt1, long paramLong, int paramInt2);
  
  public static final boolean mkdir(String paramString) {
    return mkdir(paramString, 511);
  }
  
  public static final native boolean mkdir(String paramString, int paramInt);
  
  public static final native int nice(int paramInt);
  
  public static final int open(String paramString) {
    return open(paramString, 259, 438);
  }
  
  public static final native int open(String paramString, int paramInt1, int paramInt2);
  
  public static final native int poweronoff(byte paramByte1, byte paramByte2, byte paramByte3, byte paramByte4, byte paramByte5, int paramInt);
  
  public static final native String read(int paramInt1, int paramInt2);
  
  public static final native String readlink(String paramString);
  
  public static final boolean remove(String paramString) {
    return unlink(paramString);
  }
  
  public static final native boolean rename(String paramString1, String paramString2);
  
  public static final native boolean rmdir(String paramString);
  
  public static final native int setck(byte paramByte, int paramInt);
  
  public static final native void seterrno(int paramInt);
  
  public static final native boolean setgid(int paramInt);
  
  public static final native boolean setpgid();
  
  public static final native boolean setpgrp();
  
  public static final native boolean setsid();
  
  public static final native boolean setuid(int paramInt);
  
  public static final native boolean symlink(String paramString1, String paramString2);
  
  public static final native int system(String paramString);
  
  public static final native int tcgetpgrp(int paramInt);
  
  public static final native boolean tcsetpgrp(int paramInt1, int paramInt2);
  
  public static final native int umask(int paramInt);
  
  public static final native boolean unlink(String paramString);
  
  public static final native String version();
  
  public static final native int watchdogenable(byte paramByte, int paramInt);
  
  public static final native int watchdogfeed(int paramInt);
  
  public static final native int write(int paramInt, byte[] paramArrayOfbyte);
}


/* Location:              D:\wlzc_institute\wlzc\wlzc1-dex2jar.jar!\com\xboot\stdcall\posix.class
 * Java compiler version: 6 (50.0)
 * JD-Core Version:       1.1.3
 */