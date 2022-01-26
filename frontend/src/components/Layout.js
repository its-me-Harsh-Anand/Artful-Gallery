import Footer from "./Footer"
import Header from "./Header"
import { Helmet } from "react-helmet"

function Layout({title, keywords, description, children}) {
    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name = 'description' content = {description} />
                <meta name = 'keywords' content = {keywords} />
            </Helmet>

            <Header />
            <div>
                {children}
            </div>
            <Footer />
        </>
    )
}
Layout.defaultProps = {
    title : "Welcome to Gallery App",
    keywords : "Gallery App instagram facebook",
    description : "Just a simple gallery app where you can upload your pictures and showcase to your friends."
}
export default Layout
