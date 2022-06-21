Drupal.behaviors.toybox_drag_buttons = {
  // eslint-disable-next-line no-unused-vars
  attach: function (context, settings) {
    // Poor mans detector: waiting for the tabledrag to be done.
    setTimeout(this.init(context), 2000);
  },

  // Finding all the draggable paragraphs, and adding our up/down buttons.
  init: function (context) {
    var draggableParagraphs = context.querySelectorAll(
      ".field--widget-entity-reference-paragraphs .draggable, .field--widget-paragraphs .draggable"
    );
    var that = this;

    if (!draggableParagraphs.length) {
      return;
    }

    draggableParagraphs.forEach(function (draggable) {
      var handle = draggable.querySelector(
        ".js-tabledrag-handle:not(.is-initialized)"
      );

      if (!handle) {
        return;
      }

      handle.classList.add("is-initialized");

      var upButton = document.createElement("a");
      upButton.setAttribute("href", "#");
      upButton.classList.add(
        "drag-buttons__button",
        "drag-buttons__button--up"
      );

      var downButton = document.createElement("a");
      downButton.setAttribute("href", "#");
      downButton.classList.add(
        "drag-buttons__button",
        "drag-buttons__button--down"
      );

      handle.parentNode.classList.add("drag-buttons");

      handle.parentNode.prepend(upButton);
      handle.parentNode.prepend(downButton);

      upButton.addEventListener("click", function (e) {
        e.preventDefault();

        that.moveDraggable(draggable, "up");
      });

      downButton.addEventListener("click", function (e) {
        e.preventDefault();

        that.moveDraggable(draggable, "down");
      });
    });
  },

  // Moving an element, either up and down, and setting the correct weight.
  moveDraggable: function (element, direction) {
    var sibling = element.nextElementSibling;

    if (direction === "up") {
      sibling = element.previousElementSibling;
    }

    var siblingWeightInput = sibling.querySelector(".delta-order select");
    var siblingWeight = siblingWeightInput.value;
    var weightInput = element.querySelector(".delta-order select");

    siblingWeightInput.value = weightInput.value;
    weightInput.value = siblingWeight;

    element.classList.add("drag-buttons__element", "is-animating");

    if (direction === "up") {
      element.parentNode.insertBefore(element, sibling);
    } else {
      element.parentNode.insertBefore(sibling, element);
    }

    element.scrollIntoView({ behavior: "smooth", block: "center" });

    setTimeout(function () {
      element.classList.remove("is-animating");
    }, 500);
  },
};
