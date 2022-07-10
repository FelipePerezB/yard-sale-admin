const API = process.env.NEXT_PUBLIC_API_URL;
const VERSION = process.env.NEXT_PUBLIC_API_VERSION;

const endPoints = {
  products:{
    list:(limit, offset)=>`${API}/api/${VERSION}/products?limit=${limit}&offset=${offset}`,
    allProducts:`${API}/api/${VERSION}/products`,
    update:(id)=>`${API}/api/${VERSION}/products/${id}`,
    get:(id)=>`${API}/api/${VERSION}/products/${id}`,
    create:`${API}/api/${VERSION}/products`,
    delete:(id)=>`${API}/api/${VERSION}/products/${id}`,
  },
  users:{
    getUsers:(limit)=>`${API}/api/${VERSION}/users?limit=${limit}`,
    create:`${API}/api/${VERSION}/users`,
    isAvailable:`${API}/api/${VERSION}/users/is-available`,
  },
  auth:{
    login:`${API}/api/${VERSION}/auth/login`,
    profile:`${API}/api/${VERSION}/auth/profile`,
  },
  categories:{
    list:(limit)=>`${API}/api/${VERSION}/categories?limit=${limit}`,
    create:`${API}/api/${VERSION}/categories`,
    get:(id)=>`${API}/api/${VERSION}/categories/${id}`,
    update:(id)=>`${API}/api/${VERSION}/categories/${id}`,
    getProducts:(id)=>`${API}/api/${VERSION}/categories/${id}/products`,
  },
  files:{
    upload:`${API}/api/${VERSION}/files/upload`,
    get:(filename)=>`${API}/api/${VERSION}/files/${filename}`,
  },
};

export default endPoints;