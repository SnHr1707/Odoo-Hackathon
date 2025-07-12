import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate can be used for search

// Sub-component with hover state
const ItemCard = ({ item, styles }) => {
    const [isHovered, setIsHovered] = useState(false);

    const cardStyle = {
        ...styles.itemCard,
        ...(isHovered && styles.itemCardHover),
    };

    return (
        <Link 
            key={item.id} 
            to={`/item/${item.id}`}
            style={cardStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img src={item.img} alt={item.name} style={styles.itemImage} />
            <div style={styles.itemInfo}>
                <h3 style={styles.itemName}>{item.name}</h3>
                <p style={styles.itemUser}>Listed by {item.user}</p>
            </div>
        </Link>
    );
};

function Home() {
    const [isLoaded, setIsLoaded] = useState(false);
    // --- NEW: State for the search bar ---
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate(); // Hook to programmatically navigate

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // --- NEW: Handler for search submission ---
    const handleSearchSubmit = (e) => {
        e.preventDefault(); // Prevent page from reloading
        if (searchQuery.trim()) {
            console.log('Searching for:', searchQuery);
            // Example: Navigate to a search results page
            // navigate(/browse?q=${searchQuery});
        }
    };

    const featuredItems = [
        {
            id: 1,
            name: 'Light Denim Jacket',
            user: 'Anna S.',
            img: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
            id: 2,
            name: 'Flowy Summer Dress',
            user: 'Mike P.',
            img: 'https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
            id: 3,
            name: 'White Leather Sneakers',
            user: 'Chloe R.',
            img: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
            id: 4,
            name: 'Casual Button-Down Shirt',
            user: 'David F.',
            img: 'https://images.pexels.com/photos/769733/pexels-photo-769733.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
    ];

    const styles = {
        page: {
            fontFamily: 'Arial, sans-serif',
            backgroundImage: 'linear-gradient(to bottom right, #f0f9f4, #e6f5ec)',
            color: '#1e4026',
            minHeight: '100vh',
        },
        hero: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '5rem 2rem',
            background: `
                linear-gradient(rgba(255,255,255,0.7), rgba(240,249,244,0.8)),
                url(https://images.unsplash.com/photo-1620799140408-edc6d5f9650d?q=80&w=1972&auto=format&fit=crop)
                no-repeat center center
            `,
            backgroundSize: 'cover',
            color: '#1e4026',
            borderBottom: '1px solid #d4e9e2',
        },
        heroContent: {
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            padding: '2rem 3rem',
            borderRadius: '12px',
            backdropFilter: 'blur(5px)',
        },
        heroContentLoaded: {
            opacity: 1,
            transform: 'translateY(0)',
        },
        heroTitle: {
            fontSize: '3rem',
            fontWeight: 'bold',
            margin: '0 0 1rem 0',
        },
        heroSubtitle: {
            fontSize: '1.2rem',
            marginBottom: '1.5rem', // Reduced margin to make space for search bar
            maxWidth: '600px',
        },
        // --- NEW: Styles for the search bar ---
        searchContainer: {
            display: 'flex',
            width: '100%',
            maxWidth: '500px',
            margin: '0 auto 2.5rem auto',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            overflow: 'hidden',
        },
        searchInput: {
            border: 'none',
            outline: 'none',
            padding: '0.8rem 1rem',
            fontSize: '1rem',
            flex: 1,
            backgroundColor: 'transparent',
            color: '#333',
        },
        searchButton: {
            border: 'none',
            padding: '0.8rem 1.5rem',
            backgroundImage: 'linear-gradient(45deg, #2ecc71, #27ae60)',
            color: 'white',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease',
        },
        ctaContainer: {
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
        },
        ctaButton: {
            backgroundImage: 'linear-gradient(45deg, #2ecc71, #27ae60)',
            color: 'white',
            padding: '0.8rem 1.8rem',
            textDecoration: 'none',
            fontWeight: 'bold',
            borderRadius: '8px',
            transition: 'transform 0.2s ease, background-color 0.2s ease',
            border: 'none',
            fontSize: '1rem',
        },
        ctaButtonSecondary: {
            backgroundColor: 'transparent',
            color: '#1e4026',
            border: '2px solid #1e4026',
        },
        section: {
            padding: '4rem 2rem',
            textAlign: 'center',
        },
        sectionTitle: {
            fontSize: '2.2rem',
            marginBottom: '3rem',
            fontWeight: '600',
        },
        carousel: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
        },
        itemCard: {
            textDecoration: 'none',
            color: '#333',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        },
        itemCardHover: {
            transform: 'scale(1.05) translateY(-5px)',
            boxShadow: '0 12px 25px rgba(0,0,0,0.1)',
            backgroundImage: 'linear-gradient(to top right, #f0f9f4, #ffffff)',
        },
        itemImage: {
            width: '100%',
            height: '280px',
            objectFit: 'cover',
        },
        itemInfo: {
            padding: '1rem',
            textAlign: 'left',
        },
        itemName: {
            fontWeight: 'bold',
            fontSize: '1.1rem',
            margin: '0 0 0.5rem 0',
        },
        itemUser: {
            fontSize: '0.9rem',
            color: '#777',
        },
        footer: {
            backgroundImage: 'linear-gradient(to right, #2c3e50, #34495e)',
            color: 'white',
            padding: '2rem',
            textAlign: 'center',
            marginTop: '3rem',
        },
    };

    return (
        <div style={styles.page}>
            <main>
                <section style={styles.hero}>
                    <div style={{ ...styles.heroContent, ...(isLoaded && styles.heroContentLoaded) }}>
                        <h1 style={styles.heroTitle}>Give Your Wardrobe a Second Life</h1>
                        <p style={styles.heroSubtitle}>
                            Welcome to ReWear! Join our community to exchange unused clothing, promote sustainable fashion, and refresh your style without spending a dime.
                        </p>

                        {/* --- NEW: Search Bar Form --- */}
                        <form style={styles.searchContainer} onSubmit={handleSearchSubmit}>
                            <input
                                type="text"
                                placeholder="Search for items like 'red dress'..."
                                style={styles.searchInput}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button type="submit" style={styles.searchButton}>
                                Search
                            </button>
                        </form>

                        <div style={styles.ctaContainer}>
                            <Link to="/signup" style={styles.ctaButton}>Start Swapping</Link>
                            <Link to="/browse" style={{ ...styles.ctaButton, ...styles.ctaButtonSecondary }}>Browse Items</Link>
                            <Link to="/add-item" style={{ ...styles.ctaButton, ...styles.ctaButtonSecondary }}>List an Item</Link>
                        </div>
                    </div>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>Featured Items</h2>
                    <div style={styles.carousel}>
                        {featuredItems.map(item => (
                            <ItemCard key={item.id} item={item} styles={styles} />
                        ))}
                    </div>
                </section>
            </main>

            <footer style={styles.footer}>
                <p>© 2024 ReWear. A sustainable fashion project for the Odoo-Hackathon.</p>
            </footer>
        </div>
    );
}

export default Home;