import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// Utils
import CustomTooltip from '../../utils/CustomTooltip';

function BarChartComponent({expenses}) {
  const barWidth = 120;
  return (
    <>
      <div 
      className='w-[85%] sm:w-[60%] md:w-[50%] lg:w-[35%] 
      h-[300px] overflow-x-auto'>
        <div style={{ width: `${expenses.length * barWidth}px`, minWidth:'500px', height: '100%' }} >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={expenses}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="exp_created" />
              <YAxis orientation='left'/>
              <Tooltip content={<CustomTooltip />}/>
              <Legend />
              <Bar dataKey="exp_amt" fill="#8884d8" activeBar={<Rectangle fill="green" stroke="pink" />} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  )
}

export default BarChartComponent
