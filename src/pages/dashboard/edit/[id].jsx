import FormProduct from '@components/FormProduct';
import endPoints from '@services/api';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Edit() {
  const [product, setProduct] = useState({});
  const router = useRouter();

  const getProduct = async (id) =>
    await axios
      .get(endPoints.products.get(id))
      .then((response) => setProduct(response.data))
      .catch((error) => console.error(error));

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      getProduct(id);
      console.log(product);
    }
    // console.log(getProduct(id))
  }, [router?.isReady]);
  return <FormProduct product={product} />;
}
