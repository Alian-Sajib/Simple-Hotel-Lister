import React, { useEffect, useState } from 'react';
import {
    Row, Col, Card, Typography, Space, Button, Rate, Spin, ConfigProvider, theme, message, Tooltip
} from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DeleteOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const SavedHotels = ({ darkMode }) => {
    const token = useSelector(state => state.token);
    const [savedHotels, setSavedHotels] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSavedHotels = async () => {
            setLoading(true);
            try {
                const res = await axios.get("http://127.0.0.1:8000/api/savedhotels/", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setSavedHotels(res.data);
            } catch (error) {
                console.error("Error fetching saved hotels:", error);
                message.error("Failed to load saved hotels");
            }
            setLoading(false);
        };

        fetchSavedHotels();
    }, [token]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/savedhotels/${id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSavedHotels(prev => prev.filter(hotel => hotel.id !== id));
            message.success("Hotel removed from saved list");
        } catch (error) {
            console.error("Error deleting saved hotel:", error);
            message.error("Failed to delete hotel");
        }
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
                    <Title level={2} style={{ color: darkMode ? '#fff' : '#000' }}>Saved Hotels</Title>
                    <Button type="primary" onClick={() => navigate('/')}>Back to Home</Button>
                </Row>

                {loading ? (
                    <Spin size="large" />
                ) : (
                    <Row gutter={[16, 16]}>
                        {savedHotels.length > 0 ? savedHotels.map((hotel, index) => (
                            <Col xs={24} sm={12} md={8} key={index}>
                                <Card
                                    title={hotel.hotel_name}
                                    extra={<Rate disabled allowHalf defaultValue={hotel.rating || 0} />}
                                    style={{
                                        background: darkMode ? '#141414' : '#fff',
                                        color: darkMode ? '#fff' : '#000'
                                    }}
                                >
                                    <Paragraph style={{ color: darkMode ? '#ccc' : '#000' }}>
                                        The accommodation type of {hotel.hotel_name} is Hotel with a rating of {hotel.rating ?? 'N/A'} and total reviews {hotel.count ?? 0}.
                                    </Paragraph>
                                    <Paragraph style={{ color: darkMode ? '#ccc' : '#000' }}>
                                        <strong>Price:</strong> ${hotel.min_price ?? 'N/A'} - ${hotel.max_price ?? 'N/A'} / night
                                    </Paragraph>
                                    <Space style={{ marginTop: '16px' }}>
                                        <a href={hotel.hotel_url} target="_blank" rel="noopener noreferrer">
                                            <Button type="primary">View Details</Button>
                                        </a>
                                        <Tooltip title="Remove from saved hotels">
                                            <Button
                                                type="default"
                                                danger
                                                icon={<DeleteOutlined />}
                                                onClick={() => handleDelete(hotel.id)}
                                            >
                                                Delete
                                            </Button>
                                        </Tooltip>
                                    </Space>
                                </Card>
                            </Col>
                        )) : (
                            <Paragraph>No saved hotels found.</Paragraph>
                        )}
                    </Row>
                )}
            </div>
        </ConfigProvider>
    );
};

export default SavedHotels;
