import { ConfigProvider } from 'antd';
import { TinyColor } from '@ctrl/tinycolor';

const colors1 = ['#C94C4B', '#C94C4B'];
const colors2 = ['#f83600', '#f83600'];
const additionalColor = '#3B7B7A'; // New color to add

const ConfigAntdButton = ({ children, type }) => {
  let color = colors1;
  if (type === 'danger') {
    color = colors2;
  }

  const getHoverColors = (colors) =>
    colors.map((color) => new TinyColor(color).lighten(5).toString());
  const getActiveColors = (colors) =>
    colors.map((color) => new TinyColor(color).darken(5).toString());

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            // Add the new color to the gradient
            colorPrimary: `linear-gradient(135deg, ${color.join(
              ', '
            )}, ${additionalColor})`,
            colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(
              color
            ).join(', ')}, ${additionalColor})`,
            colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(
              color
            ).join(', ')}, ${additionalColor})`,
            lineWidth: 0,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ConfigAntdButton;
