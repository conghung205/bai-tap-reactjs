export default function ProductItem({ name, price, desc, img }) {
    return (
        <div className="rounded-2xl relative p-5 bg-white">
            <img src={img} alt="" className="w-full h-auto" />
            <div className="font-bold my-3">{name}</div>
            <p className="text-red-500 text-lg font-bold">
                {price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                })}
            </p>
            <p className="text-sm mt-3">{desc}</p>

            <div className="absolute top-0 -right-2">
                <div className="bg-blue-200 py-1 px-3 rounded-bl-2xl rounded-tr-2xl text-blue-500 text-sm font-semibold">
                    Trả góp 0%
                </div>
                <div className=" absolute -bottom-2 right-0 w-0 h-0 border-b-8 border-l-8 border-l-blue-600 border-b-transparent"></div>
            </div>
        </div>
    );
}
