function Title (props) {
    const { data: { attributes: { brand, name} } } = props.product

    return (
        <div>
            <h1>{brand.name}</h1>
            <h2>{name}</h2>
        </div>
    )
}

export default Title