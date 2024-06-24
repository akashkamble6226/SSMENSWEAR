import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";
import useAllIncompletOrders from "./AllIncompleteOrders";
import { useEffect, useState } from "react";
import { CustomerNameFormat } from "../func/customerNameFormatting";

const useAllCustomerImages = () => {
  // customer images
  const [customerImageUrls, setCustomerImageUrls] = useState({});
  const [loadingCustomerImages, setLoadingCustomerImages] = useState(true);
  const [errorCustomerImages, setErrorCustomerImages] = useState(null);

  //   clothe images
  const [clothImageUrls, setClothImageUrls] = useState({});
  const [loadingClothImages, setLoadingclothImages] = useState(true);
  const [errorClothImages, setErrorClothImages] = useState(null);

  const { allInCompletOrdersData } = useAllIncompletOrders();

  useEffect(() => {
    const fetchImages = async (isCustomerImages) => {
      const customerUrls = {};
      const clothUrls = {};

      if (isCustomerImages) {
        try {
          const fetchImageCustomer = allInCompletOrdersData.map(
            async (item) => {
              const name = await CustomerNameFormat(item.customerName);
              const url = await getDownloadURL(
                ref(
                  storage,
                  `customerImages/${name}_${item.customerPhone}_${item.customerInvoice}`
                )
              );
              customerUrls[item.customerInvoice] = url;
            }
          );

          await Promise.all(fetchImageCustomer);
          setCustomerImageUrls(customerUrls);
        } catch (err) {
          setErrorCustomerImages(err);
        } finally {
          setLoadingCustomerImages(false);
        }
      } else {
        try {
          const fetchImageCloth = allInCompletOrdersData.map(async (item) => {
            const name = await CustomerNameFormat(item.customerName);
            const url = await getDownloadURL(
              ref(
                storage,
                `clothImages/${name}_${item.customerPhone}_${item.customerInvoice}`
              )
            );
            clothUrls[item.customerInvoice] = url;
          });

          await Promise.all(fetchImageCloth);
          setClothImageUrls(clothUrls);
        } catch (err) {
          setErrorClothImages(err);
        } finally {
          setLoadingclothImages(false);
        }
      }
    };

    fetchImages(true);
    fetchImages(false);
  }, [allInCompletOrdersData, CustomerNameFormat]);

  return {
    customerImageUrls,
    loadingCustomerImages,
    errorCustomerImages,
    clothImageUrls,
    loadingClothImages,
    errorClothImages,
  };
};

export default useAllCustomerImages;
