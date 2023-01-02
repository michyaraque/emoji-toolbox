![](images/banner.jpg)
# 🧰 Emoji Toolbox ~ 😁✅🎉
Want to add a touch of color to your application or website with emojis? Emoji Toolbox is the tool you need! This library allows you to extract the **dominant color of any emoji** and use it as background color or any other purpose.

## Installation
To install Emoji Toolbox, run the following command in your terminal:

npm or yarn
```bash
npm install emoji-toolbox

yarn add emoji-toolbox
```
Once you have it installed, you can use it in your code like this:

#### ES6
```js
const Emoji = require('emoji-toolbox');

const emojiSoftColor = new Emoji("✅").emojiData;
```

#### Typescript
```typescript
import Emoji from 'emoji-toolbox';

const emoji = new Emoji("🧽");

const emojiObject = emoji.emojiData; // All emoji data

const emojiName = emoji.name();
const emojiUnicode = emoji.unicode();

// Normal color (The base)
const colorHexN = emoji.normalColor().hexadecimal;
const colorRGBN = emoji.normalColor().rgb;

// The most darken color with -40% of brightness and saturation
const colorHexS = emoji.softColor().hexadecimal;
const colorRGBS = emoji.softColor().rgb;

// The most darken color with +40% of brightness and saturation
const colorHexD = emoji.darkenColor().hexadecimal;
const colorRGBD = emoji.darkenColor().rgb;
```

This code creates a new instance of the Emoji class with the "🧽" emoji as an argument. You can then access the various properties and methods of this instance to get different pieces of data about the emoji.

For example, the emojiData property contains all the data for the emoji, including its name, Unicode, and various color styles. The name() and unicode() methods return the name and Unicode of the emoji, respectively. The normalColor() method returns the base color style of the emoji, and its hexadecimal and rgb properties contain the color in hexadecimal and RGB formats, respectively.

## License
Emoji Toolbox is available under the Apache-2.0 License.