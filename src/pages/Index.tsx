
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import { Navigate } from "react-router-dom";

const Index: React.FC = () => {
  // Redirect to Home page
  return <Navigate to="/home" replace />;
};

export default Index;
