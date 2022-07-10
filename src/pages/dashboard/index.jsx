import { useState, useEffect } from 'react';
import Pagination from '@components/Pagination';
import useFetch from '@hooks/useFetch';
import endPoints from '@services/api';
import { useRouter } from 'next/router';
import Chart from '@common/Chart';
import Alert from '@common/alert';
import Modal from '@common/Modal';
import FormProduct from '@components/FormProduct';
import useAlert from '@hooks/useAlert';
import { deleteProduct } from '@services/api/products';
import Link from 'next/link';
import { XCircleIcon } from '@heroicons/react/outline';

export default function Dashboard() {
  const ROWS = 5;
  const productList = useFetch(endPoints.products.allProducts);
  const [currentPage, setCurrentPage] = useState(null);
  const { alert, setAlert, toggleAlert } = useAlert();
  const [open, setOpen] = useState(false);

  const location = useRouter();

  const getInitialPage = () => {
    const hash = location.asPath.replace(location.route, '');
    const initialPage = hash[0] === '#' ? Number(hash.replace('#', '')) : 1;
    return initialPage;
  };

  const changePage = (event) => {
    const hash = event.path[0].location.hash;
    const page = Number(hash.replace('#', ''));
    setCurrentPage(page);
  };

  useEffect(() => {
    {
      currentPage === null ? setCurrentPage(getInitialPage()) : null;
    }
    window?.addEventListener('popstate', (event) => changePage(event));
  }, []);

  const products = productList.filter((product) => productList.indexOf(product) >= currentPage * ROWS - ROWS && productList.indexOf(product) < currentPage * ROWS);

  const categories = products.map((product) => product.category.name);
  const countOccurrences = (array) => array.reduce((prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev), {});
  const data = {
    datasets: [
      {
        label: 'Categories',
        data: countOccurrences(categories),
        borderWidth: 2,
        backgroundColor: ['#ffbb11', '#c0c0c0', '#50AF95', '#f3ba2f', '#2a71d0'],
      },
    ],
  };
  const handleDelete = (id) => {
    deleteProduct(id)
      .then(() => {
        console.log(id);
        setAlert({
          active: true,
          message: 'Product deleted successfully',
          type: 'success',
          autoClose: true,
        });
      })
      .catch((error) => {
        console.error(error);
        setAlert({
          active: true,
          message: 'No se pudo borrar el producto',
          type: 'error',
          autoClose: false,
        });
      });
  };

  return (
    <>
      <Alert alert={alert} handleClose={toggleAlert} />
      <Modal open={open} setOpen={setOpen}>
        <FormProduct setOpen={setOpen} setAlert={setAlert} />
      </Modal>
      <Chart className={' mb-8 mt-2'} charData={data} />
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Id
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products?.map((product) => {
                    return (
                      <>
                        <tr key={`Product-item-${product?.id}`}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img className="h-10 w-10 rounded-full" src={product?.images[0]} alt={product?.title} />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{product?.title}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product?.category?.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{`$${product?.price}`}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product?.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="text-indigo-600 hover:text-indigo-900">
                              <Link href={`edit/${product?.id}`}>Edit</Link>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <XCircleIcon className="flex-shrink-0 h-6 w-6 text-gray-400 cursor-pointer" aria-hidden="true" onClick={() => handleDelete(product?.id)} />
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Pagination
              limit={productList.length}
              rows={ROWS}
              currentPage={currentPage}
              numberOfProducts={products.length}
              // buttons={buttons}
            />
          </div>
        </div>
      </div>
    </>
  );
}
