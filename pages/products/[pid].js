import Grid from '@material-ui/core/Grid'

export default function Product({ data }) {
    // let nav = data.nav
    // let images = data.images

    // TODO Pass the data to the appropriate layout to render

    console.log({data})
    return (
        <div>
                ID: {data.id}
            {/* <div>
                <img src={images.hero_image} alt="picture of awesome sofa"></img>
            </div>

            <h1 id="productTitle">
                <span id="productName">{data.title}</span>
            </h1>
            <div>{data.price}</div>
            <div>
                <button id="addToBasketButton">Add to Basket</button>
            </div> */}
        </div>
    )
}

export async function getServerSideProps({ params }) {

    // TODO Call product API to get product data including nav categories

    // const data = {
    //     "id": "1",
    //     "nav": {
    //         "department": "home_and_furniture",
    //         "category": "sofas",
    //         "subcategory": "corner_sofas",
    //     },
    //     "images": {
    //         "hero_image": "https://media.very.co.uk/i/very/MCTQN_SQ1_0000011520_VINTAGE_TAN_SLf?$550x733_standard$",
    //     },
    //     "price": "£1499",
    //     "title": "Hampshire Premium Leather Corner Group Sofa"
    // }

    // TODO Call Amplience to get layout information

    const productId = params.pid
    console.log(productId)

    const res = await fetch(`https://www.very.co.uk/api/selling-product/selling-products/${productId}?source=atg`)
    const data = await res.json()

    console.log(data);

    if (!data) {
        return {
            notFound: true,
        }
    }
    
    return {
        props: { data} // will be passed to the page component as props
    }
}
