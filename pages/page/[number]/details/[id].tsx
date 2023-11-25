import { GetServerSideProps } from 'next';
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

export const getServerSideProps: GetServerSideProps = async ({
  params,
  query,
}) => {
  const page = params?.number;
  const searchTerm = query.search as string;
  const itemQty = query.itemqty;
  const id = Number(params?.id);
  const pageData = await getPageData(
    searchTerm,
    Number(itemQty) || 8,
    Number(page) || 1
  );
  const detailsData = await getPokemonDetails(id);

  return { props: { pageData, detailsData } };
};
