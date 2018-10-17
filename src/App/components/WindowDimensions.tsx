import _ from 'lodash';
import React, {useState, useEffect} from 'react';

const getDimensions = () => {
  const documentElement = document.documentElement;
  const body = document.getElementsByTagName('body')[0];
  const width =
    window.innerWidth || documentElement.clientWidth || body.clientWidth;
  const height =
    window.innerHeight || documentElement.clientHeight || body.clientHeight;

  return {width, height};
};

interface State {
  width: number;
  height: number;
}

const WindowDimensions: React.FC<{children: React.FC<State>}> = ({
  children,
}) => {
  const [dimensions, updateDimensions] = useState(() => getDimensions());

  useEffect(() => {
    const updateDimensionsReal = _.debounce(() => {
      updateDimensions(getDimensions());
    }, 200);

    window.addEventListener('resize', updateDimensionsReal);

    return () => {
      window.removeEventListener('resize', updateDimensionsReal);
    };
  }, []);

  return children(dimensions);
};

export default WindowDimensions;
