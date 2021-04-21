import Layout from '../../components/layout'

export default function ProductPage() {
    return (
        <Layout>
            <h1>Product Title</h1>
            <div>£122</div>
        </Layout>
    )
}

export async function getServerSideProps({ params }) {
    // Fetch necessary data for the blog post using params.id
    const data = {
        "id": "1",
        "nav": {
            "department": "home_and_furniture",
            "category": "sofas",
            "subcategory": "corner_sofas",
        },
        "images": {
            "hero_image": "https://media.very.co.uk/i/very/MCTQN_SQ1_0000011520_VINTAGE_TAN_SLf?$550x733_standard$",
        },
        "price": "£1499",
        "title": "Hampshire Premium Leather Corner Group Sofa"
    }
}