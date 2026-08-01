import { useEffect, useState } from "react";
import ProductItem from "../../components/ProductItem";
import Header from "../../components/Header";
import { axiosClient } from "../../utils/axios";

function Products() {
    const [products, setProducts] = useState([]);
    const [carts, setCarts] = useState([]);

    useEffect(() => {
        try {
            const getProducts = async () => {
                const { data } = await axiosClient.get("products");
                setProducts(data);
            };
            getProducts();
        } catch (error) {
            console.log(error);
        }
    }, []);

    const addTocart = (id) => {
        if (!carts.includes(id)) {
            setCarts((prev) => [...prev, id]);
        }
    };

    return (
        <>
            <Header />
            <main className="container">
                <h1>Products</h1>

                <div className="product-grid">
                    {products.map((product) => (
                        <ProductItem
                            product={product}
                            onClickCart={addTocart}
                        />
                    ))}
                </div>
            </main>
        </>
    );
}

export default Products;
