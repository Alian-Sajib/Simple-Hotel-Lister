import React, { useState } from "react";
import { Form, Input, Button, Typography, Card, Space, Row, Col, message } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { auth } from "../../redux/authactionTypes";
import "./LoginPage.css";

const { Title, Text } = Typography;

const LoginPage = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const dispatch = useDispatch();
    const toggleMode = () => setIsSignUp((prev) => !prev);

    const handleSubmit = (values) => {
        // console.log("Form Values: ", values);
        const { email, password } = values;
        dispatch(auth(email, password, isSignUp));
    };

    const handleSubmitFailed = (errorInfo) => {
        message.error('Empty Field. Please check your input.');
    }

    return (
        <div className="login-page-wrapper">
            <header className="header">
                <h3 className="main-heading"> Simple Hotel Lister</h3>
                <Text className="subheading">
                    Find the best hotels for your stay. Sign up to list or book a hotel.
                </Text>
            </header>

            <Row className="login-page-container">
                <Col xs={24} md={12} className="left-map-section">
                    <div className="map-container">
                        <img
                            src="https://3.imimg.com/data3/FM/MD/MY-1906485/hotel-booking-1000x1000.jpg"
                            alt="Hotel Listing"
                            className="map-image"
                        />


                    </div>
                </Col>

                <Col xs={24} md={12} className="right-form-section">
                    <Card variant={false} className="auth-card">
                        <Title level={2} style={{ textAlign: "center", marginBottom: "24px" }}>
                            {isSignUp ? "Sign Up" : "Sign In"}
                        </Title>
                        <Form
                            name={isSignUp ? "signup" : "signin"}
                            onFinish={handleSubmit}
                            onFinishFailed={handleSubmitFailed}
                            layout="vertical"
                        >
                            <Form.Item
                                name="email"
                                rules={[
                                    { type: 'email', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email address!', required: true },
                                ]}
                            >
                                <Input prefix={<MailOutlined />} placeholder="Email" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: "Please enter your password!" }]}
                            >
                                <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                            </Form.Item>
                            {isSignUp && (
                                <Form.Item
                                    name="confirmPassword"
                                    dependencies={["password"]}
                                    hasFeedback
                                    rules={[
                                        { required: true, message: "Please confirm your password!" },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue("password") === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error("Passwords do not match!"));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
                                </Form.Item>
                            )}
                            <Form.Item>
                                <Button type="primary" htmlType="submit" block>
                                    {isSignUp ? "Sign Up" : "Sign In"}
                                </Button>
                            </Form.Item>
                        </Form>
                        <Space direction="vertical" style={{ width: "100%", textAlign: "center" }}>
                            <Text>
                                {isSignUp ? "Already have an account?" : "Don't have an account yet?"}
                            </Text>
                            <Button type="link" onClick={toggleMode}>
                                {isSignUp ? "Sign In" : "Sign Up"}
                            </Button>
                        </Space>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default LoginPage;
