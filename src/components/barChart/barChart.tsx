import React, { useEffect, useState } from 'react';
import './barChart.css';

interface BarChartData {
  title?: string;
  yAxisLabel?: string;
  xAxisLabel?: string;
  values: number[];
  labels?: string[];
}

const BarChart: React.FC<BarChartData> = ({
  title,
  yAxisLabel,
  xAxisLabel,
  values,
  labels,
}) => {
  const [yLabels, setYLabels] = useState<number[]>([]);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [numberToShow, setNumberToShow] = useState<number>(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // helper function for calculating y-axis upperbound
  const calcExponent = (num: number) => {
    var exponent = 0;
    if (num > 1) {
      while (num > 1) {
        num /= 10;
        exponent += 1;
      }
    } else if (num < 1) {
      while (num < 1) {
        num *= 10;
        exponent -= 1;
      }
    }
    return exponent;
  };

  // calculates the upperbound and the spacing of the y-axis
  const createYScale = (values: number[]) => {
    var max = 0;
    values.map((value) => value > max && (max = value));

    const exponent = calcExponent(max);
    const bound = max > 1 ? Math.pow(10, exponent - 1) : Math.pow(10, exponent);
    const upperBound = (Math.floor(max / bound) + 1) * bound;
    const spacing = upperBound / 10;

    makeScale(upperBound, spacing);
  };

  // sets y-axis labels
  const makeScale = (upperBound: number, spacing: number) => {
    var scale: number[] = [upperBound];

    while (upperBound > 0) {
      upperBound = Number((upperBound - spacing).toFixed(2));
      scale = [...scale, upperBound];
    }
    setYLabels(scale);
  };

  // handle hover over bars
  const handleMouseEnter = (number: number, event: any) => {
    setNumberToShow(number);
    setPosition({ x: event.clientX, y: event.clientY });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setNumberToShow(0);
  };

  useEffect(() => {
    createYScale(values);
  }, [values]);

  return (
    <React.Fragment>
      <div className='chart'>
        <div className='title'>{title}</div>
        <div className='grid-container'>
          {/* y-axis */}
          <div className={'grid-item grid-item-y-axis'}>
            <div className='y-axis'>
              <div className='y-axis-title rotate-y-title'>{yAxisLabel}</div>
              <div className='y-axis-labels'>
                {yLabels.map((label, index) => (
                  <div className='label' key={index}>
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* main graph */}
          <div className='grid-item grid-item-graph'>
            <div className='bars'>
              {values.map((value, index) => (
                <div className='bar-container' key={index}>
                  <div
                    className='bar growing-div'
                    style={{ height: `${(value / yLabels[0]) * 100}%` }}
                    onMouseEnter={(e) => handleMouseEnter(value, e)}
                    onMouseLeave={handleMouseLeave}
                  ></div>
                </div>
              ))}
            </div>
          </div>

          {/* place holder */}
          <div className='grid-item'></div>

          {/* x-axis */}
          <div className='grid-item grid-item-x-axis'>
            <div className='x-axis'>
              <div className='x-axis-labels'>
                {labels?.map((label, index) => (
                  <div className='label' key={index}>
                    {label}
                  </div>
                ))}
              </div>
              <div className='x-axis-title'>{xAxisLabel}</div>
            </div>
          </div>
        </div>
      </div>

      {/* hovered bar */}
      {isHovered && (
        <div
          className='display'
          style={{
            top: position.y - 30,
            left: position.x,
          }}
        >
          Value: {numberToShow}
        </div>
      )}
    </React.Fragment>
  );
};

export default BarChart;
