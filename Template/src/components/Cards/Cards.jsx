/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
/* eslint-disable semi */
/* eslint-disable linebreak-style */
import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import CardComponent from './Card/Card';
import styles from './Cards.module.css';

const Info = ({ data: { dailyVaccinated, dailyVaccinations, date, peopleVaccinated, totalBoosters }, country }) => {
  if (!dailyVaccinated) {
    return 'Loading...';
  }

  console.log(dailyVaccinated)

  return (
    <div className={styles.container}>
      <Typography gutterBottom variant="h4" component="h2">{country}</Typography>
      <Grid container spacing={3} justify="center">
        <CardComponent
          className={styles.infected}
          cardTitle="Daily Vaccinations"
          value={dailyVaccinations}
          lastUpdate={date}
          cardSubtitle="Number of daily Vaccinations for COVID-19."
        />
        <CardComponent
          className={styles.recovered}
          cardTitle="People Vaccinated"
          value={peopleVaccinated}
          lastUpdate={date}
          cardSubtitle="Number of People Vaccinated for COVID-19."
        />
        <CardComponent
          className={styles.deaths}
          cardTitle="Total Boosters"
          value={totalBoosters}
          lastUpdate={date}
          cardSubtitle="Number of Total Boosters given for COVID-19."
        />
      </Grid>
    </div>
  );
};

export default Info;
