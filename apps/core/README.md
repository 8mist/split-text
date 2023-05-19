<div align="center">

# SplitText

<p>SplitText is a small and type-safe library that split HTML text into characters and/or words.</p>
<p><em>⚠️ This library is a work in progress, the API is subject to change until the v1.0 release.</em></p>

<br/>
<br/>
</div>

## Fast Track ⏱️

Discover the library in **less than 5 minutes**.

Install [Node.js](https://nodejs.org/en/download/) and install SplitText using your favorite package
manager.

```bash
npm install @gregoire.ciles/split-text
```

```bash
yarn add @gregoire.ciles/split-text
```

```bash
pnpm add @gregoire.ciles/split-text
```

Then, open your favorite code editor and create new files `index.html` and `index.ts`.

```html
<h1 id="my-element">
  SplitText is a small and type-safe library that split HTML text into characters and/or words.
</h1>
```

```ts
import SplitText from '@gregoire.ciles/split-text';

// DOM element
const element = document.getElementById('my-element');

const { chars, words } = new SplitText(element);

console.log({ chars, words });
```

Finally, open `index.html` in your browser and open the console to see the result.

## TypeScript Support

SplitText is written in TypeScript and provides type definitions.

> **Note:** TypeScript is not required to use SplitText.

> **💡 TIP:** Type annotations are very useful and help your IDE understand the type provided by
> SplitText. <br /> The IDEs (VSCode, WebStorm, etc.) will be able to provide you with
> autocompletion and type hints.

## Credits

[© Grégoire Ciles](https://github.com/GregoireCiles)

## Licence

[GNU General Public License v3.0](./LICENSE)
