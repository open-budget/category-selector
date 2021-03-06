// Generated by CoffeeScript 1.7.1
var CategoriesFilter, CategoriesSelect, CategoriesSelectCleaner, CategoriesStatusBar, Settings, settingsAdd, settingsRemove;

Settings = [];

settingsAdd = function(id) {
  if (Settings.indexOf(id !== -1)) {
    return Settings.push(id);
  }
};

settingsRemove = function(id) {
  var index;
  index = Settings.indexOf(id);
  if (index !== -1) {
    return Settings = Settings.slice(0, index).concat(Settings.slice(index + 1, Settings.length));
  }
};

CategoriesFilter = (function() {
  return {
    init: function() {
      var filterEl;
      filterEl = document.querySelector("#category-selector .filter input");
      return filterEl.addEventListener("keyup", function() {
        var categories, category, haystack, needle, _i, _len, _results;
        categories = document.querySelectorAll("#category-selector .categories ul li");
        _results = [];
        for (_i = 0, _len = categories.length; _i < _len; _i++) {
          category = categories[_i];
          haystack = category.querySelector(".name").innerHTML.toLocaleLowerCase();
          needle = filterEl.value.toLowerCase();
          _results.push(category.style.display = RegExp(needle).test(haystack) ? "block" : "none");
        }
        return _results;
      });
    }
  };
})();

CategoriesSelect = (function() {
  var draw;
  draw = function(categories) {
    var ul;
    ul = document.querySelector("#category-selector .categories ul");
    return (categories || []).forEach(function(category) {
      var li;
      li = document.createElement("li");
      li.setAttribute("data-code", category.code);
      if (category.selected) {
        li.className = "selected";
      }
      li.innerHTML = "<div class=\"check\">\n    <svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\">\n      <path d=\"M13 .156l-1.406 1.438-5.594 5.594-1.594-1.594-1.406-1.438-2.844 2.844 1.438 1.406 3 3 1.406 1.438 1.406-1.438 7-7 1.438-1.406-2.844-2.844z\" />\n    </svg>\n</div>\n<div class=\"name\">" + category.name + "</div>";
      li.addEventListener("click", function() {
        var id;
        id = li.getAttribute("data-code");
        if (li.className === "selected") {
          li.className = "";
          settingsRemove(id);
        } else {
          li.className = "selected";
          settingsAdd(id);
        }
        return CategoriesStatusBar.redraw();
      });
      return ul.appendChild(li);
    });
  };
  return {
    init: function() {
      return draw(data);
    }
  };
})();

CategoriesStatusBar = (function() {
  var selectedCountEl, totalCountEl;
  selectedCountEl = document.querySelector("#category-selector .statusbar .selected-count");
  totalCountEl = document.querySelector("#category-selector .statusbar .total-count");
  return {
    redraw: function() {
      return selectedCountEl.innerHTML = Settings.length;
    },
    init: function() {
      selectedCountEl.innerHTML = Settings.length;
      return totalCountEl.innerHTML = data.length;
    }
  };
})();

CategoriesSelectCleaner = (function() {
  return {
    init: function() {
      var cleanerEl;
      cleanerEl = document.querySelector("#category-selector .clean");
      return cleanerEl.addEventListener("click", function() {
        var categories, category, _i, _len, _results;
        Settings = [];
        CategoriesStatusBar.redraw();
        categories = document.querySelectorAll("#category-selector .categories ul li");
        _results = [];
        for (_i = 0, _len = categories.length; _i < _len; _i++) {
          category = categories[_i];
          _results.push(category.className = "");
        }
        return _results;
      });
    }
  };
})();

window.addEventListener("load", function() {
  CategoriesSelect.init();
  CategoriesFilter.init();
  CategoriesStatusBar.init();
  return CategoriesSelectCleaner.init();
});
