export function JsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Dawid Chlewicki - Trener Personalny",
        "image": "https://dctrener.pl/logo.jpg",
        "description": "Profesjonalne treningi personalne i plany żywieniowe w Gdańsku. Pomagam osiągnąć wymarzoną sylwetkę, zredukować wagę i poprawić zdrowie.",
        "url": "https://dctrener.pl",
        "telephone": "+48123456789",
        "priceRange": "$$",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Jabłoniowa 29a",
            "addressLocality": "Gdańsk",
            "postalCode": "80-175",
            "addressCountry": "PL"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 54.3364,
            "longitude": 18.5739
        },
        "sameAs": [
            "https://www.instagram.com/dc.trener/",
            "https://www.facebook.com/dc.trener/",
            "https://repspolska.pl/trener/Dawid-Chlewicki/REPS-TR-10010"
        ],
        "founder": {
            "@type": "Person",
            "name": "Dawid Chlewicki"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
