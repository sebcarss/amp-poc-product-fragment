export default function Layout({ children }) {
    return (
        <div>
            Default Layout
            <div>
                <img src={images.hero_image} alt="picture of awesome sofa"></img>
            </div>

            <h1 id="productTitle">
                <span id="productName">{data.title}</span>
            </h1>
            <div>{data.price}</div>
            <div>
                <button id="addToBasketButton">Add to Basket</button>
            </div>
        </div>
    )
}