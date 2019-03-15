// Exposed and utilized on app.js
class CookieHandlers {
    getCookie(name) {
      const v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
      return v ? v[2] : null;
    }
  
    setCookie(name, value, expire = 1) {
      const d = new Date();
      d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * expire);
      document.cookie =
        name + "=" + value + ";path=/;expires=" + d.toGMTString();
    }
  
    deleteCookie(name) {
      this.setCookie(name, "", -1);
    }
}
