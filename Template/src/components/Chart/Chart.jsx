/* eslint-disable linebreak-style */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-multi-spaces */
/* eslint-disable arrow-parens */
/* eslint-disable comma-spacing */
/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';

import { fetchDailyData } from '../../api';

import styles from './Chart.module.css';

const Chart = ({ data: { dailyVaccinated, dailyVaccinatedPerHundred, dailyVaccinations, dailyVaccinationsPerMillion, dailyVaccinationsRaw, peopleFullyVaccinated, peopleFullyVaccinatedPerHundred, peopleVaccinated, peopleVaccinatedPerHundred, totalBoosters, totalBoostersPerHundred, totalVaccinations, totalVaccinationsPerHundred }, country }) => {
  const [dailyData, setDailyData] = useState({});

  useEffect(() => {
    const fetchMyAPI = async () => {
      const initialDailyData = await fetchDailyData();

      setDailyData(initialDailyData);
    };

    fetchMyAPI();
  }, []);

  const barChart = (
    dailyVaccinated ? (
      <Bar
        data={{
          labels: ['Daily People Vaccinated', 'Daily Vaccinated Per Hundred','Daily Vaccinations','Daily Vaccinations Per Million','Daily Vaccinations Raw','People Fully Vaccinated','People fully Vaccinated Per hundred' ,'People Vaccinated','People Vaccinated per Hundred', 'Total Boosters','Total Boosters Per Hundred','Total Vaccinations','Total Vaccinations Per Hundred'],
          datasets: [
            {
              label: 'People',
              backgroundColor: ['rgba(255, 0, 0, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(245, 40, 145, 0.8)','rgba(245, 180, 62, 0.8)','rgba(163, 49, 175, 1)','rgba(111, 209, 175, 1)','rgba(56, 77, 77, 0.55)','rgba(204, 15, 10, 0.22)','rgba(132, 9, 61, 1)','rgba(132, 9, 208, 1)','rgba(250, 250, 8, 1)','#D9EB4B','rgba(60, 193, 0, 1)'],
              data: [dailyVaccinated,dailyVaccinatedPerHundred,dailyVaccinations,dailyVaccinationsPerMillion,dailyVaccinationsRaw,peopleFullyVaccinated,peopleFullyVaccinatedPerHundred ,peopleVaccinated,peopleVaccinatedPerHundred,totalBoosters,totalBoostersPerHundred,totalVaccinations,totalVaccinationsPerHundred],
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Current state in ${country}` },
        }}
      />
    ) : null
  );

  const lineChart = (
    dailyData[231] ? (
      <Line
        data={{
          labels: dailyData.map(countre => countre.date),
          datasets: [{
            data: dailyData.map(countre => countre.total_vaccinations),
            label: 'Total Vaccinations',
            backgroundColor: '#D9EB4B',
            fill: true,
          }, {
            data: dailyData.map((data) => data.people_vaccinated),
            label: 'People Vaccinated',
            
            backgroundColor: '#FD6BB6',
            fill: true,
          },  {
            data: dailyData.map((data) => data.daily_people_vaccinated),
            label: 'Daily People Vaccinated',
            
            backgroundColor: '#08F7FE',
            fill: true,
            }, 
          {
            data: dailyData.map((data) => data.people_fully_vaccinated),
            label: 'People Fully Vaccinated',
            
            backgroundColor: '#7122FA',
            fill: true,
            }, 
          {
            data: dailyData.map((data) => data.daily_people_vaccinated_per_hundred),
            label: 'Daily People Vaccinated Per Hundred',
            
            backgroundColor: '#CC00FF',
            fill: true,
            },
          {
            data: dailyData.map((data) => data.daily_vaccinations),
            label: 'Daily Vaccinations',
            
            backgroundColor: 'rgba(163, 49, 175, 1)',
            fill: true,
            },
          {
            data: dailyData.map((data) => data.daily_vaccination_raw),
            label: 'Daily Vaccinataion Raw',
            
            backgroundColor: 'rgba(111, 209, 175, 1)',
            fill: true,
            },
          {
            data: dailyData.map((data) => data.daily_vaccination_per_million),
            label: 'Daily Vaccinataion Per Million',
            
            backgroundColor: 'rgba(56, 77, 77, 0.55)',
            fill: true,
            },
          {
            data: dailyData.map((data) => data.people_fully_vaccinated_per_hundred),
            label: 'People Fully Vaccinated Per Hundred',
            
            backgroundColor: 'rgba(204, 15, 10, 0.22)',
            fill: true,
            },
          {
            data: dailyData.map((data) => data.people_vaccinated_per_hundred),
            label: 'People Vaccinated Per Hundred',
            
            backgroundColor: 'rgba(132, 9, 61, 1)',
            fill: true,
            },
          {
            data: dailyData.map((data) => data.total_boosters),
            label: 'Total Boosters',
            
            backgroundColor: 'rgba(132, 9, 208, 1)',
            fill: true,
            },
          {
            data: dailyData.map((data) => data.total_boosters_per_hundred),
            label: 'Total Boosters Per Hundred',
            
            backgroundColor: 'rgba(250, 250, 8, 1)',
            fill: true,
            },
          
          {
            data: dailyData.map((data) => data.total_vaccinations_per_hundred),
            label: 'Total Vaccinataions Per Hundred',
            
            backgroundColor: 'rgba(60, 193, 0, 1)',
            fill: true,
            },
          ],
        }}
      />
    ) : "Loading...."
  );


  return (
    <div className={styles.container}>
      {country ? barChart : lineChart}
    </div>
  );
};

export default Chart;
