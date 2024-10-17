import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import LineChart from '../components/LineChart';
import styles from '../styles/Slug.module.css';

const Map = dynamic(() => import('../components/Map'), {
  loading: () => <p>Map is loading...</p>,
  ssr: false,
});

export default function Slug({ country, countryMonth, countryMap }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Covid 19 Tracker | {country.Country}</title>
        <link rel='icon' href='/favicon.png' />
      </Head>
      <div className={styles.banner}>
        <img
          src={
            'https://flagcdn.com/' + country.CountryCode.toLowerCase() + '.svg'
          }
          alt={country.Country}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.countryTitle}>
          <Link href='/'>
            <a>
              <div className={styles.backButton}>
                <img src='./back.png' alt='back' />
              </div>
            </a>
          </Link>
          {country.Country}
        </div>
        <div className={styles.twoContainers}>
          <div className={styles.leftContainer}>
            <Map countryMap={countryMap[0]} />
            <p className={styles.countryCode}>
              Country code:
              <span> {country.CountryCode}</span>
            </p>
            <div className={styles.newTotal}>
              <div>
                <p>
                  New confirmed:
                  <span> {country.NewConfirmed.toLocaleString()}</span>
                </p>
                <p>
                  New deaths:
                  <span> {country.NewDeaths.toLocaleString()}</span>
                </p>
              </div>
              <div>
                <p>
                  Total confirmed:
                  <span> {country.TotalConfirmed.toLocaleString()}</span>
                </p>
                <p>
                  Total deaths:
                  <span> {country.TotalDeaths.toLocaleString()}</span>
                </p>
              </div>
            </div>
          </div>
          <div className={styles.rightContainer}>
            <LineChart countryMonth={countryMonth} />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const res = await fetch('https://api.covid19api.com/summary');
  const data = await res.json();
  const country = await data.Countries.filter(
    (country) => country.Slug == params.slug
  );

  let previousMonth = new Date(data.Date.split('T')[0]);
  previousMonth.setMonth(previousMonth.getMonth() - 1);
  previousMonth = JSON.stringify(previousMonth).split('T')[0].replace('"', '');
  const res2 = await fetch(
    `https://api.covid19api.com/total/country/${
      params.slug
    }?from=${previousMonth}T00:00:00Z&to=${data.Date.split('T')[0]}T00:00:00Z`
  );
  const countryMonth = await res2.json();

  const res3 = await fetch(
    `https://api.covid19api.com/dayone/country/${params.slug}/status/confirmed`
  );
  const countryMap = await res3.json();

  return {
    props: { country: country[0], countryMonth, countryMap },
  };
}
