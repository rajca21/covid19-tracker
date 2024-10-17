import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home({ data, countries }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Covid 19 Tracker</title>
        <link rel='icon' href='/favicon.png' />
      </Head>

      {/* Header */}
      <div className={styles.headersInfo}>
        <p>Latest update: {data.Date.split('T')[0]}</p>
        <p>
          # of countries with Covid19 confirmed infections: {countries.length}
        </p>
      </div>

      {/* Countries */}
      <p className={styles.headersTitle}>
        Countries with most confirmed Covid19 infections
      </p>
      <div className={styles.countriesWrapper}>
        {countries.map((country) => {
          return (
            <Link key={country.ID} href={'/' + country.Slug}>
              <a>
                <div className={styles.countryItem}>
                  <img
                    src={
                      'https://flagcdn.com/' +
                      country.CountryCode.toLowerCase() +
                      '.svg'
                    }
                    alt={country.Country}
                  />
                  <p className={styles.countryTitle}>
                    {country.Country} ({country.CountryCode})
                  </p>
                  <div className={styles.countryInfo}>
                    <span className={styles.textInfo}>
                      Confirmed:{' '}
                      <span className={styles.numberInfo}>
                        {country.TotalConfirmed.toLocaleString()}
                      </span>
                    </span>
                    <span className={styles.textInfo}>
                      Deaths:{' '}
                      <span className={styles.numberInfo}>
                        {country.TotalDeaths.toLocaleString()}
                      </span>
                    </span>
                  </div>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch('https://api.covid19api.com/summary');
  const data = await res.json();
  const countries = await data.Countries.filter(
    (country) => country.TotalConfirmed < 80000000
  );
  countries.sort((a, b) => (a.NewConfirmed > b.NewConfirmed ? -1 : 1));
  return {
    props: { data, countries },
  };
}
