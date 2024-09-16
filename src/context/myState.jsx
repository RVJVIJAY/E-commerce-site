import React, { useEffect, useState } from 'react';
import MyContext from './myContext';
import { fireDB } from '../firebase/FirebaseConfig';
import { Timestamp, addDoc, collection, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { setDoc, deleteDoc, doc } from 'firebase/firestore';

function MyState({ children }) {
  const [mode, setMode] = useState('light');  
  const [loading, setLoading] = useState(false); 
  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    )
  });

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = 'rgb(17, 24, 39)';
    } else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
    }
  };

  const addProduct = async () => {
    if (!products.title || !products.price || !products.imageUrl || !products.category || !products.description) {
      return toast.error('Please fill all fields');
    }
    const productRef = collection(fireDB, "products");
    setLoading(true);
    try {
      await addDoc(productRef, products);
      toast.success("Product Add successfully");
      getProductData();
      window.location.href = '/dashboard';
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    setProducts("");
  };

  const [product, setProduct] = useState([]);

  const getProductData = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(fireDB, "products"),
        orderBy("time")
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productsArray);
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const [order, setOrder] = useState([]);

  // The correct version of getOrderData
  const getOrderData = async () => {
    setLoading(true);
    try {
      const result = await getDocs(collection(fireDB, "orders"));
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
      });
  
      // Set the ordersArray to local storage under the key 'currentUser'
      localStorage.setItem('currentUser', JSON.stringify(ordersArray));
      console.log("Orders saved to local storage:", ordersArray);
  
      setOrder(ordersArray);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const [user, setUser] = useState([]);

  const getUserData = async () => {
    setLoading(true);
    try {
      const result = await getDocs(collection(fireDB, "users"));
      const usersArray = [];
      result.forEach((doc) => {
        usersArray.push(doc.data());
      });
      setUser(usersArray);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
    getOrderData();
    getUserData();
  }, []);

  const edithandle = (item) => {
    setProducts(item);
  };

  const updateProduct = async () => {
    setLoading(true);
    try {
      await setDoc(doc(fireDB, "products", products.id), products);
      toast.success("Product Updated successfully");
      getProductData();
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    setProducts("");
  };

  const deleteProduct = async (item) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success('Product Deleted successfully');
      getProductData();
    } catch (error) {
      setLoading(false);
    }
  };

  const [searchkey, setSearchkey] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterPrice, setFilterPrice] = useState('');

  return (
    <MyContext.Provider value={{
      mode, toggleMode, loading, setLoading,
      products, setProducts, addProduct, product,
      updateProduct,edithandle,deleteProduct,order,user,
      searchkey, setSearchkey,filterType, setFilterType,
      filterPrice, setFilterPrice
    }}>
      {children}
    </MyContext.Provider>
  );
}

export default MyState;
