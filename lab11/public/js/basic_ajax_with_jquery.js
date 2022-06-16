(function ($) {
  var searchForm = $("#searchForm"),
    search_term = $("#search_term"),
    error = $("#error"),
    showList = $("#showList"),
    homeLink = $("#homeLink"),
    showName = $("#show");

  //Displaying the first page with list of all shows
  $(document).ready(function () {
    var requestConfig = {
      method: "GET",
      url: "http://api.tvmaze.com/shows",
    };
    $.ajax(requestConfig).then(function (data) {
      let listElements = ``;
      for (const i of data) {
        listElements += `<li>
                            <a href="${i._links.self.href}">
                                ${i.name}
                            </a>
                        </li>`;
      }
      showList.append(listElements);
    });
    showList.show();
  });

  $(document).on("submit", "form#searchForm", function (event) {
    event.preventDefault();
    error.hide();
    //error.hidden = true;
    homeLink.hide();
    //homeLink.hidden = true;

    showName.hide();
    //showList.innerHTML = ``;
    // console.log("Hello1");
    const showToSearch = search_term.val();
    //console.log("Hello");
    //console.log(showToSearch);
    //console.log("Hello3");
    if (!showToSearch || showToSearch.trim().length == 0) {
      error.show();

      search_term.focus();
      return;
    }
    showList.html(``);
    //console.log("hello");
    var requestConfig = {
      method: "GET",
      url: `http://api.tvmaze.com/search/shows?q=` + showToSearch.trim(),
    };
    $.ajax(requestConfig).then(function (data) {
      homeLink.show();
      showsSearched(data);
    });
  });

  function showsSearched(shows) {
    //console.log("test");
    if (shows.length == 0) {
      alert("No such show exists");
      return;
    }
    //console.log("test2");
    let listElements = ``;

    for (const i of shows) {
      listElements += `<li>
                        <a href="${i.show._links.self.href}">
                            ${i.show.name}
                        </a>
                    </li>`;
    }
    showList.append(listElements);
    showList.show();
  }

  $(document).on("click", "ul#showList > li > a", function (event) {
    event.preventDefault();

    error.hide();
    showList.hide();
    showName.html(``);
    homeLink.show();

    const showUrl = $(this).attr("href");

    var requestConfig = {
      method: "GET",
      url: showUrl,
    };
    $.ajax(requestConfig).then(function (data) {
      showList.hide();
      displayShow(data);
    });
  });

  function displayShow(show) {
    let html = ``;
    let title;
    if (!show.name || show.name.length == 0) {
      title = "N/A";
    } else {
      title = show.name;
    }

    html += `<h1>
                    ${title}
                </h1>`;
    let imageUrl;
    if (!show.image || Object.keys(show.image).length == 0) {
      imageUrl = "/public/image/no-image.png";
    } else {
      imageUrl = show.image.medium;
    }

    html += `<img src="${imageUrl}" alt="${title}">`;

    let language;
    if (!show.language || show.language.length == 0) {
      language = "N/A";
    } else {
      language = show.language;
    }

    let genres = "N/A";

    if (show.genres && show.genres.length > 0) {
      let liHtml = ``;

      for (const currentGenre of show.genres) {
        liHtml += `<li>${currentGenre}</li>`;
      }

      genres = `<ul>
                        ${liHtml}
                    </ul>`;
    }

    const averageRating =
      !show.rating ||
      Object.keys(show.rating).length < 1 ||
      !show.rating.average
        ? "N/A"
        : show.rating.average;

    let network;
    if (
      !show.network ||
      Object.keys(show.network).length < 1 ||
      !show.network.name
    ) {
      network = "N/A";
    } else {
      network = show.network.name;
    }

    let summary;
    if (!show.summary || show.summary.length == 0) {
      summary = "N/A";
    } else {
      summary = show.summary;
    }

    html += `<dl>
                    <dt>Language</dt>
                    <dd>${language}</dd>
                    <dt>Genres</dt>
                    <dd>${genres}</dd>
                    <dt>Average Rating</dt>
                    <dd>${averageRating}</dd>
                    <dt>Network</dt>
                    <dd>${network}</dd>
                    <dt>Summary</dt>
                    <dd>${summary}</dd>
                </dl>`;

    showName.html(html);
    showName.show();
  }
})(window.jQuery);

//   -----------------
