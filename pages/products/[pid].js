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

    // TODO Populate new layout object based off the Amplience PDP Config and PDP Layout 
    // and use it to store the JSX version of the layout to be rendered in the return

    // Get fullWidthImage config from Amplience PDP Config content
    const isFullWidthImage = layout.content.fullWidthImage
    var imageLayout
    if (isFullWidthImage) {
        imageLayout = <FullWidthImage product={product} />
    } else {
        imageLayout = <ImageGrid product={product} />
    }

    return (
        <div>
            <Title product={product} />
            <Price product={product} />
            {imageLayout}
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

    // TODO Get layout for subcategory < category < department < default(?)

    // Get category from product data
    var category = product.data.attributes.navigation.category
    var brand = product.data.attributes.brand.name

    // TODO Define rules for differentiating layouts for products (logic vs CMS)
    if (brand === 'Nike' && category === 'mens_trainers') {
        category = 'nike-trainers'
    } 
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
