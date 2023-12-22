// Import necessary modules
const fs = require("fs");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const t = require("@babel/types");
const React = require("react");

// Define the input file path
const inputFilePath = "./shared/components/movie.js";

// Read the code from the specified file
const code = fs.readFileSync(inputFilePath, "utf-8");

// Parse the original AST using Babel parser with JSX support
const originalAst = parser.parse(code, {
  sourceType: "module",
  plugins: ["jsx"],
});

// Clone the AST(Abstract Syntax Tree) for traversal using Babel's cloneNode
// The AST is cloned using Babel's
// cloneNode function. The purpose of cloning is likely to have a copy of the original AST for further manipulation.
const ast = t.cloneNode(originalAst);

const convertToReactElements = (
  jsxComponents,
  result = [],
  parentStyles = {}
) => {
  jsxComponents.forEach((jsxElement, index) => {
    if (jsxElement.type === "JSXElement") {
      const openingElement = jsxElement.openingElement;
      const elementType = openingElement.name.name;

      const children = convertToReactElements(jsxElement.children, [], {
        ...getStylesFromAttributes(openingElement.attributes),
      });

      const styles = getStylesFromAttributes(openingElement.attributes);
      const key = jsxElement.key || `_${elementType}_${index}`;

      if (!result.some((element) => element.key === key)) {
        if (elementType === "img") {
          const srcAttribute = openingElement.attributes.find(
            (attribute) => attribute.name.name === "source"
          );

          if (
            srcAttribute &&
            srcAttribute.value.type === "JSXExpressionContainer"
          ) {
            const srcValue = srcAttribute.value.expression.arguments[0].value;
            const fullSrcPath = `.${srcValue.replace(
              /^\.\.\//,
              "/shared_code/"
            )}`;

            const imgElement = React.createElement("img", {
              key,
              src: require(fullSrcPath),
              alt: parentStyles?.alt,
              style: convertReactNativeStyles(parentStyles),
            });

            result.push(imgElement);
          }
        } else if (elementType === "button") {
          const titleAttribute = openingElement.attributes.find(
            (attribute) => attribute.name.name === "title"
          );

          if (titleAttribute && titleAttribute.value) {
            const titleValue = titleAttribute.value.value;

            // Apply styles to the button by merging parentStyles and current styles
            const buttonStyles = {
              ...convertReactNativeStyles(parentStyles),
              ...convertReactNativeStyles(styles),
            };

            // Create a React element for the button with the title and styles
            const buttonElement = React.createElement(
              "button",
              {
                key,
                onClick: () => {
                  // Handle button click if needed
                },
                style: buttonStyles,
              },
              titleValue,
              ...children
            );

            // Add the button element to the result
            result.push(buttonElement);
          }
        } else {
          const otherElement = React.createElement(
            elementType,
            {
              key,
              // Apply styles only to non-button elements
              style: convertReactNativeStyles(styles),
            },
            children
          );

          result.push(otherElement);
        }
      }
    } else if (jsxElement.type === "JSXText") {
      const trimmedValue = jsxElement.value.trim();
      if (/\S/.test(trimmedValue)) {
        result.push(trimmedValue);
      }
    } else if (jsxElement.type === "JSXExpressionContainer") {
      // Handle JSXExpressionContainer
      const expression = jsxElement.expression;
      if (expression && expression.type === "MemberExpression") {
        // Assuming the content is in a MemberExpression, you might need to adjust this based on your actual AST structure
        // Extract content from the MemberExpression
        const content = extractContentFromMemberExpression(expression);

        if (content) {
          result.push(content);
        }
      }
    }
    // Handle other types as needed
  });

  return result;
};

// Function to convert React Native styles to web-compatible styles
const convertReactNativeStyles = (styles) => {
  console.log("styles", styles);
  const convertedStyles = {};
  Object.keys(styles).forEach((key) => {
    const cssPropertyName = convertToCssPropertyName(key);
    const camelCasePropertyName = cssPropertyName.replace(/-([a-z])/g, (g) =>
      g[1].toUpperCase()
    );
    convertedStyles[camelCasePropertyName] = styles[key];
  });
  return convertedStyles;
};

// Placeholder function, implement based on your AST structure
const extractContentFromMemberExpression = (expression) => {
  // Add logic to extract content from the MemberExpression
  // based on your actual AST structure
  return null;
};

// Function to extract styles from JSX attributes
const getStylesFromAttributes = (attributes) => {
  let styles = {};
  attributes.forEach((attribute) => {
    if (attribute.name && attribute.name.name === "style") {
      if (attribute.value.type === "JSXExpressionContainer") {
        // Extract styles from JSXExpressionContainer
        styles = {
          ...styles,
          ...getStylesFromExpression(attribute.value.expression),
        };
      }
    }

    // Explicitly check for the src attribute
    if (attribute.name && attribute.name.name === "source") {
      if (attribute.value.type === "JSXExpressionContainer") {
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
  return styles;
};

// Function to extract styles from JSXExpressionContainer
const getStylesFromExpression = (expression) => {
  const styles = {};
  if (expression.type === "ObjectExpression") {
    expression.properties.forEach((property) => {
      const propertyName = property.key.name;
      const propertyValue = property.value.value;
      styles[propertyName] = propertyValue;
    });
  } else if (expression.type === "CallExpression") {
    const styleSheetName = expression.callee.name;
    const styleSheet = global[styleSheetName];
    if (styleSheet) {
      const styleKey = expression.arguments[0].value;
      styles[styleKey] = styleSheet[styleKey];
    }
  }
  return styles;
};

// Function to convert camelCase to kebab-case
const convertToCssPropertyName = (propertyName) => {
  return propertyName.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
};

const TranspiledComponent = () => {
  // State to store JSX components
  const [jsxComponents, setJsxComponents] = React.useState([]);

  // Effect to traverse the AST and transpile JSX to HTML
  // Effect to traverse the AST and transpile JSX to HTML
  React.useEffect(() => {
    // Components array to store JSX elements
    const components = [];

    // Keep track of the current map function parameters
    let currentMapParams = [];

    // Traverse the AST
    traverse(ast, {
      // ArrowFunctionExpression(path) {
      //   console.log("pathparams", path.node.params);
      //   // Check if the arrow function has parameters
      //   if (path.node.params.length > 0) {
      //     // Track the parameters of the current map function
      //     currentMapParams = path.node.params
      //       .map((param) => {
      //         if (t.isIdentifier(param)) {
      //           console.log("param", param.name);
      //           return param.name;
      //         } else {
      //           // Handle destructuring, e.g., ( { item } )
      //           return null;
      //         }
      //       })
      //       .filter(Boolean);

      //     console.log("currentMapParams", currentMapParams);
      //   }
      // },
      JSXElement(path) {
        try {
          // Check if JSX element is part of a map function
          if (currentMapParams.length > 0) {
            const openingElement = path.node.openingElement;

            const elementType = openingElement.name.name;

            // Create a unique key for each element inside map
            // const key = currentMapParams
            //   .map((param) => {
            //     const binding = path.scope.getBinding(param);
            //     return binding ? binding.path.node.name : null;
            //   })
            //   .join("_");

            // Modify JSX elements based on their type
            if (elementType === "View") {
              openingElement.name.name = "div";
              path.node.closingElement.name.name = "div";
            } else if (elementType === "Text") {
              openingElement.name.name = "p";
              path.node.closingElement.name.name = "p";
            } else if (elementType === "Image") {
              openingElement.name.name = "img";

              const sourceAttribute = openingElement.attributes.find(
                (attribute) => attribute.name.name === "source"
              );

              // if (
              //   sourceAttribute &&
              //   sourceAttribute.value.type === "JSXExpressionContainer"
              // ) {
              //   const srcValue =
              //     sourceAttribute.value.expression.arguments[0].value;
              //   const fullSrcPath = `.${srcValue.replace(
              //     /^\.\.\//,
              //     "/shared_code/"
              //   )}`;

              //   openingElement.attributes.push(
              //     t.jsxAttribute(
              //       t.jsxIdentifier("src"),
              //       t.stringLiteral(fullSrcPath)
              //     )
              //   );
              // }
            } else if (elementType === "Button") {
              openingElement.name.name = "button";
              const titleAttribute = openingElement.attributes.find(
                (attribute) => attribute.name.name === "title"
              );

              // if (titleAttribute && titleAttribute.value) {
              //   const titleValue = titleAttribute.value.value;
              //   console.log("Button title:", titleValue);
              // }

              // Check if there is a closing element
              if (path.node.closingElement) {
                path.node.closingElement.name.name = "button";
              }
            }

            // Add the modified JSX element to the components array
            components.push({ ...path.node, key });
          } else {
            // Handle JSX elements outside map
            const openingElement = path.node.openingElement;

            // console.log("openingElement", openingElement.name.name);

            if (openingElement && openingElement.name) {
              if (openingElement.name.name === "View") {
                openingElement.name.name = "div";
                path.node.closingElement.name.name = "div";
              } else if (openingElement.name.name === "Text") {
                openingElement.name.name = "p";
                path.node.closingElement.name.name = "p";
              } else if (openingElement.name.name === "Button") {
                openingElement.name.name = "button";
                // console.log("pathclosing", path.node);

                // Extract the value of the "title" attribute
                const titleAttribute = openingElement.attributes.find(
                  (attribute) => attribute.name.name === "title"
                );

                if (titleAttribute && titleAttribute.value) {
                  const titleValue = titleAttribute.value.value;
                }

                // Check if there is a closing element
                if (path.node.closingElement) {
                  path.node.closingElement.name.name = "button";
                }
              }
              // } else if (openingElement.name.name === "Image") {
              //   openingElement.name.name = "img";

              //   const sourceAttribute = openingElement.attributes.find(
              //     (attribute) => attribute.name.name === "source"
              //   );

              //   if (
              //     sourceAttribute &&
              //     sourceAttribute.value.type === "JSXExpressionContainer"
              //   ) {
              //     const srcValue =
              //       sourceAttribute.value.expression.arguments[0].value;
              //     const fullSrcPath = `.${srcValue.replace(
              //       /^\.\.\//,
              //       "/shared_code/"
              //     )}`;

              //     openingElement.attributes.push(
              //       t.jsxAttribute(
              //         t.jsxIdentifier("src"),
              //         t.stringLiteral(fullSrcPath)
              //       )
              //     );
              //   }
              // }
            }

            // Check if the JSX element is at the top level
            if (!path.findParent((p) => p.isJSXElement())) {
              // Add the modified JSX element to the components array
              components.push(path.node);
            }
          }
        } catch (error) {
          console.error("Error processing JSXElement:", error);
          console.error("Problematic JSXElement:", path.node);
        }
      },
    });

    setJsxComponents(components);
  }, [ast]); // Include ast as a dependency

  // Convert JSX components to React elements
  const reactElements = convertToReactElements(jsxComponents);

  // Render the React elements within a div
  return <>{reactElements}</>;
};

// Export the transpiled component for use in other modules
export default TranspiledComponent;
