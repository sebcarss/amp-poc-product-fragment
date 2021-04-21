import Title from '../../components/modules/product/title'
import Price from '../../components/modules/price/price'
import ImageGrid from '../../components/modules/images/image-grid'

function DefaultLayout(props) {
    const { data: { id, attributes } } = props.product
    const { brand, name, images, price } = attributes;

    return (
        <div>
            <Title brand={brand.name} title={name} />
            <Price price={price} />
            <ImageGrid images={images} />
        </div> 
    )
    
}

export default DefaultLayout