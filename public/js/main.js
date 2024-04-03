var hue = null;

function backColor() {
  return `hsl(${hue},40%,30%)`;
}

function linkColor() {
  return `hsl(${hue},70%,30%)`;
}

function updateStyle() {
  getHue();
  const sheet = new CSSStyleSheet();
  var theme = ('.theme-rolling .sidebar {background-color: ' + backColor() +
               ';}\n.theme-rolling .content a, .theme-rolling ' +
               '.related-posts li a:hover {color: ' + linkColor() + ';}');
  sheet.replaceSync(theme);
  document.adoptedStyleSheets = [sheet];
}

function updateColor() {}

function randomizeHue() {
  hue = Math.floor(Math.random() * 360);
  updateHue();
  resetColor();
}

function getHue() {
  if (hue == null) {
    hue = window.sessionStorage.getItem("page-hue");
    if (hue == null) {
        hue = Math.floor(Math.random() * 360);
        updateHue();
    } else {
      hue = parseInt(hue, 10);
    }
  }
}

function updateHue() {
  window.sessionStorage.setItem("page-hue", hue);
}

function updateClassBackgroundColor(class_name, color) {
  var all = document.getElementsByClassName(class_name);
  for (var i = 0; i < all.length; i++) { all[i].style.backgroundColor = color; }
}

function updateTagClassColor(tag, class_name, color) {
  var elements = document.getElementsByClassName(class_name);
  for (var i = 0; i < elements.length; i++) {
    var links = elements[i].getElementsByTagName(tag);
    for (var j = 0; j < links.length; j++) {
      links[j].style.color = color;
    }
  }
}

function resetColor() {
  updateClassBackgroundColor('sidebar', backColor());
  updateTagClassColor('a', 'content', linkColor());
}

function expandBlock(name) {
  var hide_obj = document.getElementById('a_' + name);
  var show_obj = document.getElementById('b_' + name);
  if (hide_obj != null)
    hide_obj.style = 'display: none';
  if (show_obj != null)
    show_obj.style = 'display: inline';
}

updateStyle();
