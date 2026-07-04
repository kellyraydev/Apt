-- Properties Table
CREATE TABLE IF NOT EXISTS properties (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  price INTEGER NOT NULL,
  bedrooms INTEGER NOT NULL,
  bathrooms DECIMAL(3,1) NOT NULL,
  sqft INTEGER NOT NULL,
  description TEXT,
  features TEXT[], -- Array of features
  images TEXT[], -- Array of image URLs
  agent_name VARCHAR(100),
  agent_phone VARCHAR(50),
  agent_email VARCHAR(100),
  agent_photo VARCHAR(255),
  is_featured BOOLEAN DEFAULT FALSE,
  available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security (RLS)
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON properties
  FOR SELECT USING (true);

-- Allow authenticated insert/update/delete
CREATE POLICY "Allow authenticated modifications" ON properties
  FOR ALL USING (auth.role() = 'authenticated');

-- Insert sample properties
INSERT INTO properties (title, address, city, price, bedrooms, bathrooms, sqft, description, features, images, agent_name, agent_phone, agent_email, agent_photo, is_featured, available)
VALUES
(
  'Modern Downtown Loft',
  '123 Main Street, Unit 4B',
  'New York',
  3500,
  2,
  1,
  1200,
  'Stunning modern loft in the heart of downtown. Floor-to-ceiling windows flood the space with natural light. Features exposed brick walls, hardwood floors throughout, and a gourmet kitchen with stainless steel appliances. Building amenities include a rooftop lounge, fitness center, and 24-hour concierge.',
  ARRAY['Rooftop Lounge', 'Fitness Center', '24h Concierge', 'Laundry In-Unit', 'Parking Available', 'Pet Friendly'],
  ARRAY['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800'],
  'Sarah Johnson',
  '(212) 555-0147',
  'sarah.j@premierhomes.com',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200',
  true,
  true
),
(
  'Luxury Waterfront Condo',
  '500 Harbor View Drive, Unit 12C',
  'Miami',
  4500,
  3,
  2,
  1800,
  'Breathtaking waterfront living with panoramic ocean views. This luxury condo features an open floor plan, designer finishes, and a private balcony overlooking the bay. The building offers valet parking, infinity pool, and direct beach access.',
  ARRAY['Ocean View', 'Infinity Pool', 'Beach Access', 'Valet Parking', 'Gym', 'Storage Unit'],
  ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800', 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'],
  'Michael Chen',
  '(305) 555-0289',
  'michael.c@beachliving.com',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
  true,
  true
),
(
  'Cozy Studio near University',
  '789 College Avenue, Unit 2A',
  'Boston',
  1800,
  0,
  1,
  550,
  'Perfect studio apartment steps from campus. Recently renovated with modern finishes. Includes all utilities and high-speed internet. Walking distance to shops, restaurants, and public transit.',
  ARRAY['All Utilities Included', 'High-Speed Internet', 'Near Campus', 'Laundry On-Site', 'Bike Storage', 'Study Lounge'],
  ARRAY['https://images.unsplash.com/photo-1560185007-5f0bb1866cab?w=800', 'https://images.unsplash.com/photo-1630699144867-37acec97df5a?w=800', 'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800'],
  'Emily Rodriguez',
  '(617) 555-0312',
  'emily.r@campusliving.com',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200',
  false,
  true
),
(
  'Spacious Family Home',
  '456 Oak Lane',
  'Chicago',
  3200,
  4,
  3,
  2400,
  'Beautiful single-family home in a quiet suburban neighborhood. Features a large backyard, two-car garage, updated kitchen with granite countertops, and a finished basement. Excellent schools nearby.',
  ARRAY['Large Backyard', '2-Car Garage', 'Finished Basement', 'Central AC', 'Security System', 'Near Schools'],
  ARRAY['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800'],
  'David Thompson',
  '(312) 555-0456',
  'david.t@familyhomes.com',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
  true,
  true
),
(
  'Artist Loft in Arts District',
  '222 Gallery Row, Unit 8D',
  'Los Angeles',
  2800,
  1,
  1,
  1400,
  'Unique artist loft with soaring 16-foot ceilings and industrial charm. Original hardwood floors, exposed ductwork, and massive windows create an inspiring space. Located in the heart of the arts district with galleries, cafes, and boutiques at your doorstep.',
  ARRAY['High Ceilings', 'Natural Light', 'Freight Elevator', 'Roof Deck Access', 'Pet Friendly', 'Artist Community'],
  ARRAY['https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800', 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800'],
  'Jessica Martinez',
  '(213) 555-0678',
  'jessica.m@artlofts.com',
  'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200',
  false,
  true
),
(
  'Executive Penthouse Suite',
  '1000 Skyline Tower, PH2',
  'Seattle',
  7500,
  3,
  2.5,
  2800,
  'Unparalleled luxury in this stunning penthouse with 360-degree views of the city and mountains. Features include a chef kitchen, private terrace, wine cellar, and smart home technology throughout. Full-service building with doorman, spa, and private dining.',
  ARRAY['360 Views', 'Private Terrace', 'Wine Cellar', 'Smart Home', 'Doorman', 'Private Spa'],
  ARRAY['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800', 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800', 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800'],
  'Robert Kim',
  '(206) 555-0890',
  'robert.k@skylineestates.com',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200',
  true,
  true
),
(
  'Charming Victorian Flat',
  '88 Heritage Street, Unit 3',
  'San Francisco',
  3800,
  2,
  1,
  1100,
  'Beautifully restored Victorian flat with original period details and modern updates. Features include bay windows, decorative fireplace, built-in bookshelves, and a shared garden. Located in a historic neighborhood with excellent walkability.',
  ARRAY['Period Details', 'Bay Windows', 'Garden Access', 'Laundry In-Unit', 'Storage', 'Historic Building'],
  ARRAY['https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800', 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'],
  'Amanda Lee',
  '(415) 555-0123',
  'amanda.l@victorianliving.com',
  'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=200',
  false,
  true
),
(
  'Modern Tech Hub Apartment',
  '555 Innovation Drive, Unit 15F',
  'Austin',
  2400,
  1,
  1,
  850,
  'Cutting-edge apartment designed for the modern professional. Features include a dedicated workspace, ultra-fast fiber internet, and smart home integration. Building offers co-working space, podcast studios, and a rooftop with city views.',
  ARRAY['Co-Working Space', 'High-Speed Internet', 'Smart Home', 'Podcast Studios', 'Rooftop Lounge', 'Bike Storage'],
  ARRAY['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800', 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800', 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800'],
  'Chris Taylor',
  '(512) 555-0345',
  'chris.t@techrentals.com',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
  false,
  true
);
