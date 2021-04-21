function Price(props) {
    const { data: { attributes: { price } } } = props.product

    if (price.previous) {
        return (
            <div>
                <div style={{ textDecoration: 'line-through', textDecorationLine: 'solid' }}>£{price.previous}</div>
                <div style={{ color: "red" }}>£{price.current}</div>
            </div>
        )
    } else {
        return (
            <div>
                <div>£{price.current}</div>
            </div>
        )
    }
}

export default Price