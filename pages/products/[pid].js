import DefaultLayout from '../../components/layouts/default-layout'
import Title from '../../components/modules/product/title'
import Price from '../../components/modules/price/price'
import ImageGrid from '../../components/modules/images/image-grid'
import FullWidthImage from '../../components/modules/images/full-width-image'

export default function Product({ product, layout }) {
    // Return default layout if not found in Amplience
    if (layout === undefined) {
        return (
            <DefaultLayout product={product} />
        )
    }

    // Get fullWidthImage config from Amplience PDP Config content
    const isFullWidthImage = layout.content.fullWidthImage
    if (isFullWidthImage) {
        return (
            <div>
                <Title product={product} />
                <Price product={product} />
                <FullWidthImage product={product} />
            </div>
        )
    }

    // TODO Merge these together using if statements to define the layouts

    return (
        <div>
            <Title product={product} />
            <Price product={product} />
            <ImageGrid product={product} />
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
