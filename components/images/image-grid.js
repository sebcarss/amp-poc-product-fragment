// TODO Get this from properties store?
const ampImagePath = "https://media.very.co.uk/i/very/"

// Specific to the layout of this component (could pull from Amplience of leave in our code as guardrails)
const ampSmallImageTemplate = "?w=250&h=250&sm=TL"

function ImageGrid (props) {
    return (
        <div>
            { props.images.map(({ identifier }) => {
                let imageUrl = `${ampImagePath}${identifier}${ampSmallImageTemplate}`
                console.log(imageUrl)
                return (
                    <img src={imageUrl} alt="picture of awesome product" />
                )
            })}
        </div>
    )
}

export default ImageGrid