import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'autocomplete-valid',
            selector: '*:not([autocomplete="nope"])',
            enabled: false,
          },
        ],
      },
    },
    options: {
      storySort: (a, b) => {
        const aPath = a.id.split('/')
        const bPath = b.id.split('/')

        for (let i = 0; i < Math.max(aPath.length, bPath.length); i++) {
          const aPart = aPath[i] || ''
          const bPart = bPath[i] || ''

          const compare = aPart.localeCompare(bPart, undefined, {
            numeric: true,
          })
          if (compare !== 0) {
            return compare
          }
        }

        return 0
      },
    },
  },
};

export default preview;
