import Title from '../../components/product/title'
import Price from '../../components/price/price'
import ImageGrid from '../../components/images/image-grid'
import FullWidthImage from '../../components/images/full-width-image'

export default function Product({ product, layout }) {
    const { data: { id, attributes } } = product
    const { brand, name, images, price } = attributes;

    // Return default layout if not found in Amplience
    if (layout === undefined) {

        // TODO Create a DefaultLayout component and pass props in

        return (
            <div>
                <Title brand={brand.name} title={name} />
                <Price price={price} />
                <ImageGrid images={images} />
            </div>
        )
    }

    // Get fullWidthImage config from Amplience PDP Config content
    const isFullWidthImage = layout.content.fullWidthImage
    if (isFullWidthImage) {
        return (
            <div>
                <Title brand={brand.name} title={name} />
                <Price price={price} />
                <FullWidthImage images={images} />
            </div>
        )
    }

    return (
        <div>
            <Title brand={brand.name} title={name} />
            <Price price={price} />
            <ImageGrid images={images} />
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

    if (!product || product.errors || product.error) {
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
}
