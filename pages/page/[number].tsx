import React from 'react';
import { getPageData } from '../../src/components/api/get-page-data';
import Layout from '../../src/components/layout';
import { ResultField } from '../../src/components/ui/result-field';
import { PageData } from '../../src/shared/types';

interface Props {
  pageData: PageData;
}

const Page = ({ pageData }: Props) => {
  return (
    <Layout>
      <ResultField pageData={pageData} />
    </Layout>
  );
};

export default Page;

export async function getServerSideProps({ params, query }) {
  const page = params.number;
  const searchTerm = query.search;
  const itemQty = query.itemqty;
  const pageData = await getPageData(searchTerm, itemQty || 8, page || 1);
  return { props: { pageData } };
}
