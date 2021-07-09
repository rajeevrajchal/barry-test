import { $FIXME } from "@utils/constant";
import { useState } from "react";

const UseCart = () => {
  const [userCart, setUserCart] = useState<$FIXME>([]);
  return {
    userCart,
    setUserCart,
  };
};

export default UseCart;
