// TODO Move to cental location to be shared
const ampImagePath = "https://media.very.co.uk/i/very/"

// Specific config for this layout
const ampWideImageTemplate = "?w=800&h=800&sm=TL&crop=0,350,1200,250"

function FullWidthImage(props) {
    let heroImage = `${ampImagePath}${props.images[0].identifier}${ampWideImageTemplate}`

    return (
        <div>
            <img src={heroImage} alt="picture of awesome product" />
        </div>
    )
}

export default FullWidthImage