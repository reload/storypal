import Twig from 'twig';
import twigDrupal from 'twig-drupal-filters';
import isChromatic from 'chromatic/isChromatic';
import '!style-loader!css-loader!../dist/css/toybox.bundle.css';

if (isChromatic()) {
  window.isChromatic = true;
}

import './drupal.js';

import '../dist/js/storypal_theme.polyfills.js';

// Add the filters to Twig instance.
twigDrupal(Twig);

const viewPorts = {
  mobile: {
    name: 'Mobile',
    styles: {
      width: '600px',
      height: '960px',
    },
  },
  tablet: {
    name: 'Tablet',
    styles: {
      width: '768px',
      height: '1024px',
    },
  },
  tabletLandscape: {
    name: 'Tablet Landscape',
    styles: {
      width: '1024px',
      height: '768px',
    },
  },
  laptop: {
    name: 'Laptop',
    styles: {
      width: '1200px',
      height: '768px',
    },
  },
  desktop: {
    name: 'Desktop',
    styles: {
      width: '1600px',
      height: '1080px',
    },
  },
};

export const parameters = {
  viewport: {
    viewports: viewPorts,
    defaultViewport: 'laptop',
  },
  layout: "fullscreen",
  showPanel: false,
  backgrounds: {
    default: 'storypal-layout',
    values: [
      {
        name: 'storypal-layout',
        value: '#fafafb',
      },
    ],
  },
}

document.addEventListener("DOMContentLoaded", function(){
  Drupal.attachBehaviors();
});
