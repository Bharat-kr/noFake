import React from "react";

const ProdCard = ({ item }) => {
  return (
    <div className="flex-col bg-slate-100 p-2 rounded m-2 cursor-pointer">
      <img
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0533%2F2089%2Ffiles%2Fplaceholder-images-image_large.png%3Fv%3D1530129081&f=1&nofb=1&ipt=ce642629f1e297f3afd10c11dcd2678ecfa4a45d8bf19a1c8a82b21b3c0e56d1&ipo=images"
        alt={item.name}
        className="w-48 h-48 rounded"
      />
      <div className="w-full mt-2">
        <h3 className="font-bold">{item.name}</h3>
        <p className="text-sm break normal w-48">{item.uuid}</p>
        <p className="text-sm break normal w-48">
          Listed By - <span className="font-bold">{item?.lister_name}</span>
        </p>
        <p className="text-sm break normal w-48">
          Listed From -{" "}
          <span className="font-bold">{item?.lister_country}</span>
        </p>
      </div>
    </div>
  );
};

export default ProdCard;
