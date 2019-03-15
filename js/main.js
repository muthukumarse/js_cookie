// trigged from document onload
const init = () => {
  // Simply adding more colors will work as expected. Sample commented
  const availableColors = [
    { name: "Blue", colorCode: "#0000FF" },
    { name: "Red", colorCode: "#FF0000" }
    // { name: 'Green', 	colorCode: '#008000'}
  ];

  const app = new CookieApp(availableColors);
  // nothing else exposed apart from render function
  app.render();
}