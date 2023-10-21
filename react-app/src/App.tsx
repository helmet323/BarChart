import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import './App.css';
import BarChart from './components/barChart/barChart';

function App() {
  const [data, setData] = useState({
    title: 'Title',
    yAxisLabel: 'Y-Axis',
    xAxisLabel: 'X-Axis',
    values: '50,90,23,47,72',
    labels: 'Item,Item,Item,Item,Item',
  });

  const stringToNumberArray = (str: string) => {
    const array = str.split(',');
    const numArray = array.map((value) => Number(value));
    return numArray;
  };

  const stringToStringArray = (str: string) => {
    const array = str.split(',');
    return array;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <div className='App'>
      <form className='form'>
        <div className='section'>
          <label htmlFor='title'>Title: </label>
          <input
            type='text'
            id='title'
            name='title'
            value={data.title}
            onChange={handleInputChange}
          />
        </div>
        <div className='section'>
          <label htmlFor='yAxisLabel'>Y-axis label: </label>
          <input
            type='text'
            id='yAxisLabel'
            name='yAxisLabel'
            value={data.yAxisLabel}
            onChange={handleInputChange}
          />
        </div>
        <div className='section'>
          <label htmlFor='xAxisLabel'>X-axis label: </label>
          <input
            type='text'
            id='xAxisLabel'
            name='xAxisLabel'
            value={data.xAxisLabel}
            onChange={handleInputChange}
          />
        </div>
        <div className='section'>
          <label htmlFor='values'>Values: </label>
          <input
            type='text'
            id='values'
            name='values'
            value={data.values}
            onChange={handleInputChange}
          />
        </div>
        <div className='section'>
          <label htmlFor='labels'>Labels: </label>
          <input
            type='text'
            id='labels'
            name='labels'
            value={data.labels}
            onChange={handleInputChange}
          />
        </div>
      </form>

      <BarChart
        title={data.title}
        yAxisLabel={data.yAxisLabel}
        xAxisLabel={data.xAxisLabel}
        values={stringToNumberArray(data.values)}
        labels={stringToStringArray(data.labels)}
      />
    </div>
  );
}

export default App;
