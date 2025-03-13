# HOW TO CREATE REACT APP WITH VITE BY CREATE-NEXT-APP WITH STEPS BELOW

NEXTJS IS A FRAMEWORK.
IT IS SUITABLE BUILD REACTJS APP BY CREATE-NEXT-APP.<br/>
THE BELOW ARE THE STEPS.

## 1. INSTALL THE NEXTJS APP BY CREATE-NEXT-APP

Open CMD and execute the command as below.<br/>
`npx create-next-app@latest`

## 2. FILL THE OPTIONS BY ENABLE TYPESCRIPT AND REACT[AUTO INSTALLING] AND NAMED IT AS FRONTEND-APP3

√ What is your project named? ... frontend-app3 <br/>
√ Would you like to use TypeScript? ... Yes <br/>
√ Would you like to use ESLint? ... Yes <br/>
√ Would you like to use Tailwind CSS? ... No <br/>
√ Would you like your code inside a `src/` directory? ... Yes <br/>
√ Would you like to use App Router? (recommended) ... Yes <br/>
√ Would you like to use Turbopack for `next dev`? ... No <br/>
√ Would you like to customize the import alias (`@/*` by default)? ... Yes <br/>
√ What import alias would you like configured? ... @/\* <br/>

## 3. NAVIGATE TO THE SELECTED FOLDER AND INSTALL DEPENDENCIES, THEN RUN THE APP.

Navigate to the frontend-app2 folder by the CMD command <br/>
`cd frontend-app3`<br/>
Install all dependencies from package.json by the CMD command<br/>
`npm install`<br/>
Update package.json and add this line under "scripts".  
`"exec": "next dev && next start"`<br/>
Run the app by the CMD command<br/>
`npm run exec`

## 4. ADD MODEL CLASSES FOR EACH COMPONENTS

The example of model class for PText as below <br/>

```
export type PTextModel = {
  keyword?: any;
  text?: any;
  className?: string;
  id?: string;
  onClick?: () => void;
}
```

## 5. DISABLE SERVER-SIDE RENDERING [SSR] TO AVOID SSR ERROR AND ALLOW ONLY CLIENT-SIDE RENDERING

Use dynamic import with { ssr: false } for client-only components to avoid SSR error by default. <br/>
Disable SSR is to disable server-side rendering for "React-Select" component and only render it on the client side as below. <br/>

Add this part into PSelect component <br/>
and replace "import Select, { components } from 'react-select' " <br/>
to "import { components } from 'react-select'". <br/>

```
import { components } from 'react-select';

const Select = dynamic(
  () => import('react-select').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => null,
  },
);
```

## 6. INSTALL MORE NPM PACKAGES INTO THE APP

Add react-select for select dropdown element<br/>
`npm i --save react-select` <br/>
Add html-react-parser for parse HTML to React parser that works on both the server (Node.js) and the client (browser)<br/>
`npm i --save html-react-parser`<br/>
Add the font of source-sans-pro<br/>
`npm install @fontsource/source-sans-pro`<br/>
Add the font of opens-sans<br/>
`npm install @fontsource/open-sans`

## 7. ADJUST THE FILES AFTER NPM PACKAGES INSTALLATION

a) Import font-awesome packages into layout.tsx<br/>

```
import "@fontsource/source-sans-pro"; // Defaults to weight 400
import "@fontsource/source-sans-pro/400.css"; // Specify weight
import "@fontsource/source-sans-pro/400-italic.css"; // Specify weight and style
import "@fontsource/source-sans-pro/600.css"; // Specify weight
import "@fontsource/source-sans-pro/600-italic.css"; // Specify weight and style
import "@fontsource/open-sans"; // Defaults to weight 400
import "@fontsource/open-sans/400.css"; // Specify weight
import "@fontsource/open-sans/400-italic.css"; // Specify weight and style
import "@fontsource/open-sans/600.css"; // Specify weight
import "@fontsource/open-sans/600-italic.css"; // Specify weight and style
```

b) Update global.css as below <br/>

```
.search-input__placeholder, .search-input__single-value {
  text-align: left;
}

.search-input__menu {
  ...
  position: initial !important;
  ...
}
```

## 8. ADD ENVIRONMENT VARIABLES

NextJS has built-in support for loading environment variables.<br/>
The variables can be created in the steps below.<br/>
a) Create .env file<br/>
All environment variables must be prefixed with "NEXT_PUBLIC\_"<br/>

```
NEXT_PUBLIC_QUERY_RESULT_URL=https://gist.githubusercontent.com/.../queryResult.json
NEXT_PUBLIC_SUGGESTION_URL=https://gist.githubusercontent.com/.../suggestion.json
```

b) Call environment variables in tsx files <br/>

```
const variableA = process.env.NEXT_PUBLIC_QUERY_RESULT_URL;
```

## 8. ADD TESTING FEATURE INTO THE APP BY VITEST

Vite has built-in support for testing using Vitest by install Vitest and React Testing Library as below.<br/>
It can be fit into NextJs app as well. <br/>

a) Install dependencies<br/>
`npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom vite-tsconfig-paths`<br/>

b) Configure vitest.config.js<br/>
Create and place vitest.config.ts in the root folder. <br/>

```
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Vitest config
export default defineConfig({
  test: {
    environment: 'jsdom', // Use jsdom to simulate the browser environment
    globals: true, // Use globals like `expect` from Vitest
    setupFiles: './src/setupTests.ts', // Path to setup file for jest-dom matchers
    css: false, // Optional: Disable CSS imports in tests
  },
  plugins: [react()],
});

```

c) Create a Setup File for Global Configurations, setupTests.ts<br/>
Create and place setupTests.ts in src folder. <br/>
`import '@testing-library/jest-dom';`<br/>

d) Change jest.fn() to vi.fn<br/>
vi.fn() is Vitest's version of jest.fn()<br/>

e) Update package.json as below.<br/>

```
"scripts": {
  "test": "vitest run", // Run tests once
  "test:watch": "vitest watch", // Watch for changes and re-run tests
  "test:coverage": "vitest -- --coverage" //run tests with coverage
}
```

f) Run test by CMD command<br/>
`npm run test`<br/>
`npm run test:watch`<br/>
`npm run test:coverage`
