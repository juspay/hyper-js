# @juspay-tech/hyper-js

The `@juspay-tech/hyper-js` package provides seamless integration of HyperSwitch's secure checkout features into your web application. It dynamically loads the required scripts, and initializes the HyperSwitch SDK.

## Installation

Install the package via npm or yarn:

```bash
npm install @juspay-tech/hyper-js
```

or

```bash
yarn add @juspay-tech/hyper-js
```

## Usage

### Importing the Library

```js
import { loadHyper } from "@juspay-tech/hyper-js";
```

### Loading HyperSwitch

The main function, `loadHyper`, dynamically loads the HyperSwitch SDK and initializes it with analytics metadata.

#### Syntax

```js
const hyperPromise = loadHyper("YOUR_PUBLISHABLE_KEY", {
  customBackendUrl: "YOUR_BACKEND_URL",
  // You can configure this as an endpoint for all the api calls such as session, payments, confirm call.
});
```

- **`str`**: A string representing your public key.
- **`option`**: Optional configuration object (`option<JSON.t>`).

#### Example

```js
loadHyper("YOUR_PUBLISHABLE_KEY", None)
->then(instance => {
  // Use the instance for further operations
})
->catch(err => {
  console.error("Failed to load Hyper:", err)
})
```

### Deprecated Function: `loadStripe`

The function `loadStripe` is deprecated and will be removed in future versions. It is a wrapper around `loadHyper` with a warning. Please use `loadHyper` instead.

#### Example

```js
loadStripe("YOUR_PUBLISHABLE_KEY", None);
```

**Warning:** This function will log a deprecation message in the console.

## Features

- Dynamically loads the HyperSwitch SDK based on the environment (Sandbox or Production).
- Ensures that only a single script instance is added to the page.
- Provides an easy-to-use promise-based API.

## Script URLs

The script URL is determined based on your environment and key:

- **Sandbox:** `https://beta.hyperswitch.io/v1/HyperLoader.js`
- **Production:** `https://checkout.hyperswitch.io/v0/HyperLoader.js`
- **Fallback:** Determines based on the prefix of the provided key (`pk_prd_`).

## Integration Warnings

The `loadHyper` function ensures that the `HyperLoader.js` script is added only once to the page. Adding multiple script tags may lead to unexpected behavior. If a script is already present, the function will issue a warning and use the existing script.

## Development and Contributions

Contributions are welcome! Please ensure that your changes align with the existing code style and add appropriate documentation.

## License

This project is licensed under the Apache License. See the [LICENSE](./LICENSE) file for details.

## Support

For further assistance, please contact [Support](https://github.com/juspay/hyperswitch-web/issues).
