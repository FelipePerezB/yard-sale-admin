import { useState, useEffect, Fragment } from 'react';
import Pagination from '@components/Pagination';
import endPoints from '@services/api';
import { useRouter } from 'next/router';
import axios from 'axios';
import useAlert from '@hooks/useAlert';
import Alert from '@common/alert';
import Modal from '@common/Modal';
import FormProduct from '@components/FormProduct';
import { deleteProduct } from '@services/api/products';
import { XCircleIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import Image from 'next/image';

export default function Products() {
  const [productList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [open, setOpen] = useState(false);
  const { alert, setAlert, toggleAlert } = useAlert();

  const fetchData = async () => {
    const response = await axios.get(endPoints.products.allProducts);
    setProductList(response.data);
  };
  const ROWS = 15;

  useEffect(() => {
    setTimeout(() => {
      try {
        fetchData();
      } catch (error) {
        console.error(error);
      }
    }, 1000);
  }, [alert, open]);

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
      <div className="flex-1 min-w-0">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">List of products</h2>
      </div>
      <span className="my-3 inline-block">
        <button
          onClick={() => setOpen(true)}
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add product
        </button>
      </span>
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
                                <Image width={"5rem"} height={"5rem"} className="h-10 w-10 rounded-full" src={product?.images[0]} alt={product?.title} />
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
            <Pagination limit={productList.length} rows={ROWS} currentPage={currentPage} numberOfProducts={products.length} />
          </div>
        </div>
      </div>
    </>
  );
}
