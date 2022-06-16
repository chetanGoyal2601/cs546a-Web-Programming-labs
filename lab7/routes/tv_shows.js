const express = require("express");
const router = express.Router();
const data = require("../data");
const tvShowsData = data.tvShows;

router.route("/").get(async (req, res) => {
  res.render("tvShows", { pageTitle: "Show Finder" });
});

router.route("/searchshows").post(async (req, res) => {
  let showName = req.body.showSearchTerm;
  try {
    validation(showName);
    const shows = await tvShowsData.searchShows(showName);
    res.render("tvShows/tvShowMany", {
      pageTitle: "Shows Found",
      showSearchTerm: showName,
      tvShows: shows,
    });
  } catch (e) {
    res.status(e.code).render("tvShows/tvShowMany", {
      pageTitle: "Shows Found",
      showSearchTerm: showName,
      tvShows: [],
      error: e.message,
    });
  }
});

router.route("/show/:id").get(async (req, res) => {
  if (
    !req.params.id ||
    typeof req.params.id !== "string" ||
    req.params.id.trim().length === 0
  ) {
    return res
      .status(400)
      .json({ ErrorMessage: "A valid id must be provided!" });
  }
  const showId = parseInt(req.params.id, 10);

  if (isNaN(showId)) {
    return res
      .status(400)
      .json({ ErrorMessage: "A valid id must be a number!" });
  }
  //console.log(showId);
  try {
    const tvShowDetails = await tvShowsData.searchShowByID(showId);
    const show = {
      showName: tvShowDetails.name || "NA",
      showImage: tvShowDetails.image,
      showLanguage: tvShowDetails.language || "NA",
      showGenres: tvShowDetails.genres || "NA",
      showRating: tvShowDetails.rating.average || "NA",
      showNetwork: tvShowDetails.network.name || "NA",
      showSummary: tvShowDetails.summary || "NA",
    };
    //console.log(show);
    res.render("tvShows/singleShow", {
      pageTitle: show.showName,
      show: show,
    });
  } catch (e) {
    res.status(e.code).render("tvShows/singleShow", {
      pageTitle: "Show Finder Error",
      error: e.message,
    });
  }
});

function validation(showName) {
  if (!showName) throw { code: 400, message: "Show name must be provided!" };
  if (typeof showName !== "string")
    throw { code: 400, message: "Show name must be of string type!" };
  if (showName.trim().length === 0)
    throw { code: 400, message: "Show name must be provided" };
}

module.exports = router;
