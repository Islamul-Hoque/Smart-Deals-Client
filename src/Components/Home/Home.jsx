import React from "react";
import LatestProducts from "../LatestProducts/LatestProducts";

const latestProductsPromise = fetch(
  "https://smart-deals-api-server-weld.vercel.app/latestProducts"
).then((res) => res.json());

const Home = () => {
  return (
    <div className="bg-gray-100">
      <LatestProducts latestProductsPromise={latestProductsPromise}>
        {" "}
      </LatestProducts>
    </div>
  );
};

export default Home;
