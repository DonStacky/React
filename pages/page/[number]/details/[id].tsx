import React from 'react';
import { getPageData } from '../../../../src/components/api/get-page-data';
import { getPokemonDetails } from '../../../../src/components/api/get-pokemon-details';
import Layout from '../../../../src/components/layout';
import { ResultField } from '../../../../src/components/ui/result-field';
import { DetailsData, PageData } from '../../../../src/shared/types';

interface Props {
  pageData: PageData;
  detailsData: DetailsData;
}

const Page = ({ pageData, detailsData }: Props) => {
  return (
    <Layout>
      <ResultField pageData={pageData} detailsData={detailsData} />
    </Layout>
  );
};

export default Page;

export async function getServerSideProps({ params, query }) {
  const page = params.number;
  const searchTerm = query.search;
  const itemQty = query.itemqty;
  const id = Number(params.id);
  const pageData = await getPageData(searchTerm, itemQty || 8, page || 1);
  const detailsData = await getPokemonDetails(id);

  return { props: { pageData, detailsData } };
}
