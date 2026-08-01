import styles from "./ProductDetailItem.module.css";
export default function ProductDetailItem({ product, quantity, setQuantity }) {
    return (
        <div className={styles.container}>
            <div className={styles.gallery}>
                <img
                    src={product.image}
                    alt={product.title}
                    className={styles.image}
                />
            </div>

            <div className={styles.info}>
                <h1>{product.title}</h1>

                <div className={styles.rating}>
                    ⭐ {product.rating.rate}
                    <span>({product.rating.count})</span>
                </div>

                <div className={styles.price}>${product.price}</div>

                <p className={styles.desc}>{product.description}</p>

                <div className={styles.section}>
                    <h3>Category</h3>
                    <span>{product.category}</span>
                </div>

                <div className={styles.section}>
                    <h3>Quantity</h3>

                    <div className={styles.quantity}>
                        <button
                            onClick={() =>
                                setQuantity((prev) =>
                                    prev > 1 ? prev - 1 : prev,
                                )
                            }
                        >
                            -
                        </button>

                        <span>{quantity}</span>

                        <button onClick={() => setQuantity((prev) => prev + 1)}>
                            +
                        </button>
                    </div>
                </div>

                <button className={styles.cartBtn}>Add To Cart</button>
            </div>
        </div>
    );
}
