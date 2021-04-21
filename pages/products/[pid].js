import FullWidthLayout from '../../components/fullWidthLayout'
import Layout from '../../components/layout'

const ampImagePath = "https://media.very.co.uk/i/very/"
const ampSmallImageTemplate = "?w=250&h=250&sm=TL"
const ampWideImageTemplate = "?w=800&h=800&sm=TL&crop=0,350,1200,250"

export default function Product({ product, layout }) {
    const { data: { id, attributes } } = product
    const { brand, name, images, price } = attributes;

    // Return default layout if not found in Amplience
    if (layout === undefined) {
        return (
            <div>
                <h1>{brand.name}</h1>
                <h2>{name}</h2>
                <div>£{price.current}</div>
                <div> 
                    { images.map(({ identifier }) => {
                        let imageUrl = `${ampImagePath}${identifier}${ampSmallImageTemplate}`
                        console.log(imageUrl)
                        return (
                            <img src={imageUrl} alt="picture of awesome sofa" />
                        )
                    })}
                </div>
            </div>
        )
    }

    const isFullWidthImage = layout.content.fullWidthImage

    console.log(product.data)

    if (isFullWidthImage) {
        return (
            <div>
                <h1>{brand.name}</h1>
                <h2>{name}</h2>
                <div>£{price.current}</div>
                <div> 
                    { images.map(({ identifier }) => {
                        let imageUrl = `${ampImagePath}${identifier}${ampWideImageTemplate}`
                        console.log(imageUrl)
                        return (
                            <img src={imageUrl} alt="picture of awesome sofa" />
                        )
                    })}
                </div>
            </div>
        )
    }

    return (
        <div>
            <h1>{brand.name}</h1>
            <h2>{name}</h2>
            <div>£{price.current}</div>
            <div> 
                { images.map(({ identifier }) => {
                    let imageUrl = `${ampImagePath}${identifier}${ampSmallImageTemplate}`
                    console.log(imageUrl)
                    return (
                        <img src={imageUrl} alt="picture of awesome sofa" />
                    )
                })}
            </div>
        </div>
    )
}

export async function getServerSideProps({ params }) {

    // Get id from request
    const productId = params.pid
    console.log(productId)

    // Fetch product data from Selling Product Query
    const productResponse = await fetch(`https://www.very.co.uk/api/selling-product/selling-products/${productId}?source=atg`)
    const product = await productResponse.json()
    console.log(product);

    if (!product) {
        return {
            notFound: true,
        }
    }

    // Get category from product data
    let productCategory = 'default'
    if (product.data.attributes.brand.name === 'Nike') {
        productCategory = 'nike-trainers'
    } else {
        productCategory = 'sofa'
    }
    const category = productCategory;
    console.log(category);

    // Fetch PDP Config and Layout from Amplience
    const layoutResponse = await fetch(`https://5w2mj9mrmyfl1ou62xbpqc88p.staging.bigcontent.io/content/key/pdpconfig/category/${category}?depth=all&format=inlined`)
    const layout = await layoutResponse.json()
    console.log(layout)

    if (layout.error != null) {
        return {
            props: { product }
        }
    }
    
    return {
        props: { product, layout } // will be passed to the page component as props
    }

    // TODO Call product API to get product data including nav categories

    // const data = {
    //     "id": "1",
    //     "nav": {
    //         "department": "home_and_furniture",
    //         "category": "sofa",
    //         "subcategory": "corner_sofas",
    //     },
    //     "images": {
    //         "hero_image": "https://media.very.co.uk/i/very/MCTQN_SQ1_0000011520_VINTAGE_TAN_SLf",
    //     },
    //     "price": "£1499",
    //     "title": "Hampshire Premium Leather Corner Group Sofa"
    // }

    // const layout = {
    //     "fullWidthImage": false
    // }

    // return {
    //     props: { data, layout, layoutData }
    // }
}
