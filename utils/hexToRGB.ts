export default function HEXtoRGB(hex: string) {
  hex = hex.replace(/#/g, "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map(function (hex) {
        return hex + hex;
      })
      .join("");
  }
  var result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})[\da-z]{0,0}$/i.exec(hex);
  if (result) {
    var red = parseInt(result[1], 16);
    var green = parseInt(result[2], 16);
    var blue = parseInt(result[3], 16);

    return [red, green, blue];
  } else {
    return null;
  }
}

const getColor = (color: string, alpha: number) => {
  const colors = color ? HEXtoRGB(color)! : [0, 0, 0];
  return `rgba(${colors[0]},${colors[1]},${colors[2]}, ${alpha})`;
};
