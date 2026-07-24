import { useState } from "react";
import ProductItem from "./components/ProductItem";
import { PRODUCTS } from "./data/products";
import { TABS } from "./constants/tab";

function App() {
    const [tab, setTab] = useState("phone");
    const products = PRODUCTS.filter((item) => item.type === tab);

    return (
        <>
            <div className="w-7xl mx-auto select-none">
                <div className="flex justify-between items-center">
                    {TABS.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setTab(item.id)}
                            className={`border-b-2 cursor-pointer hover:text-red-500 ${tab === item.id ? "text-red-500 bg-red-500/10 border-b-red-500 " : "border-b-[#ccc]"} py-5 text-center text-lg font-bold flex-1`}
                        >
                            {item.label}
                        </div>
                    ))}
                </div>

                <div className="w-full grid gap-6 p-5 grid-cols-4 bg-[#f4f1f1]">
                    {products.length > 0 ? (
                        products.map((item) => (
                            <ProductItem
                                key={item.id}
                                name={item.name}
                                price={item.price}
                                img={item.image}
                                desc={item.description}
                            />
                        ))
                    ) : (
                        <p className="my-8 col-span-4 font-semibold text-sm text-center">
                            Không có sản phẩm nào!
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}

export default App;
