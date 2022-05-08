/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable max-len */
/* eslint-disable comma-spacing */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */
/* eslint-disable semi */
/* eslint-disable space-before-blocks */
/* eslint-disable arrow-parens */
/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */
import axios from 'axios';

const url = 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.json';

export const fetchData = async (country) => {
  let changeableUrl = url;

  if (country) {
    changeableUrl = `https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.json`;
  }

  try {
    const { data } = await axios.get(changeableUrl);
    let countryData = data[231];
    data.map(countre => {
      if (country === countre.country){
        countryData = countre
      }
      return countre
    })

    console.log(countryData.country)

    const dataObj = Object.values(countryData.data)[Object.values(countryData.data).length - 1];
    // console.log(dataObj)

    const dailyVaccinated = dataObj.daily_people_vaccinated;
    const dailyVaccinatedPerHundred = dataObj.daily_people_vaccinated_per_hundred;
    const dailyVaccinations = dataObj.daily_vaccinations;
    const dailyVaccinationsPerMillion = dataObj.daily_vaccinations_per_million;
    const dailyVaccinationsRaw = dataObj.daily_vaccinations_raw;
    const date = dataObj.date;
    const peopleFullyVaccinated = dataObj.people_fully_vaccinated;
    const peopleFullyVaccinatedPerHundred = dataObj.people_fully_vaccinated_per_hundred;
    const peopleVaccinated = dataObj.people_vaccinated;
    const peopleVaccinatedPerHundred = dataObj.people_vaccinated_per_hundred;
    const totalBoosters = dataObj.total_boosters;
    const totalBoostersPerHundred = dataObj.total_boosters_per_hundred;
    const totalVaccinations = dataObj.total_vaccinations;
    const totalVaccinationsPerHundred = dataObj.total_vaccinations_per_hundred;

    return { dailyVaccinated ,dailyVaccinatedPerHundred ,dailyVaccinations ,dailyVaccinationsPerMillion ,dailyVaccinationsRaw ,date ,peopleFullyVaccinated ,peopleFullyVaccinatedPerHundred ,peopleVaccinated ,peopleVaccinatedPerHundred ,totalBoosters ,totalBoostersPerHundred ,totalVaccinations ,totalVaccinationsPerHundred };
  } catch (error) {
    return error;
  }
};

// export const fetchDailyData = async () => {
//   try {
//     const { data } = await axios.get(`${url}/daily`);

//     return data.map(({ confirmed, deaths, reportDate: date }) => ({ confirmed: confirmed.total, deaths: deaths.total, date }));
//   } catch (error) {
//     return error;
//   }
// };

// Instead of Global, it fetches the daily data for the US
export const fetchDailyData = async () => {
    try {
      const { data } = await axios.get('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.json');
      // console.log(data.map(country => country.country))
      const customData = data[231].data
      console.log(customData)
      return customData
    } catch (error) {
      return error;
    }
  };

export const fetchCountries = async () => {
  try {
    const { data } = await axios.get(`https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.json`);

    return data.map(country => country.country);
  } catch (error) {
    return error;
  }
};
