import logging
from sqlalchemy.orm import Session
from backend.models.base import User, Destination, Hotel, Restaurant, Place, Notification, Review
from backend.services.security import get_password_hash

logger = logging.getLogger("MockLoader")

def seed_database(db: Session):
    # Check if data already exists
    if db.query(Destination).first():
        logger.info("Database already seeded. Skipping seeder.")
        return

    logger.info("Seeding realistic travel and user mock data...")

    # 1. Seed Users (Including Admin and standard user)
    admin_user = User(
        email="admin@findtheway.com",
        hashed_password=get_password_hash("admin123"),
        full_name="Administrator",
        phone="+91 9999999999",
        country="India",
        role="admin",
        avatar_url="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80"
    )
    test_user = User(
        email="haneef@example.com",
        hashed_password=get_password_hash("password123"),
        full_name="Haneef Shaik",
        phone="+91 9876543210",
        country="India",
        role="user",
        avatar_url="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80"
    )
    db.add(admin_user)
    db.add(test_user)
    db.flush() # Populate IDs

    # 2. Seed Destinations
    destinations = [
        Destination(
            id="goa",
            name="Goa",
            state="Goa",
            description="Famous for beautiful sandy beaches, active nightlife, local shacks, and historical Portuguese chapels.",
            rating=4.7,
            review_count=1840,
            budget=15000,
            coordinates=[15.2993, 74.1240],
            image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
        ),
        Destination(
            id="kashmir",
            name="Srinagar",
            state="Jammu & Kashmir",
            description="Experience breathtaking alpine valleys, shikara row boat journeys, and scenic snowcapped mountains.",
            rating=4.9,
            review_count=1250,
            budget=28000,
            coordinates=[34.0837, 74.7973],
            image="https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?auto=format&fit=crop&w=800&q=80"
        ),
        Destination(
            id="kerala",
            name="Munnar",
            state="Kerala",
            description="Famed for tranquil backwater cruise houseboats, spice plantations, and lush tea gardens.",
            rating=4.8,
            review_count=980,
            budget=18000,
            coordinates=[10.0889, 77.0595],
            image="https://images.unsplash.com/photo-1602216056096-3c40cc0c9944?auto=format&fit=crop&w=800&q=80"
        ),
        Destination(
            id="jaipur",
            name="Jaipur",
            state="Rajasthan",
            description="Step into historic royal palaces, heritage forts, and lively handcrafted bazaar markets.",
            rating=4.6,
            review_count=1120,
            budget=14000,
            coordinates=[26.9124, 75.7873],
            image="https://images.unsplash.com/photo-1477584305590-3a63f60078d0?auto=format&fit=crop&w=800&q=80"
        ),
        Destination(
            id="delhi",
            name="New Delhi",
            state="Delhi",
            description="Explore the center of historic Mughal monuments, food alleys, and state museums.",
            rating=4.5,
            review_count=1540,
            budget=12000,
            coordinates=[28.6139, 77.2090],
            image="https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80"
        ),
        Destination(
            id="hyderabad",
            name="Hyderabad",
            state="Telangana",
            description="The historic City of Nizams famous for premium biryanis, IT hubs, and pearls.",
            rating=4.6,
            review_count=1430,
            budget=13000,
            coordinates=[17.3850, 78.4867],
            image="https://images.unsplash.com/photo-1608958416715-db14aa52f679?auto=format&fit=crop&w=800&q=80"
        )
    ]
    for dest in destinations:
        db.add(dest)
    db.flush()

    # 3. Seed Hotels
    hotels = [
        # Goa
        Hotel(
            id="goa-h1",
            destination_id="goa",
            name="Taj Exotica Resort & Spa",
            location="Benaulim Beach, South Goa",
            rating=4.9,
            price=12000,
            image="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80",
            is_luxury=True,
            coordinates=[15.2486, 73.9248]
        ),
        Hotel(
            id="goa-h2",
            destination_id="goa",
            name="海 Shore Breeze Beach Stay",
            location="Calangute, North Goa",
            rating=4.3,
            price=2800,
            image="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=400&q=80",
            is_luxury=False,
            coordinates=[15.5414, 73.7631]
        ),
        # Kashmir
        Hotel(
            id="kas-h1",
            destination_id="kashmir",
            name="The Khyber Himalayan Resort",
            location="Gulmarg, Srinagar",
            rating=4.9,
            price=18000,
            image="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80",
            is_luxury=True,
            coordinates=[34.0484, 74.3805]
        ),
        Hotel(
            id="kas-h2",
            destination_id="kashmir",
            name="Dal Lake Heritage Houseboat",
            location="Ghat 12, Dal Lake",
            rating=4.6,
            price=4500,
            image="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=400&q=80",
            is_luxury=False,
            coordinates=[34.0950, 74.8450]
        ),
        # Munnar (Kerala)
        Hotel(
            id="ker-h1",
            destination_id="kerala",
            name="Blanket Hotel & Spa",
            location="Pallivasal, Munnar",
            rating=4.8,
            price=9500,
            image="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=400&q=80",
            is_luxury=True,
            coordinates=[10.0652, 77.0425]
        ),
        # Hyderabad
        Hotel(
            id="hyd-h1",
            destination_id="hyderabad",
            name="Taj Falaknuma Palace",
            location="Engine Bowli, Falaknuma",
            rating=4.9,
            price=32000,
            image="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=400&q=80",
            is_luxury=True,
            coordinates=[17.3303, 78.4682]
        ),
        Hotel(
            id="hyd-h2",
            destination_id="hyderabad",
            name="Novotel Hyderabad Convention Centre",
            location="Hitec City, Kothaguda",
            rating=4.5,
            price=7200,
            image="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=400&q=80",
            is_luxury=False,
            coordinates=[17.4721, 78.3735]
        )
    ]
    for hotel in hotels:
        db.add(hotel)

    # 4. Seed Restaurants
    restaurants = [
        # Goa
        Restaurant(
            id="goa-r1",
            destination_id="goa",
            name="Fishermans Wharf",
            cuisine="Goan Seafood / Continental",
            rating=4.6,
            price_range="₹₹₹",
            estimated_cost=1500,
            image="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=250&q=80",
            coordinates=[15.2652, 73.9482]
        ),
        Restaurant(
            id="goa-r2",
            destination_id="goa",
            name="Martin's Corner",
            cuisine="Authentic Goan Vindaloo",
            rating=4.5,
            price_range="₹₹",
            estimated_cost=800,
            image="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=250&q=80",
            coordinates=[15.2922, 73.9112]
        ),
        # Kashmir
        Restaurant(
            id="kas-r1",
            destination_id="kashmir",
            name="Ahdoos Restaurant",
            cuisine="Traditional Kashmiri Wazwan",
            rating=4.8,
            price_range="₹₹",
            estimated_cost=900,
            image="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=250&q=80",
            coordinates=[34.0754, 74.8105]
        ),
        # Hyderabad
        Restaurant(
            id="hyd-r1",
            destination_id="hyderabad",
            name="Paradise Biryani",
            cuisine="Hyderabadi Dum Biryani",
            rating=4.6,
            price_range="₹₹",
            estimated_cost=600,
            image="https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=250&q=80",
            coordinates=[17.4436, 78.4901]
        ),
        Restaurant(
            id="hyd-r2",
            destination_id="hyderabad",
            name="Chutneys",
            cuisine="South Indian Tiffins & Guntur Idli",
            rating=4.5,
            price_range="₹",
            estimated_cost=300,
            image="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=250&q=80",
            coordinates=[17.4258, 78.4485]
        )
    ]
    for res in restaurants:
        db.add(res)

    # 5. Seed Places (Attractions)
    places = [
        # Goa
        Place(
            id="goa-p1",
            destination_id="goa",
            name="Basilica of Bom Jesus",
            description="Historic 16th-century Portuguese church holding the mortal remains of St. Francis Xavier.",
            timings="9:00 AM - 6:30 PM",
            entry_fee=0,
            location="Old Goa Road",
            image="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=400&q=80",
            coordinates=[15.5009, 73.9116]
        ),
        Place(
            id="goa-p2",
            destination_id="goa",
            name="Dudhsagar Falls",
            description="Four-tiered cascading waterfall creating a milky spray on the Mandovi River.",
            timings="8:00 AM - 4:00 PM",
            entry_fee=400,
            location="Sanguem Taluka",
            image="https://images.unsplash.com/photo-1590050752117-238cb0612b1b?auto=format&fit=crop&w=400&q=80",
            coordinates=[15.3125, 74.3142]
        ),
        # Kashmir
        Place(
            id="kas-p1",
            destination_id="kashmir",
            name="Shalimar Bagh Mughal Garden",
            description="Stunning layered terraces, water fountains, and chinar trees built by Emperor Jehangir.",
            timings="9:30 AM - 5:30 PM",
            entry_fee=25,
            location="Dal Lake Outer Link Road",
            image="https://images.unsplash.com/photo-1595171731676-474c10df854e?auto=format&fit=crop&w=400&q=80",
            coordinates=[34.1487, 74.8722]
        ),
        # Hyderabad
        Place(
            id="hyd-p1",
            destination_id="hyderabad",
            name="Charminar",
            description="Built in 1591, this mosque monument features four grand minarets overlooks historical bazaars.",
            timings="9:30 AM - 5:30 PM",
            entry_fee=40,
            location="Charminar Road, Hyderabad",
            image="https://images.unsplash.com/photo-1581333100576-b73bbe79c955?auto=format&fit=crop&w=400&q=80",
            coordinates=[17.3616, 78.4747]
        ),
        Place(
            id="hyd-p2",
            destination_id="hyderabad",
            name="Golconda Fort",
            description="Historic citadel fortress, acoustic arches, and diamond mines repository of the Qutb Shahi dynasty.",
            timings="9:00 AM - 5:30 PM",
            entry_fee=80,
            location="Khairtabad, Hyderabad",
            image="https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=400&q=80",
            coordinates=[17.3833, 78.4011]
        )
    ]
    for place in places:
        db.add(place)

    # 6. Add standard welcome notifications
    db.add(Notification(
        user_id=test_user.id,
        title="Welcome to FindTheWay!",
        message="Your account has been initialized. Start planning your custom travel itinerary using AI today!"
    ))
    db.add(Notification(
        user_id=test_user.id,
        title="Monsoon Alert",
        message="Special monsoon discounts are live! Check deals under Goa hotels."
    ))

    # 7. Add target reviews
    db.add(Review(
        user_id=test_user.id,
        target_id="goa",
        target_type="destination",
        rating=5.0,
        text="Absolutely beautiful! The beaches were clean and the shacks served awesome seafood. Highly recommended for couples!"
    ))

    db.commit()
    logger.info("Database successfully seeded with travel mock data!")
