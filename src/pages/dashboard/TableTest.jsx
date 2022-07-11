import Table from '@common/Table';
import React from 'react';
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

function TableTest() {

  return (
    <Table rows={5}  />
  );
}

export default TableTest;