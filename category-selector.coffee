Settings = []

settingsAdd = (id) ->
    Settings.push id if Settings.indexOf id != -1

settingsRemove = (id) ->
    index = Settings.indexOf id
    unless index == -1
        Settings = Settings.slice(0, index).concat Settings.slice(index+1, Settings.length)

CategoriesFilter = do () ->
    init: ->
        filterEl = document.querySelector "#category-selector .filter input"
        filterEl.addEventListener "keyup", ->
            categories = document.querySelectorAll("#category-selector .categories ul li")
            for category in categories
                haystack = category.querySelector(".name").innerHTML.toLocaleLowerCase()
                needle = filterEl.value.toLowerCase()
                category.style.display = if RegExp(needle).test haystack then "block" else "none"

CategoriesSelect = do () ->
    draw = (categories) ->
        ul = document.querySelector "#category-selector .categories ul"

        (categories || []).forEach (category) ->
            li = document.createElement("li")
            li.setAttribute("data-code", category.code)
            li.className = "selected" if category.selected
            li.innerHTML = """
                <div class="check">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="16" height="16" viewBox="0 0 16 16">
                      <path d="M13 .156l-1.406 1.438-5.594 5.594-1.594-1.594-1.406-1.438-2.844 2.844 1.438 1.406 3 3 1.406 1.438 1.406-1.438 7-7 1.438-1.406-2.844-2.844z" />
                    </svg>
                </div>
                <div class="name">#{category.name}</div>
            """

            li.addEventListener "click", ->
                id = li.getAttribute("data-code")
                if li.className == "selected"
                    li.className = ""
                    settingsRemove id
                else
                    li.className = "selected"
                    settingsAdd id

                CategoriesStatusBar.redraw()

            ul.appendChild li

    init: -> draw data

CategoriesStatusBar = do () ->
    selectedCountEl = document.querySelector "#category-selector .statusbar .selected-count"
    totalCountEl = document.querySelector "#category-selector .statusbar .total-count"

    redraw: ->
        selectedCountEl.innerHTML = Settings.length

    init: ->
        selectedCountEl.innerHTML = Settings.length
        totalCountEl.innerHTML = data.length

CategoriesSelectCleaner = do () ->
    init: ->
        cleanerEl = document.querySelector("#category-selector .clean")
        cleanerEl.addEventListener "click", ->
            Settings = []
            CategoriesStatusBar.redraw()

            categories = document.querySelectorAll "#category-selector .categories ul li"
            for category in categories
                category.className = ""


window.addEventListener "load", () ->
    CategoriesSelect.init()
    CategoriesFilter.init()
    CategoriesStatusBar.init()
    CategoriesSelectCleaner.init()
