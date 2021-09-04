import '../styles/globals.css';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import { NotificationContextProvider } from '../store/NotificationContext';

const MyApp = ({ Component, pageProps }) => {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>NextJS Events</title>
          <meta name="description" content="NextJS Events" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>

        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
};

export default MyApp;
