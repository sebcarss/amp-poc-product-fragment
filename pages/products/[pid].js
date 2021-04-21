import Title from '../../components/product/title'

const ampImagePath = "https://media.very.co.uk/i/very/"
const ampSmallImageTemplate = "?w=250&h=250&sm=TL"
const ampWideImageTemplate = "?w=800&h=800&sm=TL&crop=0,350,1200,250"

export default function Product({ product, layout }) {
    const { data: { id, attributes } } = product
    const { brand, name, images, price } = attributes;

    // TODO Make modules out of the different sections so that they can be rearranged

    // Return default layout if not found in Amplience
    if (layout === undefined) {

        // TODO Create a DefaultLayout component and pass props in

        return (
            <div>
                <Title brand={brand.name} title={name} />
                <div>£{price.current}</div>
                <div> 
                    { images.map(({ identifier }) => {
                        let imageUrl = `${ampImagePath}${identifier}${ampSmallImageTemplate}`
                        console.log(imageUrl)
                        return (
                            <img src={imageUrl} alt="picture of awesome product" />
                        )
                    })}
                </div>
            </div>
        )
    }

    const isFullWidthImage = layout.content.fullWidthImage

    console.log(product.data)

    if (isFullWidthImage) {
        let heroImage = `${ampImagePath}${images[0].identifier}${ampWideImageTemplate}`

        return (
            <div>
                <Title brand={brand.name} title={name} />
                <div>£{price.current}</div>
                <div> 
                    <img src={heroImage} alt="picture of awesome product" />
                </div>
            </div>
        )
    }

    return (
        <div>
            <Title brand={brand.name} title={name} />
            <div>£{price.current}</div>
            <div> 
                { images.map(({ identifier }) => {
                    let imageUrl = `${ampImagePath}${identifier}${ampSmallImageTemplate}`
                    console.log(imageUrl)
                    return (
                        <img src={imageUrl} alt="picture of awesome product" />
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
    const productResponse = await fetch(`https://amp-poc-selling-product.netlify.app/.netlify/functions/selling-product/${productId}`)
    const product = await productResponse.json()
    console.log(product);

    if (!product || product.errors) {
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
