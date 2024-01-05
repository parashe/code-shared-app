

//import react from react library
const React = require("react");
// import the file system
const fs = require("fs");
//import the babel for the parser
const parser = require("@babel/parser");
//import the traverse for traversing the AST
const traverse = require("@babel/traverse").default;
//import babel types  to analyse  and manipulate the AST
const t = require("@babel/types");



// Define the input file path
//The file path is taken from the  shared folder and shared/components/movie.js
//In this section the path is hard-coded but we can do it dynamically in the future.

const inputFilePath = "./shared/components/movie.js";

// Read the code from the specified file
//This line reads the contents of the file specified by the inputFilePath variable
// using the synchronous readFileSync method of the fs and stored the result in the code variable.
//Where in the code we have the content (code) of the movie.js file

const extractedCode = fs.readFileSync(inputFilePath, "utf-8");

// Parse the original code using the Babel parser from the @babel/parser library, generating the original Abstract Syntax Tree (AST)
//to get the structure of the extractedCode.
//for the specified code with configuration options indicating it's of module type and includes JSX syntax.
// The original AST is stored in the originalAst variable.
const originalAst = parser.parse(extractedCode, {
  sourceType: "module",
  plugins: ["jsx"],
});

// Clone the AST(Abstract Syntax Tree) for traversal using Babel's cloneNode
// The AST is cloned using Babel's
// cloneNode function. The purpose of cloning is likely to have a copy of the original AST for further manipulation.
const ast = t.cloneNode(originalAst);

// Function to convert JSX components to React elements
const convertToReactElements = (
  jsxComponents, // Array of JSX components to convert
  result = [], // Accumulator array to store the resulting React elements
  parentStyles = {} // Styles inherited from the parent component
) => {
  // Iterate through each JSX element in jsxComponents
  jsxComponents.forEach((jsxElement, index) => {
    // Check if the element is a JSXElement
    if (jsxElement.type === "JSXElement") {
      // Get the opening element of the JSX element
      const openingElement = jsxElement.openingElement;

      // Extract the type (name) of the JSX element
      const elementType = openingElement.name.name;

      // Recursively convert the children of the JSX element to React elements
      const children = convertToReactElements(jsxElement.children, [], {
        ...getStylesFromAttributes(openingElement.attributes),
      });

      // Extract styles from JSX attributes
      const styles = getStylesFromAttributes(openingElement.attributes);

      // Generate a unique key for the React element
      const key = jsxElement.key || `_${elementType}_${index}`;

      // Check if the JSX element type is "input"
      if (elementType === "input") {
        // Extract additional props (attributes) from JSX attributes
        const props = getPropsFromAttributes(openingElement.attributes);
        // Create a React element for the "input" element with specified key, additional props, and styles
        const reactElement = React.createElement(
          // Specify the type (name) of the element
          elementType,
          {
            // Provide a unique key for React's reconciliation
            key: jsxElement.key || `_${elementType}_${index}`,
            // Spread additional props (attributes) extracted from JSX
            ...props,
            // Apply styles converted from React Native styles
            style: convertReactNativeStyles(styles),
          }
        );

        // Add the "input" element to the result array
        result.push(reactElement);
      }

      // Check if the React element key is unique and handle different element types
      if (!result.some((element) => element.key === key)) {
        // Check if the JSX element type is "img"
        // Check if the JSX element type is "img"
        if (elementType === "img") {
          // Find the "source" attribute in JSX attributes
          const srcAttribute = openingElement.attributes.find(
            (attribute) => attribute.name.name === "source"
          );

          // Check if the "source" attribute exists and its value type is JSXExpressionContainer
          if (
            srcAttribute &&
            srcAttribute.value.type === "JSXExpressionContainer"
          ) {
            // Extract the source value from JSXExpressionContainer
            //this gives the path of the image
            const srcValue = srcAttribute.value.expression.arguments[0].value;

            // Create a React element for the "img" element with specified source, alt, and styles
            const imgElement = React.createElement("img", {
              key, // Provide a unique key for React's reconciliation
              src: require("../shared/components/car.jpg"), //directly the images source is used but we can use it dynamically in the future.
              alt: parentStyles?.alt, // Use the alt attribute from parentStyles if available
              style: convertReactNativeStyles(parentStyles), // Apply styles converted from React Native styles
            });

            // Add the "img" element to the result array
            result.push(imgElement);
          }


        } // Check if the JSX element type is "button"
        else if (elementType === "button") {
          // Find the "title" attribute in JSX attributes
          const titleAttribute = openingElement.attributes.find(
            (attribute) => attribute.name.name === "title"
          );

          // Check if the "title" attribute exists and has a value
          if (titleAttribute && titleAttribute.value) {
            // Extract the title value from the "title" attribute
            const titleValue = titleAttribute.value.value;

            // Apply styles to the button by merging parentStyles and current styles
            const buttonStyles = {
              ...convertReactNativeStyles(parentStyles),
            };

            // Create a React element for the "button" element with specified onClick handler and styles
            const buttonElement = React.createElement(
              "button",
              {
                key, // Provide a unique key for React's reconciliation
                onClick: () => {
                  // Handle button click if needed
                },
                style: buttonStyles, // Apply styles to the button
              },
              titleValue, // Include the title value as the button's content
              ...children // Include any children components within the button
            );

            // Add the "button" element to the result array
            result.push(buttonElement);
          }
        } else {
          // Create a React element for non-button elements with specified styles and children
          const otherElement = React.createElement(
            elementType,
            {
              key,
              // Apply styles only to non-button elements
              style: convertReactNativeStyles(styles),
            },
            children
          );

          // Add the non-button element to the result array
          result.push(otherElement);
        }
      }
    } else if (jsxElement.type === "JSXText") {
      // Check if the element type is JSXText
      const trimmedValue = jsxElement.value.trim();
      // Check if the trimmed value is not empty
      if (/\S/.test(trimmedValue)) {
        // Add the trimmed value to the result array
        result.push(trimmedValue);
      }
    }
  });

  return result; // Return the final array of React elements
};

// Function to convert React Native styles to web-compatible styles
const convertReactNativeStyles = (styles) => {

  // Create an object to store the converted styles
  const convertedStyles = {};

  // Iterate through each key in the original styles
  Object.keys(styles).forEach((key) => {
    // Convert the React Native style key to CSS property name
    const cssProperty = convertToCssPropertyName(key);

    /// this css property gets the converted styles in the form of web version  from react native
    const camelCaseProperty = cssProperty.replace(/-([a-z])/g, (g) =>
      g[1].toUpperCase()
    );

    // Add the converted style to the result object
    convertedStyles[camelCaseProperty] = styles[key];
  });

  // Return the object containing the converted styles
  return convertedStyles;
};

// Function to extract styles from JSX attributes
const getStylesFromAttributes = (attributes) => {
  // Initialize an empty object to store styles
  let styles = {};

  // Iterate through each attribute in the JSX element
  attributes.forEach((attribute) => {
    // Check if the attribute is the "style" attribute
    if (attribute.name && attribute.name.name === "style") {
      // Check if the style value is an JSXExpressionContainer
      if (attribute.value.type === "JSXExpressionContainer") {
        // Extract styles from JSXExpressionContainer
        styles = {
          ...styles,
          ...getStylesFromExpression(attribute.value.expression),
        };
      }
    }

    // Explicitly check for the "source" attribute (e.g., in Image elements)
    if (attribute.name && attribute.name.name === "source") {
      // Check if the value is an JSXExpressionContainer
      if (attribute.value.type === "JSXExpressionContainer") {
        // Extract the source value from JSXExpressionContainer
        const srcValue = attribute.value.expression.arguments[0].value;
        styles.src = srcValue;
      }
    }

    // Handle button-specific styles
    if (attribute.name && attribute.name.name === "color") {
      // Convert React Native color to web-compatible color
      styles.color = attribute.value.value;
    }
  });

  // Return the extracted styles
  return styles;
};

// Function to extract styles from JSXExpressionContainer
const getStylesFromExpression = (expression) => {
  // Initialize an empty object to store styles
  const styles = {};
  // Check if the expression type is "ObjectExpression"
  if (expression.type === "ObjectExpression") {
    // Iterate through each property in the ObjectExpression
    expression.properties.forEach((property) => {
      // Extract property name and value
      const propertyName = property.key.name;
      const propertyValue = property.value.value;

      // Add the property to the styles object
      styles[propertyName] = propertyValue;
    });
  }
  // Check if the expression type is "CallExpression"
  else if (expression.type === "CallExpression") {
    // Extract styleSheetName from the callee
    const styleSheetName = expression.callee.name;

    // Access the global stylesheet object using styleSheetName
    const styleSheet = global[styleSheetName];

    // Check if the stylesheet is available
    if (styleSheet) {
      // Extract styleKey from the arguments
      const styleKey = expression.arguments[0].value;

      // Add the style from the stylesheet to the styles object
      styles[styleKey] = styleSheet[styleKey];
    }
  }
  // Return the extracted styles
  return styles;
};

// Function to converts the given react native css  property name to its CSS equivalent
const convertToCssPropertyName = (cssPropertykey) => {
  //This converts the camelCase property to simple web version  css.
  const convertedCssProperty = cssPropertykey
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase();
  return convertedCssProperty;
};

// Function to extract props from JSX attributes excluding the "style" attribute
const getPropsFromAttributes = (attributes) => {
  // Initialize an empty object to store props
  let props = {};

  // Iterate through each attribute in the JSX element
  attributes.forEach((attribute) => {
    // Check if the attribute has a name and is not the "style" attribute
    if (attribute.name && attribute.name.name !== "style") {
      // Extract the attribute name and value (defaulting to true if value is undefined)
      props[attribute.name.name] = attribute.value
        ? attribute.value.value
        : true;
    }
  });

  // Return the extracted props
  return props;
};



// Define a functional component 'TranspileComponent'
const TranspileComponent = () => {
  // State to store JSX components
  const [JSXComponents, setJSXComponents] = React.useState([]);

  // Effect hook to transpile JSX elements when AST changes
  React.useEffect(() => {
    // Components array to store modified JSX elements
    const components = [];

    // Traverse the AST
    traverse(ast, {
      // Callback for JSXElement nodes in the AST
      JSXElement(path) {
        try {
          // Handle JSX elements outside map
          const openingElement = path.node.openingElement;

          // Modify JSX elements based on their type
          // Check if the openingElement exists and has a name
          if (openingElement && openingElement.name) {
            // Check if the JSX element type is "View"
            if (openingElement.name.name === "View") {
              // Change the JSX element type to "div"
              openingElement.name.name = "div";
              // Change the closing element type to "div"
              path.node.closingElement.name.name = "div";
            }
            // Check if the JSX element type is "Text"
            else if (openingElement.name.name === "Text") {
              // Change the JSX element type to "p"
              openingElement.name.name = "p";
              // Change the closing element type to "p"
              path.node.closingElement.name.name = "p";
            }
            // Check if the JSX element type is "TextInput"
            else if (openingElement.name.name === "TextInput") {
              // Change the JSX element type to "input"
              openingElement.name.name = "input";

              // Remove children from the input element
              path.node.children = [];
            }
            // Check if the JSX element type is "Button"
            else if (openingElement.name.name === "Button") {
              // Change the JSX element type to "button"
              openingElement.name.name = "button";
              // Check if there is a closing element
              if (path.node.closingElement) {
                // Change the closing element type to "button"
                path.node.closingElement.name.name = "button";
              }
            } 
            // Check if the JSX element type is "Image"
            else if (openingElement.name.name === "Image") {
              // Change the JSX element type to "img"
              openingElement.name.name = "img";
            }

            // Check if the JSX element is at the top level
            if (!path.findParent((p) => p.isJSXElement())) {
              // Add the modified JSX element to the components array
              components.push(path.node);
            }
          }
        } catch (error) {
          // Log errors during JSXElement processing
          console.error("Error processing JSXElement:", error);
          console.error("Problematic JSXElement:", path.node);
        }
      },
    });

    // Update the state with the modified JSX components
    //set the modified JSX components in the state
    setJSXComponents(components);
  }, [ast]); // Include ast as a dependency

  // Convert JSX components to React elements
  // pass the modified jsx components to the convertToReactElements function to convert them to React elements
  const reactElements = convertToReactElements(JSXComponents);

  // Render the React elements within a div
  return <>{reactElements}</>;
};

// Export the transpiled component for use in other modules
export default TranspileComponent;
