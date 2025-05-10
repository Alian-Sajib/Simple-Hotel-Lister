import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Select,
    Radio,
    Button,
    Row,
    Col,
    Typography,
    Space,
    Card,
    Rate,
    Switch,
    ConfigProvider,
    theme,
    Spin,
    Tooltip,
    message,
} from 'antd';
import { BulbOutlined, BulbFilled, BookOutlined, BookFilled } from '@ant-design/icons';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Url } from '../../redux/actionTypes';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

const location_key = {
    "new york": "g60763",
    "atlanta": "g60898",
    "boston": "g60745",
    "las vegas": "g45963",
    "philadelphia": "g60795",
};


const HomePage = ({ darkMode, setDarkMode }) => {
    const navigate = useNavigate();
    const [location, setLocation] = useState();
    const [starRating, setStarRating] = useState();
    const [poolAvailable, setPoolAvailable] = useState('');
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [bookmarkedHotels, setBookmarkedHotels] = useState([]);

    const token = useSelector(state => state.token);
    const user = useSelector(state => state.userId);

    const fetchBookmarks = async () => {
        try {
            const res = await axios.get(Url + `/api/savedhotels/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setBookmarkedHotels(res.data);
        } catch (error) {
            console.error("Error fetching bookmarks:", error);
        }
    };

    useEffect(() => {
        fetchBookmarks();
    }, []);

    const toggleBookmark = async (hotel) => {
        const found = bookmarkedHotels.find(h => h.hotel_name === hotel.name);
        if (found) {
            try {
                await axios.delete(Url + `/api/savedhotels/${found.id}/`, {
                    headers: { Authorization: ` Bearer ${token}` }
                });
                message.success("Removed from saved hotels");
                fetchBookmarks();
            } catch (err) {
                console.error("Error deleting bookmark:", err);
            }
        } else {
            const payload = {
                hotel_name: hotel.name,
                hotel_url: hotel.url,
                rating: hotel.review_summary?.rating || null,
                count: hotel.review_summary?.count || null,
                min_price: hotel.price_ranges?.minimum || null,
                max_price: hotel.price_ranges?.maximum || null,
                user: user,
            };

            try {
                await axios.post(Url + `/api/savedhotels/`, payload, {
                    headers: { Authorization: `Bearer ${token} ` }
                });
                message.success("Hotel saved!");
                fetchBookmarks();
            } catch (err) {
                // Log the error response to check for more details
                console.error("Error saving bookmark:", err.response?.data || err);
                message.error("Failed to save hotel");
            }
        }
    };


    const handleSearch = async () => {
        if (!location) return;
        const locKey = location_key[location.toLowerCase()];
        if (!locKey) {
            message.warning("Please select a valid city from the list.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(Url + `/api/hotels/?location_key=${locKey}`, {
                headers: { Authorization: `Bearer ${token} ` }
            });

            const data = response.data;

            if (data?.result?.list) {
                const filtered = data.result.list.filter(hotel => {
                    const meetsRating = starRating
                        ? Math.floor(hotel.review_summary?.rating || 0) === parseInt(starRating)
                        : true;
                    return meetsRating;
                });
                setHotels(filtered);
            } else {
                setHotels([]);
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            setHotels([]);
        }
        setLoading(false);
    };


    const backgroundStyle = {
        backgroundColor: darkMode ? '#1f1f1f' : '#f0f2f5',
        color: darkMode ? '#ffffff' : '#000000',
        minHeight: '100vh',
        padding: '40px',
        transition: 'all 0.3s ease'
    };

    return (
        <ConfigProvider theme={{ algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
            <div style={backgroundStyle}>
                <Row justify="space-between" align="middle" style={{ marginBottom: '30px' }}>
                    <div>
                        <Title level={2} style={{ color: darkMode ? '#fff' : '#000' }}>Hotel Lister</Title>
                        <Text>Find the best place for your refreshmeent...</Text>
                    </div>

                    <Space>
                        <Switch
                            checkedChildren={<BulbFilled />}
                            unCheckedChildren={<BulbOutlined />}
                            checked={darkMode}
                            onChange={setDarkMode}
                        />
                        <Tooltip title="View your saved hotels">
                            <Button
                                type="default"
                                icon={<BookFilled />}
                                onClick={() => navigate('/saved-hotels')}
                            >
                                View Saved Hotels
                            </Button>
                        </Tooltip>
                        <Button type="primary" danger onClick={() => navigate('/logout')}>
                            Logout
                        </Button>
                    </Space>
                </Row>

                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={16} md={8}>
                            <Select
                                placeholder="Select City"
                                size="large"
                                style={{ width: '100%' }}
                                value={location}
                                onChange={value => setLocation(value)}
                                allowClear
                            >
                                {Object.keys(location_key).map(city => (
                                    <Option key={city} value={city}>
                                        {city.replace(/\b\w/g, l => l.toUpperCase())}
                                    </Option>
                                ))}
                            </Select>
                        </Col>
                        <Col xs={24} sm={8} md={4}>
                            <Button type="primary" size="large" style={{ width: '100%' }} onClick={handleSearch}>
                                Search
                            </Button>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={8}>
                            <label><strong style={{ color: darkMode ? '#fff' : '#000' }}>Star Rating</strong></label>
                            <Select
                                placeholder="Select rating"
                                size="large"
                                style={{ width: '100%' }}
                                value={starRating}
                                onChange={value => setStarRating(value)}
                                allowClear
                            >
                                <Option value="3">3-Star</Option>
                                <Option value="4">4-Star</Option>
                                <Option value="5">5-Star</Option>
                            </Select>
                        </Col>

                        <Col xs={24} sm={12} md={8}>
                            <label><strong style={{ color: darkMode ? '#fff' : '#000' }}>Pool Available</strong></label>
                            <Radio.Group
                                size="large"
                                onChange={e => setPoolAvailable(e.target.value)}
                                value={poolAvailable}
                                style={{ display: 'block', marginTop: '8px' }}
                            >
                                <Radio value="yes">Yes</Radio>
                                <Radio value="no">No</Radio>
                            </Radio.Group>
                        </Col>
                    </Row>
                </Space>

                <div style={{ marginTop: '40px' }}>
                    <Title level={4} style={{ color: darkMode ? '#fff' : '#000' }}>Search Results</Title>
                    {loading ? (
                        <Spin size="large" />
                    ) : (
                        <Row gutter={[16, 16]}>
                            {hotels.length > 0 ? hotels.map((hotel, index) => (
                                <Col xs={24} sm={12} md={8} key={index}>
                                    <Card
                                        title={hotel.name}
                                        extra={
                                            <Rate disabled allowHalf defaultValue={hotel.review_summary?.rating || 0} />
                                        }
                                        style={{
                                            background: darkMode ? '#141414' : '#fff',
                                            color: darkMode ? '#fff' : '#000'
                                        }}
                                    >
                                        <Paragraph style={{ color: darkMode ? '#ccc' : '#000' }}>
                                            The accommodation type of {hotel.name} is {hotel.accommodation_type || 'N/A'} with a rating of {hotel.review_summary?.rating ?? 'N/A'} and total reviews {hotel.review_summary?.count ?? 0}.
                                        </Paragraph>
                                        <Paragraph style={{ color: darkMode ? '#ccc' : '#000' }}>
                                            <strong>Price:</strong> ${hotel.price_ranges?.minimum ?? 'N/A'} - ${hotel.price_ranges?.maximum ?? 'N/A'} / night
                                        </Paragraph>
                                        <Space size="middle" style={{ marginTop: '16px' }}>
                                            <a href={hotel.url} target="_blank" rel="noopener noreferrer">
                                                <Button type="primary">View Details</Button>
                                            </a>
                                            <Tooltip
                                                title={
                                                    bookmarkedHotels.some(h => h.hotel_name === hotel.name)
                                                        ? 'Remove from saved hotels'
                                                        : 'Save this hotel'
                                                }
                                            >
                                                <Button
                                                    type={bookmarkedHotels.some(h => h.hotel_name === hotel.name) ? 'default' : 'text'}
                                                    icon={
                                                        bookmarkedHotels.some(h => h.hotel_name === hotel.name)
                                                            ? <BookFilled style={{ color: darkMode ? '#fff' : '#000' }} />
                                                            : <BookOutlined style={{ color: darkMode ? '#fff' : '#000' }} />
                                                    }
                                                    onClick={() => toggleBookmark(hotel)}
                                                    style={{
                                                        border: '1px solid #d9d9d9',
                                                        backgroundColor: darkMode ? '#141414' : '#fff',
                                                        color: darkMode ? '#fff' : '#000'
                                                    }}
                                                >
                                                    {bookmarkedHotels.some(h => h.hotel_name === hotel.name) ? 'Saved' : 'Save'}
                                                </Button>
                                            </Tooltip>
                                        </Space>
                                    </Card>
                                </Col>
                            )) : (
                                <Paragraph style={{ color: darkMode ? '#ccc' : '#000' }}>
                                    No results found.
                                </Paragraph>
                            )}
                        </Row>
                    )}
                </div>
            </div>
        </ConfigProvider>
    );
};
export default HomePage;