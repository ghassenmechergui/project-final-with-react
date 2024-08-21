import { createContext, useContext, useState } from "react";

const image = createContext({});

export default function ProviderImage({ children }) {
  const [imageurl, setimageurl] = useState(null);

  return (
    <image.Provider value={{ imageurl, setimageurl }}>
      {children}
    </image.Provider>
  );
}
export const useImage = () => {
  console.log(useContext(image));
  return useContext(image);
};
