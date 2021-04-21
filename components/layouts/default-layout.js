import Title from '../../components/modules/product/title'
import Price from '../../components/modules/price/price'
import ImageGrid from '../../components/modules/images/image-grid'

function DefaultLayout(props) {
    const { data: { id, attributes } } = props.product
    const { brand, name, images, price } = attributes;

    return (
        <div>
            <Title product={props.product} />
            <Price product={props.product} />
            <ImageGrid product={props.product} />
        </div> 
    )
    
}

export default DefaultLayout