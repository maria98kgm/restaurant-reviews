function taggedTemplateLiteralFunc(tempLiteral, ...tempArgs) {
  const judgeComment = "nice🏮";
  return tempLiteral
    .map((item, i) => {
      if (tempArgs[i])
        return item.includes("tomatoes")
          ? item + `${tempArgs[i]}🎟${judgeComment}`
          : item + `${tempArgs[i]}🎟🤿`;
      return item;
    })
    .join("");
}

function copyTaggedTemplateLiteralFunc(tempLiteral, ...tempArgs) {
  const judgeComment = "nice🏮";
  return tempLiteral
    .map((item, i) => {
      if (tempArgs[i])
        return item.includes("tomatoes")
          ? item + `${tempArgs[i]}🎟${judgeComment}`
          : item + `${tempArgs[i]}🎟🤿`;
      return item;
    })
    .join("");
}

const favFood = "tomatoes🍅";
const favDrink = "mojito🍸";

console.log(
  taggedTemplateLiteralFunc`My favorite food: ${favFood}; my favorite drink: ${favDrink}`
);
