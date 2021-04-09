import { GetStaticPropsContext } from 'next';
import { getApolloClient } from '@wpengine/headless';
import { useQuery, gql } from '@apollo/client';
import {
  getNextStaticPaths,
  getNextStaticProps,
} from '@wpengine/headless/next';

const GET_PROPERTY = gql`
  query($id: ID!) {
    property(id: $id, idType: SLUG) {
      title
      slug
      uri
      content
    }
  }
`;

const Property = ({ propertyData = {} }) => {
  //   const { data } = useQuery(GET_PROPERTY);
  console.log('data', propertyData);
  const { property } = propertyData.data;
  return (
    <div>
      <h1>{property?.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: property?.content }} />
    </div>
  );
};

export default Property;

export const getStaticProps = async (context) => {
  console.log('context', context);
  const client = getApolloClient(context);
  const propertyData = await client.query({
    query: GET_PROPERTY,
    variables: {
      id: context.params.propertySlug,
    },
  });
  return {
    props: {
      propertyData,
    },
  };

  //   const props = await getNextStaticProps(context);
  //   props.revalidate = 1;

  //   return props;
};

export function getStaticPaths() {
  return getNextStaticPaths();
}
