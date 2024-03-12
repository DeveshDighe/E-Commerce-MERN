import React from 'react'

const Footer = () => {

    const handleSmoothScroll = (id) => {
        if (id === '/') {
            return navigate('/')
        }

        const targetElement = document.getElementById(id);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
    return (
        <div id='About' className='footerCss'>

            <footer className="flex h-full flex-col space-y-10 justify-center py-16 bg-gray-900">
                {/* pages: [
                {name: 'Home', id: '/', href: '/' },
                {name: 'Products', id: 'Prod', href: '#Prod' },
                {name: 'About Me', id: 'About', href: '#About' },
                ] */}
                <nav className="flex justify-center flex-wrap gap-6 text-gray-100 font-medium px-4">
                    <a className="hover:text-gray-500 cursor-pointer" href="/">Home</a>
                    <a className="hover:text-gray-500 cursor-pointer" onClick={() => handleSmoothScroll('Prod')}>Products</a>
                    <a className=" cursor-default">Services</a>
                    <a className=" cursor-default">Media</a>
                    <a className=" cursor-default">Gallery</a>
                    <a className=" cursor-default">Contact</a>
                </nav>

                <div className="flex justify-center space-x-5">
                    <a href="https://www.linkedin.com/in/deveshdighe" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.icons8.com/fluent/30/000000/linkedin-2.png" />
                    </a>
                    <a href="https://www.instagram.com/im___deveshhh?igsh=MTMwHR2Ym01NXhmaA==" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.icons8.com/fluent/30/000000/instagram-new.png" />
                    </a>
                    <a href="https://github.com/DeveshDighe" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.icons8.com/fluent/30/000000/github.png" />
                    </a>
                    <a href="https://twitter.com/devesh_dighe" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.icons8.com/fluent/30/000000/twitter.png" alt="Twitter" />
                    </a>


                </div>
                <p className="text-center text-gray-400 font-medium cursor-default">🤍 Thank You For Visiting 🤍</p>
            </footer>
        </div>
    )
}

export default Footer