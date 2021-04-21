import FullWidthLayout from '../../components/fullWidthLayout'

export default function Product({ data, layout, layoutData }) {
    const nav = data.nav
    const images = data.images
    const isFullWidthImage = layoutData.content.fullWidthImage

    console.log(layout)
    console.log({data})

    if (isFullWidthImage) {
        return <FullWidthLayout />
    }

    // TODO Pass the data to the appropriate layout to render

    return (
        <div>
                {/* ID: {data.id} */}
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

export async function getServerSideProps({ params }) {

    // TODO Call product API to get product data including nav categories

    const data = {
        "id": "1",
        "nav": {
            "department": "home_and_furniture",
            "category": "sofa",
            "subcategory": "corner_sofas",
        },
        "images": {
            "hero_image": "https://media.very.co.uk/i/very/MCTQN_SQ1_0000011520_VINTAGE_TAN_SLf?$550x733_standard$",
        },
        "price": "£1499",
        "title": "Hampshire Premium Leather Corner Group Sofa"
    }

    // TODO Call Amplience to get layout information

    const layoutResponse = await fetch(`https://5w2mj9mrmyfl1ou62xbpqc88p.staging.bigcontent.io/content/key/pdpconfig/category/sofa?depth=all&format=inlined`)
    const layoutData = await layoutResponse.json()

    console.log(layoutData)

    const layout = {
        "fullWidthImage": false
    }

    return {
        props: { data, layout, layoutData }
    }


    // const productId = params.pid
    // console.log(productId)

    // const res = await fetch(`https://www.very.co.uk/api/selling-product/selling-products/${productId}?source=atg`)
    // const data = await res.json()

    // console.log(data);

    // if (!data) {
    //     return {
    //         notFound: true,
    //     }
    // }
    
    // return {
    //     props: { data} // will be passed to the page component as props
    // }
}
