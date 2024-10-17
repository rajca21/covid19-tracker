import React from 'react';
import { Line } from 'react-chartjs-2';

export default function LineChart({ countryMonth }) {
  return (
    <div>
      <Line
        data={{
          labels: countryMonth.map((month) => {
            return month.Date.split('T')[0];
          }),
          datasets: [
            {
              label: 'Confirmed Cases per Day',
              data: countryMonth.map((month) => {
                return month.Confirmed;
              }),
              backgroundColor: 'transparent',
              borderColor: '#000',
              pointBackgroundColor: '#000',
            },
          ],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
}
