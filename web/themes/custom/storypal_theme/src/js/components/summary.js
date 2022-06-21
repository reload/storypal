// Example of how a drupal behavior JS could look.
Drupal.behaviors.storypal_theme_summary = {
  // eslint-disable-next-line no-unused-vars
  attach: function (context, settings) {
    var summaries = context.querySelectorAll(
      ".js-summary:not(.is-initialized)"
    );

    summaries.forEach(function (summary) {
      summary.classList.add("is-initialized");

      var summaryActions = summary.querySelector(".js-summary-actions");

      summaryActions.addEventListener("click", function (e) {
        e.preventDefault();

        summary.classList.toggle("has-open-summary");
      });
    });
  },
};
