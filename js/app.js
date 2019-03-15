/*
  Here masked variables and method apart from render into runtime.
  Note - JS class avoided, since private mthod not available natively
*/
function CookieApp(colors) {
  const availableColors = colors;

  const cookieLib = new CookieHandlers();

  const registerClickEventListener = () => {
    // bind click event on "Clear my Lucky Color" button
    document.getElementById("clickMe").addEventListener("click", function () {
      // here arrow function not used since wants to set attribute by using this
      cookieLib.deleteCookie("luckyColor");
      cookieLib.deleteCookie("luckyColorCount");
      document.getElementById("statusText").innerText =
        "Cleared, you may refresh your screen Now";
      document.getElementById("statusText").className = "greenText";
      this.setAttribute("disabled", "disabled");
    });
  }
  
  const paintReport = () => {
    const luckyColor = cookieLib.getCookie("luckyColor");
    const luckyColorName = availableColors[luckyColor].name;
    const report = availableColors
      .map(color => {
        let luckyColorCount = 0;
        if (luckyColorName === color.name) {
          luckyColorCount = cookieLib.getCookie("luckyColorCount");
        }
        return `<span style='color:${color.colorCode}'>${
          color.name
        }</span> - ${luckyColorCount}`;
      })
      .join("<br/>");
    const reportEle = document.getElementById("report");
    reportEle.innerHTML = report;
  };

  const reRender = () => {
    // get the color and count from cookie if exist
    let luckyColor = cookieLib.getCookie("luckyColor");
    let luckyColorCount = +cookieLib.getCookie("luckyColorCount");

    // if null which means first time or either cookie cleared manually or by given button "Clear my Lucky Color"
    // set luckyColor and luckyColorCount immediately
    if (!luckyColor) {
      luckyColor = Math.floor(
        Math.random() * Object.keys(availableColors).length
      ); // get either 0 .... availableColors-1
      cookieLib.setCookie("luckyColor", luckyColor);
    }
    cookieLib.setCookie("luckyColorCount", luckyColorCount + 1);

    // update Color details on DOM
    document.getElementById("whichColor").innerText =
      availableColors[luckyColor].name;
    document.getElementById("ball").style.backgroundColor =
      availableColors[luckyColor].colorCode;

    // update available Colors and count
    document.getElementById("totalColors").innerText = Object.keys(
      availableColors
    ).length;
    document.getElementById("colorsList").innerText = availableColors
      .map((color) => {
        return color.name;
      })
      .join(", ");
    paintReport();
  }

  // only this method exposed
  this.render = () => {
    registerClickEventListener();
    reRender();
  }
}
