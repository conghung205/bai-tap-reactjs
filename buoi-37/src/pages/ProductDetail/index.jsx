import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosClient } from "../../utils/axios";
import Header from "../../components/Header";
import ProductDetailItem from "../../components/ProductDetailItem";
import styles from "./ProductDetail.module.css";
import ProductItem from "../../components/ProductItem";

export default function ProductDetail() {
    const { id } = useParams();
    const [productDetail, setProductDetail] = useState(null);
    const [productsFeatured, setProductFeatured] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [carts, setCarts] = useState([]);

    const getProductDetail = async (id) => {
        const { data } = await axiosClient.get(`/products/${id}`);
        return data;
    };
    const getProductsFeatured = async () => {
        const { data } = await axiosClient.get("products");
        return data;
    };

    const addTocart = (id) => {
        if (!carts.includes(id)) {
            setCarts((prev) => [...prev, id]);
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductDetail(id);
                setProductDetail(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProduct();
    }, [id]);

    useEffect(() => {
        const fetchProductsFeatured = async () => {
            try {
                const data = await getProductsFeatured();

                const newProductsFeatured = data.slice(0, 4);
                setProductFeatured(newProductsFeatured);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProductsFeatured();
    }, []);

    if (!productDetail || !productsFeatured) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <Header />
            <div className={styles.container}>
                <div>
                    <h2>Chi tiết sản phẩm</h2>
                    <ProductDetailItem
                        product={productDetail}
                        quantity={quantity}
                        setQuantity={setQuantity}
                    />
                </div>

                <div>
                    <h2 style={{ marginBottom: "30px" }}>Sản phẩm nổi bật</h2>

                    <div className="product-grid">
                        {productsFeatured.map((product) => (
                            <ProductItem
                                product={product}
                                onClickCart={addTocart}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
