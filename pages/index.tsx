import React from 'react';
import { getPageData } from '../src/components/api/get-page-data';
import Layout from '../src/components/layout';
import { ResultField } from '../src/components/ui/result-field';
import { PageData } from '../src/shared/types';

interface Props {
  pageData: PageData;
}

const App = ({ pageData }: Props) => {
  return (
    <Layout>
      <ResultField pageData={pageData} />
    </Layout>
  );
};

export default App;

export async function getServerSideProps() {
  const pageData = await getPageData();
  return { props: { pageData } };
}
